(self.webpackChunkmartials_website=self.webpackChunkmartials_website||[]).push([[860,845],{3646:function(e,t,r){var n=r(7228);e.exports=function(e){if(Array.isArray(e))return n(e)},e.exports.__esModule=!0,e.exports.default=e.exports},9100:function(e,t,r){var n=r(9489),o=r(7067);function a(t,r,l){return o()?(e.exports=a=Reflect.construct.bind(),e.exports.__esModule=!0,e.exports.default=e.exports):(e.exports=a=function(e,t,r){var o=[null];o.push.apply(o,t);var a=new(Function.bind.apply(e,o));return r&&n(a,r.prototype),a},e.exports.__esModule=!0,e.exports.default=e.exports),a.apply(null,arguments)}e.exports=a,e.exports.__esModule=!0,e.exports.default=e.exports},7067:function(e){e.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}},e.exports.__esModule=!0,e.exports.default=e.exports},8206:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},319:function(e,t,r){var n=r(3646),o=r(6860),a=r(379),l=r(8206);e.exports=function(e){return n(e)||o(e)||a(e)||l()},e.exports.__esModule=!0,e.exports.default=e.exports},5704:function(e,t,r){"use strict";var n=r(7294);function o(){return o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o.apply(this,arguments)}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=(0,n.forwardRef)((function(e,t){var r=e.color,l=void 0===r?"currentColor":r,i=e.size,u=void 0===i?24:i,c=a(e,["color","size"]);return n.createElement("svg",o({ref:t,xmlns:"http://www.w3.org/2000/svg",width:u,height:u,viewBox:"0 0 24 24",fill:"none",stroke:l,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},c),n.createElement("path",{d:"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"}))}));l.displayName="GitHub",t.Z=l},2102:function(e,t,r){var n=r(2632);e.exports={MDXRenderer:n}},2632:function(e,t,r){var n=r(9100),o=r(319),a=r(9713),l=r(7316),i=["scope","children"];function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var s=r(7294),m=r(4983).mdx,d=r(6948).useMDXScope;e.exports=function(e){var t=e.scope,r=e.children,a=l(e,i),u=d(t),f=s.useMemo((function(){if(!r)return null;var e=c({React:s,mdx:m},u),t=Object.keys(e),a=t.map((function(t){return e[t]}));return n(Function,["_fn"].concat(o(t),[""+r])).apply(void 0,[{}].concat(o(a)))}),[r,t]);return s.createElement(f,c({},a))}},6930:function(e,t,r){"use strict";var n=r(7294);t.Z=function(e){var t=e.name,r=e.value,o=e.hoverTitle,a=e.className,l=e.onClick,i=e.id;return n.createElement("button",{title:o,id:i,className:(void 0!==l?"cursor-pointer":"cursor-auto")+" "+a+" border rounded-xl\n             border-gray-500",onClick:l},n.createElement("span",{className:"mx-2 w-max"},t+(void 0!==r?"("+r+")":"")))}},2960:function(e,t,r){"use strict";r.r(t),r.d(t,{splitCSV:function(){return d}});var n=r(7294),o=r(7514),a=r(1597),l=r(5704),i=r(7059),u=r(7782),c=r(6930);function s(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(r)return(r=r.call(e)).next.bind(r);if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return m(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return m(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0;return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var d=function(e){return e.split(";")};t.default=function(e){for(var t,r,m=e.data.allMdx,f=(0,u.useTranslation)().t,p=m.nodes.map((function(e){var t;return null===(t=e.frontmatter)||void 0===t?void 0:t.tags})),v=n.useState(p),y=v[0],b=v[1],g=[],h=0,x=s(y);!(r=x()).done;){var w=r.value,E=d(null!=w?w:"");if(void 0!==E)for(var k,O=s(E);!(k=O()).done;){for(var j,_=k.value,P=!1,S=s(g);!(j=S()).done;){var M=j.value;_.toLowerCase()===M.key.toLowerCase()&&(M.value+=1,P=!0)}P||(g[h]={key:_,value:1},h++)}}g.sort((function(e,t){return t.value-e.value}));var N=f("all"),C=n.useState(N),A=C[0],I=C[1],R=n.useState(!0),T=R[0],Z=R[1],D=n.useState(f("showMore")),L=D[0],B=D[1];function F(e){if(A===e&&e!==N||e===N)I(N),b(p);else{I(e);var t=m.nodes.map((function(t){var r,n;return G(null===(r=t.frontmatter)||void 0===r?void 0:r.tags,e)?null===(n=t.frontmatter)||void 0===n?void 0:n.tags:null}));t=t.filter((function(e){return null!==e})),b(t)}}function G(e,t){var r;return d(null!==(r=null==e?void 0:e.toLowerCase())&&void 0!==r?r:"").some((function(e){return e===t.toLowerCase()}))}var H=n.useState(!1),V=H[0],W=H[1];return n.useEffect((function(){W(function(e){if(void 0!==e){var t=0,r=e.children;T&&(t-=90);for(var n=0;n<r.length-1;n++)if((t+=r[n].clientWidth+4)>e.clientWidth)return!0}return!1}(document.getElementById("tags")))}),[A,T]),n.createElement(o.Z,{title:f("projects"),headline:f("myProjects"),description:f("projectsByMe"),current:o.y.projects},n.createElement("div",null,n.createElement("div",{id:"tags",className:"flex gap-1 "+(T?"overflow-scroll pb-3 ":"flex-wrap mb-2")},n.createElement(n.Fragment,null,n.createElement(c.Z,{name:N,onClick:function(){return F(N)},className:"hover:border-primaryPurple "+(A===N?"!border-primaryPurple":"")}),g.map((function(e){return n.createElement("div",{key:e.key},n.createElement(c.Z,{name:e.key,value:e.value,onClick:function(){return F(e.key)},className:"hover:border-primaryPurple w-max\n                                     "+(A===e.key?"!border-primaryPurple":"")}))})),V?n.createElement(n.Fragment,null,n.createElement("div",{className:"text-transparent min-w-max mx-2 "+(T?"":"hidden")},T?f("showMore"):null),n.createElement(c.Z,{name:L.toString(),onClick:function(){Z(!T),B(f(T?"showLess":"showMore"))},hoverTitle:f(T?"showMoreTags":"showLessTags"),className:"hover:border-primaryPurple min-w-max "+(T?"absolute bg-white dark:bg-gray-900 right-0":"")+" shadow-sm shadow-primaryPurple"})):null)),m.nodes.map((function(e){var r,o,u,s,m,p,v;return n.createElement("div",{key:e.id},A===N||G(null===(r=e.frontmatter)||void 0===r?void 0:r.tags,A)?n.createElement("article",{className:"border-2 border-gray-500 rounded-xl mb-10 shadow"},n.createElement("div",{className:"mx-2 mb-2"},n.createElement("div",{className:"flex items-center my-3"},n.createElement(a.Link,{className:"text-primaryPurple dark:text-primaryPink hover:underline mr-2",to:e.slug},n.createElement("h2",{className:"text-xl"},null===(o=e.frontmatter)||void 0===o?void 0:o.title)),n.createElement("a",{title:f("openInGitHub"),href:null===(u=e.frontmatter)||void 0===u?void 0:u.source,target:"_blank",rel:"noreferrer"},n.createElement(l.Z,null))),n.createElement("div",{className:"grid grid-flow-col justify-between mb-2"},n.createElement("p",null,f("timeToRead")," ",e.timeToRead," ",1===e.timeToRead?f("minute"):f("minutes"))),n.createElement("div",{className:"flex flex-row flex-wrap gap-1"},d(null===(s=e.frontmatter)||void 0===s?void 0:s.tags).map((function(e){return n.createElement("div",{key:e},n.createElement(c.Z,{name:e}))})))),(t=(0,i.c)(null===(v=e.frontmatter)||void 0===v?void 0:v.hero_image.childImageSharp.gatsbyImageData),!0),t?n.createElement(i.G,{alt:null===(m=e.frontmatter)||void 0===m?void 0:m.hero_image_alt,image:t}):null,n.createElement("div",{className:"mx-2 my-4"},n.createElement("p",null,null===(p=e.frontmatter)||void 0===p?void 0:p.description))):null)}))))}},7233:function(e,t,r){"use strict";r.r(t);var n=r(7294),o=r(7514),a=r(2102),l=r(7059),i=r(2960),u=r(6930);t.default=function(e){var t,r,c,s,m,d,f,p,v,y,b,g,h,x,w,E,k=e.data.mdx;null!==k&&(r=void 0!==(f=null===(v=k.frontmatter)||void 0===v||null===(y=v.hero_image)||void 0===y||null===(b=y.childImageSharp)||void 0===b?void 0:b.gatsbyImageData)?(0,l.c)(f):void 0,c=null===(g=k.frontmatter)||void 0===g?void 0:g.hero_image_alt,m=null===(h=k.frontmatter)||void 0===h?void 0:h.title,s=null===(x=k.frontmatter)||void 0===x?void 0:x.description,d=null===(w=k.frontmatter)||void 0===w?void 0:w.source,p=null===(E=k.frontmatter)||void 0===E?void 0:E.tags);return n.createElement(n.Fragment,null,n.createElement(o.Z,{title:"string"==typeof m?m:"Blogpost",headline:m,description:"string"==typeof s?s:"A blogpost by Martin Berg Alstad",current:o.y.projects},n.createElement("article",null,r&&"string"==typeof c?n.createElement(l.G,{alt:c,image:r}):null,n.createElement("div",{className:"flex flex-row flex-wrap gap-1 my-2"},(0,i.splitCSV)(null!==(t=p)&&void 0!==t?t:"").map((function(e){return n.createElement("div",{key:e},n.createElement(u.Z,{name:e}))}))),n.createElement("p",null,s),n.createElement("p",null,"Kildekoden på"," ",n.createElement("a",{className:"text-primaryPurple dark:text-primaryPink hover:underline",href:"string"==typeof d||void 0===d?d:void 0,target:"_blank",rel:"noreferrer"},"GitHub")),n.createElement("div",{className:"mt-2"},n.createElement(a.MDXRenderer,null,null!==k?k.body:"Something went wrong! mdx="+k)))))}}}]);
//# sourceMappingURL=component---src-pages-projects-mdx-slug-tsx-4cdadb65be70c9b88677.js.map