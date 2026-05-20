## Context

The blog is a Jekyll-generated static site (mockup phase moving toward implementation) with strong emphasis on performance and SEO. There is currently no return-visit channel: no RSS surfacing, no email list, no notifications. We want a low-friction subscription mechanism that does not require collecting personal data and that ships without standing up our own push infrastructure.

OneSignal offers a free Web Push tier with a hosted REST API, a drop-in JS SDK, and a configurable subscription prompt. GitHub Actions is already the only deploy/CI surface in use, so triggering notifications there avoids new infrastructure.

Stakeholders: site owner (Antonio), readers who want to follow new posts.

## Goals / Non-Goals

**Goals:**
- Visitors can subscribe to browser push notifications from any page.
- A push notification is dispatched automatically when a new post is published to the default branch.
- The integration adds minimal weight to the critical render path (third-party JS deferred, not blocking).
- Secrets (REST API key) never live in the repo or in client-shipped code.
- Notification metadata (title, URL, optional image) is derived from the post's front matter so the workflow stays generic.

**Non-Goals:**
- Native mobile push (iOS/Android apps). Web Push only.
- Email notifications, RSS revamp, or any other channel.
- Segmenting subscribers (tags, topics). All subscribers get every new post.
- Editing or unpublishing notifications after dispatch.
- Backfilling notifications for historical posts.

## Decisions

### Decision 1: OneSignal over self-hosted Web Push

**Choice**: Use OneSignal Web Push (free tier) as the push service.

**Rationale**:
- VAPID-based self-hosted push would require running a server to store subscriptions and sign payloads — incompatible with a static Jekyll site.
- OneSignal hosts subscription storage, handles browser quirks, and exposes a simple REST API.
- Free tier covers far more subscribers than this blog will realistically reach.

**Alternatives considered**:
- Self-hosted Web Push via `web-push` Node library + a serverless function: more control, but adds a backend component and ongoing key management.
- Pushpad / Firebase Cloud Messaging: comparable, but OneSignal has the most mature drop-in widget and clearer free tier.

### Decision 2: Trigger via GitHub Actions on push to default branch

**Choice**: A workflow runs on `push` to the default branch, diffs the commit range against `_posts/`, and dispatches one notification per net-new post file.

**Rationale**:
- Publishing already happens via pushing to the default branch — no new author workflow.
- Diff-based detection avoids dispatching on edits to existing posts (e.g., typo fixes).
- Idempotency: the workflow only sees a post as "new" once (the commit where it first appears).

**Alternatives considered**:
- Schedule-based workflow (cron) that scans `_posts/` for entries marked `notified: false`: more complex state, requires committing back to the repo.
- Triggering on release tags: would force a release-per-post workflow change.

### Decision 3: Detect new posts via `git diff --diff-filter=A` over the push range

**Choice**: Use `git diff --name-only --diff-filter=A ${{ github.event.before }}..${{ github.sha }} -- _posts/` to enumerate newly added post files.

**Rationale**: Straightforward, runs in the Action without extra dependencies, and matches Jekyll's `_posts/` convention exactly.

**Edge cases handled**:
- First push to a new branch (`github.event.before` = zeros): fall back to listing only the files in the head commit.
- Drafts under `_drafts/`: excluded by the path filter.
- Posts with `published: false` in front matter: skipped by the script after parsing front matter.
- Posts with a future `date:` in the front matter: skipped (treated as scheduled).

### Decision 4: Front matter as the source of notification content

**Choice**: The dispatch script reads each new post's front matter and uses:
- `title` → notification heading
- `excerpt` (or first 140 chars of body, stripped) → notification body
- `permalink` / computed Jekyll URL → click-through URL
- `image` (optional) → large image and icon

**Rationale**: Keeps the workflow declarative — authors do not learn a new metadata vocabulary. If a future post needs to skip notification, the author can add `notify: false`.

### Decision 5: SDK loaded `defer`, init in an `_includes` partial

**Choice**: The OneSignal init snippet lives in `_includes/onesignal.html` and is included once from the default layout's `<head>`. The SDK `<script>` tag is `defer`. The init call is wrapped in `OneSignalDeferred.push(...)` per OneSignal's v16 SDK pattern.

**Rationale**: Protects LCP / CWV. Loading the SDK after parse means the bell prompt appears slightly later but the critical path is clean.

### Decision 6: Service worker file served from site root

**Choice**: Add a static `OneSignalSDKWorker.js` file at the site root that re-exports the OneSignal SDK worker (one-liner per OneSignal docs). Configure Jekyll to copy it to the build output.

**Rationale**: Web Push requires the service worker at the registered scope. Root scope = notifications can show on any page.

### Decision 7: Secret management

**Choice**:
- `app_id` is public (safe in `_config.yml`).
- `REST API Key` is a GitHub Actions secret, never logged.
- The workflow uses `curl` against `https://api.onesignal.com/notifications` so no extra dependency is introduced.

## Risks / Trade-offs

- **Third-party privacy footprint** → Add a one-line privacy notice on first prompt; document OneSignal in the site privacy policy.
- **SDK weight on the critical path** → Mitigated by `defer` loading and lazy init; verify Lighthouse before merge.
- **Notification spam on rebase/force-push** → `diff-filter=A` over `before..sha` means a force-push that re-introduces files could re-notify. Mitigation: discourage force-pushing to default; the workflow logs the file list so re-runs are visible.
- **Per-post notification duplication on workflow re-run** → Guard the workflow with `concurrency: notify-new-post` so re-runs queue and do not parallel-dispatch. Also keep a notification dedupe key derived from the post's permalink (passed as `external_id`) so OneSignal rejects duplicates.
- **OneSignal API outage at publish time** → The workflow fails loudly (red check). Author can re-trigger manually via `workflow_dispatch`.
- **Front matter missing fields** → Script fails the job with a clear error per post rather than dispatching a malformed notification.

## Migration Plan

1. Create a OneSignal app in the OneSignal dashboard; record `app_id`. Generate a REST API key.
2. Add `ONESIGNAL_REST_API_KEY` as a GitHub Actions repo secret.
3. Land the SDK include, service worker, and `_config.yml` entry behind a `onesignal.enabled: false` flag.
4. Verify the build still passes Lighthouse budgets locally.
5. Flip `onesignal.enabled: true`. Subscribe from a test browser; confirm welcome notification works.
6. Land the `notify-new-post.yml` workflow.
7. Publish a smoke-test post; confirm the dispatch and that the notification opens the correct URL.
8. **Rollback**: set `onesignal.enabled: false` in `_config.yml` and/or disable the workflow. No data migration needed; existing subscribers remain in OneSignal and resume on re-enable.

## Open Questions

- Do we want a Safari Web ID configured (requires extra Apple Developer steps), or is Chromium + Firefox coverage enough for v1? Default: defer Safari Web ID to a follow-up.
- Should the bell prompt auto-show or be manually triggered from a footer "Subscribe" link? Default: OneSignal slidedown, shown once per visitor after 30s on a post page.
