/*! For license information please see 1.bundle.1591811382286.js.LICENSE.txt */
(this.webpackJsonp=this.webpackJsonp||[]).push([[1],{13:function(e,o,t){"use strict";t.r(o);var r=t(39),i=t.n(r);i.a.KEY="AIzaSyCXTB3Bp1rEk__Ro3K6JO7OBA8hCXhgCiE",i.a.VERSION="quarterly";const l=[{featureType:"all",elementType:"geometry.fill",stylers:[{lightness:"0"}]},{featureType:"administrative",elementType:"geometry",stylers:[{color:"#a7a7a7"}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{visibility:"on"},{color:"#737373"}]},{featureType:"landscape",elementType:"geometry.fill",stylers:[{visibility:"on"},{color:"#eaeaea"}]},{featureType:"poi",elementType:"geometry.fill",stylers:[{visibility:"on"},{color:"#dadada"}]},{featureType:"poi",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#696969"}]},{featureType:"road",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#ffffff"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{visibility:"on"},{color:"#b3b3b3"}]},{featureType:"road.arterial",elementType:"geometry.fill",stylers:[{color:"#ffffff"}]},{featureType:"road.arterial",elementType:"geometry.stroke",stylers:[{color:"#d6d6d6"}]},{featureType:"road.local",elementType:"geometry.fill",stylers:[{visibility:"on"},{color:"#ffffff"},{weight:1.8}]},{featureType:"road.local",elementType:"geometry.stroke",stylers:[{color:"#d7d7d7"}]},{featureType:"transit",elementType:"all",stylers:[{color:"#808080"},{visibility:"off"}]},{featureType:"water",elementType:"geometry.fill",stylers:[{color:"#d3d3d3"}]}];o.default=function({node:e}){const o=()=>{const{latitude:o,longitude:t}=e.dataset,r={zoom:16,center:new google.maps.LatLng(o,t),styles:l,mapTypeId:google.maps.MapTypeId.ROADMAP,panControl:!1,zoomControl:!1,scaleControl:!1,mapTypeControl:!1,streetViewControl:!1,scrollwheel:!1,draggable:!0,disableDefaultUI:!0},i=new google.maps.Map(e,r),a={url:"/dist/svg/map-marker.svg",size:new google.maps.Size(28,36),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(14,36)};return new google.maps.Marker({map:i,position:new google.maps.LatLng(o,t),icon:a,draggable:!1})};return"undefined"==typeof google?i.a.load(o):o()}},39:function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),function(e){for(var t in e)o.hasOwnProperty(t)||(o[t]=e[t])}(t(40))},40:function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var r=function(){function e(e,o){if(void 0===e&&(e=null),void 0===o&&(o={}),this.apiKey=e,this.options=o,"undefined"==typeof window)throw new Error("google-maps is supported only in browser environment")}return e.prototype.load=function(){var o=this;return void 0!==this.api?Promise.resolve(this.api):void 0!==this.loader?this.loader:(window[e.CALLBACK_NAME]=function(){if(o.api=window.google,void 0===o.resolve)throw new Error("Should not happen");o.resolve(o.api)},window.gm_authFailure=function(){if(void 0===o.reject)throw new Error("Should not happen");o.reject(new Error("google-maps: authentication error"))},this.loader=new Promise((function(e,t){o.resolve=e,o.reject=t;var r=document.createElement("script");r.src=o.createUrl(),r.async=!0,r.onerror=function(e){return t(e)},document.head.appendChild(r)})))},e.prototype.createUrl=function(){var o=["callback="+e.CALLBACK_NAME];for(var t in this.apiKey&&o.push("key="+this.apiKey),this.options)if(this.options.hasOwnProperty(t)){var r=this.options[t];"version"===t&&(t="v"),"libraries"===t&&(r=r.join(",")),o.push(t+"="+r)}return"//maps.googleapis.com/maps/api/js?"+o.join("&")},e.CALLBACK_NAME="_dk_google_maps_loader_cb",e}();o.Loader=r}}]);
//# sourceMappingURL=1.bundle.1591811382286.js.map