const C="fitlog-v4",F=["./","index.html","manifest.webmanifest","icon-180.png","icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>fetch(u,{cache:"reload"}).then(r=>{if(r.ok)return c.put(u,r)}).catch(()=>{})))).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith("fitlog-")&&x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const q=e.request;if(q.method!=="GET"||new URL(q.url).origin!==location.origin)return;
if(q.mode==="navigate"){e.respondWith(fetch(q).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(x=>x.put("index.html",c))}return r}).catch(()=>caches.match("index.html").then(r=>r||caches.match("./"))));return}
e.respondWith(caches.match(q).then(r=>r||fetch(q).then(n=>{if(n.ok&&n.type==="basic"){const c=n.clone();caches.open(C).then(x=>x.put(q,c))}return n})))});
