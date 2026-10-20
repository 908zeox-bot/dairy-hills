# Approved release workflow

Repository: `908zeox-bot/dairy-hills`.
Netlify project: `dairy-hills`, team ZeoX.
Site UUID: `555a7825-7ba7-4ce3-9b02-c814a42b6440`.
Canonical URL: `https://www.dairy-hills.com`.

## Pull requests and approval

1. Create a branch and open a PR targeting `main` using the contributor account.
2. Wait for the required `Test and build` GitHub Actions check and the Netlify Deploy Preview check. CI uses Node 22, runs the existing site tests, builds with `node build.mjs`, and verifies the generated files.
3. Review the preview on desktop and mobile, including images, links, navigation and approved content.
4. Dave approves the PR using `dms808`. The CODEOWNERS rule covers every file, including workflow and ownership changes. Main branch protection must require code-owner review, dismiss stale approvals, require both checks on an up-to-date branch, and apply to administrators. Force pushes and branch deletion stay disabled.
5. Merge only after those requirements pass. Netlify builds `main` with `node build.mjs` and publishes `dist` automatically. Do not publish working branches to production with the CLI.

GitHub cannot distinguish Dave from an agent using Dave's credentials. Agents should author PRs using their contributor account and leave approval to Dave. GitHub also does not allow authors to approve their own PRs; use a separate contributor account for changes Dave will review.

## Integration setup and verification

The Netlify GitHub App must have access to this repository and be selected in the project's repository connection. Enable Deploy Previews for PRs to `main`; keep unrelated branch deploys disabled. Keep auto publishing enabled for future approved main merges after setup verification.

The initial setup must leave production deploy `6ad6c2311567f42f35745f61` unchanged. Use only a PR preview to verify the repaired Git connection. Do not merge this setup PR or publish a replacement as part of verification. Branch protection is configured separately from this file; documentation alone does not enforce these requirements. CODEOWNERS becomes effective once present on the PR's base branch.

## Production verification and rollback

Before a release, record the currently published deploy ID. After Netlify publishes the approved merge, confirm HTTPS www returns 200 with The suites / The building / Community, all assets load, and apex/HTTP requests redirect to HTTPS www without a loop. Keep Netlify's primary domain and repository canonical/redirect configuration aligned on `www.dairy-hills.com`.

The earlier rollback point is `6ab8ce104348cc43d0e7520d`. The v2 deploy before automation setup is `6ad6c2311567f42f35745f61`. Use the most recent verified successful deploy for subsequent rollbacks and check it remains available. A rollback requires release-operator authorization; then correct the faulty commit through a reviewed PR before the next automatic deployment.

## Access troubleshooting

Check the effective identity in the actual executor with `gh api user --jq .login` and repo access with `gh api repos/908zeox-bot/dairy-hills --jq .permissions`. `dms808` has accepted Write access; refreshing a separate connector may be necessary. Do not re-invite an existing collaborator or assume another machine shares a CLI login.

For Netlify clone failures, inspect the build log. A prior connection failed with `Host key verification failed` / exit 128. Reauthorize or relink the existing GitHub App connection with the repository owner; do not disable SSH host verification. For CLI operations use the site UUID rather than relying on the site name. Keep credentials in the executor's secret store, never in repository files.
