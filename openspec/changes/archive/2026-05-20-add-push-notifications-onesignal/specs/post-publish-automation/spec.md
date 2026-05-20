## ADDED Requirements

### Requirement: New-Post Detection on Default Branch
The CI system SHALL detect newly added posts in pushes to the repository's default branch.

#### Scenario: Workflow triggers on push to default branch
- **WHEN** a commit is pushed to the default branch
- **THEN** the `notify-new-post` GitHub Actions workflow runs
- **AND** the workflow does not run on pushes to other branches or on pull-request events

#### Scenario: Workflow lists added post files in the push range
- **WHEN** the workflow runs for a push with both `before` and `sha` SHAs available
- **THEN** the workflow computes the list of files added (`--diff-filter=A`) under `_posts/` between `before..sha`
- **AND** modified-only or deleted post files are not included in the list

#### Scenario: First push to a new default branch
- **WHEN** the workflow runs and `github.event.before` equals the zero SHA
- **THEN** the workflow uses the files present in `_posts/` in the head commit as the added set, instead of attempting an empty-range diff

### Requirement: Front-Matter Driven Notification Payload
The CI system SHALL derive each notification's payload from the corresponding post's YAML front matter.

#### Scenario: Required fields populate the payload
- **WHEN** a new post file is processed
- **THEN** the dispatch payload uses the post's `title` as the notification heading
- **AND** the dispatch payload uses the post's `excerpt`, or the first 140 characters of the body stripped of HTML/Markdown if `excerpt` is absent, as the notification body
- **AND** the dispatch payload uses the post's site-absolute URL (derived from `permalink` or Jekyll's default URL pattern) as the click target

#### Scenario: Optional image field
- **WHEN** the post front matter includes an `image` field with a valid URL or asset path
- **THEN** the payload includes that URL as the large image and icon for platforms that support it

#### Scenario: Author opts out per post
- **WHEN** the post front matter includes `notify: false`
- **THEN** the workflow skips dispatching a notification for that post and logs the skip

#### Scenario: Unpublished or scheduled post
- **WHEN** the post front matter includes `published: false` or a `date:` value in the future relative to the workflow run
- **THEN** the workflow skips dispatching a notification for that post

### Requirement: Notification Dispatch via OneSignal REST API
The CI system SHALL dispatch notifications by calling OneSignal's REST API using the repository's secret REST API key.

#### Scenario: Successful dispatch
- **WHEN** the workflow has a valid payload for a new post
- **THEN** it issues a POST to `https://api.onesignal.com/notifications` with the OneSignal App ID and `included_segments: ["All"]`
- **AND** the `Authorization` header uses the `ONESIGNAL_REST_API_KEY` GitHub Actions secret
- **AND** the secret value is not echoed in workflow logs

#### Scenario: Dispatch is idempotent across re-runs
- **WHEN** the workflow runs more than once for the same commit (re-run or concurrent push)
- **THEN** the request body includes an `external_id` derived from the post's permalink (or a stable hash of it)
- **AND** OneSignal rejects duplicate dispatches with the same `external_id` rather than sending the notification twice

#### Scenario: Workflow fails loudly on API error
- **WHEN** the OneSignal API responds with a non-2xx status
- **THEN** the workflow step exits with a non-zero status and surfaces the response body (with secrets redacted) in the job logs
- **AND** the GitHub commit check shows a failure

### Requirement: Workflow Concurrency Guard
The CI system SHALL ensure only one notification dispatch run executes at a time per repository.

#### Scenario: Concurrent pushes
- **WHEN** two pushes to the default branch trigger the workflow back-to-back
- **THEN** the second run waits for the first to finish (or is canceled, per the configured `concurrency` group `notify-new-post`)
- **AND** notifications are not dispatched twice for the same added file across overlapping runs

### Requirement: Manual Re-Trigger
The workflow SHALL support manual re-triggering for recovery after transient OneSignal outages.

#### Scenario: Author re-runs the workflow
- **WHEN** an author invokes `workflow_dispatch` for `notify-new-post` providing the commit SHA of the publish commit
- **THEN** the workflow re-computes the added-post set for that commit and re-attempts dispatch
- **AND** the `external_id` dedupe ensures no duplicate user-visible notifications are sent if the first run actually succeeded
