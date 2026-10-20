# Local review results

Verified on 2026-10-19 using an isolated headless Chrome profile against a loopback-only HTTP server.

Passed:
- Static build; six automated tests covering strict consent gating, escaped business content, safe business links, suite values, plan publication guard, approved metadata/contact, nine redirects and maintenance field allowlists.
- Desktop 1440 × 1000, mobile 390 × 844 and small mobile 320 × 760: no horizontal overflow or browser errors, all local image/brand/style resources return 200.
- Keyboard skip link and section navigation; inquiry click targets the approved mailto destination. Email application handoff was intercepted to avoid sending a message.
- Correct canonical, structured address, OG image 1200 × 630, favicon, robots and sitemap. Build-date lastmod.
- No invented suite listings. Four current businesses are restored under recorded carryover approval dated 2026-10-19; names and linked websites were checked against the live directory. No suite numbers or personal contacts were imported.
- Image dimension and EXIF/XMP checks; visual review of final image pixels and desktop/mobile screenshots. The revised exterior uses a brighter approved seasonal photograph with no contact/rider sign.
- Public content scan: only the approved site email; excluded branding and contact patterns absent. Optional font-author email details were removed from copyright metadata while copyright attribution and license terms were retained.
- No forms, embedded maps, tracking scripts or external font requests.

Not run:
- Hosted preview, live host redirects, certificate behavior, external rich-result/OG validators and external directions link request. These require the separate hosted preview or release workflow. The directions URL and its accessible new-tab label were checked locally.
- Full assistive-technology audit and delivery of a test email.

Known content gaps: current suite availability, areas, amenities, access, parking and hours await confirmation; new business additions require consent evidence. Unverified suite facts remain absent as assertions or listings.

The current sign reference was inspected, and three candidate fonts were compared before choosing Lobster Two Bold with a Raleway SemiBold tagline. The design borrows clear hierarchy and real-property photography from the supplied airpark reference without its subject styling.

[Desktop preview](preview-desktop.webp) · [Mobile preview](preview-mobile.webp)

## Green palette and lawn composition revision

The reference screenshots supplied for the latest review were retrieved from Library and visually inspected. The draft returns to its original cream #f5f2ea, ink #1c1c1e and green #3d503e palette. Terracotta and honey accents are removed. The logo assets and four-business directory are unchanged.

The approved seasonal exterior photo 2206562824102 is displayed at its full natural 4:3 ratio, without cropping, overlays, filters or artificial color changes. The complete lawn and foreground remain visible on both desktop and mobile. The photograph is centered beside the desktop hero and appears at its natural ratio below the mobile introduction.

The green revision passed all six automated tests and the public-content exclusion scan. Seven representative text/background pairs exceed 4.5:1 (minimum 4.98:1). Keyboard focus rings use green on light surfaces and cream on dark/green surfaces. The photo bytes are unchanged from the approved seasonal export; only layout framing changed.

Final browser verification passed at 1440, 390 and 320 pixels with no horizontal overflow, all four business cards and all property images loaded. The hero image renders at 4:3 with object-fit contain, so the natural lawn is not cropped. Desktop and mobile screenshots were refreshed after all lazy images loaded.

## Building photo alignment fix

The supplied Safari screenshot showed the building photo cards. The layout deliberately used unequal columns (1.15fr / 1fr) and 65px of top padding on the second figure. That caused the apparent misalignment across engines. The fix uses equal minmax(0,1fr) columns and removes the offset; existing equal image heights then align image tops, bottoms and caption starts. Mobile keeps its existing single-column layout.

The screenshot also revealed readable directory text on the lobby wall that the earlier asset review missed. A natural crop removes the leftmost 28% of that image, excluding the entire directory; metadata remains stripped. Palette, hero/lawn photo, wordmarks, business directory, contact and other content are unchanged.

Actual Safari could not be launched because the Studio was locked. Reproduction and verification therefore use headless WebKit on the Studio, not a remote laptop or actual Safari application. This is a stated test limitation.

WebKit 26.4 reproduced the pre-fix 65px photo/caption offset. After the two CSS changes, photo tops, bottoms, widths and caption starts match to within 1px at 1440 and 1280 pixels. At 390 and 320 pixels, cards stack correctly with equal widths. All four viewports passed overflow, full 4:3 hero framing, four-business directory, image decoding, no-form and approved mailto checks, with no page errors. Actual Safari remains untested because the Studio is locked.

Release authorization has been received, but release execution is blocked: GitHub connector push permission is false; the existing repository browser session offers branch filtering rather than creation; Netlify deploy dashboard returns Unauthorized / Access Denied. No deployment was attempted, and a separate pending approval result was not assumed granted. A private current-production HTML/header snapshot was saved; the prior Netlify deploy ID remains unavailable, so that snapshot is not a complete rollback artifact. See maintenance.md for the operating procedure and dependencies.
