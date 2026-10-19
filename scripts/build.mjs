import{mkdir,cp,rm}from'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
for(const f of['index.html','play.html','bottles-up.html','sujalaga.html','pinball.html','styles.css','header.css','src','assets','manifest.webmanifest','service-worker.js'])await cp(f,`dist/${f}`,{recursive:true});
await mkdir('dist/games',{recursive:true});
await cp(process.env.PALLET_STACKER_DIST||'../pallet-stacker/dist','dist/games/pallet-stacker',{recursive:true});
await cp(process.env.SUJALAGA_DIST||'../sujalaga/dist','dist/games/sujalaga',{recursive:true});
await cp(process.env.PINBALL_DIST||'../pinball/dist','dist/games/suja-pinball',{recursive:true});
console.log('SUJA Game Center, Pallet Stacker, Sujalaga, and Suja Pinball built.');
