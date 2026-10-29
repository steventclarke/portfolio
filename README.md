# portfolio

Steven Clarke's professional portfolio website — an Astro + TypeScript + Tailwind CSS
static site hosted on AWS (S3 + CloudFront + Route 53), provisioned with CDK and deployed
via GitHub Actions with OIDC.

This is a **tenant application** on the `stevenclarke.dev` platform. The shared AWS
foundation is owned by
[`stevenclarke-infrastructure`](../stevenclarke-infrastructure); this repository owns its
own application resources (S3 bucket, CloudFront distribution, DNS records) and deploys
both a `preview` and a `prod` environment.

## Repository structure

- [spec.md](./spec.md) - Original specification
- [plan.md](./plan.md) - Implementation plan, phases, decisions, and status
- `src/` - Astro pages, layouts, styles
- `public/` - Static assets (headshot, resume PDF, favicon, robots.txt, 404)
- `infrastructure/cdk/` - Application CDK stack (S3, CloudFront, DNS records)
- `.github/workflows/` - CI/CD workflows

## Hostnames

| Deployment | Hostname |
| --- | --- |
| Production | `portfolio.stevenclarke.dev` |
| Preview | `portfolio-preview.stevenclarke.dev` |
| Apex | `stevenclarke.dev` (301-redirects to production) |

## AWS authentication (IAM Identity Center SSO)

This project uses AWS IAM Identity Center (SSO). Configure once, then log in as needed.

```bash
aws configure sso --profile admin
# SSO start URL: your AWS Access Portal URL
# SSO region: us-east-2
# CLI default region: us-east-2
# CLI profile name: admin
```

Add `AWS_PROFILE` to your shell profile (e.g. `~/.zshrc`):

```bash
echo 'export AWS_PROFILE=admin' >> ~/.zshrc
source ~/.zshrc
```

Daily usage:

```bash
aws sso login --profile admin
aws sts get-caller-identity
```

Tokens expire periodically; re-run `aws sso login` if you get
`Unable to locate credentials`. Primary region is `us-east-2`; CloudFront certificates
live in `us-east-1`.

## Development

1. Install dependencies: `npm install`
2. Start the dev server in background mode: `astro dev --background`
   (`astro dev stop` / `astro dev status` / `astro dev logs` to manage it)
3. Lint: `npm run lint`
4. Format: `npm run format` (check with `npm run format:check`)
5. Typecheck: `npm run typecheck`
6. Build: `npm run build`

## Application infrastructure (CDK)

```bash
cd infrastructure/cdk
npm install
npm run build
npx cdk synth -c environment=preview   # or -c environment=prod
npx cdk diff -c environment=preview
npx cdk deploy -c environment=preview --all
```

The stack reads shared values (domain name, hosted-zone ID, wildcard certificate ARN)
from SSM published by `stevenclarke-infrastructure`, uses Origin Access Control (OAC),
creates its own DNS records in the shared hosted zone, and is tagged `project`,
`environment`, `owner`, `application`, `managed-by`.

## Branch conventions

- `main` — production. Merges require PR approval via the `production` GitHub Environment
  and deploy to `portfolio.stevenclarke.dev`.
- `preview` — integration. Merges auto-deploy the preview environment at
  `portfolio-preview.stevenclarke.dev`.
- `phase/<n>` or `phase/<n>-<description>` — plan-phase work (e.g., `phase/2`,
  `phase/1-foundation`).
- `<issue-number>-<description>` — issue-driven work.

## Deployment

Continuous deployment via GitHub Actions with OIDC (no long-lived AWS keys):

- Merge to `preview` → auto-deploy `portfolio-preview.stevenclarke.dev` using
  `portfolio-deploy-preview`.
- Merge to `main` → deploy `portfolio.stevenclarke.dev` (with the apex
  `stevenclarke.dev` redirect) using `portfolio-deploy-prod` after manual approval through
  the `production` GitHub Environment.

Before the first deploy, set the GitHub repository variables `DEPLOY_ROLE_ARN` (prod) and
`PREVIEW_DEPLOY_ROLE_ARN` (preview) from the platform SSM parameters
(`/platform/roles/portfolio/{prod,preview}/deploy-role-arn`).

## Contributing

Follow the conventions in [AGENTS.md](./AGENTS.md) and [plan.md](./plan.md). Update
`plan.md` as you complete plan items.
