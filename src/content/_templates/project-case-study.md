---
# Working draft for a project case study.
# Copy this file to src/content/projects/<slug>.md; the frontmatter is validated
# by src/content.config.ts and drives the shared ProjectLayout (title, metadata,
# status panel, progress bar, evidence cards). The Markdown body is the narrative.
title: TBD
summary: TBD
role: TBD
timeline: TBD
status: 'in-progress' # live | in-progress | archived | case-study
statusNote: TBD
tag: TBD
featured: false
order: 0
technologies: []
# sourceUrl: https://github.com/...
# demoUrl: https://...
# demoNote: Demo ships with Phase X (hostname or current status).
# architectureUrl: https://...
# architectureLabel: Architecture notes
# architectureNote: TBD
# coverImage: /images/...
gallery: []
confidential: false
draft: true
progressCompleted: 0
progressTotal: 1
# Obsidian's Templates plugin replaces {{date}}; replace it manually when copying.
lastUpdated: '{{date}}'
---

## 1. Problem Statement

### Target user

TBD — Who has this problem? Be specific enough that a recruiter can picture them.

### The problem

TBD — What is broken, missing, or harder than it should be today?

### Why it matters

TBD — What is the cost of leaving it unsolved? (Time, money, quality, risk, frustration.)

### Constraints

- TBD — Time and scope
- TBD — Budget or infrastructure limits
- TBD — NDA / confidentiality boundaries
- TBD — Platform, team, or technology constraints

### Success criteria

- [ ] TBD — A measurable or observable outcome
- [ ] TBD — A qualitative outcome when metrics are not available
- [ ] TBD — What "done enough to ship" means

---

## 2. Approach

### Overview

TBD — Two or three sentences describing the strategy and why you chose it.

### 2.a Technology choices

| Choice | Why this | Alternatives considered | Tradeoff |
| ------ | -------- | ----------------------- | -------- |
| TBD    | TBD      | TBD                     | TBD      |
| TBD    | TBD      | TBD                     | TBD      |

> Guidance: prefer decisions you can defend in an interview. Note what you did
> not choose and why, not just what you did.

### 2.b Development workflow

TBD — How did you plan, build, test, and ship?

- **Planning:** TBD — How requirements were clarified and broken down.
- **Iteration:** TBD — Cadence, milestones, feedback loops.
- **Testing:** TBD — Automated tests, manual checks, quality gates.
- **CI/CD:** TBD — Build, preview, and deploy pipeline.
- **Observability:** TBD — Logging, monitoring, or validation.

---

## 3. Development Plan

> Guidance: this is the source of truth for progress. Keep the table and the
> `progressCompleted`/`progressTotal` frontmatter in sync and use the same phase names.

| #   | Phase                      | Scope | Done when | Status      |
| --- | -------------------------- | ----- | --------- | ----------- |
| 1   | Discovery and requirements | TBD   | TBD       | Not started |
| 2   | Design and architecture    | TBD   | TBD       | Not started |
| 3   | Build and integrate        | TBD   | TBD       | Not started |
| 4   | Test, harden, and ship     | TBD   | TBD       | Not started |

### Phase detail

#### Phase 1 — Discovery and requirements

- [ ] TBD
- [ ] TBD

#### Phase 2 — Design and architecture

- [ ] TBD
- [ ] TBD

#### Phase 3 — Build and integrate

- [ ] TBD
- [ ] TBD

#### Phase 4 — Test, harden, and ship

- [ ] TBD
- [ ] TBD

---

## 4. Challenges and Takeaways

### Challenge: TBD

- **Context:** TBD
- **What I tried:** TBD
- **Resolution / tradeoff:** TBD
- **Takeaway:** TBD

### Challenge: TBD

- **Context:** TBD
- **What I tried:** TBD
- **Resolution / tradeoff:** TBD
- **Takeaway:** TBD

### Key tradeoffs

| Decision | What it bought | What it cost |
| -------- | -------------- | ------------ |
| TBD      | TBD            | TBD          |

### What I would do differently

- TBD

### Lessons learned

- TBD

> Evidence (source, demo, architecture notes) is rendered by `ProjectLayout`
> from the frontmatter. Do not repeat it in the body. Keep NDA material out
> unless it has been reviewed and approved.
