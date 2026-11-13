# Editing content in Obsidian

Case studies live in `src/content/projects/` and the non-project site pages live in
`src/content/pages/`; both are authored as standard Markdown with typed frontmatter.
Obsidian is the recommended local editor: it is local-first, uses plain files, and exposes
frontmatter as Properties without locking content into a proprietary format.

## Vault location

Open **`src/content`** as the Obsidian vault — not the repository root.

```
src/content/
├── projects/              # case studies (Astro content collection)
├── pages/                 # non-project page content (Astro content collection)
├── _templates/            # Obsidian Templates plugin folder
│   ├── page.md
│   └── project-case-study.md
├── _dashboards/           # optional, not part of the Astro build
├── _attachments/          # local paste target (gitignored)
└── .obsidian/             # local vault settings (gitignored)
```

Opening `src/content` keeps `node_modules`, build output, and infrastructure files out of
Obsidian's index. `src/content/projects/` and `src/content/pages/` are the source of truth
for the site; the templates and dashboards folders are authoring aids and are not rendered.

## First-time setup

1. Open Obsidian → **Open folder as vault** → select `src/content`.
2. Trust the vault. No community plugins are installed by default.
3. Confirm **Settings → Files and links**:
   - Default location for new notes: **In the folder specified below** → `projects`
   - Default location for new attachments: **In the folder specified below** →
     `_attachments`
   - New link format: **Relative path to file**
   - Use `[[Wikilinks]]`: **off** (the site uses Markdown links)
   - Automatically update internal links: **on**
   - Deleted files: **Move to system trash**
4. Confirm **Settings → Editor**:
   - Default view: **Editing view** with Live Preview
   - Properties in document: **Visible**
   - Readable line length: **on**
   - Spellcheck: **on**
   - Indent using tabs: **off**; tab size **2**
   - Fold heading / fold indent: **on**
5. Confirm **Settings → Appearance**:
   - Base font size: **16**
   - Theme: **Adapt to system**
6. Confirm **Settings → Core plugins**:
   - Enable: Files, Search, Quick switcher, Backlinks, Outgoing links, Tags, Properties,
     Page preview, Templates, Note composer, Command palette, Slash commands, Editor
     status, Bookmarks, Outline, Word count, Workspaces, File recovery, Bases.
   - Disable: Graph view, Canvas, Daily notes, Random note, Slides, Audio recorder,
     Markdown importer, ZK prefixer, Publish, Sync, Web viewer, Footnotes.
7. Confirm **Settings → Templates**:
   - Template folder: `_templates`
   - Date format: `YYYY-MM-DD`
   - Time format: `HH:mm`

A local `src/content/.obsidian/` configuration with these defaults is created on the
authoring workstation. It is gitignored, so it is not shared through the repository.

## Create a new case study

1. Create a new note. New notes default to `src/content/projects/`; name it with the URL
   slug, for example `my-project.md`.
2. Run **Templates: Insert template** from the command palette and choose
   `project-case-study`.
3. Fill the frontmatter with the Properties panel:
   - `title`, `summary`, `role`, `timeline`, `status`, `statusNote`, `tag`
   - `featured`, `order`, `technologies`
   - `confidential: true` for NDA material; do not commit until the case study is approved
   - Keep `draft: true` until the content is ready for the site
   - `progressCompleted` / `progressTotal` (flattened fields, not a nested `progress` object)
   - `lastUpdated` — Obsidian's Templates plugin replaces `{{date}}`; replace it manually
     if you copy the template outside Obsidian
4. Replace the placeholder body sections. Use standard Markdown headings, paragraphs,
   lists, blockquotes, fenced code blocks, and GitHub-style tables.
5. Preview drafts locally:

   ```bash
   PUBLIC_SHOW_DRAFTS=true npm run dev
   ```

   Draft case studies render with a draft badge. Without the variable, draft entries are
   excluded from the build.
6. When ready, set `draft: false`, finalize `status` and `statusNote`, run the quality
   gates, and commit the content.

## Edit a site page

The non-project routes load a page entry by filename:

| Route | Content file |
| --- | --- |
| `/` | `src/content/pages/home.md` |
| `/about` | `src/content/pages/about.md` |
| `/contact` | `src/content/pages/contact.md` |
| `/projects` | `src/content/pages/projects.md` |
| `/404` | `src/content/pages/404.md` |

1. Open the page file in Obsidian.
2. Edit the hero fields (`eyebrow`, `heading`, `intro`, `image`, `ctas`) through
   Properties or source mode.
3. Edit repeating content in source mode. `sections` holds section headings, prose, lists,
   cards, and section-level CTAs; `contacts` drives the contact cards.
4. Optionally add Markdown below the frontmatter. It renders after the structured sections
   and is useful for free-form prose that does not fit the section model.
5. Run the quality gates and commit. Page entries are always built — unlike project case
   studies, they do not use `draft`.

Adding a brand-new page requires two steps: create `src/content/pages/<id>.md` from
`_templates/page.md`, then add an Astro route under `src/pages/` that calls
`getPage('<id>')`. A content file alone does not create a route.

## Project frontmatter fields

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | Page and card title |
| `summary` | yes | Short card and meta description |
| `role` | yes | Your role on the project |
| `timeline` | yes | Human-readable dates, e.g. `2025` or `Jan–Mar 2025` |
| `status` | yes | `live`, `in-progress`, `archived`, or `case-study` |
| `statusNote` | yes | One-line explanation shown in the status panel |
| `tag` | yes | Short category label |
| `featured` | no | Defaults to `false` |
| `order` | no | Lower numbers appear first |
| `technologies` | no | Array of strings |
| `sourceUrl` | no | Only set when a real repository URL exists |
| `demoUrl` | no | Only set when a real demo URL exists |
| `demoNote` | no | Supporting text when the demo is pending or gated |
| `architectureUrl` | no | Only set when a real architecture document exists |
| `architectureLabel` | no | Link label for the architecture document |
| `architectureNote` | no | Supporting text for the evidence card |
| `coverImage` | no | Path under `public/`, e.g. `/images/my-project/cover.png` |
| `gallery` | no | Array of image paths under `public/` |
| `confidential` | no | Defaults to `false`; NDA content must not be committed until approved |
| `draft` | no | Defaults to `false`; drafts only build with `PUBLIC_SHOW_DRAFTS=true` |
| `progressCompleted` | no | Completed units for the progress bar |
| `progressTotal` | no | Total units; set both to render the bar |
| `lastUpdated` | no | `YYYY-MM-DD`; rendered as the update date |

Optional URL fields should be omitted or commented out until they resolve to a real
destination. Do not use `#` placeholders.

## Page frontmatter fields

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | Browser title |
| `description` | yes | Meta description |
| `noindex` | no | Defaults to `false`; set `true` for error or private pages |
| `eyebrow` | no | Small label above the hero heading |
| `heading` | yes | Hero heading |
| `intro` | no | Array of hero paragraphs |
| `image` | no | Path under `public/`, e.g. `/images/headshot.jpg` |
| `imageAlt` | no | Alt text for the hero image |
| `imageWidth` / `imageHeight` | no | Intrinsic image dimensions; default to `750` |
| `ctas` | no | Array of `{ label, href, variant }`; `variant` is `primary` or `secondary` |
| `sections` | no | Array of sections with `id`, `heading`, `intro`, `body`, `items`, `cards`, `ctas`, `linkLabel`, and `linkHref` |
| `contacts` | no | Array of `{ label, value, href, wide }` contact cards |

`sections[].cards` entries use `eyebrow`, `title`, `body`, `href`, `linkLabel`, and an
optional `links` array of `{ label, href }` secondary links.

The Home, About, and Projects routes bind sections by `id` (`projects`, `strengths`,
`bring`, `location`) with an index fallback. Keep those ids when reordering sections.

## Content guardrails

- Use standard Markdown in `projects/*.md` and `pages/*.md`. The Astro build does not
  render `[[wikilinks]]`, Obsidian callouts (`> [!note]`), `![[embeds]]`, Dataview queries,
  or Mermaid diagrams.
- Fenced code blocks, blockquotes, tables, bold/italic, and lists are supported.
- Put final images in `public/images/...` and reference them with `/images/...`.
  Attachments pasted into Obsidian go to `_attachments/` locally (gitignored); move final
  assets to `public/images/` before committing.
- Keep `src/content.config.ts`, the page components/layouts, and the templates in sync when
  adding or changing frontmatter fields.
- Very long frontmatter values and nested arrays such as `sections`, `cards`, and `contacts`
  are easier to edit in source mode. Obsidian Properties handles the scalar fields and
  simple string lists.

## Recommended plugins

- **Optional — Advanced Tables** (community): table editing and alignment. Install from
  **Settings → Community plugins → Browse → Advanced Tables**. It is not required, and no
  community plugins are installed by default.
- **Optional — Dataview** (community): dashboard queries. Keep Dataview queries in
  `_dashboards/`, never in `projects/*.md`, because they do not render on the site.
- **Avoid** — Templater, Linter, and Obsidian Git are unnecessary for this workflow.
  Obsidian Git is especially unnecessary because content changes go through Git branches
  and pull requests like code.

## Optional dashboard

Create `src/content/_dashboards/projects.md` for a local index. It is outside
`projects/`, so Astro ignores it. A plain list works without plugins:

```md
# Projects

- [Iron Altar](../projects/iron-altar.md)
```

If Dataview is installed:

````md
```dataview
TABLE status, draft, lastUpdated
FROM "projects"
SORT order ASC
```
````

## Git and multi-machine notes

- `src/content/.obsidian/`, `src/content/.trash/`, and `src/content/_attachments/` are
  gitignored. The configuration described here is local; repeat the settings on another
  machine or version your own Obsidian setup separately.
- Do not commit `.obsidian/` unless the team decides to share a common vault config.
- NDA content must not be committed to this public repository until approved.

## Verification

Run the normal quality gates before committing:

```bash
npm run format
npm run lint
npm run typecheck
npm run build
npm run links
```

The production build should show the expected static routes (currently 9, plus any draft
routes when `PUBLIC_SHOW_DRAFTS=true`). Check `/projects/<slug>` for headings, tables,
links, the status panel, and the progress bar.

## Troubleshooting

- **Invalid content entry / date errors**: `lastUpdated` must be `YYYY-MM-DD`; other fields
  must match the types in `src/content.config.ts`.
- **Optional link is empty**: comment out or remove the property. An empty string is not a
  valid URL.
- **Progress bar is missing**: set both `progressCompleted` and `progressTotal`.
- **Nested `progress:` does not work**: the schema uses flattened fields.
- **Draft is not showing**: set `PUBLIC_SHOW_DRAFTS=true` and restart the dev server.
- **Page route is missing after adding a page**: a content file does not create a route.
  Add an Astro page that calls `getPage('<id>')`.
- **Page edit is not visible**: confirm the filename matches the id loaded by the route
  (`home`, `about`, `contact`, `projects`, `404`) and restart the dev server.
- **Nested page sections are hard to edit in Properties**: use source mode for `sections`,
  `cards`, and `contacts` arrays.
- **Wikilinks appear literally on the site**: use Markdown links instead.
- **Obsidian is slow or indexes dependencies**: open `src/content`, not the repository
  root.
