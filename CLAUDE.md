# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Static Jekyll website for [sprinters.sh](https://sprinters.sh) — a GitHub App that runs GitHub Actions jobs on ephemeral AWS EC2 instances inside the user's own VPC.

## Running locally

The site runs inside a pre-built Docker image named `jekyll`. Build it once from the `Dockerfile`, then use docker-compose to serve:

```bash
docker build -t jekyll .
docker-compose up
```

Site is then available at `http://localhost:4000`. Jekyll watches for file changes and reloads automatically (`--watch --force_polling`). There is no Gemfile — all Ruby/Jekyll dependencies are baked into the Docker image.

## Site architecture

Pages use two layouts defined in `_layouts/`:
- `default` — standard marketing pages (index, pricing, new, etc.)
- `docs` — documentation pages under `docs/`, adds a sidebar nav driven by `_data/docs.yml`

**Key conventions:**

- **Headings in docs use `_includes/h2.html`, `h3.html`, etc.** — never raw Markdown `##`. These include an `id=` anchor and click-to-copy behavior wired up in `assets/sprinters.js`.
- **Changelog** (`/new`) is driven entirely by `_data/new.yml` — add entries there, newest first.
- **Docs nav order** is controlled by `_data/docs.yml` — add new doc pages there to appear in sidebar.
- **Instance pricing tables** are built from `_includes/instance-price.html` + `_includes/instance-price-region.html`, which compute per-region min/max prices in Liquid and render a color-coded table.
- Bootstrap 5.3.3 (dark theme) + Bootstrap Icons 1.13.1 are vendored under `assets/`.
- `assets/sprinters.js` handles: copy-to-clipboard buttons on code blocks, newsletter form submission (Mailchimp JSONP), Bootstrap tooltip init.

## Content structure

- `docs/label.md` — the `runs-on:` label syntax reference; the most complex doc page
- `docs/instances.md` — full EC2 instance type table
- `pricing.html` — pricing page with instance price tabs using `_includes/instance-price.html`
- `index.html` — homepage (large, self-contained)
- `new.html` — "What's new?" page; renders `_data/new.yml`

## Adding new EC2 instance types

The total instance count is hardcoded in four places and must be kept in sync: `docs/instances.md`, `docs/label.md`, `index.html`, and `pricing.html`.

For each new instance family, touch:
1. **`docs/instances.md`** — add a row to the correct table (Intel / AMD / arm64), using `<nobr>family <span class="badge badge-super rounded-pill text-bg-primary">New</span></nobr>` in the Family cell. Also add the family name to either the EBS-only or Ephemeral NVMe prose list in the Storage section. Validate the family's actual available sizes against the official AWS EC2 instance types docs — don't assume they match a same-letter prior generation (e.g. `t8i` tops out at `.medium`, unlike `t3`'s `.2xlarge`). Keep the `New` badge for 1 month after the family's changelog date, then remove it (plain `family` cell, no `<nobr>`/badge).
2. **`docs/instances.md`, `docs/label.md`, `index.html`, `pricing.html`** — update the instance count.
3. **`_data/new.yml`** — prepend a changelog entry. Each entry requires a screenshot image under `assets/new/` that must be created separately.
