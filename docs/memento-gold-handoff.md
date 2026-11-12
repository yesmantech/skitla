# Memento / Gold integration handoff

Status: the Telegram bot integration was deployed on 12 November 2026 to the
verified LOCAL_PRIMARY Windows runtime. Memento is enabled with the exact
owner-confirmed referral code. The existing supervisor reloaded its single bot
process; fresh POLLING_OK and successful public-profile reconciliation were
verified. The website branch is ready for the corresponding production release.

## Website changes in this branch

- The homepage Gold card uses the same language-aware bot entry URL on desktop and mobile.
- `lib/gold-links.ts` centralizes the existing `gold_v1_site_home_<language>` and
  `gold_v1_site_reports_<language>` payloads. No new bot payload is introduced.
- `content/gold-access.ts` centralizes the room access conditions used by the
  homepage, Gold page and FAQ. Memento is included alongside FPG and Exness.
- The Gold page links directly to the existing home/menu payload for access and
  retains the separate reports payload. The access link does not introduce a new
  source token. The bot parser has been checked: `gold_v1_site_*` entrances map to
  the existing `site_oct01` website-source bucket. The homepage and `/gold` retain
  this coarse website attribution; this branch does not add per-page attribution.
- New and changed copy is translated in all five current website languages:
  Italian, English, Arabic, Simplified Chinese and Russian.
- FPG copy trading remains a separate, not-yet-active service. This change does
  not advertise copy trading for Exness or Memento.

## Bot integration deployed

The actual bot source was inspected, implemented and tested in a separate private
working copy, then applied with a source backup. The implementation includes:

- A distinct Memento provider in the Gold menu, dedicated conditions, new-account
  registration and existing-account paths, Service handoff and admin review.
- Configuration checks that keep Memento entry points disabled and omit Memento
  from public broker lists until it is enabled with a valid registration URL and code.
  Incomplete configuration cannot create a misleading signup path or access request.
- The owner-approved Gold access conditions: for FPG and Memento, an account in
  the client's name linked to Skitla13's referral, completed identity verification,
  and a credited deposit of at least EUR 300 or the USD equivalent. These are
  SKITLA Gold access criteria, not the broker's general account-opening minima.
  Exness retains its residence/profile eligibility text and the statement that
  SKITLA imposes no deposit threshold; the broker's own requirements still apply.
- Provider, language and request-reference continuity through saved requests,
  prefilled Service messages, resume/refresh screens, reminders and admin review.
  Selecting another provider does not silently reassign an existing pending request.
- An existing-Memento-account path that asks the client to contact the Service
  before opening another account. Any affiliation change depends on the broker's
  rules; neither affiliate transfer nor room access is promised automatically.
- Presentation and transactional copy in all nine bot languages: Italian, English,
  Spanish, Portuguese, French, German, Arabic, Simplified Chinese and Russian.
  French retains the existing formal register and Portuguese uses consistent
  European Portuguese. Home/menu labels share the canonical Gold translations.
- Broker-aware public descriptions and admin labels, while retaining existing
  consent/data/reminder handling and the separate FPG collaboration programme.

`docs/memento-bot-copy.json` remains a nine-language reference draft. The actual
implementation maps the reviewed content to the bot's runtime modules. This JSON
is not runtime configuration, does not enable Memento and does not update the
running Telegram bot merely by being present in the website repository.

## Registration link and referral verification

- The supplied HTTP signup link was checked and redirects to the exact HTTPS
  destination:
  [https://live.memento-markets.com/signup/YxBrnq6E](https://live.memento-markets.com/signup/YxBrnq6E).
  This is the client signup destination, not an IB signup page.
- No separate referral-code field was visible in the inspected registration form.
  Prepared instructions therefore say to check or enter the code only if such a
  field is present. They do not assume that the form requires manual code entry.
- The owner confirmed the exact code without the trailing backslash. It is
  configured separately from the signup token in the private bot configuration.
- The destination check did not verify affiliate attribution. No completed broker
  registration or referral-credit confirmation is claimed.
- The provider is enabled. Missing or invalid configuration still fails closed.

## Bot checks completed offline

- All 25 Gold smoke suites passed, together with the MFA and admin-navigation
  suites: 27 suites in total. Syntax checks also passed.
- Coverage includes all nine bot languages, 27 localized registration journeys,
  818 simulated clicks and 106 callbacks, provider/request/language persistence,
  existing-account handling, Service messages, reminders and administrative flows.
- Incomplete-configuration checks, FPG/Exness regression checks and reconciliation
  of the public profile through a simulated API passed.
- An independent implementation review passed.

The same 27 suites and syntax checks also passed in the separate Windows staging
copy on Node 24.18.0, after passing in the development environment on Node 24.22.1.
The 25 Gold suites also passed with the final enabled configuration in both
environments. Two test fixtures were made explicit about legacy/disabled mode so
they no longer inherit the deployment default. The actual link and code were
rendered in all nine languages with isolated data and no network calls.

All 27 changed/new files were verified by SHA-256 before and after deployment.
The original runtime files were backed up; no database migration or database
restore was performed. The active local supervisor and one fresh POLLING_OK
process were verified. The historical Railway-only lock is superseded by the
existing LOCAL_PRIMARY launcher; no cloud deployment or second poller was started.
These checks do not establish broker-side referral attribution.

## Website checks completed

- `npm run check:gold`: both homepage layouts and the Gold page produce the
  expected bot URLs in every language offered by the website selector; 27 copy
  entries have complete English/Arabic/Chinese/Russian translations and preserve
  support handles. This is a component-level check, not a browser screenshot test.
- `npx tsc --noEmit`: passed.
- `NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1 npm run build`: passed,
  including all 13 generated static pages. The environment variable was needed
  for Google Fonts TLS trust in the build environment; repository TLS settings
  were not changed.
- `git diff --check`: passed.

## Website release and final observation

1. Complete desktop/mobile visual QA through the public production site after
   the coordinated website release, or through an authenticated
   preview or an environment that permits the browser to launch. Vercel reports
   a successful preview deployment, but its URL redirects to Vercel sign-in.
   A local Next.js preview also started successfully; the separate cloud browser
   could not reach loopback, and local Chromium aborted before rendering a page
   because the runtime denied its socket/ptrace operations. No protection settings
   were changed and no completed screenshot-based visual QA is claimed.
2. Merge the website change through the existing GitHub/Vercel integration and
   verify the resulting production deployment. Inspect live bot navigation and
   the Memento conditions without submitting new customer requests. Transactional
   request, reminder and admin paths have been verified with isolated fixtures.
3. Verify referral attribution through an appropriate broker confirmation before
   treating the signup token or code as proven affiliate credit. Destination
   resolution and offline bot tests do not provide that confirmation.
