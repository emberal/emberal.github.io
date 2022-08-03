"use strict";(self.webpackChunkmartials_website=self.webpackChunkmartials_website||[]).push([[458],{3156:function(t,e,r){var i=r(7294);function n(){return n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t},n.apply(this,arguments)}function o(t,e){if(null==t)return{};var r,i,n=function(t,e){if(null==t)return{};var r,i,n={},o=Object.keys(t);for(i=0;i<o.length;i++)r=o[i],e.indexOf(r)>=0||(n[r]=t[r]);return n}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(i=0;i<o.length;i++)r=o[i],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(n[r]=t[r])}return n}var l=(0,i.forwardRef)((function(t,e){var r=t.color,l=void 0===r?"currentColor":r,a=t.size,s=void 0===a?24:a,u=o(t,["color","size"]);return i.createElement("svg",n({ref:e,xmlns:"http://www.w3.org/2000/svg",width:s,height:s,viewBox:"0 0 24 24",fill:"none",stroke:l,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},u),i.createElement("circle",{cx:"11",cy:"11",r:"8"}),i.createElement("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"}))}));l.displayName="Search",e.Z=l},5513:function(t,e,r){r.d(e,{K:function(){return n}});var i=r(7294);e.Z=function(t){var e=t.className,r=t.id,n=t.name,l=t.type,a=t.title,s=t.placeholder,u=t.required,c=t.onChange,h=t.leading,f=t.trailing,g=i.useState(!1),d=g[0],p=g[1],m=i.useState(!1),v=m[0],y=m[1],b=i.useState(!1),w=b[0],A=b[1];return i.useEffect((function(){var t=!0;function e(e){t&&y(e)}if(r){var i=document.getElementById(r);i&&(i.addEventListener("pointerenter",(function(){return e(!0)})),i.addEventListener("pointerleave",(function(){return e(!1)})))}return function(){var i,n;r&&(null===(i=document.getElementById(r))||void 0===i||i.removeEventListener("pointerenter",(function(){return e(!0)})),null===(n=document.getElementById(r))||void 0===n||n.removeEventListener("pointerleave",(function(){return e(!1)})));t=!1}}),[]),i.createElement("div",{className:"flex flex-row items-center relative"},h,i.createElement(o,{title:a,isActive:d||v||w}),i.createElement("input",{className:"dark:bg-gray-900 focus:border-primaryPurple outline-none border-2 border-gray-500 pl-2 "+e,id:r,onFocus:function(){return p(!0)},onBlur:function(){return p(!1)},name:n,type:l,placeholder:s,required:u,onInput:function(){if(r){var t=document.getElementById(r);A(""!==t.value)}},onChange:c}),f)};var n=function(t){var e=t.className,r=t.id,n=t.name,l=t.title,a=t.placeholder,s=t.required,u=void 0!==s&&s,c=t.onChange,h=i.useState(!1),f=h[0],g=h[1],d=i.useState(!1),p=d[0],m=d[1],v=i.useState(!1),y=v[0],b=v[1];return i.useEffect((function(){var t=!0;function e(e){t&&m(e)}if(r){var i=document.getElementById(r);i&&(i.addEventListener("pointerenter",(function(){return e(!0)})),i.addEventListener("pointerleave",(function(){return e(!1)})))}return function(){var i,n;r&&(null===(i=document.getElementById(r))||void 0===i||i.removeEventListener("pointerenter",(function(){return e(!0)})),null===(n=document.getElementById(r))||void 0===n||n.removeEventListener("pointerleave",(function(){return e(!1)})),t=!1)}}),[]),i.createElement("div",{className:"relative"},i.createElement(o,{title:l,isActive:f||p||y}),i.createElement("textarea",{id:r,className:"pl-2 min-h-[3rem] dark:bg-gray-900 focus:border-primaryPurple outline-none\n                                   border-2 border-gray-500 "+e,name:n,placeholder:a,required:u,onInput:function(){if(r){var t=document.getElementById(r);b(""!==t.value)}},onFocus:function(){return g(!0)},onBlur:function(){return g(!1)},onChange:c}))},o=function(t){var e=t.title,r=t.isActive,n=void 0!==r&&r;return i.createElement("span",{className:"absolute pointer-events-none\n                 "+(n?"-top-2 left-3 bg-white dark:bg-gray-900 text-sm":"left-2 top-1")+" \n            transition-all duration-150 text-gray-600 dark:text-gray-400"},i.createElement("div",{className:"z-50 relative"},e),i.createElement("div",{className:"w-full h-2 bg-white dark:bg-gray-900 absolute bottom-1/3 z-10"}))}},8979:function(t,e,r){r.r(e),r.d(e,{default:function(){return it},simplify:function(){return X}});var i=r(7294),n=r(1155),o=r(5513);function l(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return a(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return a(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var i=0;return function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,i=new Array(e);r<e;r++)i[r]=t[r];return i}var s=function(){function t(t,e,r){var i=r.values,n=void 0===i?[]:i;this.operator=t,this.weight=e,this.values=n}t.getValues=function(){return[t.implication,t.or,t.and,t.not]},t.getOperator=function(e){for(var r,i=l(t.getValues());!(r=i()).done;){var n=r.value;if(n.operator===e)return n}return null},t.isOperator=function(t){return this.getValues().some((function(e){return e.operator===t}))};var e=t.prototype;return e.append=function(t){this.values[this.values.length]=t},e.toString=function(){return this.operator},t}();s.implication=new s(">",0,{values:["implication","imp","impliserer","->","=>"]}),s.or=new s("|",1,{values:["or","eller","V","\\/"]}),s.and=new s("&",2,{values:["and","og","/\\"]}),s.not=new s("!",3,{values:["not","ikke","¬","~","-"]});var u=function(){function t(t,e,r,i){var n=i.leading,o=void 0===n?"":n,l=i.trailing,a=void 0===l?"":l,s=i.isAtomic,u=void 0!==s&&s;this.leading=o,this.left=t,this.operator=e,this.right=r,this.trailing=a,this.isAtomic=u}var e=t.prototype;return e._isString=function(t){var e=t.left,r=void 0===e?null:e,i=t.right,n=void 0===i?null:i,o=!1;return null!==r&&(o="string"==typeof r),null!==n&&(o="string"==typeof n),o},e.equals=function(t){if(this===t)return!0;if("string"==typeof this||"string"==typeof t){var e=function(t,e){return"string"==typeof t&&"string"!=typeof e&&t===e.left};return e(this,t)||e(t,this)}return!(!this.isAtomic||!t.isAtomic||this.left!==t.left||this.leading!==t.leading)||!(this.isAtomic||t.isAtomic||this.operator!==t.operator||this._isString({left:this.left,right:this.right})||this._isString({left:t.left,right:t.right})||!this.left||!this.right||!t.left||!t.right||this.leading!==t.leading||!(this.left.equals(t.left)&&this.right.equals(t.right)||this.left.equals(t.right)&&this.left.equals(t.right)))},e.equalsAndOpposite=function(e){return this.leading.includes("!")?new t(this.left,this.operator,this.right,{isAtomic:this.isAtomic}).equals(e):!("object"!=typeof e||!e.leading.includes("!"))&&new t(e.left,e.operator,e.right,{isAtomic:e.isAtomic}).equals(this)},e.getAtomicValue=function(){return"string"==typeof this.left?this.left:this.left&&this.left.isAtomic?this.left.getAtomicValue():null},e.laws=function(){this.absorption(),this.eliminationOfImplication(),this.deMorgansLaw(),this.assosiativeLaw(),this.distributivity(),this.commutativeLaw(),this.mergeNot()},e.distributivity=function(){var e=this;if(this.left&&this.right&&"object"==typeof this.left&&"object"==typeof this.right&&!this.left.isAtomic&&!this.right.isAtomic){var r=function(r,i,n){e.right=new t(r,e.operator,i,{}),e.left=new t(n,null,null,{isAtomic:!0}),e.operator=e.operator===s.and?s.or:s.and,e.operator!==s.and?(e.leading.includes("(")||(e.leading+="("),e.trailing.includes(")")||(e.trailing+=")")):(e.right.leading.includes("(")||(e.right.leading="("),e.right.trailing.includes(")")||(e.right.trailing=")"))};this.left.left&&this.left.right&&this.right.left&&this.right.right&&this.left.operator!==this.operator&&"object"==typeof this.left.left&&"object"==typeof this.left.right&&"object"==typeof this.right.left&&"object"==typeof this.right.right&&(this.left.left.getAtomicValue()===this.right.left.getAtomicValue()&&this.left.right.getAtomicValue()!==this.right.right.getAtomicValue()?r(this.left.right,this.right.right,this.left.left):this.left.left.getAtomicValue()===this.right.right.getAtomicValue()&&this.left.right.getAtomicValue()!==this.right.left.getAtomicValue()?r(this.left.right,this.right.left,this.left.left):this.left.right.getAtomicValue()===this.right.left.getAtomicValue()&&this.left.left.getAtomicValue()!==this.right.right.getAtomicValue()?r(this.left.left,this.right.right,this.left.right):this.left.right.getAtomicValue()===this.right.right.getAtomicValue()&&this.left.left.getAtomicValue()!==this.right.left.getAtomicValue()&&r(this.left.left,this.right.left,this.left.right))}},e.deMorgansLaw=function(){if(this.left&&this.right&&this._isNot(this.left)&&this._isNot(this.right)){var e=null;switch(this.operator){case s.and:e=s.or;break;case s.or:e=s.and}null!==e&&(this.left=new t(this._removeNot(this.left),e,this._removeNot(this.right),{leading:"!(",trailing:")"}),this.operator=null,this.right=null)}},e._isNot=function(t){return"string"==typeof t?"!"===t.charAt(0):t.leading.includes("!")},e._removeNot=function(t){return"string"==typeof t?t.replace("!",""):(t.leading=t.leading.replace("!",""),t)},e.assosiativeLaw=function(){},e.commutativeLaw=function(){var t=this,e=function(){var e=t.left;t.left=t.right,t.right=e};if(this.left&&this.right)if("string"==typeof this.left&&"string"==typeof this.right&&this.left>this.right)e();else if("object"==typeof this.left&&"object"==typeof this.right&&this.left.isAtomic&&this.right.isAtomic){var r=this.left.getAtomicValue(),i=this.right.getAtomicValue();r&&i&&r>i&&e()}},e.eliminationOfImplication=function(){this.left&&this.right&&this.operator===s.implication&&("string"!=typeof this.left?(this.left.isAtomic||(this.left.leading.includes("(")||(this.left.leading+="("),this.left.trailing.includes(")")||(this.left.trailing+=")")),this.left.leading="!"+this.left.leading):this.left="!"+this.left,this.operator=s.or)},e.absorption=function(){var t=this;if(this.left&&this.right&&"string"!=typeof this.left&&"string"!=typeof this.right){var e=function(t){t.leading="",t.operator=null,t.right=null,t.trailing=""};if(this.left.isAtomic&&this.right.isAtomic)this.left.getAtomicValue()===this.right.getAtomicValue()&&(!this.left.leading.includes("!")&&!this.right.leading.includes("!")||this.left.leading.includes("!")&&this.right.leading.includes("!"))&&(e(this),this.isAtomic=!0);else if(this.left.isAtomic||this.right.isAtomic){var r=function(r,i,n){var o,l,a,u,c,h,f,g=r.getAtomicValue();if(g&&(a=i,u=g,(f=t.operator===s.and)||(f=t.operator===s.or&&a.operator===s.and),f||(f=t.operator===s.implication),f&&"string"!=typeof a.left&&"string"!=typeof a.right&&(u===(null===(c=a.left)||void 0===c?void 0:c.getAtomicValue())||u===(null===(h=a.right)||void 0===h?void 0:h.getAtomicValue()))))if("object"==typeof i.left&&null!==(o=i.left)&&void 0!==o&&o.isAtomic&&t.operator!==s.or){if(i.operator===s.and)(null===(l=i.left)||void 0===l?void 0:l.getAtomicValue())===g&&(i.left=i.right),e(i),i.isAtomic=!0;else if(i.operator===s.or){var d;(null===(d=i.left)||void 0===d?void 0:d.getAtomicValue())!==g&&(i.left=i.right),e(i),i.isAtomic=!0}}else n(),e(t),t.isAtomic=!0};this.left.isAtomic?r(this.left,this.right,(function(){return null})):r(this.right,this.left,(function(){return t.left=t.right}))}else this.left.equals(this.right)?((!this.left.leading.includes("!")&&!this.right.leading.includes("!")||this.left.leading.includes("!")&&this.right.leading.includes("!"))&&e(this),this.left.leading.includes("!")||(this.left.leading="",this.left.trailing="")):"object"==typeof this.left.left&&"object"==typeof this.left.right&&"object"==typeof this.right.left&&(this.right.right,1)&&this.left.left&&this.left.right&&this.right.left&&this.right.right&&this.left.leading===this.right.leading&&(this.left.left.equals(this.right.left)&&this.left.right.equals(this.right.right)||this.left.left.equals(this.right.right)&&this.left.right.equals(this.right.left)?this.left.operator===s.and?(this.left=this.right,e(this)):this.right.operator===s.and&&e(this):this.left.operator===this.operator&&this.right.operator===this.operator&&(this.left.left.equals(this.right.left)||this.left.right.equals(this.right.left)?(this.right.left=this.right.right,e(this.right),this.right.isAtomic=!0):(this.left.left.equals(this.right.right)||this.left.right.equals(this.right.right))&&(e(this.right),this.right.isAtomic=!0)))}},e.mergeNot=function(){for(var t,e,r=0;"!"===this.leading.charAt(r);)r++;(r>1&&(this.leading=this.leading.replace(/!/g,""),r%2!=0&&(this.leading="!"+this.leading)),"string"!=typeof this.left)&&(null===(t=this.left)||void 0===t||t.mergeNot());"string"!=typeof this.right&&(null===(e=this.right)||void 0===e||e.mergeNot())},t.getNumberOfAtomics=function(t){return"string"==typeof t?1:null===t?0:this.getNumberOfAtomics(t.left)+this.getNumberOfAtomics(t.right)},e.solve=function(t,e){switch(this.operator){case s.and:return t&&e;case s.or:return t||e;case s.implication:return!t||e;default:return!1}},e.toString=function(){var t=this.leading;return null!==this.left&&(t+=this.left.toString(),null!==this.operator&&(t+=" "+this.operator.toString(),null!==this.right&&(t+=" "+this.right.toString())),t+=this.trailing),t},t}(),c=r(3156),h=function(t){var e=t.expression,r=t.className,n=t.id,o=[];!function t(e){if(e&&"string"!=typeof e){t(e.left),t(e.right);for(var r=0;r<o.length;r++)if(e.equals(o[r]))return;o.push(e)}}(e);for(var l=0,a=0;a<o.length;a++)if(o[a].isAtomic){for(var s=a-1;s>=0;s--)if(o[s].isAtomic&&o[a].equalsAndOpposite(o[s])){l--;break}l++}for(var u=new Array(l),c=Math.pow(2,u.length)/2,h=0;h<u.length;h++){var f=!0,g=0;u[h]=new Array(Math.pow(2,u.length));for(var d=0;d<u[h].length;d++)g===c&&(f=!f,g=0),u[h][d]=f,g++;c/=2}for(var p=0,m=0,v=new Array(o.length),y=function(t){v[t]=[];for(var e=function(e){if("object"==typeof e)for(var r=0;r<o.length;r++)if(null!=e&&e.equals(o[r]))return"T"===v[t][r];return!1},r=0;r<o.length;r++)if(o[r].isAtomic)v[t][r]=u[p][m]?"T":"F",0===(p=(p+1)%u.length)&&(m=(m+1)%u[p].length);else{var i=e(o[r].left),n=e(o[r].right),l=o[r].solve(i,n);o[r].leading.includes("!")&&(l=!l),v[t][r]=l?"T":"F"}},b=0;u.length>0&&b<u[0].length;b++)y(b);return i.createElement("table",{className:"border border-gray-500 "+r,id:n},i.createElement("thead",{className:"border-b-2 border-gray-500"},i.createElement("tr",null,o.map((function(t,e){return i.createElement("th",{key:e,scope:"col",className:"border border-gray-500"},i.createElement("p",{className:"w-fit px-2"},t.toString()))})))),i.createElement("tbody",null,v.map((function(t,e){return i.createElement("tr",{key:e,className:"dark:hover:text-black hover:text-white"},v[e].map((function(t,e){return i.createElement("td",{key:e,className:"text-center border border-gray-500 last:font-extrabold\n                                "+("T"===t?"bg-green-500 dark:bg-green-700":"bg-red-500 dark:bg-red-700")},i.createElement("p",null,t))})))}))))},f=r(7782),g=function(t){var e=t.title,r=void 0===e?"":e,n=t.content,o=void 0===n?"":n,l=t.error,a=void 0!==l&&l,s=t.className;return i.createElement("div",{className:"border rounded-lg "+(a?"border-red-500":"border-gray-500")+" "+s},i.createElement("p",{className:"border-b px-2 "+(a?"border-red-500":"border-gray-500")},r),i.createElement("p",{className:"px-2"},o))},d=r(4942),p=r(4925),m=r(885),v=r(8222),y=r(3781),b=r(5527),w=r(3128),A=r(2982),O=r(260),E=r(5307),j=r(9777),k=["passive"];function S(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,i)}return r}function P(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?S(Object(r),!0).forEach((function(e){(0,d.Z)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):S(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var N=(0,i.createContext)(null);function x(){var t=(0,i.useContext)(N);if(null===t){var e=new Error("You used a <Label /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(e,x),e}return t}function V(){var t=(0,i.useState)([]),e=(0,m.Z)(t,2),r=e[0],n=e[1];return[r.length>0?r.join(" "):void 0,(0,i.useMemo)((function(){return function(t){var e=(0,j.z)((function(t){return n((function(e){return[].concat((0,A.Z)(e),[t])})),function(){return n((function(e){var r=e.slice(),i=r.indexOf(t);return-1!==i&&r.splice(i,1),r}))}})),r=(0,i.useMemo)((function(){return{register:e,slot:t.slot,name:t.name,props:t.props}}),[e,t.slot,t.name,t.props]);return i.createElement(N.Provider,{value:r},t.children)}}),[n])]}var C=(0,v.yV)((function(t,e){var r=t.passive,i=void 0!==r&&r,n=(0,p.Z)(t,k),o=x(),l="headlessui-label-".concat((0,y.M)()),a=(0,E.T)(e);(0,O.e)((function(){return o.register(l)}),[l,o.register]);var s=P(P({ref:a},o.props),{},{id:l});return i&&("onClick"in s&&delete s.onClick,"onClick"in n&&delete n.onClick),(0,v.sY)({ourProps:s,theirProps:n,slot:o.slot||{},defaultTag:"label",name:o.name||"Label"})}));function I(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,i)}return r}function T(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?I(Object(r),!0).forEach((function(e){(0,d.Z)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):I(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var D=(0,i.createContext)(null);function q(){var t=(0,i.useContext)(D);if(null===t){var e=new Error("You used a <Description /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(e,q),e}return t}function L(){var t=(0,i.useState)([]),e=(0,m.Z)(t,2),r=e[0],n=e[1];return[r.length>0?r.join(" "):void 0,(0,i.useMemo)((function(){return function(t){var e=(0,j.z)((function(t){return n((function(e){return[].concat((0,A.Z)(e),[t])})),function(){return n((function(e){var r=e.slice(),i=r.indexOf(t);return-1!==i&&r.splice(i,1),r}))}})),r=(0,i.useMemo)((function(){return{register:e,slot:t.slot,name:t.name,props:t.props}}),[e,t.slot,t.name,t.props]);return i.createElement(D.Provider,{value:r},t.children)}}),[n])]}var Z=(0,v.yV)((function(t,e){var r=q(),i="headlessui-description-".concat((0,y.M)()),n=(0,E.T)(e);(0,O.e)((function(){return r.register(i)}),[i,r.register]);var o=t,l=T(T({ref:n},r.props),{},{id:i});return(0,v.sY)({ourProps:l,theirProps:o,slot:r.slot||{},defaultTag:"p",name:r.name||"Description"})})),B=r(3500),M=["features"];function _(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,i)}return r}function z(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?_(Object(r),!0).forEach((function(e){(0,d.Z)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):_(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var F=function(t){return t[t.None=1]="None",t[t.Focusable=2]="Focusable",t[t.Hidden=4]="Hidden",t}(F||{}),Y=(0,v.yV)((function(t,e){var r=t.features,i=void 0===r?1:r,n=(0,p.Z)(t,M),o={ref:e,"aria-hidden":2==(2&i)||void 0,style:z({position:"absolute",width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0"},4==(4&i)&&2!=(2&i)&&{display:"none"})};return(0,v.sY)({ourProps:o,theirProps:n,slot:{},defaultTag:"div",name:"Hidden"})}));function U(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return R(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return R(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var i=0,n=function(){};return{s:n,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,l=!0,a=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return l=t.done,t},e:function(t){a=!0,o=t},f:function(){try{l||null==r.return||r.return()}finally{if(a)throw o}}}}function R(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,i=new Array(e);r<e;r++)i[r]=t[r];return i}var H=["checked","onChange","name","value"];function G(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,i)}return r}var K=(0,i.createContext)(null);K.displayName="GroupContext";var W=i.Fragment;var $=(0,v.yV)((function(t,e){var r=t.checked,n=t.onChange,o=t.name,l=t.value,a=(0,p.Z)(t,H),s="headlessui-switch-".concat((0,y.M)()),u=(0,i.useContext)(K),c=(0,i.useRef)(null),h=(0,E.T)(c,e,null===u?null:u.setSwitch),f=(0,j.z)((function(){return n(!r)})),g=(0,j.z)((function(t){if((0,w.P)(t.currentTarget))return t.preventDefault();t.preventDefault(),f()})),m=(0,j.z)((function(t){t.key===b.R.Space?(t.preventDefault(),f()):t.key===b.R.Enter&&function(t){var e,r=null!=(e=null==t?void 0:t.form)?e:t.closest("form");if(r){var i,n=U(r.elements);try{for(n.s();!(i=n.n()).done;){var o=i.value;if("INPUT"===o.tagName&&"submit"===o.type||"BUTTON"===o.tagName&&"submit"===o.type||"INPUT"===o.nodeName&&"image"===o.type)return void o.click()}}catch(l){n.e(l)}finally{n.f()}}}(t.currentTarget)})),A=(0,j.z)((function(t){return t.preventDefault()})),O=(0,i.useMemo)((function(){return{checked:r}}),[r]),k={id:s,ref:h,role:"switch",type:(0,B.f)(t,c),tabIndex:0,"aria-checked":r,"aria-labelledby":null==u?void 0:u.labelledby,"aria-describedby":null==u?void 0:u.describedby,onClick:g,onKeyUp:m,onKeyPress:A};return i.createElement(i.Fragment,null,null!=o&&r&&i.createElement(Y,function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?G(Object(r),!0).forEach((function(e){(0,d.Z)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):G(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({features:F.Hidden},(0,v.oA)({as:"input",type:"checkbox",hidden:!0,readOnly:!0,checked:r,name:o,value:l}))),(0,v.sY)({ourProps:k,theirProps:a,slot:O,defaultTag:"button",name:"Switch"}))})),J=Object.assign($,{Group:function(t){var e=(0,i.useState)(null),r=(0,m.Z)(e,2),n=r[0],o=r[1],l=V(),a=(0,m.Z)(l,2),s=a[0],u=a[1],c=L(),h=(0,m.Z)(c,2),f=h[0],g=h[1],d=(0,i.useMemo)((function(){return{switch:n,setSwitch:o,labelledby:s,describedby:f}}),[n,o,s,f]),p=t;return i.createElement(g,{name:"Switch.Description"},i.createElement(u,{name:"Switch.Label",props:{onClick:function(){!n||(n.click(),n.focus({preventScroll:!0}))}}},i.createElement(K.Provider,{value:d},(0,v.sY)({ourProps:{},theirProps:p,defaultTag:W,name:"Switch.Group"}))))},Label:C,Description:Z}),Q=function(t){var e=t.onChange,r=t.checked,n=void 0===r||r,o=t.title,l=t.name,a=t.className;return i.createElement(J,{checked:n,onChange:function(t){return e(t)},title:o,className:(n?"bg-primaryPurple":"bg-gray-500")+" \n                                       relative inline-flex h-6 w-11 items-center rounded-full my-2 "+a},i.createElement("span",{className:"sr-only"},l),i.createElement("span",{className:(n?"translate-x-6":"translate-x-1")+" inline-block h-4 w-4 transform rounded-full bg-white transition-all"}))};function X(t,e){var r=tt(t,e);return r.leading.includes("!")||(r.leading="",r.trailing=""),r}function tt(t,e){if(t.length<3){var r="";return t.includes("!")&&(t=t.replace("!",""),r="!"),new u(t,null,null,{leading:r,isAtomic:!0})}var i=new u(null,null,null,{});"!"===t[0]&&rt(t.substring(1,t.length))&&(t=t.replace("!",""),i.leading="!"),t.length!==(t=et(t)).length&&(i.leading+="(",i.trailing+=")");var n=function(t){t=et(t);for(var e=0,r=[],i=0;i<t.length;i++){var n=0;try{for(var o=t.charAt(i);"("===o||n>0;)"("===(o=t.charAt(i))?n++:")"===o&&n--,i++}catch(h){console.error(h)}var l=s.getOperator(t.charAt(i));l&&l!==s.not&&(r[e++]={operator:l,index:i})}for(var a=r[0],u=!0,c=1;c<r.length;c++)r[c].operator.weight!==a.operator.weight&&(u=!1),r[c].operator.weight<=a.operator.weight&&(a=r[c]);return u?r[Math.floor(r.length/2)]:a}(t);return i.left=tt(t.substring(0,n.index),e),i.operator=n.operator,i.right=tt(t.substring(n.index+1,t.length),e),e&&i.laws(),null===i.right?i=i.left:i.left.isAtomic&&"object"==typeof i.left.left?i.left=i.left.left:i.right.isAtomic&&"object"==typeof i.right.left&&(i.right=i.right.left),i}function et(t){return rt(t)?t.substring(1,t.length-1):t}function rt(t){var e=0,r=!1;"("===t.charAt(0)&&(r=!0);for(var i=0;r&&("("===t.charAt(i)||e>0);)"("===t.charAt(i)?e++:")"===t.charAt(i)&&0===--e&&i!==t.length-1&&(r=!1),i++;return r}var it=function(t){!function(t){if(null==t)throw new TypeError("Cannot destructure undefined")}(t);var e=i.useState(!0),r=e[0],l=e[1],a=i.useState(""),d=a[0],p=a[1],m=i.useRef(new u(null,null,null,{})),v=i.useState(""),y=v[0],b=v[1];i.useEffect((function(){var t=!0;function e(e){if(t&&"Enter"===e.key){var r=document.getElementById("truth-input-button");r&&r.click()}}var r=document.getElementById("truth-input");return r&&r.addEventListener("keypress",(function(t){return e(t)})),function(){r&&r.removeEventListener("keypress",(function(t){return e(t)})),t=!1}}),[]);var w=(0,f.useTranslation)().t;return i.createElement(n.Z,{title:w("truthTables"),description:w("truthTablesDesc")},i.createElement("div",{className:"pt-2"},i.createElement(o.Z,{className:"rounded-xl !pl-7 h-10",id:"truth-input",placeholder:"A&B>C",leading:i.createElement(c.Z,{className:"pl-2 absolute"}),trailing:i.createElement(i.Fragment,null,i.createElement("button",{id:"truth-input-button",title:w("generate")+" (Enter)",className:"mx-1 px-1 border border-gray-500 rounded-xl shadow shadow-primaryPurple h-10",onClick:function(){var t,e=null===(t=document.getElementById("truth-input"))||void 0===t?void 0:t.value;if(e&&""!==e){var i=function(t){for(var e=[],r=0;r<s.getValues().length;r++)s.getValues()[r]!==s.not&&(e[r]=s.getValues()[r].operator);if(e.some((function(e){return e===t.charAt(0)}))){var i='Illegal character "'+t.charAt(0)+'" at index: 0';return console.error(i),i}if(e.some((function(e){return e===t.charAt(t.length-1)}))){var n='Illegal character "'+t.charAt(t.length-1)+'" at index: '+(t.length-1);return console.error(n),n}for(var o=1;o<t.length-1;o++)if(t.charAt(o)!==s.not.operator&&s.isOperator(t.charAt(o))&&s.isOperator(t.charAt(o-1))){var l='Illegal character "'+t.charAt(o)+'" at index '+o;return console.error(l),l}return""}(e=e.replace(/\s+/g,""));if(""===i){b("");var n=X(e,r);n&&(m.current=n,p(n.toString()))}else b(i),p("")}else p("")}},w("generate")))}),i.createElement("span",{className:""},w("simplify"),": "),i.createElement(Q,{onChange:l,checked:r,title:w("simplify"),name:w("toggleSimplify")}),""!==d?i.createElement(i.Fragment,null,r?i.createElement(g,{className:"w-fit",title:w("output")+":",content:d}):null,i.createElement(h,{expression:m.current,className:"mt-2"})," "):null,""!==y?i.createElement(g,{className:"w-fit",title:w("inputError"),content:y,error:!0}):null))}}}]);
//# sourceMappingURL=component---src-pages-truth-table-tsx-a41005af4638758c7fdd.js.map