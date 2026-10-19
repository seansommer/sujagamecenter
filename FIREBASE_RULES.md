# Shared SUJA Firebase rules

All SUJA games use project `suja-game-center`, Realtime Database
`suja-game-center-default-rtdb`, under `sujaV1`.

The complete rules file for every game is
[firebase-database.rules.json](firebase-database.rules.json) on this repository's
latest `main` branch. Its editable generator is [scripts/rules.mjs](scripts/rules.mjs).
Other game repositories must link here rather than carry deployable copies.
Chat memory, an older attachment, and a game release version do not identify
the current Firebase deployment.

## Current record · October 19, 2026

The user's uploaded current-rules export matches commit
`587020d228a3638fc303099dddf203e6ad3c846e` in content. It includes Bottles Up,
Pallet Stacker, Sujalaga, accounts, challenges, and messaging. The Pinball
revision preserves every existing section and adds only `pinballRuns` and
`pinballModeration`. Practice scores remain local.

[firebase-rules-status.json](firebase-rules-status.json) records the source
revision and content fingerprint separately from the last user-reported live
export. The Pinball additions have **not been verified as deployed to Firebase**.
A successful GitHub Pages deployment publishes game files, not database rules.

## Every rules change, including work in a new chat

1. Fetch this repository's latest `main` and read this document, the complete
   JSON rules, the generator, and the status record before editing. Check for
   newer commits again before publishing; preserve changes made in other chats.
2. Compare a current Firebase export with the source when available:
   `npm run rules:compare -- /path/to/export.json`. The command also accepts the
   user's text export with a heading. A mismatch exits with status 1 and lists
   every changed path. Matching an old export does not verify today's deployment.
3. Edit the generator, run `npm run rules`, and review the entire JSON diff.
   Update the source revision and canonical SHA-256 in the status record; the
   checker prints the expected fingerprint if they differ. Keep the reported
   live fingerprint unchanged until there is new deployment evidence.
4. Run `npm run rules:check`, `npm test`, and the database emulator suite
   (`npm run test:rules` with Firebase CLI and Java installed). Commit source,
   generator, status, and relevant tests together. The ordinary tests check
   consistency without overwriting the rules file.
5. Deploy the **complete** file to this database. From an authenticated Firebase
   CLI, use `firebase deploy --only database --project suja-game-center` in this
   repository, or paste the complete JSON into this database's Rules tab and
   select Publish. Never replace the shared rules with a Pinball-only fragment.
6. Read back/export the deployed rules and compare again. Only after a match,
   record the deployment time, repository commit, matching fingerprint, and
   evidence in the status file. Distinguish a user-reported match from an
   independently verified Firebase read-back. Commit the receipt.

Canonical fingerprints use SHA-256 of compact JSON with recursively sorted
object keys, preserving arrays and the exact rule expressions. Whitespace and
object key order do not affect the comparison.

Firebase's supported source-control/deployment workflow:
https://firebase.google.com/docs/rules/manage-deploy
