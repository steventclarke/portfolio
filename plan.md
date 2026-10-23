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
| Preview deployments | Yes, served from `preview.stevenclarke.dev` for pull requests. |
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

These should emphasize Steven's personal contribution, technical decisions, constraints, and lessons learned. They should not include client names, proprietary logic, confidential screenshots, or unapproved details. Draft them in Phase 2, but hold publication until review is complete.

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
- DNS record for `stevenclarke.dev` (production) and `portfolio-preview.stevenclarke.dev` (preview) created in the shared hosted zone using the zone ID from SSM and scoped IAM permissions.
- GitHub Actions using the deploy role ARN from SSM/OIDC to build, sync to S3, and invalidate CloudFront. No long-lived AWS keys.
- AWS CDK in TypeScript in this repo to provision application resources.

Baseline:

```text
Route 53 (shared, platform) --zone ID/records--> App DNS
                |
CloudFront (app, uses platform cert in us-east-1) --OAC--> S3 (app, private)
                |
GitHub Actions --OIDC (app role from platform)--> S3 sync + CloudFront invalidation
```

### Pull-request previews

- Deploy each PR build to `previews/pr-<number>/` in the site bucket (or a preview bucket/path as defined by the app stack).
- Serve previews from `portfolio-preview.stevenclarke.dev` (and/or use a CloudFront Function to map paths), served via a preview distribution or behavior as provisioned by the app stack.
- Mark preview builds `noindex` and protect them from public discovery where practical.
- Add a cleanup workflow that removes the preview prefix when a PR closes.
- Use the `portfolio-deploy-preview` role from the platform OIDC setup.

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
    cleanup-preview.yml
  astro.config.mjs
  package.json
  plan.md
  spec.md
```

The repository is public. Keep AWS account IDs, secrets, analytics keys, and confidential case-study material out of the repository. Use GitHub OIDC and repository secrets only where required.

## 10. Implementation Schedule

Capacity is roughly 10 hours per week, or about 60 hours between now and December 1, 2026. Content is the critical path, especially because the four featured projects are still in progress.

### Phase 0: Discovery and launch prep (October 22–25) — Complete

- Confirm `stevenclarke.dev` availability and register it. **Done** — purchased from GoDaddy. Route 53 hosted zone and nameserver delegation happen during infrastructure setup.
- Confirm AWS account access, billing, and the `us-west-2` region setup. **Done** — account access and billing confirmed.
- Inventory each featured project: current status, repository, demo/app-store links, screenshots, video, architecture notes. **Done** — see [Featured Projects Inventory](#15-featured-projects-inventory).
- Identify what each project needs to be presentable at launch; flag anything that will not be ready. **Done** — remaining `TBD` fields and asset gaps are tracked in Section 14 and the content-assets list.
- Confirm NDA boundaries and approval process for the three proposed case studies. **Done** — see [NDA Case Studies Inventory](#16-nda-case-studies-inventory). Publication approval is still required per case study.
- Gather the headshot, resume PDF, public email, LinkedIn URL, and GitHub URL. **Done** — assets are in `public/` and contact links are in `src/pages/contact.astro`.
- Decide the preview-subdomain name and analytics provider shortlist. **Done** — previews will use `portfolio-preview.stevenclarke.dev` per the platform contract; analytics is deferred for v1 because hosted cost does not fit the budget.

### Phase 1: Foundation (October 26–November 1)

- Scaffold Astro + TypeScript + Tailwind
- Set up linting, formatting, and type checking.
- Define design tokens, typography, layout shell, and navigation.
- Implement Home, About, Projects index, Project detail, and Contact with placeholder content.
- Add resume download and social links.
- Provision app resources (S3, CloudFront, DNS records) with CDK, consuming shared values from SSM and using platform roles/certificates. Coordinate with `stevenclarke-infrastructure` for zone, wildcard cert, and deploy roles.
- Set up CI and the production deploy workflow early enough to catch integration issues.

### Phase 2: Content (November 2–15)

- Write the positioning statement and About page.
- Complete the four project write-ups and supporting media: Iron Altar, Squat Monster, Media Inspector, and the Portfolio Website. Depth beats quantity.
- Draft the NDA case studies but keep them unpublished pending review.
- Create and optimize screenshots, diagrams, and Open Graph images.
- Add SEO metadata, sitemap, robots.txt, and structured data.
- Proofread for recruiter readability and NDA safety.

### Phase 3: Quality (November 16–22)

- Responsive and cross-browser testing.
- Accessibility audit and fixes against WCAG 2.2 AA.
- Lighthouse performance, accessibility, best-practices, and SEO checks.
- Link checking and 404 page.
- Test with 1–2 people who match the target audience and incorporate feedback.
- Verify preview deployments to `portfolio-preview.stevenclarke.dev` using the `portfolio-deploy-preview` role and cleanup on pull requests.

### Phase 4: Launch (November 23–December 1)

- Finalize S3, CloudFront, DNS records, custom domain (via platform zone), HTTPS with platform-provided certificate, security headers, and cache invalidation.
- Verify GitHub Actions OIDC deployment using the `portfolio-deploy-prod` role from the platform.
- Verify DNS, redirects, canonical URLs, social previews, and `noindex` on previews.
- Submit the sitemap to Google Search Console and Bing Webmaster Tools.
- Run the launch checklist and monitor for errors.
- Launch on December 1, 2026.

### Phase 5: Post-launch

- Revisit analytics only if a privacy-friendly hosted service fits the budget.
- Publish NDA case studies once reviewed and approved. Coordinate with `stevenclarke-infrastructure` if any platform resources are needed.
- Add a technical blog or notes section if useful.
- Review traffic and contact conversion.
- Periodically update dependencies and rerun Lighthouse checks.

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

- Domain resolves and HTTPS works with the preferred `www` or apex redirect.
- Home, Projects, each project page, About, Contact, resume, and 404 are live.
- All four project pages have working source, demo, and app-store links where applicable.
- Public email, LinkedIn, and GitHub links work.
- Resume PDF is current and downloadable.
- Metadata, Open Graph previews, sitemap, and robots.txt are correct.
- Accessibility and Lighthouse checks pass.
- NDA review is complete for all published content.
- No secrets, AWS identifiers, or confidential material are in the public repository.
- Analytics remains intentionally disabled for v1.
- Preview deployments are cleaned up and not indexed.

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
- Pull-request previews will use `portfolio-preview.stevenclarke.dev` (per platform hostname scheme). Legacy references to `preview.stevenclarke.dev` should be updated to match the platform contract.
- Analytics is disabled for v1 because the hosted cost does not fit the budget.
- The headshot, resume PDF, email, LinkedIn, and GitHub links are available and should be reused across the site.
- Launch scope now includes four project pages: Iron Altar, Squat Monster, Media Inspector, and the Portfolio Website.
- Remaining project content: app-store links, videos, key technical decisions, verified screenshots, and architecture details where marked `TBD`.
- NDA case-study boundaries and the approval process are confirmed, but each case study still needs publication approval.
- Application responsibilities: provision S3/CloudFront/DNS records in CDK, read hosted zone ID/cert ARNs/deploy role ARNs from SSM, use `portfolio-deploy-preview`/`portfolio-deploy-prod` via OIDC, and keep region alignment with platform (`us-east-2` primary, `us-east-1` for CloudFront certs).

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
