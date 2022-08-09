"use strict";(self.webpackChunkmartials_website=self.webpackChunkmartials_website||[]).push([[87],{5704:function(e,t,n){var r=n(7294);function a(){return a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a.apply(this,arguments)}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=(0,r.forwardRef)((function(e,t){var n=e.color,i=void 0===n?"currentColor":n,l=e.size,c=void 0===l?24:l,u=o(e,["color","size"]);return r.createElement("svg",a({ref:t,xmlns:"http://www.w3.org/2000/svg",width:c,height:c,viewBox:"0 0 24 24",fill:"none",stroke:i,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},u),r.createElement("path",{d:"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"}))}));i.displayName="GitHub",t.Z=i},5106:function(e,t,n){var r=n(7294);function a(){return a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a.apply(this,arguments)}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=(0,r.forwardRef)((function(e,t){var n=e.color,i=void 0===n?"currentColor":n,l=e.size,c=void 0===l?24:l,u=o(e,["color","size"]);return r.createElement("svg",a({ref:t,xmlns:"http://www.w3.org/2000/svg",width:c,height:c,viewBox:"0 0 24 24",fill:"none",stroke:i,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},u),r.createElement("path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}),r.createElement("rect",{x:"2",y:"9",width:"4",height:"12"}),r.createElement("circle",{cx:"4",cy:"4",r:"2"}))}));i.displayName="Linkedin",t.Z=i},5513:function(e,t,n){n.d(t,{K:function(){return a}});var r=n(7294);t.Z=function(e){var t=e.className,n=e.id,a=e.name,i=e.type,l=e.title,c=e.placeholder,u=e.required,s=e.onChange,m=e.leading,d=e.trailing,f=r.useState(!1),p=f[0],v=f[1],y=r.useState(!1),g=y[0],b=y[1],h=r.useState(!1),E=h[0],w=h[1];return r.useEffect((function(){var e=!0;function t(t){e&&b(t)}if(n){var r=document.getElementById(n);r&&(r.addEventListener("pointerenter",(function(){return t(!0)})),r.addEventListener("pointerleave",(function(){return t(!1)})))}return function(){var r,a;n&&(null===(r=document.getElementById(n))||void 0===r||r.removeEventListener("pointerenter",(function(){return t(!0)})),null===(a=document.getElementById(n))||void 0===a||a.removeEventListener("pointerleave",(function(){return t(!1)})));e=!1}}),[]),r.createElement("div",{className:"flex flex-row items-center relative"},m,r.createElement(o,{title:l,isActive:p||g||E}),r.createElement("input",{className:"dark:bg-gray-900 focus:border-primaryPurple outline-none border-2 border-gray-500 pl-2 "+t,id:n,onFocus:function(){return v(!0)},onBlur:function(){return v(!1)},name:a,type:i,placeholder:c,required:u,onInput:function(){if(n){var e=document.getElementById(n);w(""!==e.value)}},onChange:s}),d)};var a=function(e){var t=e.className,n=e.id,a=e.name,i=e.title,l=e.placeholder,c=e.required,u=void 0!==c&&c,s=e.onChange,m=r.useState(!1),d=m[0],f=m[1],p=r.useState(!1),v=p[0],y=p[1],g=r.useState(!1),b=g[0],h=g[1];return r.useEffect((function(){var e=!0;function t(t){e&&y(t)}if(n){var r=document.getElementById(n);r&&(r.addEventListener("pointerenter",(function(){return t(!0)})),r.addEventListener("pointerleave",(function(){return t(!1)})))}return function(){var r,a;n&&(null===(r=document.getElementById(n))||void 0===r||r.removeEventListener("pointerenter",(function(){return t(!0)})),null===(a=document.getElementById(n))||void 0===a||a.removeEventListener("pointerleave",(function(){return t(!1)})),e=!1)}}),[]),r.createElement("div",{className:"relative"},r.createElement(o,{title:i,isActive:d||v||b}),r.createElement("textarea",{id:n,className:"pl-2 min-h-[3rem] dark:bg-gray-900 focus:border-primaryPurple outline-none\n                                   border-2 border-gray-500 "+t,name:a,placeholder:l,required:u,onInput:function(){if(n){var e=document.getElementById(n);h(""!==e.value)}},onFocus:function(){return f(!0)},onBlur:function(){return f(!1)},onChange:s}))},o=function(e){var t=e.title,n=e.isActive,a=void 0!==n&&n;return r.createElement("span",{className:"absolute pointer-events-none\n                 "+(a?"-top-2 left-3 bg-white dark:bg-gray-900 text-sm":"left-2 top-1")+" \n            transition-all duration-150 text-gray-600 dark:text-gray-400"},r.createElement("div",{className:"z-50 relative"},t),r.createElement("div",{className:"w-full h-2 bg-white dark:bg-gray-900 absolute bottom-1/3 z-10"}))}},3334:function(e,t,n){n.r(t),n.d(t,{default:function(){return v}});var r=n(7294),a=n(4841),o=n(5106),i=n(5704);function l(){return l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l.apply(this,arguments)}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=(0,r.forwardRef)((function(e,t){var n=e.color,a=void 0===n?"currentColor":n,o=e.size,i=void 0===o?24:o,u=c(e,["color","size"]);return r.createElement("svg",l({ref:t,xmlns:"http://www.w3.org/2000/svg",width:i,height:i,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},u),r.createElement("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),r.createElement("polygon",{points:"22 2 15 22 11 13 2 9 22 2"}))}));u.displayName="Send";var s=u,m=n(7782),d=n(5513),f="w-full max-w-full h-10 min-h-fit max-h-64 resize-y rounded-lg mb-3 pt-2 shadow",p=[{id:0,to:"https://www.linkedin.com/in/martin-b-2a69391a3",name:"LinkedIn",icon:r.createElement(o.Z,null)},{id:1,to:"https://github.com/h600878",name:"GitHub",icon:r.createElement(i.Z,null)}],v=function(){r.useEffect((function(){var e=!0,t=function(t){if(e&&t.ctrlKey&&"Enter"===t.key){var n=document.getElementById("submit-button");null!==n&&n.click()}};document.getElementById("form");return document.addEventListener("keyup",(function(e){return t(e)})),function(){document.removeEventListener("keyup",(function(e){return t(e)})),e=!1}}));var e=(0,m.useTranslation)().t;return r.createElement(a.ZP,{title:e("contactMe"),description:e("contactMeDescription"),current:a.yX.contactMe},r.createElement(r.Fragment,null,r.createElement("div",{className:"flex justify-center pb-2"},p.map((function(e){return r.createElement("div",{className:"px-2",key:e.id},r.createElement("a",{title:e.name,href:e.to,target:"_blank",rel:"noreferrer"},e.icon))}))),r.createElement("form",{acceptCharset:"UTF-8",id:"form",target:"_blank",action:"https://formspree.io/f/mknykgbn",method:"post"},r.createElement("div",{className:"flex justify-between flex-col sm:flex-row"},r.createElement(y,{title:e("yourName"),name:"name",id:"inputName",type:"text"}),r.createElement(y,{title:e("subject"),name:"subject",id:"inputSubject",type:"text"})),r.createElement(y,{title:e("yourEmail"),name:"_replyto",id:"inputEmail",type:"email"}),r.createElement(d.K,{title:e("message"),required:!0,name:"message",id:"contact-me-text-area",className:"pl-2 min-h-[3rem] h-24 dark:bg-gray-900 focus:border-primaryPurple outline-none\n                                   border-2 border-gray-500 "+f}),r.createElement("input",{name:"_gotcha",type:"text",className:"hidden"})," ",r.createElement("button",{id:"submit-button",className:"float-right",title:"Send",name:"submit",type:"submit"},r.createElement(s,null),r.createElement("p",{className:"hidden"},"Send")))))},y=function(e){var t=e.name,n=e.id,a=e.type,o=e.title,i=e.className;return r.createElement(d.Z,{className:f+" "+i,name:t,id:n,type:a,title:o,required:!0})}}}]);
//# sourceMappingURL=component---src-pages-contact-me-tsx-c797bb33a9055a4af7d8.js.map