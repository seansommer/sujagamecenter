# SUJA Game Center

A dedicated workplace arcade for the SUJA crew, with a green, white, and purple identity and **Bottles Up!** as its first game.

![SUJA Game Center artwork](assets/share.jpg)

The hub includes email + nickname sign-in, player cards, six Hall of Fame rankings, private Message ID + nickname messaging, host challenges, and protected master controls. It includes install icons, share artwork, responsive layouts, a dark theme, and original optional music.

**Setup status:** the new SUJA database URL is configured. Firebase Web app `apiKey` and `appId` still need to be supplied in both repositories. Guest play is available without Firebase. No existing family accounts or records have been imported.

- [Firebase and publishing setup](docs/SETUP.md)
- [Verification and limitations](docs/VERIFICATION.md)
- [Bottles Up! source](https://github.com/seansommer/bottlesup)
- Intended published address: `https://seansommer.github.io/sujagamecenter/`

## Development

Use Node 22 or newer.

```sh
npm ci
npm test
npm run build
npm run dev -- --host 0.0.0.0
```

The preview serves `dist`, so rebuild after source changes. Keep the hub and game on the same HTTPS origin to share the Firebase session. Their production paths are `/sujagamecenter/` and `/bottlesup/`.

## Database

`src/config.js` targets only `suja-game-center-default-rtdb.firebaseio.com`, under `sujaV1`. The rules file is for this **new project only**. No family Game Center paths, users, messages, or scores are copied.

`scripts/rules.mjs` generates `firebase-database.rules.json`. To repeat the access tests, install the Firebase CLI and Java 21, then run:

```sh
npm run rules
npm run test:rules
```

The integration suite uses an isolated `demo-suja-test` emulator. It never connects to production. Its fictional users and admin fixture must not be copied to a live database.

## Project layout

`src/community.js` handles identities, sessions, immutable score records, challenges, roles, and messages. The same module and `src/config.js` are intentionally copied to the standalone game; update both together. `src/app.js` renders the hub. Assets and artwork prompts are included in this repository.

This retains the original lightweight email + nickname identity model: email addresses are not verified and nicknames are not passwords. Scores are reported by the client and moderated by Sean; this is friendly competition, not a server-verified tournament system. See the setup notes before inviting the crew.
