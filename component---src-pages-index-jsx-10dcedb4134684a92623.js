webpackJsonp([0xc23565d713b7],{228:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var u=n(1),i=o(u);n(454);var c=function(e){function t(){return r(this,t),a(this,e.apply(this,arguments))}return l(t,e),t.prototype.render=function(){return i.default.createElement("div",{className:"pill"},this.props.children)},t}(i.default.Component);t.default=c,e.exports=t.default},454:function(e,t){},230:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var u=n(1),i=o(u),c=n(15),s=(o(c),n(148)),f=o(s),d=n(147),p=o(d);n(458);var m=function(e){function t(){return r(this,t),a(this,e.apply(this,arguments))}return l(t,e),t.prototype.render=function(){var e=(this.props.location,this.props.data.site.siteMetadata),t=e.author,n=e.subtitle,o=e.copyright,r=e.menu,a=i.default.createElement("div",{className:"sidebar_home__author-block"},i.default.createElement("p",{className:"sidebar_home__author-subtitle"},n));return i.default.createElement("div",{className:"sidebar_home"},i.default.createElement("div",{className:"sidebar_home__inner"},i.default.createElement("div",{className:"sidebar_home__author"},a),i.default.createElement("div",null,i.default.createElement(f.default,{data:r}),i.default.createElement(p.default,{data:t}),i.default.createElement("p",{className:"sidebar_home__copyright"},o))))},t}(i.default.Component);t.default=m,e.exports=t.default},458:function(e,t){},232:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var u=n(1),i=o(u),c=n(182),s=(o(c),n(15)),f=(o(s),n(568)),d=o(f);n(459);var p=function(e){function t(){return r(this,t),a(this,e.apply(this,arguments))}return l(t,e),t.prototype.render=function(){return i.default.createElement("div",{className:"title"},i.default.createElement("img",{src:d.default}),i.default.createElement("div",{className:"title__name"},"WordTree Foundation"))},t}(i.default.Component);t.default=p,e.exports=t.default},459:function(e,t){},568:function(e,t,n){e.exports=n.p+"static/wordtree.a1cbbaf6.png"},236:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.pageQuery=void 0;var u=n(1),i=o(u),c=n(21),s=o(c),f=n(59),d=o(f),p=n(15),m=o(p),h=n(232),b=o(h),y=n(228),_=o(y),E=n(230),w=o(E);n(460);var v=function(e){function t(){return r(this,t),a(this,e.apply(this,arguments))}return l(t,e),t.prototype.render=function(){var e=this.props.data.site.siteMetadata,t=e.title,n=e.subtitle,o=this.props.data.allMarkdownRemark.edges[0];return i.default.createElement("div",null,i.default.createElement(s.default,null,i.default.createElement("title",null,t),i.default.createElement("meta",{name:"description",content:n})),i.default.createElement("div",{style:{marginTop:25,marginBottom:25}},i.default.createElement(b.default,null)),i.default.createElement("div",{className:"layout"},i.default.createElement(w.default,this.props),i.default.createElement("div",{className:"content"},i.default.createElement("div",{className:"content__inner"},i.default.createElement("div",{className:"index__articles"},i.default.createElement("h1",null,"News"),i.default.createElement(d.default,{data:o,key:o.node.fields.slug}),i.default.createElement(m.default,{to:"/news/"},i.default.createElement("h2",null,"See All ",i.default.createElement(_.default,null,this.props.data.allMarkdownRemark.edges.length)," Articles"))),i.default.createElement("div",{className:"index__projects"},i.default.createElement("h1",null,"Projects"),i.default.createElement("h3",null,i.default.createElement("a",{href:"https://www.bookofmormonorigins.com"},"Book of Mormon Origins")),i.default.createElement("p",null,"An open-source, public domain resource that adds missing footnotes to the Book of Mormon."),i.default.createElement("h3",null,i.default.createElement("a",{href:"http://wordtree.org/the-late-war"},"The Late War Study")),i.default.createElement("p",null,"A computer-aided study that reveals some remarkable similarities between the Book of Mormon and The Late War Between the United States and Great Britain (published in 1816)."),i.default.createElement("h3",null,i.default.createElement("a",{href:"https://github.com/wordtreefoundation/bomdb"},"BomDB (Book of Mormon Database)")),i.default.createElement("p",null,"A resource for computer-aided studies of the Book of Mormon. Contains a command-line tool (Linux/MacOS/Windows) that can be used to find specific verses across multiple editions, or produce full copies (with our without chapter/verse annotations) of each edition."))))))},t}(i.default.Component);t.default=v;t.pageQuery="** extracted graphql fragment **"},460:function(e,t){}});
//# sourceMappingURL=component---src-pages-index-jsx-10dcedb4134684a92623.js.map