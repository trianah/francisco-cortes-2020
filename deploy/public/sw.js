/*! For license information please see sw.js.LICENSE.txt */
!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/dist/js/",r(r.s=0)}([function(e,t,r){workbox.skipWaiting(),workbox.clientsClaim(),workbox.routing.registerRoute(/\.(?:png|gif|jpg|jpeg|svg|webp)$/,workbox.strategies.cacheFirst({cacheName:"images",plugins:[new workbox.expiration.Plugin({maxEntries:60,maxAgeSeconds:31536e6})]}));const n=workbox.strategies.networkFirst({cacheName:"default",plugins:[new workbox.expiration.Plugin({maxEntries:20}),new workbox.cacheableResponse.Plugin({statuses:[200]})]});workbox.routing.registerRoute(({event:e})=>"navigate"===e.request.mode,e=>n.handle(e).then(e=>e||caches.match("/offline.html"))),workbox.precaching.precacheAndRoute([{'revision':'df9a42d6206e7098db0302647339e460','url':'/dist/js/0.bundle.1591811382286.js'},{'revision':'75d62ff6e34222ed61c7b8a3cd85c836','url':'/dist/js/1.bundle.1591811382286.js'},{'revision':'aa66f1d4fefb4f8a2356054943a6ca91','url':'/dist/js/2.bundle.1591811382286.js'},{'revision':'cb83e1cf7184ab4cf09cc4e72ff63e32','url':'/dist/js/3.bundle.1591811382286.js'},{'revision':'233a49f27bacbfbffcd05ab061620535','url':'/dist/js/4.bundle.1591811382286.js'},{'revision':'fec2d60486af730ffb6e81501d63dfdc','url':'/dist/js/app.bundle.1591811382286.js'}])}]);
//# sourceMappingURL=sw.js.map