## Why

Readers who visit the blog have no way to be notified when a new post is published, so they must remember to return manually. Adding browser push notifications via OneSignal lets visitors subscribe once and get alerted on every new post, increasing return traffic and engagement without requiring email signup.

## What Changes

- Integrate the OneSignal Web Push SDK into the Jekyll site so visitors can opt in to browser notifications.
- Add a OneSignal service worker file served at the site root (required by the SDK).
- Add a subscription prompt (OneSignal's bell/slidedown) configured with the site's brand styling.
- Add a GitHub Actions workflow that detects newly published posts on each push to the default branch and dispatches a push notification via the OneSignal REST API.
- Store the OneSignal App ID as a Jekyll site config value and the REST API key as a GitHub Actions secret.
- Document the subscription flow and the notification trigger in the project README/AGENTS file.

## Capabilities

### New Capabilities
- `push-notifications`: Visitor-facing browser push subscription flow powered by OneSignal, including SDK initialization, service worker, and the subscription prompt UI.
- `post-publish-automation`: CI automation that detects new posts in commits to the default branch and triggers external notification systems (initially OneSignal).

### Modified Capabilities
<!-- None. Existing specs unaffected at the requirement level. -->

## Impact

- **Code**: New `_includes` partial for the OneSignal init snippet, new root-level `OneSignalSDKWorker.js` (or shim) served by Jekyll, new `.github/workflows/notify-new-post.yml`, new helper script under `scripts/` to diff posts and call the OneSignal API.
- **Config**: New keys in `_config.yml` (`onesignal.app_id`, `onesignal.safari_web_id` optional). New GitHub Actions secret `ONESIGNAL_REST_API_KEY`.
- **Dependencies**: External service dependency on OneSignal (free tier sufficient). No new Ruby gems. Workflow uses Node or `curl` for the REST call.
- **Performance/SEO**: OneSignal SDK is third-party JS; must be loaded `defer`/async and excluded from critical path to protect Core Web Vitals.
- **Privacy**: New third-party data processor (OneSignal). Privacy notice must mention push subscription data.
