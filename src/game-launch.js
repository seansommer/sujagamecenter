// The top-level launch URL stays inside the installed Game Center's existing scope.
export function bottlesURL(launchURL){
 const page=new URL(launchURL),game=new URL(!page.pathname.endsWith('/bottles-up.html')&&page.searchParams.get('game')==='pallet-stacker'?'./games/pallet-stacker/':'../bottlesup/',page);
 const challenge=(page.searchParams.get('challenge')||'').trim().toUpperCase();
 if(/^[A-Z0-9]{6}$/.test(challenge))game.searchParams.set('challenge',challenge);
 return game.href;
}
export function returnToHub(href,launchURL){
 const hub=new URL('./',launchURL),target=new URL(href,launchURL);
 return target.origin===hub.origin&&target.pathname.startsWith(hub.pathname);
}
