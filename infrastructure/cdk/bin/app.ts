#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { PortfolioStack } from '../lib/portfolio-stack';

const app = new cdk.App();

const environment = app.node.tryGetContext('environment') ?? 'preview';
const stackName = environment === 'prod' ? 'prod-PortfolioStack' : 'preview-PortfolioStack';

new PortfolioStack(app, stackName, {
  environment,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'us-east-2',
  },
});
