---
title: Iron Altar
summary: 'A strength-training tracker reimagined as an 8-bit pixel-art RPG. Log real lifts, earn XP for working sets, and grow a Tamagotchi-style avatar from skinny to mighty — one codebase for iOS, Android, and web.'
role: Product Owner, Designer, Developer
timeline: Oct 2026 – present
status: in-progress
statusNote: In progress — P7 Hosting & ship (phase 8 of 8). P0–P6.2 are complete
tag: Strength training
featured: true
order: 1
technologies:
  - Expo (React Native)
  - TypeScript
  - Expo Router
  - Zustand
  - AsyncStorage
  - react-native-svg
  - Reanimated
  - expo-image
  - AWS CDK
  - EAS Build
sourceUrl: https://github.com/steventclarke/iron-altar
demoNote: Live web demo ships with Phase 7 — iron-altar.stevenclarke.dev (P7.1).
architectureUrl: https://github.com/steventclarke/iron-altar/blob/main/plan.md
architectureLabel: Iron Altar build plan
architectureNote: Sections 2–3 of the build plan cover the architecture and data model. Screenshots and a short demo video will be added once the web build is hosted.
progress:
  completed: 7
  total: 8
lastUpdated: 2026-11-10
draft: false
---

## 1. Problem Statement

### Target user

The target user cares about progressive overload and measurable progress in the gym for strength
and/or bodybuilding. The design appeal is aimed at someone nostalgic for 1980s and 1990s video
games; the intent is for the app to feel like it is running on a Game Boy or a vintage console.
Ideally it should be as easy — or easier — to use than a plain text notes file, because that is what
it is competing with for me as a user. The user also likes data visualization to stay motivated and
get a sense of progress over time, and the gamification is meant to evoke an old-school RPG, a genre
that plays very effectively on the human desire for progression and achievement.

To be completely honest, I chose to build this application to give myself a project with no external
integrations, nicely compartmentalized, so I could figure out how to use agentic AI spec-driven
development on something tangible and connected to my own interests — more than out of a driving
need to solve this particular problem. Fitness trackers are a dime a dozen, but it is a simple
problem domain with enough UX design complexity to be interesting and challenging.

### The problem

Today I mostly use a plain text file to track my workouts, partly because I find existing tracker
apps overly complex and feature-rich, and modern design trends do not always appeal to me. I wanted
something that makes me feel happy and nostalgic when I open it, is very simple to use, but still
takes advantage of structured data to provide visualizations and historical data. Logging a set
should take seconds, work offline, and give something back — on iOS, Android, and a real web browser
from one codebase.

### Why it matters

Consistency is the hard part of strength progress. If logging is tedious, people skip it; if nothing
rewards the behavior, the history never accumulates. A tool that is quick to use and visibly responds
to training can make the habit stick.

This is also a problem domain I understand well, and the lack of external integrations makes it a
pure design and implementation challenge. That makes it a good starting point for getting up to speed
with modern AI spec-driven development and for improving my front-end design thinking, so I can be a
stronger full-stack contributor.

### Constraints

- Must run on iOS, Android, and a real web browser from one codebase.
- Offline-only v1: no accounts, no login, local-first data.
- Architecture must keep an auth/sync seam so federated login and cloud sync can be added later.
- v1 scope: five main lifts (squat, bench, deadlift, overhead press, power clean), weight × reps,
  warmup flag, rest timer, body-weight entry, history, charts, and gamification.
- Out of v1: supersets, dropsets, timed holds, plate calculator, sound, additional characters.
- Pixel-art aesthetic with placeholder sprites and a documented sprite-sheet format.
- Built solo at roughly 10 hours/week against an end-of-November 2026 MVP target.
- Budget: Apple and Google developer licensing costs are prohibitive for now, so a store release
  remains hypothetical unless the app can be monetized enough to justify the cost.

### Success criteria

- A full workout can be logged on all three platforms without an account or a network connection.
- XP is awarded only for working sets, and the avatar advances through 10 stages over 0–1000 XP.
- Weekly streak and decay behave correctly for live and retroactively dated workouts.
- History and per-lift progress charts reflect logged data accurately.
- The static web build is hosted at the production hostname and linked from the portfolio.

For this project, “done enough to ship” means the hosted web URL with basic usability and local
browser data storage. An actual App Store or Play Store release is hypothetical for now: the
developer licensing costs for Apple and Google are prohibitive for my current goals and budget,
unless the app could be monetized enough to justify them.

## 2. Approach

### Overview

Build a single Expo (React Native) + TypeScript codebase targeting iOS, Android, and web, with a
local-first data layer and all training logic in pure domain modules. Screens read and write through
repositories so a future sync backend can slot in without touching the UI. Ship the web build first
as public evidence, then archive mobile builds and publish later.

### 2.a Technology choices

| Choice                                             | Why this                                                                            | Alternatives considered                                       | Tradeoff                                                           |
| -------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------ |
| Expo (React Native) + TypeScript                   | One codebase for iOS, Android, and web; large ecosystem                             | Separate native apps, Flutter                                 | Not fully native; some web-specific quirks                         |
| Expo Router                                        | File-based routing with real URLs on web                                            | React Navigation alone                                        | Route structure constrains screen/layout organization              |
| Zustand + repository layer                         | Small, simple state; persistence kept out of components                             | Redux, Context-only                                           | Requires discipline to route all reads/writes through repositories |
| AsyncStorage with a single versioned JSON document | Portable on every target with no header or runtime config; ample for a personal log | expo-sqlite (web needs SharedArrayBuffer + COEP/COOP headers) | Whole-document writes; migrations are manual                       |
| react-native-svg + custom pixel charts             | Works in Expo Go and on web; matches the pixel aesthetic exactly                    | Victory Native (needs Skia and a native dev build)            | Chart primitives must be built by hand                             |
| Reanimated + expo-image                            | Sprite animation and image handling                                                 | Plain Animated for everything                                 | Web/native behavior can diverge                                    |
| Press Start 2P + strict palette                    | Typographic pixel identity without custom logo assets                               | Standard sans-serif                                           | Readability at small sizes needs care                              |
| AWS S3 + CloudFront + Route 53 + ACM via CDK       | Managed static hosting inside the existing platform                                 | Netlify, Vercel, EAS Hosting                                  | Infrastructure work lands before launch                            |
| EAS Build                                          | Managed native builds for iOS/Android                                               | Local Xcode/Gradle builds                                     | Dependency on EAS plan limits and build minutes                    |
| Jest + React Native Testing Library (planned)      | Standard RN testing stack; Maestro later for e2e                                    | No automated tests                                            | Tests have been deferred, which is a risk                          |

The choice I am most confident defending is Expo (React Native) + TypeScript. It gives a lot of
future flexibility for minimal scope expansion, and managing scope well is one of the most crucial
skills for making sure a team or organization spends its energy and resources on the right things.

### 2.b Development workflow

Plan-first, phase-driven development. `plan.md` is the source of truth: resolved decisions,
architecture, data model, phased milestones (P0, P1, P1.1, …), and a triaged refinement backlog
folded into phases. Each phase is a small vertical slice that keeps the app runnable. Lint, format,
and typecheck are the local gates; the web export is the build check. CI/CD and hosting land in P7
rather than at the start.

This was my first project using a spec- and plan-oriented workflow with an AI agent. I used OpenCode
with the free experimental agent “Big Pickle” because it was free and, from what I could see, quite
good at acting as the developer and technical subject-matter expert while I took on the technical
product-owner role. The loop started with a plain-English `spec.md` describing what I wanted to
build, some of the UX, and some constraints. I asked the agent to create `plan.md` with a
clarifying-questions section I could fill in to resolve ambiguities. After that, I would prompt the
agent to proceed with the current phase and update `plan.md` to record what it completed in each
commit.

I was surprised and pleased that the agent interacted with git with little to no prompting, which
got me thinking about tooling integration. Early on I was just driving forward, having the agent
commit to `main` and reviewing the code in my IDE. Partway through, as I worked on other projects
and discovered better workflows, I standardized on branch conventions: the agent creates a branch
per phase, pushes it to GitHub, and opens a pull request. I leave review comments, and the agent
cycles through them. That was a game changer for quality control — it lets me review work in
digestible chunks and catch subtle errors as they arise.

For design iteration I would deploy the app locally and interact with it much like a product owner
or beta user. When I found something to change, I would prompt the agent to add feature refinements
to the plan, triage them into the appropriate phase, and tackle them when that phase came up. The
plan stayed the living source of truth for where the project was and what remained.

While working on the portfolio and `stevenclarke-infrastructure` projects, I landed on a reasonable
CI/CD approach and replicated it here: any branch can be manually deployed to a preview environment,
and production deploys from `main` after a manual approval gate. That approximates an
enterprise-grade environment scheme and lets me test and review the UI on the web while keeping
production carefully controlled. GitHub Actions with OIDC makes it work.

Working on multiple projects simultaneously with multiple agents surfaced slight differences in how
each `plan.md` evolved. By pointing one project’s agent at another and asking it to adopt practices
from it, I organically converged on a process that works across all my projects. Standardizing up
front might have been more efficient, but the flexible approach let me work on many things at once
while learning and improving the process as I went.

## 3. Development Plan

| #    | Phase                  | Scope                                                                                                                                       | Done when                                             | Status      |
| ---- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ----------- |
| P0   | Scaffold               | Expo + TS init, Expo Router, lint/format, theme tokens, pixel font, skeleton routes                                                         | Runs on iOS, Android, and web                         | Complete    |
| P1   | Data                   | Versioned JSON document, migrations, repositories, seed exercises, sync seam, unit conversion, draft session                                | Data layer is usable and persisted                    | Complete    |
| P1.1 | Session entry date     | Performed-date model, optional live timestamps, DB v2 migration                                                                             | Retroactive dates are representable                   | Complete    |
| P2   | Profile + avatar       | Character registry, sprite-sheet loader, stage calculation, profile screen                                                                  | Avatar renders and responds to XP                     | Complete    |
| P3   | Session log            | Exercise picker, set entry, rest timer, resume, retroactive date control, duplicate set                                                     | A workout can be logged end to end                    | Complete    |
| P3.1 | Session refinements    | Configurable/persisted timer, navigation, unit-aware tonnage, grouped sets, edit reps, + glyph                                              | Session screen holds up to real use                   | Complete    |
| P4   | History                | List and detail views, retroactively dated sessions                                                                                         | Past sessions are browsable                           | Complete    |
| P5   | Data viz               | Custom SVG pixel charts, per-lift and body-weight screens, manual entry                                                                     | Progress is visible per lift and body weight          | Complete    |
| P5.1 | Demo consistency       | Locked top navigation, active-tab highlight, arrow glyph fix                                                                                | Navigation is consistent on every screen              | Complete    |
| P6   | Gamification           | Weekly streak and XP decay, trend indicator, XP-to-next-stage bar, set/workout animations                                                   | Training visibly changes the avatar                   | Complete    |
| P6.1 | Session/XP refinements | Dedicated rest-timer screen, two-digit reps field, XP = 1 per working set, DB v5 rebuild                                                    | XP rewards the intended behavior                      | Complete    |
| P6.2 | IA and stats           | Lean Session page, remove “Log Past Workout”, editable body weight, week-gated decay                                                        | Session and Profile have clear, non-duplicated roles  | Complete    |
| P7   | Hosting & ship         | P7.1 CDK web hosting + GitHub Actions; P7.2 EAS mobile artifacts to S3; P7.3 polish, accessibility, privacy/support, store metadata, import | Public web URL is live; mobile artifacts are archived | In progress |

### Next: P7 Hosting & ship

- **P7.1** — infra/ CDK app for preview/prod S3 + CloudFront, SPA fallback, headers, Route 53 alias
  records, and GitHub Actions deploys.
- **P7.2** — EAS production builds archived with metadata and checksums in a versioned S3 bucket.
- **P7.3** — Responsive web, accessibility, empty states, privacy/support pages, store metadata, and
  text-file import (post-MVP candidate).

## 4. Challenges and Takeaways

### Choosing a storage layer that had to work on the web

**Context:** expo-sqlite on web requires SharedArrayBuffer plus COEP/COOP headers on every host,
which put the “must run in a browser” constraint at risk.

**What I tried:** Evaluated SQLite for its query power and migration story before committing.

**Resolution / tradeoff:** Used a single versioned JSON document in AsyncStorage behind a repository
seam. It is portable everywhere with no runtime or header configuration, at the cost of
whole-document writes and manual migrations.

**Takeaway:** Let the hardest platform constraint drive the storage decision, then isolate it so it
can be replaced later.

### Charting that fit the pixel aesthetic

**Context:** The charts needed to look native to the 8-bit visual language, not like a generic chart
library.

**What I tried:** Victory Native was the obvious choice until its current versions required Skia and
a native development build.

**Resolution / tradeoff:** Built PixelLineChart and PixelBarChart on react-native-svg, which works
in Expo Go and on web. More code, but exact control over the look and no extra native dependency.

**Takeaway:** A strong aesthetic requirement can simplify the dependency graph.

### Making XP reward the right behavior

**Context:** The first XP model used total tonnage, which rewarded heavy sets more than consistent
training.

**What I tried:** Kept tonnage as a display metric while questioning what the avatar should actually
respond to.

**Resolution / tradeoff:** Switched to one XP per working set, independent of weight or reps, and
rebuilt stored totals with a DB v5 migration. Warmups are excluded.

**Takeaway:** Game mechanics should reward the behavior you want to encourage, not the easiest number
to compute.

### Retroactive workouts touched more than the session screen

**Context:** Users needed to log a workout for a past date, but the original model assumed live
sessions with start/end timestamps.

**What I tried:** Added a user-chosen performed date, made timestamps optional, and threaded the
change through drafts, repositories, history, and gamification.

**Resolution / tradeoff:** Five database versions later, streak and decay compute from performed
dates. The change was correct but rippled through the data model.

**Takeaway:** Model time explicitly and early; a user-chosen calendar date is not the same thing as a
timestamp.

### Session and Profile were doing the same job

**Context:** The Gym and Profile pages both showed the avatar and training summary, which made the
first screen noisy.

**What I tried:** Reworked the information architecture after the features existed rather than
guessing up front.

**Resolution / tradeoff:** The landing page became a lean Session screen with Start/Resume only;
Profile owns the avatar and stats. “Log Past Workout” was removed in favor of the session date
selector.

**Takeaway:** It is fine to revisit IA once you can actually use the product — just keep the change
small and deliberate.

### Designing UX without a design background

**Context:** I have traditionally been a very backend-focused engineer, and I do not have a strong
design sense or an inner eye for imagining designs before trying them.

**What I tried:** Built screens iteratively, using intuition to spot a “design smell” and then
reworking the layout or interaction until it felt right.

**Resolution / tradeoff:** The result is simpler and more usable than my first attempts, but it took
more trial and error than a designer would need. It also gave me much more respect for UX designers
and visual-design creatives — there are a lot of subtle choices whose effect on the user experience
is not obvious.

**Takeaway:** I went into this thinking “how hard can it be” and came out wanting to pursue formal
design training, to have at least some framework for approaching visual and UX problems even though
design is not my main focus.

### Key tradeoffs

| Decision                               | What it bought                                  | What it cost                                      |
| -------------------------------------- | ----------------------------------------------- | ------------------------------------------------- |
| One cross-platform codebase            | Reach on iOS, Android, and web                  | Some web-specific behavior and platform testing   |
| JSON document over SQLite              | Portability and zero runtime config             | Whole-document writes and hand-written migrations |
| Custom SVG charts over a chart library | Exact pixel aesthetic and Expo Go compatibility | More chart code to build and maintain             |
| Local-first, no accounts               | Simplicity, privacy, and offline use            | No sync or multi-device story in v1               |
| Deferring CI, tests, and hosting       | Faster early feature velocity                   | Later hardening and a delayed public URL          |
| Placeholder pixel art                  | Focus on mechanics and data model               | Visual polish still pending                       |

### What I would do differently

- Build out the support infrastructure as soon as the tech stack was decided, before doing much
  implementation. It was more fun to keep working on the app, but doing the infrastructure first
  would have fed those lessons into the plan for my tenant apps and avoided churn and wasted time
  getting things back in sync.
- Put CI/CD and my preferred development workflow in place sooner. Working on the infrastructure
  project forced me to figure those out; having them earlier would have let me automate a larger
  share of this app’s development.
- Adopt the agent-driven branch/PR review process from the start. I have less experience with
  front-end implementation than back-end, so more granular checkpoints and detailed review would
  have helped me learn more from this app. I did not find a good process for that until it was
  already well along.

### Lessons learned

- Constrain the platform first, then choose tools that fit inside the constraint.
- Keep pure domain logic separate from storage and UI; it made the schema changes survivable.
- Plan phases as vertical slices so the app stays runnable and demoable.
- Reward the behavior, not the proxy metric.
- Technical-leaning engineers should have respect for, and some familiarity with, user-experience
  design. UX design is a whole discipline unto itself and should be treated with respect, because it
  has a huge impact on the final product.
