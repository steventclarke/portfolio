import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as ssm from 'aws-cdk-lib/aws-ssm';

export interface PortfolioStackProps extends cdk.StackProps {
  /** Deployment environment: "preview" or "prod". Defaults to "preview". */
  readonly environment?: string;
}

export class PortfolioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: PortfolioStackProps) {
    super(scope, id, props);

    const environment = props?.environment ?? 'preview';
    const production = environment === 'prod';

    const domainName = ssm.StringParameter.valueFromLookup(this, '/platform/dns/domain-name');
    const hostedZoneId = ssm.StringParameter.valueFromLookup(this, '/platform/dns/hosted-zone-id');
    const certificateArn = ssm.StringParameter.valueFromLookup(
      this,
      '/platform/certs/us-east-1/wildcard-arn',
    );

    const primaryHost = production ? `portfolio.${domainName}` : `portfolio-preview.${domainName}`;

    const siteBucket = new s3.Bucket(this, 'SiteBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      removalPolicy: production ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY,
    });

    const origin = origins.S3BucketOrigin.withOriginAccessControl(siteBucket, {
      originAccessLevels: [cloudfront.AccessLevel.READ],
    });

    const aliases = [primaryHost];
    let apexRedirect: cloudfront.Function | undefined;

    if (production) {
      aliases.push(domainName);

      apexRedirect = new cloudfront.Function(this, 'ApexRedirect', {
        runtime: cloudfront.FunctionRuntime.JS_2_0,
        code: cloudfront.FunctionCode.fromInline(
          `function handler(event) {
  var host = event.request.headers.host ? event.request.headers.host.value : '';
  if (host === '${domainName}') {
    var location = 'https://${primaryHost}' + event.request.uri;
    if (event.request.querystring && event.request.querystring !== '') {
      location += '?' + event.request.querystring;
    }
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: { location: { value: location } }
    };
  }
  return event.request;
}`,
        ),
      });
    }

    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        compress: true,
        ...(apexRedirect
          ? {
              functionAssociations: [
                {
                  function: apexRedirect,
                  eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
                },
              ],
            }
          : {}),
      },
      domainNames: aliases,
      certificate: acm.Certificate.fromCertificateArn(this, 'SiteCertificate', certificateArn),
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
        },
      ],
    });

    const zone = route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
      hostedZoneId,
      zoneName: domainName,
    });

    const cloudFrontTarget = route53.RecordTarget.fromAlias(
      new targets.CloudFrontTarget(distribution),
    );

    new route53.ARecord(this, 'PrimaryARecord', {
      zone,
      recordName: primaryHost,
      target: cloudFrontTarget,
    });

    new route53.AaaaRecord(this, 'PrimaryAaaaRecord', {
      zone,
      recordName: primaryHost,
      target: cloudFrontTarget,
    });

    new cdk.CfnOutput(this, 'BucketName', { value: siteBucket.bucketName });
    new cdk.CfnOutput(this, 'DistributionId', { value: distribution.distributionId });
    new cdk.CfnOutput(this, 'DomainName', { value: distribution.distributionDomainName });

    cdk.Tags.of(this).add('project', 'portfolio');
    cdk.Tags.of(this).add('environment', environment);
    cdk.Tags.of(this).add('owner', 'steventclarke');
    cdk.Tags.of(this).add('application', 'portfolio');
    cdk.Tags.of(this).add('managed-by', 'cdk');
  }
}
