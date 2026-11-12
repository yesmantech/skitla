# Memento / Gold integration handoff

Status: preparation branch, not deployed. The Telegram bot source was not available
for this change. Website changes must ship with the completed bot flow, after the
real Memento registration link and referral code have been configured and checked.

## Website changes in this branch

- The homepage Gold card uses the same language-aware bot entry URL on desktop and mobile.
- `lib/gold-links.ts` centralizes the existing `gold_v1_site_home_<language>` and
  `gold_v1_site_reports_<language>` payloads. No new bot payload is introduced.
- `content/gold-access.ts` centralizes the room access conditions used by the
  homepage, Gold page and FAQ. Memento is included alongside FPG and Exness.
- The Gold page links directly to the existing home/menu payload for access and
  retains the separate reports payload. The access link does not introduce a new
  source token that the current bot might not understand. If the bot records
  `site_home` as page attribution, access from `/gold` will share that value;
  inspect the bot parser before introducing a distinct page-attribution token.
- New and changed copy is translated in all five current website languages:
  Italian, English, Arabic, Simplified Chinese and Russian.
- FPG copy trading remains a separate, not-yet-active service. This change does
  not advertise copy trading for Exness or Memento.

## Bot work still required

`docs/memento-bot-copy.json` is a nine-language integration draft, not a runtime
configuration. Its text must be mapped to the actual bot's keys and flow after
the source is available. Its presence in this website repository does not enable
Memento or change the running Telegram bot.

1. Add a distinct Memento provider in the Gold menu and throughout the new-account
   and existing-account flows. Reuse the current navigation patterns rather than
   creating a separate flow that drops the selected provider or language.
2. Configure the exact client registration URL and the separate referral code.
   Preserve all URL parameters. Show the code in a copyable format and explain
   where it is used if the broker's actual registration form requires it.
   Do not derive a manual code from a tracking token or substitute an IB signup URL.
3. Keep the provider disabled until both registration data items are configured
   and the link destination is verified. Never expose a blank, guessed or example
   registration URL to users. Avoid creating an access request from an incomplete
   provider configuration.
4. Apply the owner-approved Gold access conditions: for FPG and Memento, an account
   in the client's name linked to Skitla13's referral, completed identity
   verification, and a credited deposit of at least EUR 300 or the USD equivalent.
   These are SKITLA Gold access criteria, not a statement of the broker's general
   account-opening minima. For Exness, preserve the existing residence/profile
   eligibility text and the statement that SKITLA imposes no deposit threshold;
   the broker's own requirements still apply.
5. Preserve the provider on the request reference, saved request state, prefilled
   Service message, resume/refresh screens, reminders and admin review. A provider
   selection must not silently reassign an existing pending request to another broker.
6. Add the existing-Memento-account branch. Ask the user to contact the Service to
   verify referral affiliation before opening another account; do not promise
   automatic affiliate transfer or automatic room access.
7. Review presentation and transactional copy in all nine current bot languages:
   Italian, English, Spanish, Portuguese, French, German, Arabic, Simplified Chinese
   and Russian. Keep language selection on every return/resume path. Match the
   translated existing-account button labels with the website instructions.
8. Update the bot description, consent/data/reminder information and admin labels
   where they enumerate brokers. Keep the current FPG collaboration programme
   separate unless the owner confirms an equivalent Memento partnership workflow.

## Targeted validation before release

- Use isolated fixtures/test storage: do not test by creating customer requests.
- Exercise new and existing accounts for each of the three providers, all
  language selections, back/menu navigation and the two existing website payloads.
- Confirm registration URL and code display, request/provider/language persistence,
  Service text, reminders/opt-out and admin approval/rejection/cancellation.
- Confirm incomplete Memento configuration cannot create a misleading signup path.
- Recheck FPG and Exness URLs and requests unchanged, including pending requests
  created before the update. Exness must not inherit the FPG/Memento deposit rule.
- Do a final user-visible review at desktop and mobile sizes before deploying the
  coordinated website and bot release.

No broker registration, referral attribution or bot deployment is verified by the
website-only checks in this branch.

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

The pending visual and end-to-end bot checks above remain release requirements.
The production preview started successfully on the local loopback interface, but
the separate browser environment could not reach it (`ERR_CONNECTION_REFUSED`).
No browser-based visual QA is claimed for this branch.
