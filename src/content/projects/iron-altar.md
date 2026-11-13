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
progressCompleted: 7
progressTotal: 8
lastUpdated: 2026-11-10
draft: false
---

## 1. Problem Statement

### Target user

The target user regularly does resistance training in the gym and cares about progressive overload and measurable progress tracking.

The design aesthetic should appeal to someone nostalgic for 1980s and 1990s video games; the intent is for the app to feel like a classic RPG on a vintage console.

The user likes data visualization to stay motivated and get a sense of progress over time.

### The problem

As a casual gym-goer interested in basic strength and hypertrophy, I use a plain text file to track my workouts. I wanted to see if I could build an alternative that is almost as simple to use as a text file but provides additional useful features.

The application must be pleasing to use and interact with and provide a sense of accomplishment and visible progress.

### Why it matters

Successful outcomes in the gym require objective tracking of a trainee's performance on their lifts over time. With the right data, it is possible to correctly set training targets for a given day and adjust the training program to ensure progress is being made.

### Constraints

- Must run on iOS, Android, or a web browser from one codebase.
- Local storage only v1: no accounts, no login
- No integrations requiring web connectivity
- Supports five main barbell lifts (squat, bench, deadlift, overhead press, power clean), weight × reps
- Vintage RPG pixel-art aesthetic
- Cost must be less than $5/month to host as part of my public portfolio demo applications
- App must be "self-hosted" in AWS, no paid SaaS platform

### Key Features

General

- App interaction should minimize the number of clicks a user has to make

Session Page

- Log lifts, record weight and reps and lift type for an arbitrary number of sets in any order
- Log sessions retroactively for past dates
- Editable - can adjust set numbers after logging

Session History

- View past sessions
- Weekly streak and decay behave correctly for live and retroactively dated workouts.
- History and per-lift progress charts reflect logged data accurately.
- The static web build is hosted at the production hostname and linked from the portfolio.

### Definition of Complete

For this project, “done enough to ship” means the hosted web URL as a portfolio demo application with basic usability and local browser data storage.

An App Store or Play Store release is hypothetical for now: the
developer licensing costs for Apple and Google are prohibitive for my current goals and budget,
unless the app could be monetized enough to justify them.

## 2. Approach

### Overview

Build a single Expo (React Native) + TypeScript codebase targeting iOS, Android, and web, with a local-first data layer and all training logic in pure domain modules.

Screens read and write through repositories so a future sync backend can slot in without touching the UI. Ship the web build first as a demo application for my portfolio, then archive mobile builds to give the option of publishing later.

### 2.a Technology choices

#### Interface and Persistence

| Choice                                             | Why this                                                                            | Alternatives considered                                       | Tradeoff                                                           |
| -------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------ |
| Expo (React Native) + TypeScript                   | One codebase for iOS, Android, and web; large ecosystem                             | Separate native apps, Flutter                                 | Not fully native; some web-specific quirks                         |
| Expo Router                                        | File-based routing with real URLs on web                                            | React Navigation alone                                        | Route structure constrains screen/layout organization              |
| Zustand + repository layer                         | Small, simple state; persistence kept out of components                             | Redux, Context-only                                           | Requires discipline to route all reads/writes through repositories |
| AsyncStorage with a single versioned JSON document | Portable on every target with no header or runtime config; ample for a personal log | expo-sqlite (web needs SharedArrayBuffer + COEP/COOP headers) | Whole-document writes; migrations are manual                       |
| Jest + React Native Testing Library (planned)      | Standard RN testing stack; Maestro later for e2e                                    | No automated tests                                            | Tests have been deferred, which is a risk                          |

#### Visual Design

| Choice                                 | Why this                                                     | Alternatives considered                            | Tradeoff                               |
| -------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------- | -------------------------------------- |
| react-native-svg + custom pixel charts | Works in Expo Go and on web; matches the pixel art aesthetic | Victory Native (needs Skia and a native dev build) | Chart primitives must be built by hand |
| Reanimated + expo-image                | Sprite animation and image handling                          | Plain Animated for everything                      | Web/native behavior can diverge        |
| Press Start 2P + strict palette        | Typographic pixel identity without custom logo assets        | Standard sans-serif                                | Readability at small sizes needs care  |

#### Hosting

| Choice                                       | Why this                                            | Alternatives considered      | Tradeoff                                        |
| -------------------------------------------- | --------------------------------------------------- | ---------------------------- | ----------------------------------------------- |
| AWS S3 + CloudFront + Route 53 + ACM via CDK | Managed static hosting inside the existing platform | Netlify, Vercel, EAS Hosting | Infrastructure work lands before launch         |
| EAS Build                                    | Managed native builds for iOS/Android               | Local Xcode/Gradle builds    | Dependency on EAS plan limits and build minutes |

#### Deployment

| Choice         | Why this                                                           | Alternatives considered       | Tradeoff                                                                   |
| -------------- | ------------------------------------------------------------------ | ----------------------------- | -------------------------------------------------------------------------- |
| AWS CDK        | Programmatic infrastructure as code targeted at my chosen platform | Terraform                     | Less fully featured plan functionality and state management but simpler    |
| GitHub Actions | Git flow driven CI/CD                                              | Locally triggered deployments | Fully featured enterprise like SDLC workflow, but more effort to implement |

### 2.b Development Methodology

#### Agent Harness

I chose to use OpenCode as my agent harness due to the wide range of models available under a single billing plan. I did much of the development work using a free beta model provided by OpenCode called "Big Pickle" although I did experiment with a few paid models like DeepSeek and Claude.

#### Spec Driven Development

My attitude towards a spec driven workflow as I began this project was that I should behave like a technical product owner and that the my AI agents are my software developers. I would be reviewing code but not really writing code at all.

Starting from an english language spec, I asked my Big Pickle agent to generate a plan.md from the spec and include a section of clarifying questions I could answer inline. The result was surprisingly comprehensive, including planned phases for how the work should be executed and technology options for me to decide between and approve.

I kept my projects in separate repositories to approximate an enterprise-like distributed code base with clear separation of concerns, and with some hope that this might limit my token consumption by not exposing too much context to my agent in any given session.

#### Development Iterations

Once I had answered the clarifying questions and selected/approved technology choices I began the iteration loop by creating a git repository in my personal GitHub account and connecting it to my local repository containing the spec and the plan.

I asked the agent to start development on the first phase, and at each point it would stop, I would review the code locally and then prompt the agent to make a commit and continue developing.

Eventually it became evident that I was not really able to effectively review the code it was producing and as I began to realize that the agent could easily interact with tools in the terminal, I installed `gh` and logged in to allow the agent to interact with GitHub directly.

This forced me to define and document branch conventions and development standards so that I could have the agent create branches tied to the plan phases and submit pull requests to GitHub for my review.

Then I was able to review diffs in the GitHub interface and this process began to feel much more like my previous job acting as a technical lead with a team of developers implementing against JIRA tickets.

#### Feature Refinement

To refine my feature set, I would initally deploy the app locally and interact with it much like a product owner or beta user. When I found something to change, I would prompt the agent to add feature refinements to the plan and triage them into the appropriate phase.

The plan acted the living source of truth for where the project was was done and remained to be done. At some point I added checkbox style tracking to all the plan action items which the agent was to keep updated as development work progressed, as it made it much easier for me to return to the project and have a good sense of where we were at.

#### Platform Dependencies

Fairly early on I realized that I would benefit from some kind of platform layer to be able to host this and other demo applications for my portfolio, as well as the portfolio website itself.

I decided to use a pattern I have seen in a number of enterprise dev ops organization and create a separate `stevenclarke-infrastructure` repository. This would be responsible for the DNS configuration, GitHub OIDC configuration, operational AWS roles, and any other platform-global resources not specific to a particular tenant application domain.

This application would be responsible for its own infrastructure (S3, Cloudfront, etc) and would use SSM to share configuration values between the two

#### CI/CD

As soon as the application ships, I no longer wanted to ever trigger a deployment locally. I wanted deployments to be tied to pull requests and branch merges, with all the logging and audit-ability for me to clearly understand what is deployed where.

I chose to use GitHub actions to support my CI/CD needs with a "merge to preview" and "merge to main" workflow in which a merge to either of the protected branches `preview` or `main` would trigger an action to deploy to the corresponding environment with a manual approval gate for me to click to approve the deployment.

I ended up not really liking this workflow completely, as I didn't like having to create multiple pull requests to get to production and manage the relationship between preview and main. This also wouldn't scale very well for multiple developers or agents working in parallel on unrelated features.

I settled on a workflow where my preview deployments can be manually triggered against a provided branch, and production deployments trigger on merge to main.

Eventually I would like to experiment with using immutable GitHub releases to drive deployments and potentially implement "feature branch environments" to be able to deploy many sandboxed in-progress environments simultaneously.

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

### What I would do differently

### Lessons learned
