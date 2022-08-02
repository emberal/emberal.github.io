"use strict";(self.webpackChunkmartials_website=self.webpackChunkmartials_website||[]).push([[458],{3156:function(e,t,r){var n=r(7294);function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i.apply(this,arguments)}function o(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var a=(0,n.forwardRef)((function(e,t){var r=e.color,a=void 0===r?"currentColor":r,s=e.size,l=void 0===s?24:s,u=o(e,["color","size"]);return n.createElement("svg",i({ref:t,xmlns:"http://www.w3.org/2000/svg",width:l,height:l,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},u),n.createElement("circle",{cx:"11",cy:"11",r:"8"}),n.createElement("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"}))}));a.displayName="Search",t.Z=a},5513:function(e,t,r){r.d(t,{K:function(){return i}});var n=r(7294);t.Z=function(e){var t=e.className,r=e.id,i=e.name,a=e.type,s=e.title,l=e.placeholder,u=e.required,p=e.onChange,c=e.leading,h=e.trailing,f=n.useState(!1),x=f[0],d=f[1],g=n.useState(!1),m=g[0],v=g[1],y=n.useState(!1),b=y[0],w=y[1];return n.useEffect((function(){var e=!0;function t(t){e&&v(t)}if(r){var n=document.getElementById(r);n&&(n.addEventListener("pointerenter",(function(){return t(!0)})),n.addEventListener("pointerleave",(function(){return t(!1)})))}return function(){var n,i;r&&(null===(n=document.getElementById(r))||void 0===n||n.removeEventListener("pointerenter",(function(){return t(!0)})),null===(i=document.getElementById(r))||void 0===i||i.removeEventListener("pointerleave",(function(){return t(!1)})));e=!1}}),[]),n.createElement("div",{className:"flex flex-row items-center relative"},c,n.createElement(o,{title:s,isActive:x||m||b}),n.createElement("input",{className:"dark:bg-gray-900 focus:border-primaryPurple outline-none border-2 border-gray-500 pl-2 "+t,id:r,onFocus:function(){return d(!0)},onBlur:function(){return d(!1)},name:i,type:a,placeholder:l,required:u,onInput:function(){if(r){var e=document.getElementById(r);w(""!==e.value)}},onChange:p}),h)};var i=function(e){var t=e.className,r=e.id,i=e.name,a=e.title,s=e.placeholder,l=e.required,u=void 0!==l&&l,p=e.onChange,c=n.useState(!1),h=c[0],f=c[1],x=n.useState(!1),d=x[0],g=x[1],m=n.useState(!1),v=m[0],y=m[1];return n.useEffect((function(){var e=!0;function t(t){e&&g(t)}if(r){var n=document.getElementById(r);n&&(n.addEventListener("pointerenter",(function(){return t(!0)})),n.addEventListener("pointerleave",(function(){return t(!1)})))}return function(){var n,i;r&&(null===(n=document.getElementById(r))||void 0===n||n.removeEventListener("pointerenter",(function(){return t(!0)})),null===(i=document.getElementById(r))||void 0===i||i.removeEventListener("pointerleave",(function(){return t(!1)})),e=!1)}}),[]),n.createElement("div",{className:"relative"},n.createElement(o,{title:a,isActive:h||d||v}),n.createElement("textarea",{id:r,className:"pl-2 min-h-[3rem] dark:bg-gray-900 focus:border-primaryPurple outline-none\n                                   border-2 border-gray-500 "+t,name:i,placeholder:s,required:u,onInput:function(){if(r){var e=document.getElementById(r);y(""!==e.value)}},onFocus:function(){return f(!0)},onBlur:function(){return f(!1)},onChange:p}))},o=function(e){var t=e.title,r=e.isActive,i=void 0!==r&&r;return n.createElement("span",{className:"absolute pointer-events-none\n                 "+(i?"-top-2 left-3 bg-white dark:bg-gray-900 text-sm":"left-2 top-1")+" \n            transition-all duration-150 text-gray-600 dark:text-gray-400"},n.createElement("div",{className:"z-50 relative"},t),n.createElement("div",{className:"w-full h-2 bg-white dark:bg-gray-900 absolute bottom-1/3 z-10"}))}},7639:function(e,t,r){r.r(t),r.d(t,{default:function(){return te},simplify:function(){return J}});var n=r(7294),i=r(1155),o=r(5513);function a(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(r)return(r=r.call(e)).next.bind(r);if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return s(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return s(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0;return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var l=function(){function e(e,t,r){var n=r.values,i=void 0===n?[]:n;this.operator=e,this.weight=t,this.values=i}e.getValues=function(){return[e.implication,e.or,e.and,e.not]},e.getOperator=function(t){for(var r,n=a(e.getValues());!(r=n()).done;){var i=r.value;if(i.operator===t)return i}return null},e.isOperator=function(e){return this.getValues().some((function(t){return t.operator===e}))};var t=e.prototype;return t.append=function(e){this.values[this.values.length]=e},t.toString=function(){return this.operator},e}();l.implication=new l(">",0,{values:["implication","imp","impliserer","->","=>"]}),l.or=new l("|",1,{values:["or","eller","V","\\/"]}),l.and=new l("&",2,{values:["and","og","/\\"]}),l.not=new l("!",3,{values:["not","ikke","¬","~","-"]});var u=function(){function e(e,t,r,n){var i=n.leading,o=void 0===i?"":i,a=n.trailing,s=void 0===a?"":a,l=n.isAtomic,u=void 0!==l&&l;this.leading=o,this.exp1=e,this.operator=t,this.exp2=r,this.trailing=s,this.isAtomic=u}var t=e.prototype;return t._isString=function(e){var t=e.exp1,r=void 0===t?null:t,n=e.exp2,i=void 0===n?null:n,o=!1;return null!==r&&(o="string"==typeof r),null!==i&&(o="string"==typeof i),o},t.equals=function(e){if(this===e)return!0;if("string"!=typeof this&&"string"!=typeof e){if(this.isAtomic&&e.isAtomic&&this.exp1===e.exp1)return!0;if(!this.isAtomic&&!e.isAtomic&&this.operator===e.operator)if(this._isString({exp1:this.exp1,exp2:this.exp2})&&this._isString({exp1:e.exp1,exp2:e.exp2})){if(this.exp1===e.exp1&&this.exp2===e.exp2||this.exp1===e.exp2&&this.exp2===e.exp1)return!0}else if(!this._isString({exp1:this.exp1,exp2:this.exp2})&&!this._isString({exp1:e.exp1,exp2:e.exp2})&&this.exp1&&this.exp2&&e.exp1&&e.exp2&&(this.exp1.equals(e.exp1)&&this.exp2.equals(e.exp2)||this.exp1.equals(e.exp2)&&this.exp1.equals(e.exp2)))return!0}else{var t=function(e,t){return"string"==typeof e&&"string"!=typeof t&&e===t.exp1};if(t(this,e)||t(e,this))return!0}return!1},t.getAtomicValue=function(){return"string"==typeof this.exp1?this.exp1:this.exp1&&this.exp1.isAtomic?this.exp1.getAtomicValue():null},t.laws=function(){this.absorption(),this.eliminationOfImplication(),this.deMorgansLaw(),this.assosiativeLaw(),this.distributivity(),this.commutativeLaw(),this.mergeNot()},t.distributivity=function(){var t=this;if(this.exp1&&this.exp2&&"object"==typeof this.exp1&&"object"==typeof this.exp2&&!this.exp1.isAtomic&&!this.exp2.isAtomic){var r=function(r,n,i){t.exp2=new e(r,t.operator,n,{}),t.exp1=new e(i,null,null,{isAtomic:!0}),t.operator=t.operator===l.and?l.or:l.and,t.operator!==l.and?(t.leading.includes("(")||(t.leading+="("),t.trailing.includes(")")||(t.trailing+=")")):(t.exp2.leading.includes("(")||(t.exp2.leading="("),t.exp2.trailing.includes(")")||(t.exp2.trailing=")"))};this.exp1.exp1&&this.exp1.exp2&&this.exp2.exp1&&this.exp2.exp2&&this.exp1.operator!==this.operator&&(this.exp1.exp1.getAtomicValue()===this.exp2.exp1.getAtomicValue()?r(this.exp1.exp2,this.exp2.exp2,this.exp1.exp1):this.exp1.exp1.getAtomicValue()===this.exp2.exp2.getAtomicValue()?r(this.exp1.exp2,this.exp2.exp1,this.exp1.exp1):this.exp1.exp2.getAtomicValue()===this.exp2.exp1.getAtomicValue()?r(this.exp1.exp1,this.exp2.exp2,this.exp1.exp2):this.exp1.exp2.getAtomicValue()===this.exp2.exp2.getAtomicValue()&&r(this.exp1.exp1,this.exp2.exp1,this.exp1.exp2))}},t.deMorgansLaw=function(){if(this.exp1&&this.exp2&&this._isNot(this.exp1)&&this._isNot(this.exp2)){var t=null;switch(this.operator){case l.and:t=l.or;break;case l.or:t=l.and}null!==t&&(this.exp1=new e(this._removeNot(this.exp1),t,this._removeNot(this.exp2),{leading:"!(",trailing:")"}),this.operator=null,this.exp2=null)}},t._isNot=function(e){return"string"==typeof e?"!"===e.charAt(0):e.leading.includes("!")},t._removeNot=function(e){return"string"==typeof e?e.replace("!",""):(e.leading=e.leading.replace("!",""),e)},t.assosiativeLaw=function(){},t.commutativeLaw=function(){var e=this,t=function(){var t=e.exp1;e.exp1=e.exp2,e.exp2=t};if(this.exp1&&this.exp2)if("string"==typeof this.exp1&&"string"==typeof this.exp2&&this.exp1>this.exp2)t();else if("object"==typeof this.exp1&&"object"==typeof this.exp2&&this.exp1.isAtomic&&this.exp2.isAtomic){var r=this.exp1.getAtomicValue(),n=this.exp2.getAtomicValue();r&&n&&r>n&&t()}},t.eliminationOfImplication=function(){this.exp1&&this.exp2&&this.operator===l.implication&&("string"!=typeof this.exp1?(this.exp1.isAtomic||(this.exp1.leading.includes("(")||(this.exp1.leading+="("),this.exp1.trailing.includes(")")||(this.exp1.trailing+=")")),this.exp1.leading="!"+this.exp1.leading):this.exp1="!"+this.exp1,this.operator=l.or)},t.absorption=function(){var e=this;if(this.exp1&&this.exp2&&"string"!=typeof this.exp1&&"string"!=typeof this.exp2){var t=function(e){e.leading="",e.operator=null,e.exp2=null,e.trailing=""};if(this.exp1.isAtomic&&this.exp2.isAtomic)this.exp1.getAtomicValue()===this.exp2.getAtomicValue()&&(t(this),this.isAtomic=!0);else if(this.exp1.isAtomic||this.exp2.isAtomic){var r=function(r,n,i){var o,a,s=r.getAtomicValue();if(s&&function(t,r){var n,i,o=e.operator===l.and;return o||(o=e.operator===l.or&&t.operator===l.and),o||(o=e.operator===l.implication),o&&"string"!=typeof t.exp1&&"string"!=typeof t.exp2&&(r===(null===(n=t.exp1)||void 0===n?void 0:n.getAtomicValue())||r===(null===(i=t.exp2)||void 0===i?void 0:i.getAtomicValue()))}(n,s))if("object"==typeof n.exp1&&null!==(o=n.exp1)&&void 0!==o&&o.isAtomic&&e.operator!==l.or){if(n.operator===l.and)(null===(a=n.exp1)||void 0===a?void 0:a.getAtomicValue())===s&&(n.exp1=n.exp2),t(n),n.isAtomic=!0;else if(n.operator===l.or){var u;(null===(u=n.exp1)||void 0===u?void 0:u.getAtomicValue())!==s&&(n.exp1=n.exp2),t(n),n.isAtomic=!0}}else i(),t(e),e.isAtomic=!0};this.exp1.isAtomic?r(this.exp1,this.exp2,(function(){return null})):r(this.exp2,this.exp1,(function(){return e.exp1=e.exp2}))}else this.exp1.equals(this.exp2)?(t(this),this.exp1.leading.includes("!")||(this.exp1.leading="",this.exp1.trailing="")):"object"==typeof this.exp1.exp1&&"object"==typeof this.exp1.exp2&&"object"==typeof this.exp2.exp1&&(this.exp2.exp2,1)&&this.exp1.exp1&&this.exp1.exp2&&this.exp2.exp1&&this.exp2.exp2&&(this.exp1.exp1.equals(this.exp2.exp1)&&this.exp1.exp2.equals(this.exp2.exp2)||this.exp1.exp1.equals(this.exp2.exp2)&&this.exp1.exp2.equals(this.exp2.exp1)?this.exp1.operator===l.and?(this.exp1=this.exp2,t(this)):this.exp2.operator===l.and&&t(this):this.exp1.operator===this.operator&&this.exp2.operator===this.operator&&(this.exp1.exp1.equals(this.exp2.exp1)||this.exp1.exp2.equals(this.exp2.exp1)?(this.exp2.exp1=this.exp2.exp2,t(this.exp2),this.exp2.isAtomic=!0):(this.exp1.exp1.equals(this.exp2.exp2)||this.exp1.exp2.equals(this.exp2.exp2))&&(t(this.exp2),this.exp2.isAtomic=!0)))}},t.mergeNot=function(){for(var e,t,r=0;"!"===this.leading.charAt(r);)r++;(r>1&&(this.leading=this.leading.replace(/!/g,""),r%2!=0&&(this.leading="!"+this.leading)),"string"!=typeof this.exp1)&&(null===(e=this.exp1)||void 0===e||e.mergeNot());"string"!=typeof this.exp2&&(null===(t=this.exp2)||void 0===t||t.mergeNot())},e.getNumberOfAtomics=function(e){return"string"==typeof e?1:null===e?0:this.getNumberOfAtomics(e.exp1)+this.getNumberOfAtomics(e.exp2)},t.solve=function(e,t){switch(this.operator){case l.and:return e&&t;case l.or:return e||t;case l.implication:return!e||t;default:return!1}},t.toString=function(){var e=this.leading;return null!==this.exp1&&(e+=this.exp1.toString(),null!==this.operator&&(e+=" "+this.operator.toString(),null!==this.exp2&&(e+=" "+this.exp2.toString())),e+=this.trailing),e},e}(),p=r(3156),c=function(e){var t=e.expression,r=e.className,i=e.id,o=[];!function e(t){t&&"string"!=typeof t&&(e(t.exp1),e(t.exp2),o.push(t))}(t);for(var a=u.getNumberOfAtomics(t),s=new Array(a),l=Math.pow(2,s.length)/2,p=0;p<s.length;p++){var c=!0,h=0;s[p]=new Array(Math.pow(2,s.length));for(var f=0;f<s[p].length;f++)h===l&&(c=!c,h=0),s[p][f]=c,h++;l/=2}for(var x=0,d=0,g=new Array(o.length),m=0;s.length>0&&m<s[0].length;m++){g[m]=[];for(var v=0;v<o.length;v++)if(o[v].isAtomic)g[m][v]=s[x][d]?"T":"F",0===(x=(x+1)%s.length)&&(d=(d+1)%s[x].length);else{var y=!1,b=o[v].exp1;if("object"==typeof b)for(var w=0;w<o.length;w++)if(null!=b&&b.equals(o[w])){y="T"===g[m][w];break}var O="T"===g[m][v-1],A=o[v].solve(y,O);o[v].leading.includes("!")&&(A=!A),g[m][v]=A?"T":"F"}}return n.createElement("table",{className:"border border-gray-500 "+r,id:i},n.createElement("thead",{className:"border-b-2 border-gray-500"},n.createElement("tr",null,o.map((function(e,t){return n.createElement("th",{key:t,scope:"col",className:"border border-gray-500"},n.createElement("p",{className:"w-fit px-2"},e.toString()))})))),n.createElement("tbody",null,g.map((function(e,t){return n.createElement("tr",{key:t,className:"dark:hover:text-black hover:text-white"},g[t].map((function(e,t){return n.createElement("td",{key:t,className:"text-center border border-gray-500\n                                "+("T"===e?"bg-green-500 dark:bg-green-700":"bg-red-500 dark:bg-red-700")},n.createElement("p",null,e))})))}))))},h=r(4942),f=r(4925),x=r(885),d=r(8222),g=r(3781),m=r(5527),v=r(3128),y=r(2982),b=r(260),w=r(5307),O=r(9777),A=["passive"];function E(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?E(Object(r),!0).forEach((function(t){(0,h.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):E(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var S=(0,n.createContext)(null);function k(){var e=(0,n.useContext)(S);if(null===e){var t=new Error("You used a <Label /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(t,k),t}return e}function P(){var e=(0,n.useState)([]),t=(0,x.Z)(e,2),r=t[0],i=t[1];return[r.length>0?r.join(" "):void 0,(0,n.useMemo)((function(){return function(e){var t=(0,O.z)((function(e){return i((function(t){return[].concat((0,y.Z)(t),[e])})),function(){return i((function(t){var r=t.slice(),n=r.indexOf(e);return-1!==n&&r.splice(n,1),r}))}})),r=(0,n.useMemo)((function(){return{register:t,slot:e.slot,name:e.name,props:e.props}}),[t,e.slot,e.name,e.props]);return n.createElement(S.Provider,{value:r},e.children)}}),[i])]}var N=(0,d.yV)((function(e,t){var r=e.passive,n=void 0!==r&&r,i=(0,f.Z)(e,A),o=k(),a="headlessui-label-".concat((0,g.M)()),s=(0,w.T)(t);(0,b.e)((function(){return o.register(a)}),[a,o.register]);var l=j(j({ref:s},o.props),{},{id:a});return n&&("onClick"in l&&delete l.onClick,"onClick"in i&&delete i.onClick),(0,d.sY)({ourProps:l,theirProps:i,slot:o.slot||{},defaultTag:"label",name:o.name||"Label"})}));function V(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function T(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?V(Object(r),!0).forEach((function(t){(0,h.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):V(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var C=(0,n.createContext)(null);function I(){var e=(0,n.useContext)(C);if(null===e){var t=new Error("You used a <Description /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(t,I),t}return e}function D(){var e=(0,n.useState)([]),t=(0,x.Z)(e,2),r=t[0],i=t[1];return[r.length>0?r.join(" "):void 0,(0,n.useMemo)((function(){return function(e){var t=(0,O.z)((function(e){return i((function(t){return[].concat((0,y.Z)(t),[e])})),function(){return i((function(t){var r=t.slice(),n=r.indexOf(e);return-1!==n&&r.splice(n,1),r}))}})),r=(0,n.useMemo)((function(){return{register:t,slot:e.slot,name:e.name,props:e.props}}),[t,e.slot,e.name,e.props]);return n.createElement(C.Provider,{value:r},e.children)}}),[i])]}var L=(0,d.yV)((function(e,t){var r=I(),n="headlessui-description-".concat((0,g.M)()),i=(0,w.T)(t);(0,b.e)((function(){return r.register(n)}),[n,r.register]);var o=e,a=T(T({ref:i},r.props),{},{id:n});return(0,d.sY)({ourProps:a,theirProps:o,slot:r.slot||{},defaultTag:"p",name:r.name||"Description"})})),q=r(3500),Z=["features"];function B(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function M(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?B(Object(r),!0).forEach((function(t){(0,h.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):B(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var _=function(e){return e[e.None=1]="None",e[e.Focusable=2]="Focusable",e[e.Hidden=4]="Hidden",e}(_||{}),z=(0,d.yV)((function(e,t){var r=e.features,n=void 0===r?1:r,i=(0,f.Z)(e,Z),o={ref:t,"aria-hidden":2==(2&n)||void 0,style:M({position:"absolute",width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0"},4==(4&n)&&2!=(2&n)&&{display:"none"})};return(0,d.sY)({ourProps:o,theirProps:i,slot:{},defaultTag:"div",name:"Hidden"})}));function F(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return Y(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return Y(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,i=function(){};return{s:i,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,s=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return a=e.done,e},e:function(e){s=!0,o=e},f:function(){try{a||null==r.return||r.return()}finally{if(s)throw o}}}}function Y(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var U=["checked","onChange","name","value"];function R(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var H=(0,n.createContext)(null);H.displayName="GroupContext";var G=n.Fragment;var K=(0,d.yV)((function(e,t){var r=e.checked,i=e.onChange,o=e.name,a=e.value,s=(0,f.Z)(e,U),l="headlessui-switch-".concat((0,g.M)()),u=(0,n.useContext)(H),p=(0,n.useRef)(null),c=(0,w.T)(p,t,null===u?null:u.setSwitch),x=(0,O.z)((function(){return i(!r)})),y=(0,O.z)((function(e){if((0,v.P)(e.currentTarget))return e.preventDefault();e.preventDefault(),x()})),b=(0,O.z)((function(e){e.key===m.R.Space?(e.preventDefault(),x()):e.key===m.R.Enter&&function(e){var t,r=null!=(t=null==e?void 0:e.form)?t:e.closest("form");if(r){var n,i=F(r.elements);try{for(i.s();!(n=i.n()).done;){var o=n.value;if("INPUT"===o.tagName&&"submit"===o.type||"BUTTON"===o.tagName&&"submit"===o.type||"INPUT"===o.nodeName&&"image"===o.type)return void o.click()}}catch(a){i.e(a)}finally{i.f()}}}(e.currentTarget)})),A=(0,O.z)((function(e){return e.preventDefault()})),E=(0,n.useMemo)((function(){return{checked:r}}),[r]),j={id:l,ref:c,role:"switch",type:(0,q.f)(e,p),tabIndex:0,"aria-checked":r,"aria-labelledby":null==u?void 0:u.labelledby,"aria-describedby":null==u?void 0:u.describedby,onClick:y,onKeyUp:b,onKeyPress:A};return n.createElement(n.Fragment,null,null!=o&&r&&n.createElement(z,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?R(Object(r),!0).forEach((function(t){(0,h.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):R(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({features:_.Hidden},(0,d.oA)({as:"input",type:"checkbox",hidden:!0,readOnly:!0,checked:r,name:o,value:a}))),(0,d.sY)({ourProps:j,theirProps:s,slot:E,defaultTag:"button",name:"Switch"}))})),W=Object.assign(K,{Group:function(e){var t=(0,n.useState)(null),r=(0,x.Z)(t,2),i=r[0],o=r[1],a=P(),s=(0,x.Z)(a,2),l=s[0],u=s[1],p=D(),c=(0,x.Z)(p,2),h=c[0],f=c[1],g=(0,n.useMemo)((function(){return{switch:i,setSwitch:o,labelledby:l,describedby:h}}),[i,o,l,h]),m=e;return n.createElement(f,{name:"Switch.Description"},n.createElement(u,{name:"Switch.Label",props:{onClick:function(){!i||(i.click(),i.focus({preventScroll:!0}))}}},n.createElement(H.Provider,{value:g},(0,d.sY)({ourProps:{},theirProps:m,defaultTag:G,name:"Switch.Group"}))))},Label:N,Description:L}),$=r(7782);function J(e,t){var r=function(e){for(var t=[],r=0;r<l.getValues().length;r++)l.getValues()[r]!==l.not&&(t[r]=l.getValues()[r].operator);if(t.some((function(t){return t===e.charAt(0)})))return console.error("Illegal input at index: 0"),!1;if(t.some((function(t){return t===e.charAt(e.length-1)})))return console.error("Illegal input at index: "+(e.length-1)),!1;for(var n=1;n<e.length-1;n++)if(e.charAt(n)!==l.not.operator&&l.isOperator(e.charAt(n))&&l.isOperator(e.charAt(n-1)))return console.error("Illegal input at index "+n),!1;return!0}(e),n=void 0;return r&&((n=Q(e,t)).leading.includes("!")||(n.leading="",n.trailing="")),n}function Q(e,t){if(e.length<3){var r="";return e.includes("!")&&(e=e.replace("!",""),r="!"),new u(e,null,null,{leading:r,isAtomic:!0})}var n=new u(null,null,null,{});"!"===e[0]&&ee(e.substring(1,e.length))&&(e=e.replace("!",""),n.leading="!"),e.length!==(e=X(e)).length&&(n.leading+="(",n.trailing+=")");var i=function(e){e=X(e);for(var t=0,r=[],n=0;n<e.length;n++){var i=0;try{for(var o=e.charAt(n);"("===o||i>0;)"("===(o=e.charAt(n))?i++:")"===o&&i--,n++}catch(c){console.error(c)}var a=l.getOperator(e.charAt(n));a&&a!==l.not&&(r[t++]={operator:a,index:n})}for(var s=r[0],u=!0,p=1;p<r.length;p++)r[p].operator.weight!==s.operator.weight&&(u=!1),r[p].operator.weight<=s.operator.weight&&(s=r[p]);return u?r[Math.floor(r.length/2)]:s}(e);return n.exp1=Q(e.substring(0,i.index),t),n.operator=i.operator,n.exp2=Q(e.substring(i.index+1,e.length),t),t&&n.laws(),null===n.exp2?n=n.exp1:n.exp1.isAtomic&&"object"==typeof n.exp1.exp1?n.exp1=n.exp1.exp1:n.exp2.isAtomic&&"object"==typeof n.exp2.exp1&&(n.exp2=n.exp2.exp1),n}function X(e){return ee(e)?e.substring(1,e.length-1):e}function ee(e){var t=0,r=!1;"("===e.charAt(0)&&(r=!0);for(var n=0;r&&("("===e.charAt(n)||t>0);)"("===e.charAt(n)?t++:")"===e.charAt(n)&&0===--t&&n!==e.length-1&&(r=!1),n++;return r}var te=function(e){!function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}(e);var t=n.useState(!0),r=t[0],a=t[1],s=n.useState(""),l=s[0],h=s[1],f=n.useRef(new u(null,null,null,{}));n.useEffect((function(){var e=!0;function t(t){if(e&&"Enter"===t.key){var r=document.getElementById("truth-input-button");r&&r.click()}}var r=document.getElementById("truth-input");return r&&r.addEventListener("keypress",(function(e){return t(e)})),function(){r&&r.removeEventListener("keypress",(function(e){return t(e)})),e=!1}}),[]);var x=(0,$.useTranslation)().t;return n.createElement(i.Z,{title:x("truthTables"),description:x("truthTablesDesc")},n.createElement("div",{className:"pt-2"},n.createElement(o.Z,{className:"rounded-xl !pl-7 h-10",id:"truth-input",placeholder:"A&B>C",leading:n.createElement(p.Z,{className:"pl-2 absolute"}),trailing:n.createElement(n.Fragment,null,n.createElement("button",{id:"truth-input-button",title:x("generate")+" (Enter)",className:"mx-1 px-1 border border-gray-500 rounded-xl shadow shadow-primaryPurple h-10",onClick:function(){var e,t=null===(e=document.getElementById("truth-input"))||void 0===e?void 0:e.value;if(t&&""!==t)if(t=t.replace(/\s+/g,""),r){var n=J(t,!0);n&&(f.current=n,h(n.toString()))}else{var i=J(t,!1);i&&(f.current=i,h(t))}else h("")}},x("generate")))}),n.createElement("span",{className:""},x("simplify"),": "),n.createElement(W,{checked:r,onChange:function(e){return a(e)},title:x("simplify"),className:(r?"bg-primaryPurple":"bg-gray-500")+" \n                                       relative inline-flex h-6 w-11 items-center rounded-full mt-2"},n.createElement("span",{className:"sr-only"},x("toggleSimplify")),n.createElement("span",{className:(r?"translate-x-6":"translate-x-1")+" inline-block h-4 w-4 transform rounded-full bg-white transition-all"})),""!==l?n.createElement(n.Fragment,null,r?n.createElement("p",null,x("output"),": ",l):null,n.createElement(c,{expression:f.current,className:"mt-2"})," "):null))}}}]);
//# sourceMappingURL=component---src-pages-truth-table-tsx-2bfb1cba80bff6b72673.js.map