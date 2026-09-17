# Finish SUJA setup

Both apps use the new `suja-game-center` Firebase project. The family Game Center remains separate. The database URL alone is not enough for browser authentication.

## 1. Register the Firebase Web app

In the **new SUJA project**, open Firebase Console → Project settings → General → Your apps. Add a Web app with the `</>` icon if none exists. A nickname such as **SUJA Game Center** is fine. Firebase Hosting is optional; these repositories use GitHub Pages.

Open SDK setup and configuration → **Config**. Copy the public `firebaseConfig` object. In **both repositories**, update `src/config.js` with the matching values, especially the currently empty `apiKey` and `appId`. Verify the project ID and auth domain against the console rather than using values from the family project.

The database URL must remain:

```text
https://suja-game-center-default-rtdb.firebaseio.com
```

These Web app config values identify the project; they are designed to be used in browser code. Do not supply a service-account JSON file, private key, admin token, or account password.

Official instructions: [Add Firebase to a web app](https://firebase.google.com/docs/web/setup).

## 2. Enable Anonymous Authentication

Firebase Console → Authentication → Get started → Sign-in method → **Anonymous** → Enable → Save.

The apps use Firebase anonymous sessions underneath the familiar email + nickname player sign-in. Email + nickname maps that session to a SUJA profile. Email addresses are not publicly listed, but this is not verified email authentication. Anyone who knows a player's exact email and nickname can sign into that player, as in the original Game Center. Use this for casual crew competition; stronger verified authentication is needed before storing sensitive information or running high-stakes competitions.

Official instructions: [Anonymous authentication](https://firebase.google.com/docs/auth/web/anonymous-auth).

## 3. Publish the new database rules

Open **Realtime Database → the new SUJA database → Rules**. Replace the rules with the complete contents of [`firebase-database.rules.json`](../firebase-database.rules.json) and choose **Publish**.

Use this file only for the new SUJA database. It denies everything outside `sujaV1` and intentionally contains no rules for the original family app. Do not select test mode or use globally open read/write rules.

The rule tests cover account ownership, private account and mailbox reads, host/master roles, immutable scores, score shape/rate bounds, and challenge closure. Do not upload the emulator test fixtures.

## 4. Enable GitHub Pages for both repositories

For `sujagamecenter` and `bottlesup`, open **Settings → Pages → Build and deployment → Source → GitHub Actions**. Then open Actions → **Build, test, and publish** and run or rerun the workflow on `main`.

Both repos include the workflow. It runs `npm ci`, the unit tests, and the production build before publishing `dist`. A successful build alone does not mean Pages is enabled; check that the deployment job also succeeds.

The expected HTTPS addresses are:

- `https://seansommer.github.io/sujagamecenter/`
- `https://seansommer.github.io/bottlesup/`

Using these paths on the same origin lets the apps share the named Firebase authentication session. If a different hostname is used later, update the app links, share metadata, manifests, and configuration together.

## 5. Bootstrap Sean as the only master

After the public config, Authentication, rules, and site are ready:

1. Open SUJA Game Center and choose **User Login → New player**. Create Sean using the same email and nickname you prefer from the family Game Center.
2. In the **new** Firebase database's Data tab, expand `sujaV1/users`. Find the newly created Sean profile by its `displayName` and email. Note its profile key.
3. Edit `sujaV1/users/<Sean's profile key>/role` from `player` to `master`.
4. Edit `sujaV1/directory/<the same profile key>/role` to `master` too.
5. Refresh the Game Center. Sean now has **Master Controls** and can grant host access.

This one-time console action is necessary because client code cannot create a master or promote itself. Keep only Sean as master. All future coworkers create fresh SUJA profiles. No family account, message, score, or other user is imported into this new project.

The UI protects master accounts from demotion and allows Sean to manage host permissions and exclude suspicious scores. Because identity remains email + nickname, keep the master account's exact sign-in pair private.

## 6. Quick live check

Sign in as Sean, play a short run, and confirm it appears on the player card and Hall of Fame. Create a host challenge, open it, and check that its invite starts the matching three-minute shift. Ask one coworker to create a new player and exchange Message IDs and nicknames to try messaging. Closing a challenge locks new submissions.

Guest and practice runs are intentionally not saved to the public rankings. No real coworkers, scores, or messages are preloaded.

## Common symptoms

| Symptom | Check |
| --- | --- |
| Community is being set up | `apiKey` and `appId` are still blank in one of the two repos |
| Authentication operation not allowed | Enable Anonymous sign-in in the new project |
| Permission denied | Publish the complete new rules in the matching new database |
| Game opens as guest after hub sign-in | Confirm matching public Firebase config and the same HTTPS origin |
| Master Controls absent | Set both Sean role fields in the new database, then refresh |
| Deployment job fails, build passes | Enable GitHub Actions as the Pages source and rerun |
| Compatibility view appears | The browser could not create WebGL; use a browser/device with hardware acceleration for 3D |
