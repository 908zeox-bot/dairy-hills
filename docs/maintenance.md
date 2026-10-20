# Deployment and ongoing updates

This is the operating guide for ViviZ and the designated release approver. Repository: `908zeox-bot/dairy-hills`. Canonical website: `https://www.dairy-hills.com`. Use existing authorized access only; never create credentials or change domain, email, firewall or security settings as part of routine content maintenance.

## Edit the source

Use a new branch for each request and preserve unrelated changes. Keep evidence of the request and approval in private review notes rather than public data.

| File | What to change |
|---|---|
| `data/site.json` | General contact, canonical address, photo paths and alt text |
| `data/tenants.json` | Business names, optional HTTPS business website, verified suite or null, consent flags and date |
| `data/suites.json` | Verified status, area or null, type, short summary and update date |
| `assets/img/` | Reviewed, sanitized property photos |
| `assets/brand/` | Approved wordmarks, favicon and OG artwork; preserve during routine updates |
| `assets/style.css` / `build.mjs` | Layout or copy changes requiring an implementation review |

A business appears only when `consent` and `show` are both literal `true`, with a recorded ISO consent date. Retain the actual approval evidence separately. The four initial business listings use a specific approved carryover dated 2026-10-19, not independently obtained messages from each business. Do not extend that exception to a new listing. Remove departed businesses or withdrawn consent promptly. Store only business names and business URLs, never individual names or personal contact details. Keep unknown suite numbers null.

Suite status is `available`, `leased` or `coming-soon`. No suite records are currently verified; do not infer availability from a departure. Area must be a verified positive number or null. Do not add prices, private commercial documents or personal/ownership information. Floor plans remain blocked until separate publication approval. Ask for confirmation of access, parking, hours or included services before asserting them.

Contact stays `manager@dairy-hills.com` with mailto links only. Do not add inquiry forms, tracking, outside branding or other contact channels without a separate approved change.

## Prepare photos

Use the approved property sources. Keep originals outside the repository. Correct orientation, resize to at most 2400 pixels on either edge, export JPEG/WebP, and strip EXIF/GPS/XMP. Inspect every export at full resolution, including wall directories, signs, reflections, badges and background text. Cropping must remove prohibited text from the actual file, not merely hide it with CSS. Do not publish raw flyers or plans. Update alt text when the subject changes.

The hero uses the complete natural 4:3 exterior photo so its lawn stays visible. Do not add artificial color edits. Building cards have equal columns and no vertical offset; preserve their aligned image and caption starts.

## Build and review

Use Node 22 or newer; the build has no package dependencies.

```sh
node build.mjs
node --test test/*.test.mjs
git diff --check
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open the loopback URL on the machine running that server. A previously approved private preview may exist, but routine updates must not change its network configuration. It is a review aid, not the production service.

Check desktop, laptop and mobile widths, Safari/WebKit plus Chrome where available, all image loads, matching building image tops and captions, full lawn framing, keyboard navigation, mailto destinations and business links. Check public HTML/data, image pixels and metadata for prohibited information. Confirm only four currently approved business listings unless a separately documented change exists. Keep screenshots and the completed verification report with the review. Never submit test forms or send a test email without authorization.

## Release through the existing pipeline

1. Record the current production URL, exact deployed commit and successful Netlify deploy ID/permalink. Preserve build logs and a rollback target before publishing. A saved HTML response alone is not a complete rollback package, and the old repository scaffold may not match the current live site.
2. Push the reviewed branch with existing authorized Git access, open a PR against `main`, and review the deploy preview if the existing integration supplies one. Do not bypass branch protection, approval gates or access restrictions.
3. Obtain the required content/release approval. Have the designated maintainer merge using the normal repository workflow. Confirm the existing Netlify production integration builds that exact merged commit with command `node build.mjs` and publish directory `dist`.
4. If the repository is not connected or production settings differ, stop and ask the existing hosting administrator to resolve that dependency; do not create a new site or silently switch deployment methods.
5. After a successful build, verify the live HTML is the expected revision, all assets load, the canonical is correct, directory/contact/privacy rules hold, and the aligned building cards and full lawn work on desktop/mobile. Check `/robots.txt`, `/sitemap.xml`, favicon, OG image, headers and current build-date lastmod. Verify host-specific redirects only where the already-configured host aliases support them. Record the production deploy ID and commit.
6. Report success only after live verification. If publishing is blocked, report the exact blocked operation, target, reason and whether it ran. Do not retry uncertain outcomes before checking state.

The current website-change release has explicit deployment approval, but that does not approve future changes or override existing access/approval gates. Routine future updates still require their own review.

## Roll back

If post-release checks fail, use the previously recorded successful Netlify deploy to republish through an already-authorized release operator. Verify the restored live revision and record the rollback deploy ID. Revert the faulty change through a reviewed Git commit/PR so the next automatic build does not reintroduce it. Do not reset shared Git history or change DNS/mail/security settings. If no prior successful deployment is available, stop before publishing and resolve rollback readiness.

## Current dependencies

The earlier authentication blockers were resolved: `dms808` has accepted Write access, and the existing Netlify site is accessible through the ZeoX account. The production v2 deploy is `6ad6c2311567f42f35745f61`; the earlier rollback point is `6ab8ce104348cc43d0e7520d`. The Git connection was relinked to the Netlify GitHub App and a Git build passed while publishing was locked to preserve production. See [release automation](release-automation.md) for the configured workflow, approval requirements, and setup limitations. Verify effective credentials in each executor rather than assuming another machine shares its login. Record actual browser/device coverage; headless WebKit is not a claim of testing installed Safari. Pending approval requests remain pending until their result confirms approval.

Review current business occupancy, consent, suite facts and link validity at least monthly. Each update should leave an auditable PR and verification record, with a plain statement of what is live versus still waiting.
