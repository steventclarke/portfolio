# Portfolio Website Implementation Plan

Source spec: `spec.md`

## 1. Objective

Build and host a professional portfolio for Steven Clarke that compensates for a career spent on NDA-bound internal tools. The site should make a strong first impression on recruiters and hiring managers, communicate skills and experience clearly, and provide credible evidence of work through project case studies, source code, demos, and app links.

Success criteria:

- A visitor can understand who Steven is, what roles he targets, and his core skills within 30 seconds.
- Every project page explains the problem, approach, technical decisions, outcome, and evidence (code, demo, screenshots, or app link).
- The site loads quickly, works on mobile, is accessible, and is indexable by search engines.
- The site is served over HTTPS on a real custom domain.
- Content can be updated without rebuilding the architecture from scratch.
- The project itself demonstrates modern engineering practices and can be discussed in interviews.

## 2. Confirmed Decisions

These decisions are settled and replace the earlier open questions.

| Concern | Decision |
| --- | --- |
| Domain | `stevenclarke.dev`; purchased from GoDaddy. Delegate DNS to Route 53. |
| Production hostname | `portfolio.stevenclarke.dev`. |
| Apex redirect | `stevenclarke.dev` 301-redirects to `portfolio.stevenclarke.dev`. |
| Preview hostname | `portfolio-preview.stevenclarke.dev`. |
| Hosting model | Managed AWS services: S3 + CloudFront + Route 53 + ACM. No EC2 or container servers. |
| AWS account and region | Managed by `stevenclarke-infrastructure`. Portfolio resources deploy to `us-east-2` (primary), with ACM certificates for CloudFront in `us-east-1`. |
| Hosting budget | No more than $10/month, excluding domain registration. Analytics and optional services must fit within this budget. |
| Framework | Astro + TypeScript + Tailwind CSS, static output by default. |
| Content workflow | Steven writes Markdown/MDX directly in the repository. No CMS. |
| Target role | Senior software engineer. |
| Target companies | Industry and company size are still open. Keep positioning broad rather than narrowing prematurely. |
| Location | Open to relocation to Austin, TX, Seattle, WA, or Asheville, NC, or remote work from those locations. |
| Launch date | December 1, 2026. |
| Available time | Approximately 10 hours per week. |
| Launch scope | Home, Projects index, 4 project detail pages, About, Contact, resume PDF, 404 page. |
| Featured projects | Iron Altar, Squat Monster, Media Inspector, and the Portfolio Website itself. All four are currently in progress. |
| NDA case studies | Draft sanitized case studies for: (a) CMS migration from Fifth Kind to ADAM, (b) corporate media inspection for pipeline automation, and (c) retrofitting testability into event-driven microservices. Publish only after NDA review and approval. |
| Metrics | No reliable quantitative outcomes are available. Use qualitative outcomes, technical decisions, and lessons learned. |
| Resume | Public PDF download. |
| Contact | Public email address, `mailto:` link, and LinkedIn. No contact form. |
| Blog / writing | Not at launch. Consider after launch. |
| Brand assets | Headshot is available; no logo or other brand assets. Use a typographic identity. |
| Demos | Screenshots, videos, and external links are sufficient. No embedded interactive demos. |
| Analytics | None for v1; hosted analytics does not fit the budget. Revisit after launch only if the cost can be absorbed. |
| Source repository | Public as part of the portfolio. Never commit secrets or confidential material. |
| Preview deployments | Yes. The `preview` branch auto-deploys to `portfolio-preview.stevenclarke.dev`. |
| Accessibility | WCAG 2.2 AA. No additional localization or compliance requirements. |
| CI/CD | GitHub Actions deploying to AWS with OIDC. No long-lived AWS access keys. |

## 3. Positioning and Messaging

The site should position Steven as a senior software engineer with unusual breadth:

- Deep technical work building media supply-chain applications.
- Consulting experience across many organizations, projects, and problem domains.
- Stakeholder management and the ability to turn ambiguous problem statements into specific, deliverable requirements.
- Delivery of complex technical solutions under time and resource constraints.
- Adaptability to new technology, including agentic AI workflows and LLMs, grounded in experience building software before the AI era.
- A pleasant, curious collaborator with interests outside engineering.

The Home page should state the target role and value proposition directly, then provide evidence through selected projects and a concise skills snapshot. The About page should reframe consulting work as breadth, delivery, and stakeholder effectiveness rather than as a gap in public output.

## 4. Information Architecture

Primary navigation:

- **Home** — positioning statement, selected projects, skills snapshot, call to action.
- **Projects** — index of the four featured projects, with NDA-safe case studies added when approved.
- **Project detail** — problem, constraints, approach, architecture, challenges, results, links (GitHub, demo, app store), media.
- **About** — career narrative, consulting background, NDA-safe framing, values, resume download.
- **Contact** — public email, LinkedIn, GitHub.

Post-launch additions:

- **Case studies** — sanitized NDA work, clearly labeled and reviewed before publication.
- **Notes / Writing** — technical articles that reinforce expertise and improve search visibility.
- **Uses / Now** — optional personality page, only if it supports the professional goal.

Recommended project detail template:

1. One-line summary and role.
2. Problem and target user.
3. Constraints (time, budget, NDA, platform).
4. Architecture and key technical decisions.
5. Interesting challenges and tradeoffs.
6. Outcome and evidence (qualitative where metrics are unavailable).
7. Links: source, demo, app store, video.
8. What I would do differently.

NDA guidance: describe business problems, technologies, and personal contributions without naming clients, exposing proprietary logic, or publishing screenshots that reveal confidential data. Use anonymized case studies and clearly label them. Obtain employer approval where the NDA is ambiguous.

## 5. Featured Projects and Case Studies

### Launch project pages

1. **Iron Altar** — a strength-training application.
2. **Squat Monster** — a bar-path analysis tool using computer vision to analyze barbell lifts.
3. **Media Inspector** — a web application that inspects media-file metadata and generates a Media Manifest Core specification file.
4. **Portfolio Website** — the current website, including how it was built and how it works. Use the implementation as evidence: Astro, TypeScript, Tailwind CSS, AWS infrastructure as code, CI/CD, preview deployments, and the tradeoffs made along the way.

For each project, capture the current status, repository URL, demo or app-store URL where applicable, screenshots or video, architecture, key technical decisions, challenges, and lessons learned. See [Featured Projects Inventory](#15-featured-projects-inventory). Because all four are in progress, each page must accurately describe the shipped state rather than planned functionality.

### NDA case studies (post-launch, pending review)

1. **CMS migration from Fifth Kind to ADAM** — migration approach, content modeling, validation, and operational cutover lessons.
2. **Media inspection for content-pipeline automation** — the corporate version of Media Inspector, including what worked, what was difficult, downstream technical debt, and technology transitions during a corporate merger.
3. **Retrofitting testability into event-driven microservices** — making existing services testable and automating application testing and validation.

These should emphasize Steven's personal contribution, technical decisions, constraints, and lessons learned. They should not include client names, proprietary logic, confidential screenshots, or unapproved details. Draft them post-launch (Phase 4), but hold publication until review is complete.

## 6. Content Model

Each project should be an MDX file with typed frontmatter:

```yaml
title: string
summary: string
role: string
timeline: string
status: "live" | "archived" | "case-study"
featured: boolean
technologies: string[]
sourceUrl?: string
demoUrl?: string
appStoreUrl?: string
coverImage: string
gallery?: string[]
confidential: boolean
```

Site-wide content:

- Name, headline, target role, and location/remote preference.
- Short bio and longer about page.
- Skills grouped by category (languages, frameworks, cloud, data, leadership).
- Work history with outcomes, not just responsibilities.
- Resume PDF.
- Public email, LinkedIn, GitHub, and availability statement.
- SEO metadata and Open Graph image per page.

Content assets:

- Available: headshot (`public/images/headshot.jpg`), resume PDF (`public/resume.pdf`), and contact links in `src/pages/contact.astro`.
- Still needed: fill the `TBD` app-store, video, and key-technical-decision fields in the featured-project inventory.
- Still needed: capture or verify screenshots and project architecture documents for each featured project.
- Still needed: confirm repository URLs against the public GitHub account and confirm NDA approval status for each proposed case study.

## 7. Design and UX

Principles:

- Professional, content-first, and fast. Avoid gimmicks that compete with the work.
- Build a typographic identity around the headshot; no logo is required.
- Strong typography and generous whitespace; one clear accent color.
- Mobile-first layout with readable project pages.
- Prominent calls to action: view projects, download resume, contact.
- Light and dark mode only if it can be done consistently and accessibly.

Key pages:

- Home above the fold: name, target role, one-sentence value proposition, primary CTA.
- Selected projects displayed as cards with outcome-focused summaries.
- Case studies that are skimmable: headings, short paragraphs, diagrams, and code excerpts.
- About page that reframes consulting experience as breadth, delivery under constraints, and stakeholder work.

Accessibility requirements:

- WCAG 2.2 AA target: semantic HTML, keyboard navigation, visible focus states, color contrast, alt text, reduced-motion support.
- Test with keyboard-only navigation and a screen reader.
- Respect `prefers-reduced-motion`.

## 8. AWS Architecture

Platform ownership (in `stevenclarke-infrastructure`):
- Route 53 hosted zone for `stevenclarke.dev` (GoDaddy nameservers delegated to it).
- Shared ACM certificates in `us-east-1` for CloudFront, including the wildcard for `*.stevenclarke.dev` and any app-specific wildcards as needed.
- GitHub OIDC identity provider and least-privilege deployment roles (`portfolio-deploy-preview`, `portfolio-deploy-prod`), published to SSM.
- Shared VPC/network and parameter contract (hosted zone ID, certificate ARNs, deploy role ARNs).
- Budget and monitoring.

Application ownership (in `portfolio`):
- S3 bucket for static build output (private), CloudFront distribution with OAC, and any portfolio-specific configuration.
- DNS records created in the shared hosted zone using the zone ID from SSM and scoped IAM permissions:
  - `portfolio.stevenclarke.dev` (production).
  - `portfolio-preview.stevenclarke.dev` (preview).
- The apex `stevenclarke.dev` record is platform-owned and points at the production distribution; the distribution 301-redirects apex traffic (including paths and query strings) to `portfolio.stevenclarke.dev` via a CloudFront Function.
- GitHub Actions using the platform deploy role ARNs via OIDC to build, deploy CDK, sync to S3, and invalidate CloudFront. No long-lived AWS keys.
- AWS CDK in TypeScript in this repo to provision application resources, reading `/platform/dns/hosted-zone-id`, `/platform/dns/domain-name`, and `/platform/certs/us-east-1/wildcard-arn` from SSM.

Deployment model:

| Environment | Branch | Hostname | GitHub Environment |
| --- | --- | --- | --- |
| Production | `main` | `portfolio.stevenclarke.dev` | `production` (manual approval) |
| Preview | `preview` | `portfolio-preview.stevenclarke.dev` | none (auto-deploy) |

Baseline:

```text
Route 53 (shared, platform) --zone ID/records--> App DNS
                |
CloudFront (app, uses platform cert in us-east-1) --OAC--> S3 (app, private)
                |
GitHub Actions --OIDC (app role from platform)--> S3 sync + CloudFront invalidation
```

### Preview environment

- The `preview` branch deploys a separate `preview-PortfolioStack` (S3 + CloudFront + DNS) via `npx cdk deploy -c environment=preview`.
- Preview is served from `portfolio-preview.stevenclarke.dev` and is marked `noindex` (a build step injects a `noindex,nofollow` meta tag into every page).
- The `main` branch deploys the `prod-PortfolioStack` via `npx cdk deploy -c environment=prod`.
- Preview uses the `portfolio-deploy-preview` role; production uses `portfolio-deploy-prod` (manual approval via the `production` GitHub Environment).

### Optional add-ons

- **Analytics:** deferred for v1. Revisit after launch only if a privacy-friendly hosted service fits within the $10/month cap.
- **Contact form:** not planned. Revisit only if `mailto:` proves insufficient.
- **Blog:** add after launch if it supports the job search.
- **Preview deployments:** confirmed as part of launch.
- **Error/uptime monitoring:** add lightweight CloudWatch alarms or an external uptime check after launch.

Estimated cost at portfolio traffic levels: roughly $1–5/month for core hosting, plus domain registration and any analytics subscription. Review the total against the $10/month cap before enabling paid add-ons.

## 9. Repository Structure

```text
portfolio/
  src/
    components/
    layouts/
    pages/
      index.astro
      about.astro
      contact.astro
      projects/
        index.astro
        [...slug].astro
    content/
      projects/
      config.ts
    styles/
  public/
    images/
    resume.pdf
    favicon/
  infrastructure/
    cdk/
  .github/workflows/
    ci.yml
    deploy.yml
    preview.yml
  .github/scripts/
    add-noindex.mjs
  astro.config.mjs
  package.json
  plan.md
  spec.md
```

The repository is public. Keep AWS account IDs, secrets, analytics keys, and confidential case-study material out of the repository. Use GitHub OIDC and repository secrets only where required.

## 10. Implementation Schedule

Capacity is roughly 10 hours per week. The December 1, 2026 target is a **technical
launch**: the scaffolding, infrastructure, and CI/CD are proven out and live over the
domain with placeholder content, and the four applications are onboarded. Real content
is filled in post-launch, because the four featured projects are still in progress.

### Phase 0: Discovery and launch prep (October 22–25) — Completed

- [x] Register `stevenclarke.dev` (purchased from GoDaddy; nameserver delegation occurs during infrastructure setup).
- [x] Confirm AWS account access and billing.
- [x] Inventory the four featured projects (status, repository, demo/app-store links, screenshots, video, architecture) — see [Featured Projects Inventory](#15-featured-projects-inventory).
- [x] Identify what each project needs to be presentable at launch and flag not-ready items.
- [x] Confirm NDA boundaries and the approval process for the three proposed case studies — see [NDA Case Studies Inventory](#16-nda-case-studies-inventory).
- [x] Gather the headshot, resume PDF, public email, LinkedIn URL, and GitHub URL (`public/`, `src/pages/contact.astro`).
- [x] Decide the preview-subdomain name and analytics shortlist (`portfolio-preview.stevenclarke.dev`; analytics deferred for v1 on cost).

### Phase 1: Foundation (October 26–November 1) — In progress

- [x] Scaffold Astro + TypeScript + Tailwind CSS (`npm run build` passes; 8 static routes generated).
- [x] Set up linting, formatting, and type checking (ESLint + Prettier + `astro check`).
- [x] Define typography, layout shell, and navigation (`BaseLayout`, skip link, light/dark mode).
- [ ] Extract design tokens (colors, spacing, and type scale are currently inline Tailwind classes, not tokens).
- [x] Implement Home, About, Projects index, four project detail pages, and Contact with placeholder content.
- [x] Add resume download and social links (footer and contact page).
- [x] Provision app resources (S3, CloudFront, DNS records) with CDK consuming shared SSM values and platform roles/certificates.
- [x] Read hosted-zone ID, certificate ARNs, and deploy-role ARNs from SSM (`/platform/dns/hosted-zone-id`, `/platform/dns/domain-name`, `/platform/certs/us-east-1/wildcard-arn`).
- [x] Create production (`portfolio.stevenclarke.dev`) and preview (`portfolio-preview.stevenclarke.dev`) DNS records in the shared hosted zone, with an apex `stevenclarke.dev` → `portfolio.stevenclarke.dev` redirect.
- [x] Set up CI (`ci.yml`) and the production deploy workflow (`deploy.yml`, `us-east-2`, `production` environment + `portfolio-deploy-prod`).
- [x] Add the preview deploy workflow (`preview.yml`, `preview` branch, `portfolio-preview.stevenclarke.dev`, `noindex`).

### Phase 2: Deploy and prove the scaffolding — In progress

- [ ] Deploy the production stack (`npx cdk deploy -c environment=prod --all`) using `portfolio-deploy-prod` via the `production` GitHub Environment (on merge to `main`).
- [x] Deploy the preview stack (`npx cdk deploy -c environment=preview --all`) — deployed from the workstation; live at `portfolio-preview.stevenclarke.dev`.
- [x] Verify DNS, HTTPS, cache invalidation, and `noindex` on preview (apex redirect is verified once production is deployed).
- [x] Smoke-test every placeholder page over HTTPS: Home, Projects, four detail pages, About, Contact, resume, and 404.
- [ ] Basic responsive and keyboard-navigation pass on the placeholder shell.
- [x] Automated link checking on every deploy (`npm run links`, wired into CI and both deploy workflows).
- [ ] Run the launch checklist and launch on December 1, 2026.

Phase 2 fixes discovered while proving the scaffolding:

- `valueFromLookup` returns a `dummy-value-for-…` on the first synth pass, which tripped the certificate ARN validation; the certificate is now resolved at deploy time via an SSM-backed CloudFormation parameter.
- S3 + OAC does not resolve directory `index.html`, so a viewer-request CloudFront Function rewrites extensionless paths to `/index.html` (and the production variant also performs the apex redirect).
- Missing objects return 403 from S3/OAC, so 403 is mapped to the 404 page alongside 404.

### Phase 3: Onboard the applications — Not started

- [ ] Onboard Iron Altar, Squat Monster, and Media Inspector as tenant apps so their demo hostnames are live (`ironaltar.stevenclarke.dev`, `squatmonster.stevenclarke.dev`, `mediainspector.stevenclarke.dev`).
- [ ] Confirm the platform contract (SSM params, deploy roles, DNS/OAC pattern) generalizes across repositories; coordinate with `stevenclarke-infrastructure`.
- [ ] Update the portfolio demo/app-store links to the live hosts.

### Phase 4: Content (post-launch) — Not started

- [ ] Write the final positioning statement and About page.
- [ ] Complete the four project write-ups and supporting media (pages are currently placeholder "in progress" copy).
- [ ] Adopt the MDX content model from Section 6, or update the plan to reflect the current hardcoded `.astro` pages.
- [ ] Draft the NDA case studies and keep them unpublished pending review; publish once approved.
- [ ] Create and optimize screenshots, diagrams, and Open Graph images.
- [ ] Add SEO metadata, sitemap, robots.txt, structured data, and per-page Open Graph images.
- [ ] Proofread for recruiter readability and NDA safety.
- [ ] Accessibility audit and WCAG 2.2 AA fixes against the final content.
- [ ] Lighthouse performance, accessibility, best-practices, and SEO checks on final content.
- [ ] Test with 1–2 people who match the target audience and incorporate feedback.

### Phase 5: Post-launch housekeeping — Not started

- [deferred] Revisit analytics only if a privacy-friendly hosted service fits the budget.
- [ ] Add a technical blog or notes section if useful.
- [ ] Review traffic and contact conversion.
- [ ] Periodically update dependencies and rerun Lighthouse checks.

## 11. Testing and Quality Gates

- `npm run lint`, `npm run typecheck`, and a production build must pass in CI.
- Automated link checking on every deploy.
- Lighthouse CI budgets for performance, accessibility, best practices, and SEO.
- Broken image and missing metadata checks.
- Manual keyboard and screen-reader pass before launch.
- Deployment smoke test: homepage, project page, resume, 404, and HTTPS redirect.
- Preview deployments must be `noindex` and must not expose draft or confidential content.
- Secret scanning and NDA-safety review before making the repository public or merging sensitive content.

## 12. Launch Checklist

For the technical launch (placeholder content), verify:

- Domain resolves and HTTPS works; the apex `stevenclarke.dev` redirects to `portfolio.stevenclarke.dev`.
- Home, Projects, each project page, About, Contact, resume, and 404 are live.
- The four project pages link to their GitHub repositories and (as available) live demos.
- Public email, LinkedIn, and GitHub links work.
- Resume PDF is current and downloadable.
- The `preview` environment is `noindex`; production is indexable.
- No secrets, AWS identifiers, or confidential material are in the public repository.
- Analytics remains intentionally disabled for v1.
- CI, the preview workflow, and the production workflow complete successfully.

Phase 4 adds the content-dependent items: SEO metadata and Open Graph previews,
accessibility/Lighthouse passes on final content, and NDA review of any published case
studies.

## 13. Risks and Tradeoffs

| Risk | Mitigation |
| --- | --- |
| NDA constraints limit project detail | Use anonymized case studies; emphasize personal contribution and technical decisions; get approval before publishing |
| All four featured projects are still in progress | Define the minimum presentable state for each early; write accurate process and architecture content rather than overstating completion |
| No quantitative outcomes | Focus on constraints, decisions, tradeoffs, qualitative results, and lessons learned |
| Content work takes longer than development | Start with the four project pages; ship and expand iteratively; defer the NDA case studies and blog |
| Six-week schedule is tight at 10 hours/week | Protect scope: Home, Projects, four project pages, About, Contact, resume, 404. Defer analytics, blog, and case studies if needed |
| Static site feels limited later | Architecture allows adding Lambda-backed forms, search, or a CMS without a rewrite |
| AWS complexity distracts from job search | Use managed services via platform; app owns only S3/CloudFront/DNS records and uses shared OIDC/roles/params from `stevenclarke-infrastructure` |
| Platform not ready or DNS delegation delayed | Coordinate with `stevenclarke-infrastructure` for zone, certs, roles, and SSM params; use placeholder URLs/preview until available |
| Analytics pushes the budget over $10/month | Keep analytics disabled for v1; revisit only if cost fits the budget |
| Public repository exposes sensitive information | Scan for secrets, read only from SSM/role ARNs, keep AWS identifiers out of source where possible, and review NDA content before merging |
| Site performance degrades with heavy media | Optimize images, use modern formats, lazy-load below-the-fold media |

## 14. Refinements from Phase 0

- Domain `stevenclarke.dev` is purchased at GoDaddy. Route 53 hosted-zone creation and nameserver delegation are part of `stevenclarke-infrastructure`.
- Production is served from `portfolio.stevenclarke.dev` and preview from `portfolio-preview.stevenclarke.dev`; the apex `stevenclarke.dev` 301-redirects to `portfolio.stevenclarke.dev` (platform owns the apex record; the app distribution performs the redirect). Legacy `preview.stevenclarke.dev` references have been removed.
- Preview is deployed from the `preview` branch to `portfolio-preview.stevenclarke.dev` (a single preview environment, not per-PR), and is marked `noindex`.
- Analytics is disabled for v1 because the hosted cost does not fit the budget.
- The headshot, resume PDF, email, LinkedIn, and GitHub links are available and should be reused across the site.
- Launch scope now includes four project pages: Iron Altar, Squat Monster, Media Inspector, and the Portfolio Website.
- Remaining project content: app-store links, videos, key technical decisions, verified screenshots, and architecture details where marked `TBD`.
- NDA case-study boundaries and the approval process are confirmed, but each case study still needs publication approval.
- Application responsibilities: provision S3/CloudFront/DNS records in CDK (OAC), read hosted zone ID/cert ARNs from SSM, use `portfolio-deploy-preview`/`portfolio-deploy-prod` via OIDC, and keep region alignment with platform (`us-east-2` primary, `us-east-1` for CloudFront certs).

## 15. Featured Projects Inventory

- **Iron Altar** — a strength-training application.
  - Current status: In progress.
  - Repository: https://github.com/steventclarke/iron-altar
  - Demo: https://ironaltar.stevenclarke.dev
  - App store: TBD
  - Screenshots: https://github.com/steventclarke/iron-altar/tree/main/screenshots
  - Video: TBD
  - Architecture: https://github.com/steventclarke/iron-altar/blob/main/ARCHITECTURE.md
  - Key technical decisions: TBD
- **Squat Monster** — a bar-path analysis tool using computer vision to analyze barbell lifts.
  - Current status: In progress.
  - Repository: https://github.com/steventclarke/squat-monster
  - Demo: https://squatmonster.stevenclarke.dev
  - App store: TBD
  - Screenshots: https://github.com/steventclarke/squat-monster/tree/main/screenshots
  - Video: TBD
  - Architecture: https://github.com/steventclarke/squat-monster/blob/main/ARCHITECTURE.md
  - Key technical decisions: TBD
- **Media Inspector** — a web application that inspects media-file metadata and generates a Media Manifest Core specification file.
  - Current status: In progress.
  - Repository: https://github.com/steventclarke/media-inspector
  - Demo: https://mediainspector.stevenclarke.dev
  - App store: TBD
  - Screenshots: https://github.com/steventclarke/media-inspector/tree/main/screenshots
  - Video: TBD
  - Architecture: https://github.com/steventclarke/media-inspector/blob/main/ARCHITECTURE.md
  - Key technical decisions: TBD
- **Portfolio Website** — a website that showcases Steven's work and projects. This is the current website, with detail about how it was built and how it works.
  - Current status: In progress.
  - Repository: https://github.com/steventclarke/portfolio
  - Demo: https://portfolio.stevenclarke.dev
  - App store: TBD
  - Screenshots: https://github.com/steventclarke/portfolio/tree/main/screenshots
  - Video: TBD
  - Architecture: https://github.com/steventclarke/portfolio/blob/main/ARCHITECTURE.md
  - Key technical decisions: TBD

## 16. NDA Case Studies Inventory

- **CMS migration from Fifth Kind to ADAM** — migration approach, content modeling, validation, and operational cutover lessons.
- **Media inspection for content-pipeline automation** — the corporate version of Media Inspector, including what worked, what was difficult, downstream technical debt, and technology transitions during a corporate merger.
- **Retrofitting testability into event-driven microservices** — making existing services testable and automating application testing and validation.

## 17. Open Items

Outstanding gaps between the current repository state and the plan. These do not block
writing content but must be closed before the relevant phase.

1. [x] **Region alignment** — `us-east-2` for app/platform, `us-east-1` for CloudFront
   certificates. Fixed in the CDK stack and GitHub Actions workflows.
2. [x] **CloudFront access model** — uses Origin Access Control (`OAC`) via
   `S3BucketOrigin.withOriginAccessControl`, not the legacy Origin Access Identity.
3. [x] **SSM parameter contract** — the CDK stack reads `/platform/dns/domain-name`,
   `/platform/dns/hosted-zone-id`, and `/platform/certs/us-east-1/wildcard-arn` from
   `stevenclarke-infrastructure`.
4. [x] **DNS records and hostnames** — production is `portfolio.stevenclarke.dev`,
   preview is `portfolio-preview.stevenclarke.dev`, and `stevenclarke.dev` redirects to
   `portfolio.stevenclarke.dev`. The app creates the two subdomain records; the apex
   record is platform-owned.
5. [x] **Preview subdomain and noindex** — `preview.yml` deploys to
   `portfolio-preview.stevenclarke.dev` and injects a `noindex,nofollow` meta tag into
   every page via `.github/scripts/add-noindex.mjs`.
6. [x] **Lint/format/typecheck** — ESLint (`npm run lint`), Prettier (`npm run format` /
   `format:check`), and `astro check` (`npm run typecheck`) are configured and pass.
7. [ ] **Content model** — pages are hardcoded `.astro` files rather than the MDX content
   collection with typed frontmatter described in Section 6. Resolve post-launch (Phase 4).
8. [x] **Repository publication** — `steventclarke/portfolio` is published (public).
9. [ ] **Platform prerequisites (before production deploy)** — the SSM parameters and
   `portfolio-deploy-preview`/`portfolio-deploy-prod` roles are published, the GitHub
   variables `DEPLOY_ROLE_ARN`/`PREVIEW_DEPLOY_ROLE_ARN` are set, and the `production`
   GitHub Environment (required reviewer) is configured. Remaining: the platform must
   create the apex `stevenclarke.dev` record pointing at the production distribution so
   the apex redirect works.
