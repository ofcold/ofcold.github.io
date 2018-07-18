webpackJsonp([13],{

/***/ 166:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 304:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 305:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(166)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 306:
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ 307:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(346)
}
var normalizeComponent = __webpack_require__(6)
/* script */
var __vue_script__ = __webpack_require__(349)
/* template */
var __vue_template__ = __webpack_require__(350)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/pages/src/home/App.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5ec26043", Component.options)
  } else {
    hotAPI.reload("data-v-5ec26043", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 346:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(347);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(305)("383650f8", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5ec26043\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5ec26043\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 347:
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(306);
exports = module.exports = __webpack_require__(304)(false);
// imports


// module
exports.push([module.i, "\n.banner {\n\tcolor: #ffffff;\n\tposition: relative;\n\tbackground-size: cover;\n\tbackground-position: center;\n\tbackground-repeat: no-repeat;\n\t/**\n\t\t * Banner Components\n\t\t */\n\t/**\n\t\t * Banner Variations\n\t\t */\n}\n.banner .banner-overlay {\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\tz-index: 1;\n\tpadding: 0;\n\topacity: .7;\n\toverflow: hidden;\n\tposition: absolute;\n}\n.banner .banner-inner {\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\tz-index: 2;\n\tpadding: 0;\n\toverflow: hidden;\n\tposition: absolute;\n}\n.banner .banner-content {\n\tz-index: 2;\n\tposition: relative;\n\tpadding: 4rem 4rem 8rem;\n}\n.banner .banner-title {\n\tmargin-top: 0;\n}\n.banner .banner-title small {\n\topacity: .5;\n\tcolor: #ffffff;\n\tdisplay: block;\n\tmargin-bottom: 2rem;\n\ttext-transform: uppercase;\n\tfont-size: 19.2px;\n}\n.banner .banner-media.banner-media-center {\n\tmargin-top: 6rem;\n}\n.banner .banner-media.banner-media-center img {\n\tmax-width: 100%;\n}\n.banner .banner-media.banner-media-left img {\n\tfloat: right;\n}\n.banner .banner-media.banner-media-right img {\n\tfloat: left;\n}\n.banner.banner-huge {\n\theight: 90vh;\n\tmax-height: 90vh;\n\tmin-height: 630px;\n}\n.banner.banner-jumbotron h1 {\n\tfont-size: 81px;\n}\n.banner.banner-jumbotron p {\n\tfont-size: 27px;\n}\n@media (max-width: 991px) {\n.banner.banner-jumbotron h1 {\n\t\tfont-size: 40.5px;\n}\n.banner.banner-jumbotron p {\n\t\tfont-size: 18px;\n}\n}\n.vertical-align {\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-align: center;\n\t    -ms-flex-align: center;\n\t        align-items: center;\n\t-webkit-box-pack: center;\n\t    -ms-flex-pack: center;\n\t        justify-content: center;\n}\n.bg-pattern-hexagonal {\n\tbackground-size: 100%;\n\tbackground-repeat: no-repeat;\n\tbackground-position: bottom center;\n\tbackground-image: url(" + escape(__webpack_require__(348)) + ");\n}\n.bg-info.bg-gradient {\n\tbackground-image: linear-gradient(141deg, #0fdafd 0%, #01a5fb 51%, #8474ec 100%);\n}\n/*\n * Custom translucent site header\n */\n.site-header {\n  background-color: rgba(0, 0, 0, .85);\n  -webkit-backdrop-filter: saturate(180%) blur(20px);\n  backdrop-filter: saturate(180%) blur(20px);\n}\n.site-header a {\n  color: #999;\n  -webkit-transition: ease-in-out color .15s;\n  transition: ease-in-out color .15s;\n}\n.site-header a:hover {\n  color: #fff;\n  text-decoration: none;\n}\n\n/*\n * Dummy devices (replace them with your own or something else entirely!)\n */\n.product-device {\n  position: absolute;\n  right: 10%;\n  bottom: -30%;\n  width: 300px;\n  height: 540px;\n  background-color: #333;\n  border-radius: 21px;\n  -webkit-transform: rotate(30deg);\n  transform: rotate(30deg);\n}\n.product-device::before {\n  position: absolute;\n  top: 10%;\n  right: 10px;\n  bottom: 10%;\n  left: 10px;\n  content: \"\";\n  background-color: rgba(255, 255, 255, .1);\n  border-radius: 5px;\n}\n.product-device-2 {\n  top: -25%;\n  right: auto;\n  bottom: 0;\n  left: 5%;\n  background-color: #e5e5e5;\n}\n\n\n/*\n * Extra utilities\n */\n.border-top { border-top: 1px solid #e5e5e5;\n}\n.border-bottom { border-bottom: 1px solid #e5e5e5;\n}\n.box-shadow { -webkit-box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05); box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05);\n}\n.flex-equal > * {\n  -ms-flex: 1;\n  -webkit-box-flex: 1;\n          flex: 1;\n}\n@media (min-width: 768px) {\n.flex-md-equal > * {\n    -ms-flex: 1;\n    -webkit-box-flex: 1;\n            flex: 1;\n}\n}\n.overflow-hidden { overflow: hidden;\n}\n", ""]);

// exports


/***/ }),

/***/ 348:
/***/ (function(module, exports) {

module.exports = "/images/bg-hexagonal.svg?a8f67cedee3ebab4c3d74b65f7c2849a";

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//import OfcoldSwitch from 'ofcold-switch';
//import sms from 'ofcold-security-code';

/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			dsss: false,
			ddddddddd: '',
			slide: 0,
			sliding: null,
			selected: 'first',
			max: 50,
			value: 33.333333333,
			imgs: ['/images/img/9fa392054f9f43129afb874c7ebd699d.jpg', '/images/img/31d1404601934c6182976f37cdeb2ef9.jpg', '/images/img/2907471037d5407d96c57aa95fb12a8b.jpg', '/images/img/a9f0d1a6d5de45bba7cad247b4656332.jpg', '/images/img/31d1404601934c6182976f37cdeb2ef9.jpg', '/images/img/ba25555c07164128b8e2b340b312fd7d.jpg', '/images/img/31d1404601934c6182976f37cdeb2ef9.jpg', '/images/img/2907471037d5407d96c57aa95fb12a8b.jpg', '/images/img/a9f0d1a6d5de45bba7cad247b4656332.jpg'],
			options: [{ text: 'Toggle this custom radio', value: 'first' }, { text: 'Or toggle this other custom radio', value: 'second' }, { text: 'This one is Disabled', value: 'third', disabled: true }, { text: 'This is the 4th radio', value: { fourth: 4 } }]
		};
	},
	// components: {
	// 	OfcoldSwitch,
	// 	sms
	// },
	created: function created() {
		// this.$notify.error({
		// 	title: 'Hi',
		// 	desc: 'The home page.'
		// });

		//this.$loading.open();
	},

	methods: {
		onSlideStart: function onSlideStart(slide) {
			this.sliding = true;
		},
		onSlideEnd: function onSlideEnd(slide) {
			this.sliding = false;
		}
	}
});

/***/ }),

/***/ 350:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "section",
      {
        staticClass: "banner banner-huge banner-jumbotron bg-info bg-gradient"
      },
      [
        _c("div", { staticClass: "banner-overlay bg-pattern-hexagonal" }),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "banner-inner vertical-align" },
          [
            _c(
              "ofcold-column",
              { staticClass: "text-center", attrs: { lg: 10 } },
              [
                _c("h1", [_vm._v("\n\t\t\t\t\tOfcold\n\t\t\t\t")]),
                _vm._v(" "),
                _c("p", [
                  _vm._v("\n\t\t\t\t\t陪伴你人生的每一个重要时刻!\n\t\t\t\t")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "display-10" }, [
                  _vm._v(
                    "\n\t\t\t\t\tACCOMPANY YOU THROUGH EVERY IMPORTANT MOMENT IN LIFE!\n\t\t\t\t"
                  )
                ]),
                _vm._v(" "),
                _c(
                  "a",
                  {
                    staticClass: "btn btn-xl btn-outline-dark btn-rounded mt-6",
                    attrs: { href: "#", target: "_blank" }
                  },
                  [
                    _c("i", { staticClass: "fa fa-home " }),
                    _vm._v(" 敬请期待！\n\t\t\t\t")
                  ]
                )
              ]
            )
          ],
          1
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5ec26043", module.exports)
  }
}

/***/ })

});