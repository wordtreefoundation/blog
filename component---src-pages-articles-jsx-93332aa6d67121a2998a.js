webpackJsonp([0xec290d9fbc0a],{235:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.pageQuery=void 0;var u=n(1),c=a(u),i=n(21),f=a(i),s=n(59),d=a(s),p=n(24),m=a(p),h=function(e){function t(){return r(this,t),o(this,e.apply(this,arguments))}return l(t,e),t.prototype.render=function(){var e=[],t=this.props.data.site.siteMetadata,n=t.title,a=t.subtitle,r=this.props.data.allMarkdownRemark.edges;return r.forEach(function(t){e.push(c.default.createElement(d.default,{data:t,key:t.node.fields.slug}))}),c.default.createElement("div",null,c.default.createElement(f.default,null,c.default.createElement("title",null,n),c.default.createElement("meta",{name:"description",content:a})),c.default.createElement(m.default,this.props),c.default.createElement("div",{className:"content"},c.default.createElement("div",{className:"content__inner"},e)))},t}(c.default.Component);t.default=h;t.pageQuery="** extracted graphql fragment **"}});
//# sourceMappingURL=component---src-pages-articles-jsx-93332aa6d67121a2998a.js.map