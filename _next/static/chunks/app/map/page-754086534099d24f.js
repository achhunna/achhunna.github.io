(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[883],{2040:function(e,t,r){"use strict";var n,o;e.exports=(null==(n=r.g.process)?void 0:n.env)&&"object"==typeof(null==(o=r.g.process)?void 0:o.env)?r.g.process:r(6003)},8121:function(e,t,r){Promise.resolve().then(r.bind(r,9529))},9529:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return f}});var n,o=r(9268),i=r(4623),c=r.n(i),s=r(6006);r(9814),r(4704);var a=e=>{let{fill:t}=e;return(0,o.jsx)("svg",{version:"1.0",xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"100%",viewBox:"0 0 1024.000000 1024.000000",preserveAspectRatio:"xMidYMid meet",children:(0,o.jsx)("g",{transform:"translate(0.000000,1024.000000) scale(0.100000,-0.100000)",fill:t,stroke:"none",children:(0,o.jsx)("path",{d:"M8565 9130 c-246 -65 -525 -238 -875 -543 -63 -55 -466 -450 -895 -878 l-780 -777 -225 43 c-124 24 -544 105 -935 180 -390 75 -1083 207 -1540 295 -1476 283 -1566 300 -1607 300 -22 0 -54 -7 -72 -15 -18 -9 -125 -109 -238 -223 -168 -169 -208 -215 -218 -249 -15 -50 -7 -117 21 -162 24 -39 -50 -3 1931 -946 l1428 -680 -698 -697 c-383 -384 -703 -698 -710 -698 -7 0 -106 27 -220 59 -678 195 -1158 321 -1222 321 -22 0 -58 -9 -78 -19 -50 -26 -428 -418 -447 -465 -8 -19 -15 -50 -15 -68 0 -39 29 -106 56 -130 10 -9 379 -215 819 -458 440 -244 808 -450 817 -459 9 -9 211 -367 448 -796 237 -429 442 -796 456 -815 44 -65 122 -92 204 -70 39 10 73 40 248 214 112 110 212 218 223 238 10 21 19 56 19 78 0 64 -79 365 -295 1131 -47 165 -85 305 -85 312 0 7 314 326 698 709 l697 698 779 -1638 c428 -900 790 -1654 802 -1674 40 -63 122 -90 204 -68 39 10 72 39 252 218 114 113 214 220 223 238 8 18 15 52 15 76 -1 23 -185 1001 -410 2173 l-409 2130 778 780 c428 429 823 832 878 895 279 320 445 577 525 813 43 127 50 273 19 374 -38 124 -128 215 -250 253 -82 26 -219 26 -316 0z"})})})},u=r(3194);n="pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg",c().accessToken=void 0!==n?n:"";let l=e=>{let{fill:t}=e;return(0,o.jsx)("div",{style:{width:"20px",height:"20px"},children:(0,o.jsx)(a,{fill:t})})};function f(){let[e]=(0,s.useState)(-122.380227),[t]=(0,s.useState)(37.617678),[r]=(0,s.useState)(1.8),[n,i]=(0,s.useState)(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),a=(0,s.useRef)(null),f=(0,s.useRef)(null),h=(0,s.useRef)(null);(0,s.useEffect)(()=>(window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{i(e.matches?"dark":"light")}),f.current=new(c()).Map({container:a.current,style:"mapbox://styles/mapbox/".concat(n,"-v10"),center:[e,t],zoom:r,projection:"globe"}),f.current.addControl(new(c()).NavigationControl({visualizePitch:!1}),"top-right"),fetch("".concat("https://airlabs.co/api/v9","/flights?api_key=").concat("6d660a02-43ea-46fe-b79d-26ba567dc8fd","&_view=array&_fields=flight_iata,lng,lat&arr_iata=sfo")).then(e=>e.json()).then(e=>{e.forEach(e=>{h.current=document.createElement("div");let t=(0,u.createRoot)(h.current);t.render((0,o.jsx)(l,{fill:"light"===n?"#666":"#fff"}));let r=new(c()).Popup().setHTML("<h3>".concat(e[0],"</h3>"));new(c()).Marker(h.current).setLngLat([e[1],e[2]]).setPopup(r).addTo(f.current)})}),()=>{window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change",()=>{}),f.current.remove()}),[n]);let d=(0,s.useMemo)(()=>({backgroundColor:"light"===n?"#b9defe":"#000",height:"100vh",width:"100vw"}),[n]);return(0,o.jsx)("main",{style:d,children:(0,o.jsx)("div",{className:"map-container",ref:a})})}},4704:function(){},9814:function(){},6003:function(e){!function(){var t={229:function(e){var t,r,n,o=e.exports={};function i(){throw Error("setTimeout has not been defined")}function c(){throw Error("clearTimeout has not been defined")}function s(e){if(t===setTimeout)return setTimeout(e,0);if((t===i||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(r){try{return t.call(null,e,0)}catch(r){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:i}catch(e){t=i}try{r="function"==typeof clearTimeout?clearTimeout:c}catch(e){r=c}}();var a=[],u=!1,l=-1;function f(){u&&n&&(u=!1,n.length?a=n.concat(a):l=-1,a.length&&h())}function h(){if(!u){var e=s(f);u=!0;for(var t=a.length;t;){for(n=a,a=[];++l<t;)n&&n[l].run();l=-1,t=a.length}n=null,u=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===c||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function d(e,t){this.fun=e,this.array=t}function p(){}o.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];a.push(new d(e,t)),1!==a.length||u||s(h)},d.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=p,o.addListener=p,o.once=p,o.off=p,o.removeListener=p,o.removeAllListeners=p,o.emit=p,o.prependListener=p,o.prependOnceListener=p,o.listeners=function(e){return[]},o.binding=function(e){throw Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw Error("process.chdir is not supported")},o.umask=function(){return 0}}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var i=r[e]={exports:{}},c=!0;try{t[e](i,i.exports,n),c=!1}finally{c&&delete r[e]}return i.exports}n.ab="//";var o=n(229);e.exports=o}()},3177:function(e,t,r){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=r(6006),o=Symbol.for("react.element"),i=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),c=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s={key:!0,ref:!0,__self:!0,__source:!0};t.jsx=function(e,t,r){var n,a={},u=null,l=null;for(n in void 0!==r&&(u=""+r),void 0!==t.key&&(u=""+t.key),void 0!==t.ref&&(l=t.ref),t)i.call(t,n)&&!s.hasOwnProperty(n)&&(a[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===a[n]&&(a[n]=t[n]);return{$$typeof:o,type:e,key:u,ref:l,props:a,_owner:c.current}}},9268:function(e,t,r){"use strict";e.exports=r(3177)}},function(e){e.O(0,[432,253,488,744],function(){return e(e.s=8121)}),_N_E=e.O()}]);