import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';

const canonical=value=>JSON.stringify(sort(value));
function sort(value){
 if(Array.isArray(value))return value.map(sort);
 if(value&&typeof value==='object')return Object.fromEntries(Object.keys(value).sort().map(key=>[key,sort(value[key])]));
 return value;
}
const digest=value=>createHash('sha256').update(canonical(value)).digest('hex');
const parse=text=>JSON.parse(text.slice(text.indexOf('{')));
const rules=JSON.parse(await readFile('firebase-database.rules.json','utf8'));
const state=JSON.parse(await readFile('firebase-rules-status.json','utf8'));
const hash=digest(rules);
if(hash!==state.source.canonicalSha256)throw new Error('Rules changed without updating firebase-rules-status.json. Current canonical SHA-256: '+hash);
console.log('Shared rules revision: '+state.source.revision);
console.log('Source canonical SHA-256: '+hash);
console.log('Last user-reported live export: '+state.lastReportedLive.reportedOn+' · '+state.lastReportedLive.canonicalSha256);
console.log(hash===state.lastReportedLive.canonicalSha256?'Source matches the last reported export; current Firebase deployment has not been independently verified.':'Source differs from the last reported export. Firebase deployment is pending verification.');

const args=process.argv.slice(2);
if(args.length){
 if(args.length!==2||args[0]!=='--compare')throw new Error('Usage: npm run rules:compare -- /path/to/firebase-export.json');
 const exported=parse(await readFile(args[1],'utf8'));
 console.log('Export canonical SHA-256: '+digest(exported));
 if(canonical(rules)===canonical(exported))console.log('MATCH: the provided export equals the complete source rules.');
 else{
  console.error('DIFFERENT: export → source');
  function diff(before,after,path=''){
   if(before&&after&&typeof before==='object'&&typeof after==='object'&&!Array.isArray(before)&&!Array.isArray(after)){
    for(const key of [...new Set([...Object.keys(before),...Object.keys(after)])].sort()){
     const next=path+'/'+key;
     if(!(key in before))console.error('ADD '+next);
     else if(!(key in after))console.error('REMOVE '+next);
     else diff(before[key],after[key],next);
    }
   }else if(canonical(before)!==canonical(after))console.error('CHANGE '+path);
  }
  diff(exported,rules);process.exitCode=1;
 }
}
