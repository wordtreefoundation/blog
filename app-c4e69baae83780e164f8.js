webpackJsonp([0xd2a57dc1d883],{81:function(n,e,t){"use strict";function o(n,e,t){var o=a.map(function(t){if(t.plugin[n]){var o=t.plugin[n](e,t.options);return o}});return o=o.filter(function(n){return"undefined"!=typeof n}),o.length>0?o:t?[t]:[]}function r(n,e,t){return a.reduce(function(t,o){return o.plugin[n]?t.then(function(){return o.plugin[n](e,o.options)}):t},Promise.resolve())}e.__esModule=!0,e.apiRunner=o,e.apiRunnerAsync=r;var a=[{plugin:t(378),options:{plugins:[],trackingId:"UA-35980893-3"}},{plugin:t(380),options:{plugins:[]}},{plugin:t(377),options:{plugins:[]}}]},218:function(n,e,t){"use strict";var o;e.components={"component---node-modules-gatsby-plugin-offline-app-shell-js":t(344),"component---src-templates-post-template-jsx":t(353),"component---src-templates-tag-template-jsx":t(354),"component---src-templates-category-template-jsx":t(351),"component---src-templates-page-template-jsx":t(352),"component---src-pages-404-jsx":t(346),"component---src-pages-articles-jsx":t(347),"component---src-pages-categories-jsx":t(348),"component---src-pages-index-jsx":t(349),"component---src-pages-tags-jsx":t(350)},e.json=(o={"layout-index.json":t(7),"offline-plugin-app-shell-fallback.json":t(369)},o["layout-index.json"]=t(7),o["articles-arpa-lm.json"]=t(359),o["layout-index.json"]=t(7),o["tags-n-gram.json"]=t(372),o["layout-index.json"]=t(7),o["tags-book-of-mormon.json"]=t(371),o["layout-index.json"]=t(7),o["categories-data-science.json"]=t(365),o["layout-index.json"]=t(7),o["articles-using-textgrams-jl.json"]=t(363),o["layout-index.json"]=t(7),o["tags-presentation.json"]=t(373),o["layout-index.json"]=t(7),o["articles-presentation-the-late-war-the-book-of-mormon.json"]=t(361),o["layout-index.json"]=t(7),o["categories-presentation.json"]=t(367),o["layout-index.json"]=t(7),o["articles-diy-mosiah-priority.json"]=t(360),o["layout-index.json"]=t(7),o["tags-tools.json"]=t(374),o["layout-index.json"]=t(7),o["about.json"]=t(357),o["layout-index.json"]=t(7),o["articles-site-update.json"]=t(362),o["layout-index.json"]=t(7),o["tags-website.json"]=t(375),o["layout-index.json"]=t(7),o["categories-organization.json"]=t(366),o["layout-index.json"]=t(7),o["404.json"]=t(355),o["layout-index.json"]=t(7),o["articles.json"]=t(358),o["layout-index.json"]=t(7),o["categories.json"]=t(364),o["layout-index.json"]=t(7),o["index.json"]=t(368),o["layout-index.json"]=t(7),o["tags.json"]=t(370),o["layout-index.json"]=t(7),o["404-html.json"]=t(356),o),e.layouts={"layout---index":t(345)}},219:function(n,e,t){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function a(n,e){if(!n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?n:e}function u(n,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(n,e):n.__proto__=e)}e.__esModule=!0;var i=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o])}return n},s=t(1),c=o(s),l=t(9),f=o(l),p=t(145),d=o(p),m=t(58),h=o(m),g=t(81),y=t(563),x=o(y),j=function(n){var e=n.children;return c.default.createElement("div",null,e())},v=function(n){function e(t){r(this,e);var o=a(this,n.call(this)),u=t.location;return d.default.getPage(u.pathname)||(u=i({},u,{pathname:"/404.html"})),o.state={location:u,pageResources:d.default.getResourcesForPathname(u.pathname)},o}return u(e,n),e.prototype.componentWillReceiveProps=function(n){var e=this;if(this.state.location.pathname!==n.location.pathname){var t=d.default.getResourcesForPathname(n.location.pathname);if(t)this.setState({location:n.location,pageResources:t});else{var o=n.location;d.default.getPage(o.pathname)||(o=i({},o,{pathname:"/404.html"})),d.default.getResourcesForPathname(o.pathname,function(n){e.setState({location:o,pageResources:n})})}}},e.prototype.componentDidMount=function(){var n=this;h.default.on("onPostLoadPageResources",function(e){d.default.getPage(n.state.location.pathname)&&e.page.path===d.default.getPage(n.state.location.pathname).path&&n.setState({pageResources:e.pageResources})})},e.prototype.shouldComponentUpdate=function(n,e){return!e.pageResources||(!(this.state.pageResources||!e.pageResources)||(this.state.pageResources.component!==e.pageResources.component||(this.state.pageResources.json!==e.pageResources.json||(!(this.state.location.key===e.location.key||!e.pageResources.page||!e.pageResources.page.matchPath&&!e.pageResources.page.path)||(0,x.default)(this,n,e)))))},e.prototype.render=function(){var n=(0,g.apiRunner)("replaceComponentRenderer",{props:i({},this.props,{pageResources:this.state.pageResources}),loader:p.publicLoader}),e=n[0];return this.props.page?this.state.pageResources?e||(0,s.createElement)(this.state.pageResources.component,i({key:this.props.location.pathname},this.props,this.state.pageResources.json)):null:this.props.layout?e||(0,s.createElement)(this.state.pageResources&&this.state.pageResources.layout?this.state.pageResources.layout:j,i({key:this.state.pageResources&&this.state.pageResources.layout?this.state.pageResources.layout:"DefaultLayout"},this.props)):null},e}(c.default.Component);v.propTypes={page:f.default.bool,layout:f.default.bool,location:f.default.object},e.default=v,n.exports=e.default},58:function(n,e,t){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}var r=t(449),a=o(r),u=(0,a.default)();n.exports=u},220:function(n,e,t){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}var r=t(80),a=t(146),u=o(a),i={};n.exports=function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return function(t){var o=decodeURIComponent(t),a=(0,u.default)(o,e);if(a.split("#").length>1&&(a=a.split("#").slice(0,-1).join("")),a.split("?").length>1&&(a=a.split("?").slice(0,-1).join("")),i[a])return i[a];var s=void 0;return n.some(function(n){if(n.matchPath){if((0,r.matchPath)(a,{path:n.path})||(0,r.matchPath)(a,{path:n.matchPath}))return s=n,i[a]=n,!0}else{if((0,r.matchPath)(a,{path:n.path,exact:!0}))return s=n,i[a]=n,!0;if((0,r.matchPath)(a,{path:n.path+"index.html"}))return s=n,i[a]=n,!0}return!1}),s}}},221:function(n,e,t){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}var r=t(107),a=o(r),u=t(81),i=(0,u.apiRunner)("replaceHistory"),s=i[0],c=s||(0,a.default)();n.exports=c},356:function(n,e,t){t(3),n.exports=function(n){return t.e(0xa2868bfb69fc,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(386)})})}},355:function(n,e,t){t(3),n.exports=function(n){return t.e(0xe70826b53c04,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(387)})})}},357:function(n,e,t){t(3),n.exports=function(n){return t.e(0xf927f8900006,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(388)})})}},359:function(n,e,t){t(3),n.exports=function(n){return t.e(0xf7b756a3a320,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(389)})})}},360:function(n,e,t){t(3),n.exports=function(n){return t.e(0xe73fe596421d,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(390)})})}},361:function(n,e,t){t(3),n.exports=function(n){return t.e(0xbea305e9313f,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(391)})})}},362:function(n,e,t){t(3),n.exports=function(n){return t.e(0xe09b03f1a658,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(392)})})}},363:function(n,e,t){t(3),n.exports=function(n){return t.e(0x780a79a00923,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(393)})})}},358:function(n,e,t){t(3),n.exports=function(n){return t.e(56932394960959,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(394)})})}},365:function(n,e,t){t(3),n.exports=function(n){return t.e(53449123926071,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(395)})})}},366:function(n,e,t){t(3),n.exports=function(n){return t.e(0x714af8913098,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(396)})})}},367:function(n,e,t){t(3),n.exports=function(n){return t.e(93648908945983,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(397)})})}},364:function(n,e,t){t(3),n.exports=function(n){return t.e(30875753179511,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(398)})})}},368:function(n,e,t){t(3),n.exports=function(n){return t.e(0x81b8806e4260,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(399)})})}},7:function(n,e,t){t(3),n.exports=function(n){return t.e(60335399758886,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(110)})})}},369:function(n,e,t){t(3),n.exports=function(n){return t.e(0xbf4c176e203a,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(400)})})}},371:function(n,e,t){t(3),n.exports=function(n){return t.e(61870005613940,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(401)})})}},372:function(n,e,t){t(3),n.exports=function(n){return t.e(0xde962c6e46e6,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(402)})})}},373:function(n,e,t){t(3),n.exports=function(n){return t.e(0xd82409803332,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(403)})})}},374:function(n,e,t){t(3),n.exports=function(n){return t.e(0xa36a794a7633,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(404)})})}},375:function(n,e,t){t(3),n.exports=function(n){return t.e(0x9336e33a0036,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(405)})})}},370:function(n,e,t){t(3),n.exports=function(n){return t.e(55702396619907,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(406)})})}},345:function(n,e,t){t(3),n.exports=function(n){return t.e(79611799117203,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(222)})})}},145:function(n,e,t){(function(n){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}e.__esModule=!0,e.publicLoader=void 0;var r=t(1),a=(o(r),t(220)),u=o(a),i=t(58),s=o(i),c=t(146),l=o(c),f=void 0,p={},d={},m={},h={},g={},y=[],x=[],j={},v="",R=[],b={},C=function(n){return n&&n.default||n},N=void 0,w=!0,k=[],_={},P={},E=5;N=t(223)({getNextQueuedResources:function(){return R.slice(-1)[0]},createResourceDownload:function(n){T(n,function(){R=R.filter(function(e){return e!==n}),N.onResourcedFinished(n)})}}),s.default.on("onPreLoadPageResources",function(n){N.onPreLoadPageResources(n)}),s.default.on("onPostLoadPageResources",function(n){N.onPostLoadPageResources(n)});var L=function(n,e){return b[n]>b[e]?1:b[n]<b[e]?-1:0},O=function(n,e){return j[n]>j[e]?1:j[n]<j[e]?-1:0},T=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};if(h[e])n.nextTick(function(){t(null,h[e])});else{var o=void 0;o="component---"===e.slice(0,12)?d.components[e]:"layout---"===e.slice(0,9)?d.layouts[e]:d.json[e],o(function(n,o){h[e]=o,k.push({resource:e,succeeded:!n}),P[e]||(P[e]=n),k=k.slice(-E),t(n,o)})}},S=function(e,t){g[e]?n.nextTick(function(){t(null,g[e])}):P[e]?n.nextTick(function(){t(P[e])}):T(e,function(n,o){if(n)t(n);else{var r=C(o());g[e]=r,t(n,r)}})},A=function(){var n=navigator.onLine;if("boolean"==typeof n)return n;var e=k.find(function(n){return n.succeeded});return!!e},D=function(n,e){console.log(e),_[n]||(_[n]=e),A()&&window.location.pathname.replace(/\/$/g,"")!==n.replace(/\/$/g,"")&&(window.location.pathname=n)},U=1,M={empty:function(){x=[],j={},b={},R=[],y=[],v=""},addPagesArray:function(n){y=n,f=(0,u.default)(n,v)},addDevRequires:function(n){p=n},addProdRequires:function(n){d=n},dequeue:function(){return x.pop()},enqueue:function(n){var e=(0,l.default)(n,v);if(!y.some(function(n){return n.path===e}))return!1;var t=1/U;U+=1,j[e]?j[e]+=1:j[e]=1,M.has(e)||x.unshift(e),x.sort(O);var o=f(e);return o.jsonName&&(b[o.jsonName]?b[o.jsonName]+=1+t:b[o.jsonName]=1+t,R.indexOf(o.jsonName)!==-1||h[o.jsonName]||R.unshift(o.jsonName)),o.componentChunkName&&(b[o.componentChunkName]?b[o.componentChunkName]+=1+t:b[o.componentChunkName]=1+t,R.indexOf(o.componentChunkName)!==-1||h[o.jsonName]||R.unshift(o.componentChunkName)),R.sort(L),N.onNewResourcesAdded(),!0},getResources:function(){return{resourcesArray:R,resourcesCount:b}},getPages:function(){return{pathArray:x,pathCount:j}},getPage:function(n){return f(n)},has:function(n){return x.some(function(e){return e===n})},getResourcesForPathname:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};w&&navigator&&navigator.serviceWorker&&navigator.serviceWorker.controller&&"activated"===navigator.serviceWorker.controller.state&&(f(e)||navigator.serviceWorker.getRegistrations().then(function(n){if(n.length){for(var e=n,t=Array.isArray(e),o=0,e=t?e:e[Symbol.iterator]();;){var r;if(t){if(o>=e.length)break;r=e[o++]}else{if(o=e.next(),o.done)break;r=o.value}var a=r;a.unregister()}window.location.reload()}})),w=!1;if(_[e])return D(e,'Previously detected load failure for "'+e+'"'),t();var o=f(e);if(!o)return D(e,"A page wasn't found for \""+e+'"'),t();if(e=o.path,m[e])return n.nextTick(function(){t(m[e]),s.default.emit("onPostLoadPageResources",{page:o,pageResources:m[e]})}),m[e];s.default.emit("onPreLoadPageResources",{path:e});var r=void 0,a=void 0,u=void 0,i=function(){if(r&&a&&(!o.layoutComponentChunkName||u)){m[e]={component:r,json:a,layout:u,page:o};var n={component:r,json:a,layout:u,page:o};t(n),s.default.emit("onPostLoadPageResources",{page:o,pageResources:n})}};return S(o.componentChunkName,function(n,e){n&&D(o.path,"Loading the component for "+o.path+" failed"),r=e,i()}),S(o.jsonName,function(n,e){n&&D(o.path,"Loading the JSON for "+o.path+" failed"),a=e,i()}),void(o.layoutComponentChunkName&&S(o.layout,function(n,e){n&&D(o.path,"Loading the Layout for "+o.path+" failed"),u=e,i()}))},peek:function(n){return x.slice(-1)[0]},length:function(){return x.length},indexOf:function(n){return x.length-x.indexOf(n)-1}};e.publicLoader={getResourcesForPathname:M.getResourcesForPathname};e.default=M}).call(e,t(125))},407:function(n,e){n.exports=[{componentChunkName:"component---node-modules-gatsby-plugin-offline-app-shell-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-jsx",jsonName:"offline-plugin-app-shell-fallback.json",path:"/offline-plugin-app-shell-fallback/"},{componentChunkName:"component---src-templates-post-template-jsx",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-jsx",jsonName:"articles-arpa-lm.json",path:"/articles/arpa-lm"},{componentChunkName:"component---src-templates-tag-template-jsx",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-jsx",jsonName:"tags-n-gram.json",path:"/tags/n-gram/"},{componentChunkName:"component---src-templates-tag-template-jsx",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-jsx",jsonName:"tags-book-of-mormon.json",path:"/tags/book-of-mormon/"},{componentChunkName:"component---src-templates-category-template-jsx",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-jsx",jsonName:"categories-data-science.json",path:"/categories/data-science/"},{componentChunkName:"component---src-templates-post-template-jsx",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-jsx",jsonName:"articles-using-textgrams-jl.json",path:"/articles/using-textgrams-jl"},{componentChunkName:"component---src-templates-tag-template-jsx",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-jsx",jsonName:"tags-presentation.json",path:"/tags/presentation/"},{componentChunkName:"component---src-templates-post-template-jsx",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-jsx",jsonName:"articles-presentation-the-late-war-the-book-of-mormon.json",path:"/articles/presentation-the-late-war-the-book-of-mormon"},{componentChunkName:"component---src-templates-category-template-jsx",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-jsx",jsonName:"categories-presentation.json",path:"/categories/presentation/"},{componentChunkName:"component---src-templates-post-template-jsx",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-jsx",jsonName:"articles-diy-mosiah-priority.json",path:"/articles/diy-mosiah-priority"},{componentChunkName:"component---src-templates-tag-template-jsx",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-jsx",jsonName:"tags-tools.json",path:"/tags/tools/"},{componentChunkName:"component---src-templates-page-template-jsx",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-jsx",jsonName:"about.json",path:"/about"},{componentChunkName:"component---src-templates-post-template-jsx",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-jsx",jsonName:"articles-site-update.json",path:"/articles/site-update"},{componentChunkName:"component---src-templates-tag-template-jsx",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-jsx",jsonName:"tags-website.json",path:"/tags/website/"},{componentChunkName:"component---src-templates-category-template-jsx",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-jsx",jsonName:"categories-organization.json",path:"/categories/organization/"},{componentChunkName:"component---src-pages-404-jsx",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-jsx",jsonName:"404.json",path:"/404/"},{componentChunkName:"component---src-pages-articles-jsx",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-jsx",jsonName:"articles.json",path:"/articles/"},{componentChunkName:"component---src-pages-categories-jsx",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-jsx",jsonName:"categories.json",path:"/categories/"},{componentChunkName:"component---src-pages-index-jsx",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-jsx",jsonName:"index.json",path:"/"},{componentChunkName:"component---src-pages-tags-jsx",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-jsx",jsonName:"tags.json",path:"/tags/"},{componentChunkName:"component---src-pages-404-jsx",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-jsx",jsonName:"404-html.json",path:"/404.html"}]},223:function(n,e){"use strict";n.exports=function(n){var e=n.getNextQueuedResources,t=n.createResourceDownload,o=[],r=[],a=function(){var n=e();n&&(r.push(n),t(n))},u=function(n){switch(n.type){case"RESOURCE_FINISHED":r=r.filter(function(e){return e!==n.payload});break;case"ON_PRE_LOAD_PAGE_RESOURCES":o.push(n.payload.path);break;case"ON_POST_LOAD_PAGE_RESOURCES":o=o.filter(function(e){return e!==n.payload.page.path});break;case"ON_NEW_RESOURCES_ADDED":}setTimeout(function(){0===r.length&&0===o.length&&a()},0)};return{onResourcedFinished:function(n){u({type:"RESOURCE_FINISHED",payload:n})},onPreLoadPageResources:function(n){u({type:"ON_PRE_LOAD_PAGE_RESOURCES",payload:n})},onPostLoadPageResources:function(n){u({type:"ON_POST_LOAD_PAGE_RESOURCES",payload:n})},onNewResourcesAdded:function(){u({type:"ON_NEW_RESOURCES_ADDED"})},getState:function(){return{pagesLoading:o,resourcesDownloading:r}},empty:function(){o=[],r=[]}}}},0:function(n,e,t){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}var r=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o])}return n},a=t(81),u=t(1),i=o(u),s=t(187),c=o(s),l=t(80),f=t(384),p=t(329),d=o(p),m=t(109),h=t(221),g=o(h),y=t(58),x=o(y),j=t(407),v=o(j),R=t(408),b=o(R),C=t(219),N=o(C),w=t(218),k=o(w),_=t(145),P=o(_);t(252),window.___history=g.default,window.___emitter=x.default,P.default.addPagesArray(v.default),P.default.addProdRequires(k.default),window.asyncRequires=k.default,window.___loader=P.default,window.matchPath=l.matchPath;var E=b.default.reduce(function(n,e){return n[e.fromPath]=e,n},{}),L=function(n){var e=E[n];return null!=e&&(g.default.replace(e.toPath),!0)};L(window.location.pathname),(0,a.apiRunnerAsync)("onClientEntry").then(function(){function n(n){window.___history&&s!==!1||(window.___history=n,s=!0,n.listen(function(n,e){L(n.pathname)||setTimeout(function(){(0,a.apiRunner)("onRouteUpdate",{location:n,action:e})},0)}))}function e(n,e){var t=e.location.pathname,o=(0,a.apiRunner)("shouldUpdateScroll",{prevRouterProps:n,pathname:t});if(o.length>0)return o[0];if(n){var r=n.location.pathname;if(r===t)return!1}return!0}(0,a.apiRunner)("registerServiceWorker").length>0&&t(224);var o=function(n){function e(n){n.page.path===P.default.getPage(o).path&&(x.default.off("onPostLoadPageResources",e),clearTimeout(u),window.___history.push(t))}var t=(0,m.createLocation)(n,null,null,g.default.location),o=t.pathname,r=E[o];r&&(o=r.toPath);var a=window.location;if(a.pathname!==t.pathname||a.search!==t.search||a.hash!==t.hash){var u=setTimeout(function(){x.default.off("onPostLoadPageResources",e),x.default.emit("onDelayedLoadPageResources",{pathname:o}),window.___history.push(t)},1e3);P.default.getResourcesForPathname(o)?(clearTimeout(u),window.___history.push(t)):x.default.on("onPostLoadPageResources",e)}};window.___navigateTo=o,(0,a.apiRunner)("onRouteUpdate",{location:g.default.location,action:g.default.action});var s=!1,p=(0,a.apiRunner)("replaceRouterComponent",{history:g.default})[0],h=function(n){var e=n.children;return i.default.createElement(l.Router,{history:g.default},e)},y=(0,l.withRouter)(N.default);P.default.getResourcesForPathname(window.location.pathname,function(){var t=function(){return(0,u.createElement)(p?p:h,null,(0,u.createElement)(f.ScrollContext,{shouldUpdateScroll:e},(0,u.createElement)(y,{layout:!0,children:function(e){return(0,u.createElement)(l.Route,{render:function(t){n(t.history);var o=e?e:t;return P.default.getPage(o.location.pathname)?(0,u.createElement)(N.default,r({page:!0},o)):(0,u.createElement)(N.default,{page:!0,location:{pathname:"/404.html"}})}})}})))},o=(0,a.apiRunner)("wrapRootComponent",{Root:t},t)[0];(0,d.default)(function(){return c.default.render(i.default.createElement(o,null),"undefined"!=typeof window?document.getElementById("___gatsby"):void 0,function(){(0,a.apiRunner)("onInitialClientRender")})})})})},408:function(n,e){n.exports=[]},224:function(n,e,t){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}var r=t(58),a=o(r),u="/";"serviceWorker"in navigator&&navigator.serviceWorker.register(u+"sw.js").then(function(n){n.addEventListener("updatefound",function(){var e=n.installing;console.log("installingWorker",e),e.addEventListener("statechange",function(){switch(e.state){case"installed":navigator.serviceWorker.controller?window.location.reload():(console.log("Content is now available offline!"),a.default.emit("sw:installed"));break;case"redundant":console.error("The installing service worker became redundant.")}})})}).catch(function(n){console.error("Error during service worker registration:",n)})},146:function(n,e){"use strict";e.__esModule=!0,e.default=function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return n.substr(0,e.length)===e?n.slice(e.length):n},n.exports=e.default},329:function(n,e,t){!function(e,t){n.exports=t()}("domready",function(){var n,e=[],t=document,o=t.documentElement.doScroll,r="DOMContentLoaded",a=(o?/^loaded|^c/:/^loaded|^i|^c/).test(t.readyState);return a||t.addEventListener(r,n=function(){for(t.removeEventListener(r,n),a=1;n=e.shift();)n()}),function(n){a?setTimeout(n,0):e.push(n)}})},3:function(n,e,t){"use strict";function o(){function n(n){var e=o.lastChild;return"SCRIPT"!==e.tagName?void("undefined"!=typeof console&&console.warn&&console.warn("Script is not a script",e)):void(e.onload=e.onerror=function(){e.onload=e.onerror=null,setTimeout(n,0)})}var e,o=document.querySelector("head"),r=t.e,a=t.s;t.e=function(o,u){var i=!1,s=!0,c=function(n){u&&(u(t,n),u=null)};return!a&&e&&e[o]?void c(!0):(r(o,function(){i||(i=!0,s?setTimeout(function(){c()}):c())}),void(i||(s=!1,n(function(){i||(i=!0,a?a[o]=void 0:(e||(e={}),e[o]=!0),c(!0))}))))}}o()},376:function(n,e,t){"use strict";var o=t(15);n.exports=function(n,e){n.addEventListener("click",function(n){if(0!==n.button||n.altKey||n.ctrlKey||n.metaKey||n.shiftKey||n.defaultPrevented)return!0;for(var t=null,r=n.target;r.parentNode;r=r.parentNode)if("A"===r.nodeName){t=r;break}if(!t)return!0;if(t.target&&"_self"!==t.target.toLowerCase())return!0;if(t.pathname===window.location.pathname&&""!==t.hash)return!0;if(""===t.pathname)return!0;if(t.pathname.search(/^.*\.((?!htm)[a-z0-9]{1,5})$/i)!==-1)return!0;var a=document.createElement("a");a.href=t.href;var u=document.createElement("a");if(u.href=window.location.href,a.host!==u.host)return!0;var i=new RegExp("^"+u.host+(0,o.withPrefix)("/"));return!i.test(""+a.host+a.pathname)||(n.preventDefault(),e(t.getAttribute("href")),!1)})}},377:function(n,e,t){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}var r=t(15),a=t(376),u=o(a);e.onClientEntry=function(){(0,u.default)(window,function(n){(0,r.navigateTo)(n)})}},378:function(n,e,t){"use strict";e.onRouteUpdate=function(n){var e=n.location;"function"==typeof ga&&(window.ga("set","page",(e||{}).pathname),window.ga("send","pageview"))}},344:function(n,e,t){t(3),n.exports=function(n){return t.e(99219681209289,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(379)})})}},380:function(n,e){"use strict";e.registerServiceWorker=function(){return!0}},449:function(n,e){function t(n){return n=n||Object.create(null),{on:function(e,t){(n[e]||(n[e]=[])).push(t)},off:function(e,t){n[e]&&n[e].splice(n[e].indexOf(t)>>>0,1)},emit:function(e,t){(n[e]||[]).slice().map(function(n){n(t)}),(n["*"]||[]).slice().map(function(n){n(e,t)})}}}n.exports=t},125:function(n,e){function t(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function r(n){if(l===setTimeout)return setTimeout(n,0);if((l===t||!l)&&setTimeout)return l=setTimeout,setTimeout(n,0);try{return l(n,0)}catch(e){try{return l.call(null,n,0)}catch(e){return l.call(this,n,0)}}}function a(n){if(f===clearTimeout)return clearTimeout(n);if((f===o||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(n);try{return f(n)}catch(e){try{return f.call(null,n)}catch(e){return f.call(this,n)}}}function u(){h&&d&&(h=!1,d.length?m=d.concat(m):g=-1,m.length&&i())}function i(){if(!h){var n=r(u);h=!0;for(var e=m.length;e;){for(d=m,m=[];++g<e;)d&&d[g].run();g=-1,e=m.length}d=null,h=!1,a(n)}}function s(n,e){this.fun=n,this.array=e}function c(){}var l,f,p=n.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:t}catch(n){l=t}try{f="function"==typeof clearTimeout?clearTimeout:o}catch(n){f=o}}();var d,m=[],h=!1,g=-1;p.nextTick=function(n){var e=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)e[t-1]=arguments[t];m.push(new s(n,e)),1!==m.length||h||r(i)},s.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=c,p.addListener=c,p.once=c,p.off=c,p.removeListener=c,p.removeAllListeners=c,p.emit=c,p.prependListener=c,p.prependOnceListener=c,p.listeners=function(n){return[]},p.binding=function(n){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(n){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},563:function(n,e){"use strict";function t(n,e){for(var t in n)if(!(t in e))return!0;for(var o in e)if(n[o]!==e[o])return!0;return!1}e.__esModule=!0,e.default=function(n,e,o){return t(n.props,e)||t(n.state,o)},n.exports=e.default},346:function(n,e,t){t(3),n.exports=function(n){return t.e(0xa6bc690a59e9,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(234)})})}},347:function(n,e,t){t(3),n.exports=function(n){return t.e(0xec290d9fbc0a,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(235)})})}},348:function(n,e,t){t(3),n.exports=function(n){return t.e(0x81a450a7cd7a,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(236)})})}},349:function(n,e,t){t(3),n.exports=function(n){return t.e(0xc23565d713b7,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(237)})})}},350:function(n,e,t){t(3),n.exports=function(n){return t.e(36530248567819,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(238)})})}},351:function(n,e,t){t(3),n.exports=function(n){return t.e(90179704293519,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(239)})})}},352:function(n,e,t){t(3),n.exports=function(n){return t.e(0xa485d5bf544,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(240)})})}},353:function(n,e,t){t(3),n.exports=function(n){return t.e(0x623bdfc73907,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(241)})})}},354:function(n,e,t){t(3),n.exports=function(n){return t.e(2638498282051,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(242)})})}}});
//# sourceMappingURL=app-c4e69baae83780e164f8.js.map