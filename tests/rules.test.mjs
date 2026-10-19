import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
test('generated database rules stay synchronized with their source',()=>{
 const before=readFileSync('firebase-database.rules.json','utf8');
 execFileSync(process.execPath,['scripts/rules.mjs']);
 assert.equal(readFileSync('firebase-database.rules.json','utf8'),before);
 const r=JSON.parse(before).rules.sujaV1;
 assert.ok(r.sujalagaRuns.$uid.$runId['.write'].includes('!data.exists()'));
 assert.equal(r.sujalagaModeration.$uid.$runId['.validate'],'newData.isBoolean()');
});
