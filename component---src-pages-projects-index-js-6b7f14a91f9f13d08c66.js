"use strict";(self.webpackChunkmartials_website=self.webpackChunkmartials_website||[]).push([[216],{5704:function(e,t,r){var a=r(7294);function n(){return n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},n.apply(this,arguments)}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=(0,a.forwardRef)((function(e,t){var r=e.color,i=void 0===r?"currentColor":r,o=e.size,c=void 0===o?24:o,m=l(e,["color","size"]);return a.createElement("svg",n({ref:t,xmlns:"http://www.w3.org/2000/svg",width:c,height:c,viewBox:"0 0 24 24",fill:"none",stroke:i,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},m),a.createElement("path",{d:"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"}))}));i.displayName="GitHub",t.Z=i},3432:function(e,t,r){r.r(t);var a=r(7294),n=r(4857),l=r(1597),i=r(5704),o=r(9230),c=r(7782);t.default=function(e){var t=e.data,r=(0,c.useTranslation)().t;return a.createElement(n.Z,{title:r("projects"),headline:r("myProjects"),children:a.createElement("div",{className:"pb-20"},t.allMdx.nodes.map((function(e){return a.createElement("article",{className:"border-2 rounded-xl mb-10",key:e.id},a.createElement("div",{className:"flex items-center my-3"},a.createElement(l.Link,{className:"text-primaryPurple dark:text-primaryPink hover:underline",to:e.slug},a.createElement("h2",{className:"mx-2 text-xl"},e.frontmatter.title)),a.createElement("a",{title:r("openInGitHub"),href:e.frontmatter.source,target:"_blank",rel:"noreferrer"},a.createElement(i.Z,null))),a.createElement("div",{className:"grid grid-flow-col justify-between mx-2 mb-2"},a.createElement("p",null,r("timeToRead"),e.timeToRead," ",1===e.timeToRead?r("minute"):r("minutes")),a.createElement("p",null,"Type: ",e.frontmatter.type)),a.createElement(o.G,{alt:e.frontmatter.hero_image_alt,image:(0,o.c)(e.frontmatter.hero_image.childImageSharp.gatsbyImageData)}),a.createElement("div",{className:"mx-2 my-4"},a.createElement("p",null,e.frontmatter.description)))})))})}}}]);
//# sourceMappingURL=component---src-pages-projects-index-js-6b7f14a91f9f13d08c66.js.map