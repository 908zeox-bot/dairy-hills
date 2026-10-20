# Dairy Hills

A dependency-free static website. Requires Node 22 or newer.

```sh
node build.mjs
node --test test/*.test.mjs
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173. Netlify builds with `node build.mjs` and publishes only `dist/`. Generated HTML, robots.txt and sitemap.xml live in that directory. The sitemap uses the UTC build date. Source data and internal documentation are not published.

## Content maintenance

Make changes on a new branch and open a draft PR for preview review. The designated approver merges after content and visual approval. Do not publish from a working branch.

- `data/site.json`: approved general contact, canonical URL, address, descriptive copy and image paths/alt text.
- `data/tenants.json`: business name (`name`), `suite`, optional HTTPS business `url`, `consent`, `consent_date` (ISO date), and `show`. A business renders only when both boolean flags are exactly true and a consent date exists. Retain evidence of consent separately. Remove withdrawn consent promptly. Do not store individual contact details.
- `data/suites.json`: `id`, `status` (`available`, `leased`, `coming-soon`), verified `sqft` or null, `type`, `summary`, `floorplan` (null), and `updated` (ISO date). No suite records are supplied because current occupancy and areas have not been verified. Do not copy illustrative records into production data. Floor plans need separate publication approval before the build guard can be changed.
- `assets/img`: replace photos with reviewed JPEG/WebP exports at most 2400 pixels on either edge. Remove all EXIF/GPS, and inspect actual pixels for signs or other sensitive content. Update image alt text in site.json. The layout works without client-side scripts or external font requests.

## Review requirements still open

Current suite availability, areas, amenities, access arrangements, parking provisions and hours require confirmation. The site uses inquiry copy instead of claiming these facts. Four current business listings are carried over under the recorded approval dated 2026-10-19. This is a specific carryover approval, not a claim of independently collected tenant messages. New businesses still require recorded consent. Interior photographs illustrate the building and do not claim availability.

The initial rebuild replaces the previous application scaffold in the same PR. Domain rules are host-specific repository configuration only. Existing hosting administration and email/security settings must be preserved by the separate release workflow. Review the preview before any production publication.

Deployment, rollback and ongoing maintenance: [operating guide](docs/maintenance.md).
