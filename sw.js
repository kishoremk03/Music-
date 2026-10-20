const C="streamline-v4",F=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-maskable-192.png","icon-maskable-512.png","logo.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// Network first (so updates show up), cache as offline fallback
self.addEventListener("fetch",e=>{const r=e.request;const u=new URL(r.url);if(r.method!="GET"||u.origin!=location.origin||/\.(mp3|m4a|m4b|aac|wav|ogg|oga|opus|flac|webm|weba|mp4)$/i.test(u.pathname))return;
 e.respondWith(fetch(r).then(res=>{if(res.status==200){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{})}return res}).catch(()=>caches.match(r).then(x=>x||caches.match("index.html"))))});
