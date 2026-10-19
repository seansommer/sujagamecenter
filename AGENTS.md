# Shared SUJA project instructions

All image generation/editing must use ChatGPT's native image generator.
Runway credits are scarce; obtain explicit user approval before future Runway
generation. Discuss direct ElevenLabs setup with the user before generating
new paid audio. Apply these preferences to the bundled SUJA games.

Read `FIREBASE_RULES.md` and `firebase-rules-status.json` before changing any
Firebase behavior. The complete rules on this repository's latest `main` are
the shared source for every SUJA game. Fetch the latest commit before editing
and recheck before publishing so changes from other chats are preserved.

Edit `scripts/rules.mjs`, generate `firebase-database.rules.json`, and update the
source fingerprint/revision together. Keep reported live deployment evidence
separate. GitHub Pages success is not evidence of a Firebase rules deployment.
Do not claim rules are live without a verified read-back or a clearly attributed
user report. Preserve all existing game, account, messaging, and challenge paths.

Pin game checkouts in `.github/workflows/pages.yml` to committed release SHAs.
Run the existing game/hub checks and production build before publishing.
