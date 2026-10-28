# AGENTS.md

Working conventions for this repository.

## Project

This is a **tenant application** on the `stevenclarke.dev` platform. The shared AWS
foundation (Route 53 hosted zone, wildcard certificate, GitHub OIDC, per-app deploy
roles, VPC, monitoring) is owned by `stevenclarke-infrastructure`. This repository owns
its application resources — the S3 bucket, CloudFront distribution, DNS records, and the
Astro site — and supports two deployments: `preview` and `prod`.

## Branching and PR workflow

Follow this process for all changes:

1. **Start from `main`**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create a phase/feature branch**
   - For plan phases: `phase/<n>` or `phase/<n>-<description>` (e.g., `phase/2-content`)
   - For issue-driven work: `<issue-number>-<description>` (e.g., `12-fix-preview-subdomain`)
   - For ad-hoc work: a short descriptive branch name
   ```bash
   git checkout -b phase/2-content
   ```

3. **Make changes and commit**
   ```bash
   git add <files>
   git commit -m "Concise description of changes"
   ```

4. **Push and open a PR**
   ```bash
   git push -u origin phase/2-content
   gh pr create --base main --head phase/2-content \
     --title "Phase 2: Content" \
     --body "Describe changes, link to plan items, and note any follow-ups."
   ```

5. **Address review comments**, push updates, then merge after approval and passing checks.

6. **Merge and clean up**
   ```bash
   git checkout main
   git pull origin main
   git branch -d phase/2-content
   ```

## Branches

- `main` — production. Merges require approval via the `production` GitHub Environment
  and deploy to `portfolio.stevenclarke.dev`.
- `preview` — integration. Merges auto-deploy the preview environment at
  `portfolio-preview.stevenclarke.dev`.
- `phase/<n>` or `phase/<n>-<description>` — plan-phase work (e.g., `phase/2`).
- `<issue-number>-<description>` — issue-driven work.

## AWS authentication

Use IAM Identity Center SSO with profile `admin`:
```bash
aws sso login --profile admin
export AWS_PROFILE=admin  # set in ~/.zshrc
aws sts get-caller-identity
```
Tokens expire periodically; re-run `aws sso login` as needed. Primary region is
`us-east-2`; CloudFront certificates live in `us-east-1`.

## Local development (Astro)

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and
`astro dev logs`.

Full docs: https://docs.astro.build — consult these before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## CDK workflow (application infrastructure)

Application infrastructure lives in `infrastructure/cdk/` and reads shared values from
SSM (domain name, hosted-zone ID, wildcard certificate ARN published by the platform)
rather than hardcoding them.

```bash
cd infrastructure/cdk
npm install
npm run build                              # tsc
npx cdk synth -c environment=preview       # or -c environment=prod
npx cdk diff -c environment=preview
npx cdk deploy -c environment=preview --all
```

- Use `-c environment=preview|prod` to select the target. Default to `preview` for safety
  when deploying from the workstation.
- Tag all resources `project`, `environment`, `owner`, `application`, `managed-by`.
- Use platform deploy roles via GitHub OIDC in CI; do not store long-lived AWS keys.

## Code conventions

- Astro + TypeScript + Tailwind CSS for the site; static output by default.
- AWS CDK (TypeScript) in `infrastructure/cdk/` for application resources.
- Run `npm run lint`, `npm run format`, and `npm run typecheck` before committing.
- Keep AWS account IDs, secrets, and NDA case-study material out of the repository.

## Commit messages

- Keep concise and descriptive.
- Reference plan phases/items when relevant.
- Do not commit secrets or keys.

## Plan tracking

- Update `plan.md` in your feature branch as you work. Mark items `[x]` when complete and
  `[ ]` when pending/in progress.
- Keep the plan in sync with decisions made during implementation.
- **Every implementation commit on a phase branch MUST update `plan.md` to reflect
  completed action items for that phase.**
- When opening/updating a PR for a phase, mark that phase **Completed** in `plan.md`
  (e.g., `### Phase 2: ... (Completed)`) and check off all completed items.
