"use strict";(self.webpackChunkmartials_website=self.webpackChunkmartials_website||[]).push([[87],{5704:function(e,t,n){var r=n(7294);function a(){return a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a.apply(this,arguments)}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=(0,r.forwardRef)((function(e,t){var n=e.color,i=void 0===n?"currentColor":n,l=e.size,c=void 0===l?24:l,u=o(e,["color","size"]);return r.createElement("svg",a({ref:t,xmlns:"http://www.w3.org/2000/svg",width:c,height:c,viewBox:"0 0 24 24",fill:"none",stroke:i,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},u),r.createElement("path",{d:"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"}))}));i.displayName="GitHub",t.Z=i},5106:function(e,t,n){var r=n(7294);function a(){return a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a.apply(this,arguments)}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=(0,r.forwardRef)((function(e,t){var n=e.color,i=void 0===n?"currentColor":n,l=e.size,c=void 0===l?24:l,u=o(e,["color","size"]);return r.createElement("svg",a({ref:t,xmlns:"http://www.w3.org/2000/svg",width:c,height:c,viewBox:"0 0 24 24",fill:"none",stroke:i,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},u),r.createElement("path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}),r.createElement("rect",{x:"2",y:"9",width:"4",height:"12"}),r.createElement("circle",{cx:"4",cy:"4",r:"2"}))}));i.displayName="Linkedin",t.Z=i},5513:function(e,t,n){n.d(t,{K:function(){return o}});var r=n(7294);function a(e,t){var n=!0;function r(e){n&&t(e)}if(e){var a=document.getElementById(e);a&&(a.addEventListener("pointerenter",(function(){return r(!0)})),a.addEventListener("pointerleave",(function(){return r(!1)})))}return function(){var t,a;e&&(null===(t=document.getElementById(e))||void 0===t||t.removeEventListener("pointerenter",(function(){return r(!0)})),null===(a=document.getElementById(e))||void 0===a||a.removeEventListener("pointerleave",(function(){return r(!1)})),n=!1)}}t.Z=function(e){var t=e.className,n=e.id,o=e.name,l=e.type,c=e.title,u=e.placeholder,s=e.required,m=e.onChange,d=e.leading,f=e.trailing,p=r.useState(!1),v=p[0],y=p[1],g=r.useState(!1),h=g[0],b=g[1],E=r.useState(!1),w=E[0],k=E[1];return r.useEffect((function(){n&&c&&a(n,b)}),[]),r.createElement("div",{className:"flex flex-row items-center relative"},d,r.createElement(i,{title:c,isActive:v||h||w}),r.createElement("input",{className:"dark:bg-gray-900 focus:border-primaryPurple outline-none border-2 border-gray-500 \n                hover:border-t-primary-purple pl-2 "+t,id:n,onFocus:function(){return y(!0)},onBlur:function(){return y(!1)},name:o,type:l,placeholder:u,required:s,onInput:function(){if(n){var e=document.getElementById(n);""!==e.value!==w&&k(""!==e.value)}},onChange:m}),f)};var o=function(e){var t=e.className,n=e.id,o=e.name,l=e.title,c=e.placeholder,u=e.required,s=void 0!==u&&u,m=e.onChange,d=r.useState(!1),f=d[0],p=d[1],v=r.useState(!1),y=v[0],g=v[1],h=r.useState(!1),b=h[0],E=h[1];return r.useEffect((function(){n&&l&&a(n,g)}),[]),r.createElement("div",{className:"relative"},r.createElement(i,{title:l,isActive:f||y||b}),r.createElement("textarea",{id:n,className:"pl-2 min-h-[3rem] dark:bg-gray-900 focus:border-primaryPurple outline-none\n                                   border-2 border-gray-500 hover:border-t-primary-purple "+t,name:o,placeholder:c,required:s,onInput:function(){if(n){var e=document.getElementById(n);""!==e.value!==b&&E(""!==e.value)}},onFocus:function(){return p(!0)},onBlur:function(){return p(!1)},onChange:m}))},i=function(e){var t=e.title,n=e.isActive,a=void 0!==n&&n;return r.createElement("span",{className:"absolute pointer-events-none\n                 "+(a?"-top-2 left-3 bg-white dark:bg-gray-900 text-sm":"left-2 top-1")+" \n            transition-all duration-150 text-gray-600 dark:text-gray-400"},r.createElement("div",{className:"z-50 relative"},t),r.createElement("div",{className:"w-full h-2 bg-white dark:bg-gray-900 absolute bottom-1/3 z-10"}))}},3334:function(e,t,n){n.r(t),n.d(t,{Head:function(){return g},default:function(){return h}});var r=n(6459),a=n(7294),o=n(8480),i=n(5106),l=n(5704);function c(){return c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c.apply(this,arguments)}function u(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=(0,a.forwardRef)((function(e,t){var n=e.color,r=void 0===n?"currentColor":n,o=e.size,i=void 0===o?24:o,l=u(e,["color","size"]);return a.createElement("svg",c({ref:t,xmlns:"http://www.w3.org/2000/svg",width:i,height:i,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},l),a.createElement("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),a.createElement("polygon",{points:"22 2 15 22 11 13 2 9 22 2"}))}));s.displayName="Send";var m=s,d=n(7782),f=n(5513),p=n(4001),v="w-full max-w-full h-10 min-h-fit max-h-64 resize-y rounded-lg mb-3 pt-2 shadow",y=[{id:0,to:"https://www.linkedin.com/in/martin-b-2a69391a3",name:"LinkedIn",icon:a.createElement(i.Z,null)},{id:1,to:"https://github.com/h600878",name:"GitHub",icon:a.createElement(l.Z,null)}],g=function(e){var t,n=e.data.locales.edges[0].node.data,r=void 0;return n&&(r=JSON.parse(n)),a.createElement(p.Z,{title:null===(t=r)||void 0===t?void 0:t.contactMe})},h=function(e){(0,r.Z)(e),a.useEffect((function(){var e=!0,t=function(t){if(e&&t.ctrlKey&&"Enter"===t.key){var n=document.getElementById("submit-button");null!==n&&n.click()}};document.getElementById("form");return document.addEventListener("keyup",(function(e){return t(e)})),function(){document.removeEventListener("keyup",(function(e){return t(e)})),e=!1}}));var t=(0,d.useTranslation)().t;return a.createElement(o.Z,{title:t("contactMe"),description:t("contactMeDescription"),current:o.y.contactMe},a.createElement(a.Fragment,null,a.createElement("div",{className:"flex justify-center pb-2"},y.map((function(e){return a.createElement("div",{className:"px-2",key:e.id},a.createElement("a",{title:e.name,href:e.to,target:"_blank",rel:"noreferrer"},e.icon))}))),a.createElement("form",{acceptCharset:"UTF-8",id:"form",target:"_blank",action:"https://formspree.io/f/mknykgbn",method:"post"},a.createElement("div",{className:"flex justify-between flex-col sm:flex-row"},a.createElement(b,{title:t("yourName"),name:"name",id:"inputName",type:"text"}),a.createElement(b,{title:t("subject"),name:"subject",id:"inputSubject",type:"text"})),a.createElement(b,{title:t("yourEmail"),name:"_replyto",id:"inputEmail",type:"email"}),a.createElement(f.K,{title:t("message"),required:!0,name:"message",id:"contact-me-text-area",className:"pl-2 min-h-[3rem] h-24 dark:bg-gray-900 focus:border-primaryPurple outline-none\n                                   border-2 border-gray-500 "+v}),a.createElement("input",{name:"_gotcha",type:"text",className:"hidden"})," ",a.createElement("button",{id:"submit-button",className:"float-right",title:"Send",name:"submit",type:"submit"},a.createElement(m,null),a.createElement("p",{className:"hidden"},"Send")))))},b=function(e){var t=e.name,n=e.id,r=e.type,o=e.title,i=e.className;return a.createElement(f.Z,{className:v+" "+i,name:t,id:n,type:r,title:o,required:!0})}},6459:function(e,t,n){function r(e){if(null==e)throw new TypeError("Cannot destructure undefined")}n.d(t,{Z:function(){return r}})}}]);
//# sourceMappingURL=component---src-pages-contact-me-tsx-37eb62762b0ed2dbe6cf.js.map