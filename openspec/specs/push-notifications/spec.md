## ADDED Requirements

### Requirement: OneSignal SDK Initialization
The site SHALL load the OneSignal Web Push SDK on every page and initialize it with the site's OneSignal App ID, without blocking the critical rendering path.

#### Scenario: SDK loads deferred on initial page view
- **WHEN** a visitor opens any page on the site
- **THEN** the OneSignal SDK script is included with the `defer` attribute
- **AND** the SDK is initialized via `OneSignalDeferred.push(...)` using the `app_id` value from `_config.yml`
- **AND** the SDK initialization does not appear in the document's render-blocking resources reported by Lighthouse

#### Scenario: SDK disabled via config flag
- **WHEN** `onesignal.enabled` in `_config.yml` is set to `false`
- **THEN** the OneSignal `<script>` tag and init snippet are not emitted into the rendered HTML
- **AND** no service worker registration is attempted

### Requirement: Service Worker Availability
The site SHALL serve the OneSignal service worker file at the site root so that push subscriptions cover all pages.

#### Scenario: Service worker reachable at root
- **WHEN** a browser requests `/OneSignalSDKWorker.js` against the built site
- **THEN** the server responds with HTTP 200 and a JavaScript MIME type
- **AND** the file contents register the OneSignal SDK worker per OneSignal documentation

### Requirement: Subscription Prompt UI
The site SHALL present a subscription prompt that lets visitors opt in to push notifications, styled to match the site palette and shown without harassing the visitor.

#### Scenario: Slidedown shown on post pages
- **WHEN** a visitor lands on a post detail page and has not previously dismissed or accepted the prompt
- **THEN** the OneSignal slidedown prompt appears after a configured delay (default 30 seconds)
- **AND** the prompt copy clearly states the visitor is subscribing to new-post notifications

#### Scenario: Prompt respects prior dismissal
- **WHEN** a visitor has previously dismissed or accepted the prompt
- **THEN** the slidedown does not auto-appear again on subsequent visits within the OneSignal default suppression window

#### Scenario: Visitor accepts the prompt
- **WHEN** the visitor clicks "Allow" and grants the browser permission
- **THEN** the browser is registered as a OneSignal subscriber tied to the site's App ID
- **AND** the visitor sees a confirmation toast or system notification confirming the subscription

### Requirement: Privacy Disclosure
The site SHALL disclose the use of OneSignal as a third-party push provider in its privacy notice.

#### Scenario: Privacy page mentions OneSignal
- **WHEN** a visitor opens the site's privacy / about page
- **THEN** the page text identifies OneSignal as the third-party processor used for push notifications
- **AND** the page explains what data is shared (browser push token, page of subscription) and links to OneSignal's privacy policy

### Requirement: Configuration via `_config.yml`
The site configuration SHALL expose OneSignal settings through `_config.yml` so that no OneSignal identifier is hard-coded in templates or scripts.

#### Scenario: Required keys present
- **WHEN** the Jekyll build runs
- **THEN** `_config.yml` provides `onesignal.app_id` (string) and `onesignal.enabled` (boolean)
- **AND** the OneSignal include reads both values via `{{ site.onesignal.app_id }}` and `{{ site.onesignal.enabled }}`

#### Scenario: Optional Safari Web ID
- **WHEN** `onesignal.safari_web_id` is present in `_config.yml`
- **THEN** the SDK initialization passes it through; if absent, the SDK initializes without it and does not throw
