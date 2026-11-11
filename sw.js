/* Meu Financeiro — Service Worker 2.3.3
   HTML: rede primeiro, cache somente quando estiver offline.
   Dados financeiros ficam no localStorage; este worker NÃO os apaga.
*/
const CACHE_NAME='meu-financeiro-cache-2.3.3';
const CACHE_PREFIX='meu-financeiro-cache-';
const INDEX_URL=new URL('./index.html',self.registration.scope).href;

self.addEventListener('install', event=>{
 event.waitUntil((async()=>{
  try{
   const response=await fetch(INDEX_URL,{cache:'no-store'});
   if(response.ok){const cache=await caches.open(CACHE_NAME);await cache.put(INDEX_URL,response.clone())}
  }catch(error){/* Na ausência de rede, o fallback offline será usado. */}
  await self.skipWaiting();
 })());
});

self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const names=await caches.keys();
  await Promise.all(names.filter(name=>name.startsWith(CACHE_PREFIX)&&name!==CACHE_NAME).map(name=>caches.delete(name)));
  await self.clients.claim();
 })());
});

self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET'||request.mode!=='navigate')return;
 event.respondWith((async()=>{
  try{
   const response=await fetch(request,{cache:'no-store'});
   if(response.ok){
    try{const cache=await caches.open(CACHE_NAME);await cache.put(request,response.clone())}catch(error){}
   }
   return response;
  }catch(error){
   const cache=await caches.open(CACHE_NAME);
   return (await cache.match(request))||(await cache.match(INDEX_URL))||Response.error();
  }
 })());
});

self.addEventListener('message',event=>{
 if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting();
});
