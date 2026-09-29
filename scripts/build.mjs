import{mkdir,cp,rm}from'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
for(const f of['index.html','play.html','bottles-up.html','styles.css','src','assets','manifest.webmanifest','service-worker.js'])await cp(f,`dist/${f}`,{recursive:true});
await mkdir('dist/games',{recursive:true});
await cp(process.env.PALLET_STACKER_DIST||'../pallet-stacker/dist','dist/games/pallet-stacker',{recursive:true});
console.log('SUJA Game Center and Pallet Stacker built.');
