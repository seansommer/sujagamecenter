import test from 'node:test';import assert from 'node:assert/strict';import{readFile}from'node:fs/promises';
import{bottlesURL,returnToHub}from'../src/game-launch.js';
const launch='https://seansommer.github.io/sujagamecenter/play.html';
test('launch remains in the installed app scope while loading the existing game',async()=>{
 const manifest=JSON.parse(await readFile(new URL('../manifest.webmanifest',import.meta.url),'utf8'));
 assert.ok(launch.startsWith(new URL(manifest.scope,'https://seansommer.github.io/sujagamecenter/manifest.webmanifest').href));
 assert.equal(bottlesURL(launch),'https://seansommer.github.io/bottlesup/');
 const html=await readFile(new URL('../index.html',import.meta.url),'utf8');assert.ok(html.includes('href="./play.html"'));assert.ok(!html.includes('href="../bottlesup/"'));
});
test('hosted challenge survives launch without accepting an arbitrary embedded URL',()=>{
 assert.equal(bottlesURL(launch+'?challenge=ab12cd&url=https://example.com'),'https://seansommer.github.io/bottlesup/?challenge=AB12CD');
 assert.equal(bottlesURL(launch+'?challenge=../../elsewhere'),'https://seansommer.github.io/bottlesup/');
});
test('hub and Hall of Fame return links leave the frame, unrelated destinations do not',()=>{
 assert.equal(returnToHub('https://seansommer.github.io/sujagamecenter/#hall',launch),true);
 assert.equal(returnToHub('https://seansommer.github.io/bottlesup/',launch),false);
 assert.equal(returnToHub('https://example.com/sujagamecenter/',launch),false);
});
