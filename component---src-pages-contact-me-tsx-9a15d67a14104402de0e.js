(self.webpackChunkmartials_website=self.webpackChunkmartials_website||[]).push([[87],{8926:function(e){function t(e,t,r,n,o,i,a){try{var s=e[i](a),c=s.value}catch(u){return void r(u)}s.done?t(c):Promise.resolve(c).then(n,o)}e.exports=function(e){return function(){var r=this,n=arguments;return new Promise((function(o,i){var a=e.apply(r,n);function s(e){t(a,o,i,s,c,"next",e)}function c(e){t(a,o,i,s,c,"throw",e)}s(void 0)}))}},e.exports.__esModule=!0,e.exports.default=e.exports},3711:function(e,t,r){var n;!function(o){"use strict";function i(e){var t=e&&e.Promise||o.Promise,r=e&&e.XMLHttpRequest||o.XMLHttpRequest,n=o;return function(){var e=Object.create(n,{fetch:{value:void 0,writable:!0}});return function(e){if(!e.fetch){var n="URLSearchParams"in e,o="Symbol"in e&&"iterator"in Symbol,i="FileReader"in e&&"Blob"in e&&function(){try{return new Blob,!0}catch(e){return!1}}(),a="FormData"in e,s="ArrayBuffer"in e;if(s)var c=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],u=function(e){return e&&DataView.prototype.isPrototypeOf(e)},l=ArrayBuffer.isView||function(e){return e&&c.indexOf(Object.prototype.toString.call(e))>-1};m.prototype.append=function(e,t){e=h(e),t=p(t);var r=this.map[e];this.map[e]=r?r+","+t:t},m.prototype.delete=function(e){delete this.map[h(e)]},m.prototype.get=function(e){return e=h(e),this.has(e)?this.map[e]:null},m.prototype.has=function(e){return this.map.hasOwnProperty(h(e))},m.prototype.set=function(e,t){this.map[h(e)]=p(t)},m.prototype.forEach=function(e,t){for(var r in this.map)this.map.hasOwnProperty(r)&&e.call(t,this.map[r],r,this)},m.prototype.keys=function(){var e=[];return this.forEach((function(t,r){e.push(r)})),y(e)},m.prototype.values=function(){var e=[];return this.forEach((function(t){e.push(t)})),y(e)},m.prototype.entries=function(){var e=[];return this.forEach((function(t,r){e.push([r,t])})),y(e)},o&&(m.prototype[Symbol.iterator]=m.prototype.entries);var f=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];x.prototype.clone=function(){return new x(this,{body:this._bodyInit})},E.call(x.prototype),E.call(j.prototype),j.prototype.clone=function(){return new j(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new m(this.headers),url:this.url})},j.error=function(){var e=new j(null,{status:0,statusText:""});return e.type="error",e};var d=[301,302,303,307,308];j.redirect=function(e,t){if(-1===d.indexOf(t))throw new RangeError("Invalid status code");return new j(null,{status:t,headers:{location:e}})},e.Headers=m,e.Request=x,e.Response=j,e.fetch=function(e,n){return new t((function(t,o){var a=new x(e,n),s=new r;s.onload=function(){var e,r,n={status:s.status,statusText:s.statusText,headers:(e=s.getAllResponseHeaders()||"",r=new m,e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach((function(e){var t=e.split(":"),n=t.shift().trim();if(n){var o=t.join(":").trim();r.append(n,o)}})),r)};n.url="responseURL"in s?s.responseURL:n.headers.get("X-Request-URL");var o="response"in s?s.response:s.responseText;t(new j(o,n))},s.onerror=function(){o(new TypeError("Network request failed"))},s.ontimeout=function(){o(new TypeError("Network request failed"))},s.open(a.method,a.url,!0),"include"===a.credentials?s.withCredentials=!0:"omit"===a.credentials&&(s.withCredentials=!1),"responseType"in s&&i&&(s.responseType="blob"),a.headers.forEach((function(e,t){s.setRequestHeader(t,e)})),s.send(void 0===a._bodyInit?null:a._bodyInit)}))},e.fetch.polyfill=!0}function h(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function p(e){return"string"!=typeof e&&(e=String(e)),e}function y(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return o&&(t[Symbol.iterator]=function(){return t}),t}function m(e){this.map={},e instanceof m?e.forEach((function(e,t){this.append(t,e)}),this):Array.isArray(e)?e.forEach((function(e){this.append(e[0],e[1])}),this):e&&Object.getOwnPropertyNames(e).forEach((function(t){this.append(t,e[t])}),this)}function v(e){if(e.bodyUsed)return t.reject(new TypeError("Already read"));e.bodyUsed=!0}function b(e){return new t((function(t,r){e.onload=function(){t(e.result)},e.onerror=function(){r(e.error)}}))}function w(e){var t=new FileReader,r=b(t);return t.readAsArrayBuffer(e),r}function g(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function E(){return this.bodyUsed=!1,this._initBody=function(e){if(this._bodyInit=e,e)if("string"==typeof e)this._bodyText=e;else if(i&&Blob.prototype.isPrototypeOf(e))this._bodyBlob=e;else if(a&&FormData.prototype.isPrototypeOf(e))this._bodyFormData=e;else if(n&&URLSearchParams.prototype.isPrototypeOf(e))this._bodyText=e.toString();else if(s&&i&&u(e))this._bodyArrayBuffer=g(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!s||!ArrayBuffer.prototype.isPrototypeOf(e)&&!l(e))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=g(e)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):n&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},i&&(this.blob=function(){var e=v(this);if(e)return e;if(this._bodyBlob)return t.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return t.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return t.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?v(this)||t.resolve(this._bodyArrayBuffer):this.blob().then(w)}),this.text=function(){var e,r,n,o=v(this);if(o)return o;if(this._bodyBlob)return e=this._bodyBlob,r=new FileReader,n=b(r),r.readAsText(e),n;if(this._bodyArrayBuffer)return t.resolve(function(e){for(var t=new Uint8Array(e),r=new Array(t.length),n=0;n<t.length;n++)r[n]=String.fromCharCode(t[n]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return t.resolve(this._bodyText)},a&&(this.formData=function(){return this.text().then(_)}),this.json=function(){return this.text().then(JSON.parse)},this}function x(e,t){var r,n,o=(t=t||{}).body;if(e instanceof x){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new m(e.headers)),this.method=e.method,this.mode=e.mode,o||null==e._bodyInit||(o=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"omit",!t.headers&&this.headers||(this.headers=new m(t.headers)),this.method=(r=t.method||this.method||"GET",n=r.toUpperCase(),f.indexOf(n)>-1?n:r),this.mode=t.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(o)}function _(e){var t=new FormData;return e.trim().split("&").forEach((function(e){if(e){var r=e.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");t.append(decodeURIComponent(n),decodeURIComponent(o))}})),t}function j(e,t){t||(t={}),this.type="default",this.status=void 0===t.status?200:t.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new m(t.headers),this.url=t.url||"",this._initBody(e)}}(void 0!==e?e:this),{fetch:e.fetch,Headers:e.Headers,Request:e.Request,Response:e.Response}}()}void 0===(n=function(){return i}.call(t,r,t,e))||(e.exports=n)}("undefined"!=typeof self?self:void 0!==r.g?r.g:this)},5704:function(e,t,r){"use strict";var n=r(7294);function o(){return o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o.apply(this,arguments)}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var a=(0,n.forwardRef)((function(e,t){var r=e.color,a=void 0===r?"currentColor":r,s=e.size,c=void 0===s?24:s,u=i(e,["color","size"]);return n.createElement("svg",o({ref:t,xmlns:"http://www.w3.org/2000/svg",width:c,height:c,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},u),n.createElement("path",{d:"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"}))}));a.displayName="GitHub",t.Z=a},5106:function(e,t,r){"use strict";var n=r(7294);function o(){return o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o.apply(this,arguments)}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var a=(0,n.forwardRef)((function(e,t){var r=e.color,a=void 0===r?"currentColor":r,s=e.size,c=void 0===s?24:s,u=i(e,["color","size"]);return n.createElement("svg",o({ref:t,xmlns:"http://www.w3.org/2000/svg",width:c,height:c,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},u),n.createElement("path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}),n.createElement("rect",{x:"2",y:"9",width:"4",height:"12"}),n.createElement("circle",{cx:"4",cy:"4",r:"2"}))}));a.displayName="Linkedin",t.Z=a},9483:function(e,t,r){var n=r(7854),o=r(4411),i=r(6330),a=n.TypeError;e.exports=function(e){if(o(e))return e;throw a(i(e)+" is not a constructor")}},4411:function(e,t,r){var n=r(1702),o=r(7293),i=r(614),a=r(648),s=r(5005),c=r(2788),u=function(){},l=[],f=s("Reflect","construct"),d=/^\s*(?:class|function)\b/,h=n(d.exec),p=!d.exec(u),y=function(e){if(!i(e))return!1;try{return f(u,l,e),!0}catch(t){return!1}},m=function(e){if(!i(e))return!1;switch(a(e)){case"AsyncFunction":case"GeneratorFunction":case"AsyncGeneratorFunction":return!1}try{return p||!!h(d,c(e))}catch(t){return!0}};m.sham=!0,e.exports=!f||o((function(){var e;return y(y.call)||!y(Object)||!y((function(){e=!0}))||e}))?m:y},8523:function(e,t,r){"use strict";var n=r(9662),o=function(e){var t,r;this.promise=new e((function(e,n){if(void 0!==t||void 0!==r)throw TypeError("Bad Promise constructor");t=e,r=n})),this.resolve=n(t),this.reject=n(r)};e.exports.f=function(e){return new o(e)}},2492:function(e,t,r){var n=r(7854);e.exports=n.Promise},9478:function(e,t,r){var n=r(9670),o=r(111),i=r(8523);e.exports=function(e,t){if(n(e),o(t)&&t.constructor===e)return t;var r=i.f(e);return(0,r.resolve)(t),r.promise}},6707:function(e,t,r){var n=r(9670),o=r(9483),i=r(5112)("species");e.exports=function(e,t){var r,a=n(e).constructor;return void 0===a||null==(r=n(a)[i])?t:o(r)}},7727:function(e,t,r){"use strict";var n=r(2109),o=r(1913),i=r(2492),a=r(7293),s=r(5005),c=r(614),u=r(6707),l=r(9478),f=r(8052),d=i&&i.prototype;if(n({target:"Promise",proto:!0,real:!0,forced:!!i&&a((function(){d.finally.call({then:function(){}},(function(){}))}))},{finally:function(e){var t=u(this,s("Promise")),r=c(e);return this.then(r?function(r){return l(t,e()).then((function(){return r}))}:e,r?function(r){return l(t,e()).then((function(){throw r}))}:e)}}),!o&&c(i)){var h=s("Promise").prototype.finally;d.finally!==h&&f(d,"finally",h,{unsafe:!0})}},9060:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return te}});var n=r(7294),o=r(2459);function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i.apply(this,arguments)}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=(0,n.forwardRef)((function(e,t){var r=e.color,o=void 0===r?"currentColor":r,s=e.size,c=void 0===s?24:s,u=a(e,["color","size"]);return n.createElement("svg",i({ref:t,xmlns:"http://www.w3.org/2000/svg",width:c,height:c,viewBox:"0 0 24 24",fill:"none",stroke:o,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},u),n.createElement("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),n.createElement("polygon",{points:"22 2 15 22 11 13 2 9 22 2"}))}));s.displayName="Send";var c=s,u=r(5106),l=r(5704),f=(r(7727),r(3038)),d=r.n(f);var h=function(e){var t=this.constructor;return this.then((function(r){return t.resolve(e()).then((function(){return r}))}),(function(r){return t.resolve(e()).then((function(){return t.reject(r)}))}))};var p=function(e){return new this((function(t,r){if(!e||void 0===e.length)return r(new TypeError(typeof e+" "+e+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var n=Array.prototype.slice.call(e);if(0===n.length)return t([]);var o=n.length;function i(e,r){if(r&&("object"==typeof r||"function"==typeof r)){var a=r.then;if("function"==typeof a)return void a.call(r,(function(t){i(e,t)}),(function(r){n[e]={status:"rejected",reason:r},0==--o&&t(n)}))}n[e]={status:"fulfilled",value:r},0==--o&&t(n)}for(var a=0;a<n.length;a++)i(a,n[a])}))},y=setTimeout;function m(e){return Boolean(e&&void 0!==e.length)}function v(){}function b(e){if(!(this instanceof b))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],j(e,this)}function w(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,b._immediateFn((function(){var r=1===e._state?t.onFulfilled:t.onRejected;if(null!==r){var n;try{n=r(e._value)}catch(o){return void E(t.promise,o)}g(t.promise,n)}else(1===e._state?g:E)(t.promise,e._value)}))):e._deferreds.push(t)}function g(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var r=t.then;if(t instanceof b)return e._state=3,e._value=t,void x(e);if("function"==typeof r)return void j((n=r,o=t,function(){n.apply(o,arguments)}),e)}e._state=1,e._value=t,x(e)}catch(i){E(e,i)}var n,o}function E(e,t){e._state=2,e._value=t,x(e)}function x(e){2===e._state&&0===e._deferreds.length&&b._immediateFn((function(){e._handled||b._unhandledRejectionFn(e._value)}));for(var t=0,r=e._deferreds.length;t<r;t++)w(e,e._deferreds[t]);e._deferreds=null}function _(e,t,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=r}function j(e,t){var r=!1;try{e((function(e){r||(r=!0,g(t,e))}),(function(e){r||(r=!0,E(t,e))}))}catch(n){if(r)return;r=!0,E(t,n)}}b.prototype.catch=function(e){return this.then(null,e)},b.prototype.then=function(e,t){var r=new this.constructor(v);return w(this,new _(e,t,r)),r},b.prototype.finally=h,b.all=function(e){return new b((function(t,r){if(!m(e))return r(new TypeError("Promise.all accepts an array"));var n=Array.prototype.slice.call(e);if(0===n.length)return t([]);var o=n.length;function i(e,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var s=a.then;if("function"==typeof s)return void s.call(a,(function(t){i(e,t)}),r)}n[e]=a,0==--o&&t(n)}catch(c){r(c)}}for(var a=0;a<n.length;a++)i(a,n[a])}))},b.allSettled=p,b.resolve=function(e){return e&&"object"==typeof e&&e.constructor===b?e:new b((function(t){t(e)}))},b.reject=function(e){return new b((function(t,r){r(e)}))},b.race=function(e){return new b((function(t,r){if(!m(e))return r(new TypeError("Promise.race accepts an array"));for(var n=0,o=e.length;n<o;n++)b.resolve(e[n]).then(t,r)}))},b._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){y(e,0)},b._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var A=b,O=r(3711),T=r.n(O);function k(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function S(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function F(e,t,r){return t&&S(e.prototype,t),r&&S(e,r),e}var P="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",B=/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;var R,C=function(e){return function(e){for(var t,r,n,o,i="",a=0,s=(e=String(e)).length%3;a<e.length;){if((r=e.charCodeAt(a++))>255||(n=e.charCodeAt(a++))>255||(o=e.charCodeAt(a++))>255)throw new TypeError("Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.");i+=P.charAt((t=r<<16|n<<8|o)>>18&63)+P.charAt(t>>12&63)+P.charAt(t>>6&63)+P.charAt(63&t)}return s?i.slice(0,s-3)+"===".substring(s):i}(JSON.stringify(e))},U=function(e){var t="@formspree/core@".concat("2.6.4");return e?"".concat(e," ").concat(t):t},I=function(){return navigator.webdriver||!!document.documentElement.getAttribute(function(e){if(e=String(e).replace(/[\t\n\f\r ]+/g,""),!B.test(e))throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");e+="==".slice(2-(3&e.length));for(var t,r,n,o="",i=0;i<e.length;)t=P.indexOf(e.charAt(i++))<<18|P.indexOf(e.charAt(i++))<<12|(r=P.indexOf(e.charAt(i++)))<<6|(n=P.indexOf(e.charAt(i++))),o+=64===r?String.fromCharCode(t>>16&255):64===n?String.fromCharCode(t>>16&255,t>>8&255):String.fromCharCode(t>>16&255,t>>8&255,255&t);return o}("d2ViZHJpdmVy"))||!!window.callPhantom||!!window._phantom},N=function(){function e(){k(this,e),this.loadedAt=1*new Date,this.webdriver=I()}return F(e,[{key:"teardown",value:function(){}},{key:"data",value:function(){return{loadedAt:this.loadedAt,webdriver:this.webdriver}}}]),e}(),D=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};k(this,e),this.project=t.project,"undefined"!=typeof window&&this.startBrowserSession()}return F(e,[{key:"startBrowserSession",value:function(){this.session||(this.session=new N)}},{key:"teardown",value:function(){this.session&&this.session.teardown()}},{key:"submitForm",value:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=r.endpoint||"https://formspree.io",o=r.fetchImpl||T()({Promise:A}).fetch,i=this.project?"".concat(n,"/p/").concat(this.project,"/f/").concat(e):"".concat(n,"/f/").concat(e),a=function(e){return e instanceof FormData?e:JSON.stringify(e)},s={Accept:"application/json","Formspree-Client":U(r.clientName)};this.session&&(s["Formspree-Session-Data"]=C(this.session.data())),t instanceof FormData||(s["Content-Type"]="application/json");var c={method:"POST",mode:"cors",body:a(t),headers:s};return o(i,c).then((function(e){return e.json().then((function(t){return{body:t,response:e}}))}))}}]),e}(),L=function(){var e;return R||(R=new D(e)),R},q=r(7757),H=r.n(q),z=r(8),Z=r.n(z),G=r(9713),M=r.n(G),V=r(8926),W=r.n(V),J=(r(6479),n.createContext({client:void 0}));J.displayName="Formspree";function X(){return(0,n.useContext)(J).client||L()}var K="2.2.5";function Y(e){return void 0!==e.preventDefault}var $=r(7782),Q="w-full max-w-full h-10 min-h-fit max-h-64 resize-y border rounded-lg mb-2 dark:bg-gray-800 pl-2",ee=[{id:0,to:"https://www.linkedin.com/in/martin-b-2a69391a3",name:"LinkedIn",icon:n.createElement(u.Z,null)},{id:1,to:"https://github.com/h600878",name:"GitHub",icon:n.createElement(l.Z,null)}],te=function(){var e=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=(0,n.useState)(!1),o=d()(r,2),i=o[0],a=o[1],s=(0,n.useState)(!1),c=d()(s,2),u=c[0],l=c[1],f=(0,n.useState)([]),h=d()(f,2),p=h[0],y=h[1],m=X(),v=t.client||m;if(!v)throw new Error("You must provide a Formspree client");if(!e)throw new Error('You must provide a form key or hashid (e.g. useForm("myForm") or useForm("123xyz")');var b=!!t.debug,w=t.data,g=function(){a(!1),l(!1),y([])},E=function(){var r=W()(H().mark((function r(n){var o,i,s,c,u;return H().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(o=function(e){e.preventDefault();var t=e.target;if("FORM"!=t.tagName)throw new Error("submit was triggered for a non-form element");return new FormData(t)},i=Y(n)?o(n):n,s=function(e,t){i instanceof FormData?i.append(e,t):i=Object.assign(i,M()({},e,t))},"object"!==Z()(w)){r.next=19;break}r.t0=H().keys(w);case 5:if((r.t1=r.t0()).done){r.next=19;break}if(c=r.t1.value,"function"!=typeof w[c]){r.next=16;break}if(!((u=w[c].call(null))instanceof Promise)){r.next=13;break}return r.next=12,u;case 12:u=r.sent;case 13:void 0!==u&&s(c,u),r.next=17;break;case 16:s(c,w[c]);case 17:r.next=5;break;case 19:return a(!0),r.abrupt("return",v.submitForm(e,i,{endpoint:t.endpoint,clientName:"@formspree/react@".concat(K)}).then((function(e){var t,r=e.response.status;return 200===r?(b&&console.log("Form submitted",e),l(!0),y([])):r>=400&&r<500?((t=e.body).errors&&y(t.errors),b&&console.log("Validation error",e),l(!1)):(b&&console.log("Unexpected error",e),l(!1)),e})).catch((function(e){throw b&&console.log("Unexpected error",e),l(!1),e})).finally((function(){a(!1)})));case 21:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}();return[{submitting:i,succeeded:u,errors:p},E,g]}("mknykgbn"),t=e[0],r=e[1];if(t.succeeded){Array.from(document.querySelectorAll("input")).forEach((function(e){return e.value=""}));var i=document.getElementById("contact-me-text-area");null!==i&&(i.value="")}n.useEffect((function(){var e=function(e){if(e.ctrlKey){var t=document.getElementById("submit-button");null!==t&&t.click()}};return document.addEventListener("keyup",(function(t){return e(t)})),function(){document.removeEventListener("keyup",(function(t){return e(t)}))}}));var a=(0,$.useTranslation)().t;return n.createElement(o.Z,{title:a("contactMe"),description:a("contactMeDescription")}," ",n.createElement(n.Fragment,null,n.createElement("div",{className:"flex justify-center"},ee.map((function(e){return n.createElement("div",{className:"px-2",key:e.id},n.createElement("a",{title:e.name,href:e.to,target:"_blank",rel:"noreferrer"},e.icon))}))),n.createElement("form",{acceptCharset:"UTF-8",onSubmit:r},n.createElement("div",{className:"flex justify-between flex-col sm:flex-row"},n.createElement("label",null,n.createElement("p",null,a("yourName")),n.createElement("input",{className:Q,name:"name",type:"text",placeholder:"Ola Nordmann",required:!0})),n.createElement("label",null,n.createElement("p",null,a("subject")),n.createElement("input",{className:Q,name:"Subject",type:"text",placeholder:"Heisann!",required:!0}))),n.createElement("label",null,n.createElement("p",null,a("yourEmail")),n.createElement("input",{className:Q,name:"email",type:"email",placeholder:"ola@nordmann.no",required:!0})),n.createElement("label",null,n.createElement("p",null,a("message")),n.createElement("textarea",{id:"contact-me-text-area",className:Q,name:"message",placeholder:a("message"),required:!0})),n.createElement("input",{name:"_gotcha",type:"text",className:"hidden"})," ",n.createElement("p",null),n.createElement("button",{id:"submit-button",className:"float-right",title:"Send",type:"submit",disabled:t.submitting},n.createElement(c,null),n.createElement("p",{className:"hidden"},"Send")),t.succeeded?n.createElement("p",null,a("messageSent")):null)))}}}]);
//# sourceMappingURL=component---src-pages-contact-me-tsx-9a15d67a14104402de0e.js.map