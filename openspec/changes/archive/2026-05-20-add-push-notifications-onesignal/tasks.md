## 1. OneSignal Account & Secrets

- [x] 1.1 Create OneSignal app in the OneSignal dashboard (Web Push platform), pointing at the production site origin
- [x] 1.2 Capture the `App ID` and generate a `REST API Key` from OneSignal settings
- [x] 1.3 Add `ONESIGNAL_REST_API_KEY` as a GitHub Actions repository secret
- [x] 1.4 Document the OneSignal account ownership and key-rotation steps in `README.md` (or `AGENTS.md`)

## 2. Jekyll Configuration

- [x] 2.1 Add `onesignal:` block to `_config.yml` with keys `enabled` (default `false`), `app_id`, optional `safari_web_id`, and `prompt_delay_seconds` (default `30`)
- [x] 2.2 Confirm `_config.yml` is checked in with `enabled: false` so the first land is a no-op
- [x] 2.3 Ensure `_config.yml` keys are documented inline with comments

## 3. SDK Include & Service Worker

- [x] 3.1 Create `_includes/onesignal.html` that emits the `<script defer src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js">` tag and an `OneSignalDeferred.push(...)` init snippet using `{{ site.onesignal.app_id }}`, only when `{{ site.onesignal.enabled }}` is truthy
- [x] 3.2 Wrap the slidedown prompt config inside the init snippet so it appears after `{{ site.onesignal.prompt_delay_seconds }}` on post detail pages
- [x] 3.3 Include `{% include onesignal.html %}` from the default layout `<head>` (after critical assets)
- [x] 3.4 Add root-level `OneSignalSDKWorker.js` containing `importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js');`
- [x] 3.5 Ensure Jekyll copies `OneSignalSDKWorker.js` to the site root in the build output (add to `include:` in `_config.yml` if necessary)

## 4. Privacy & UX Copy

- [x] 4.1 Update the site's privacy / about page to mention OneSignal as the push processor, what data is shared, and link to OneSignal's privacy policy
- [x] 4.2 Set slidedown copy in the OneSignal dashboard (or via init config) to clearly state "Get notified when a new post is published"

## 5. Notification Dispatch Script

- [x] 5.1 Create `scripts/notify-new-posts.sh` (Bash) — or `scripts/notify-new-posts.mjs` (Node) — that accepts a newline-delimited list of added post paths on stdin
- [x] 5.2 For each post: parse front matter (`title`, `excerpt`, `image`, `permalink`, `published`, `notify`, `date`); skip when `notify: false`, `published: false`, or `date` in the future
- [x] 5.3 Compute the site-absolute URL for each post using the configured site URL plus the resolved permalink
- [x] 5.4 Build the OneSignal payload (`app_id`, `included_segments: ["All"]`, `headings`, `contents`, `url`, optional `chrome_web_image`/`big_picture`, `external_id` derived from the permalink)
- [x] 5.5 POST to `https://api.onesignal.com/notifications` with `Authorization: Basic ${ONESIGNAL_REST_API_KEY}` and exit non-zero on any non-2xx response
- [x] 5.6 Redact secrets from any error logs and print the OneSignal response body for debugging

## 6. GitHub Actions Workflow

- [x] 6.1 Create `.github/workflows/notify-new-post.yml`, triggered on `push` to the default branch and on `workflow_dispatch` (input: `sha`)
- [x] 6.2 Configure `concurrency: { group: notify-new-post, cancel-in-progress: false }` so concurrent runs queue
- [x] 6.3 Check out the repository with `fetch-depth: 0` so `before..sha` diffs work
- [x] 6.4 In a step, compute the added-post list with `git diff --name-only --diff-filter=A "$BEFORE..$SHA" -- _posts/`, handling the zero-SHA `before` case by listing `_posts/` in the head commit
- [x] 6.5 Pipe the file list into `scripts/notify-new-posts.sh`, exposing `ONESIGNAL_APP_ID` and `ONESIGNAL_REST_API_KEY` as env vars (latter from `secrets`)
- [x] 6.6 Make the job fail visibly on any dispatch error so the commit gets a red check

## 7. Verification

- [x] 7.1 Run `bundle exec jekyll build` locally with `onesignal.enabled: false` and confirm no OneSignal markup appears in `_site/`
- [x] 7.2 Toggle `onesignal.enabled: true` locally and confirm the script + init snippet render and the service worker is reachable at `/OneSignalSDKWorker.js`
- [x] 7.3 Run Lighthouse against a post page; confirm LCP/CLS/TBT remain within the project's performance budget

## 8. Documentation

- [x] 8.1 Update `README.md` (and `AGENTS.md` if relevant) with: how to opt out per post (`notify: false`), how to rotate the REST API key, and how to manually re-trigger the workflow
- [x] 8.2 Add a short troubleshooting section covering: subscription not appearing, workflow red check, missing front-matter fields
