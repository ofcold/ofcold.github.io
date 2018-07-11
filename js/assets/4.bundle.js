webpackJsonp([4],{

/***/ 198:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 200:
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

/***/ 201:
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
                _c("h1", [_vm._v("\n\t\t\t\t\tOfcold Platform\n\t\t\t\t")]),
                _vm._v(" "),
                _c("p", [
                  _vm._v(
                    "\n\t\t\t\t\tOfcold's incredibly powerful engine and development platform.\n\t\t\t\t"
                  )
                ]),
                _vm._v(" "),
                _c(
                  "a",
                  {
                    staticClass: "btn btn-xl btn-white btn-outline btn-rounded",
                    attrs: { href: "#", target: "_blank" }
                  },
                  [
                    _c("i", { staticClass: "fa fa-github " }),
                    _vm._v(" It's Going\n\t\t\t\t")
                  ]
                )
              ]
            )
          ],
          1
        )
      ]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "container" }, [
      _c("div", { staticClass: "row justify-content-center" }, [
        _c(
          "div",
          { staticClass: "col-md-8" },
          [
            _c("ofcold-radio-group", {
              attrs: { id: "radios1", options: _vm.options },
              model: {
                value: _vm.selected,
                callback: function($$v) {
                  _vm.selected = $$v
                },
                expression: "selected"
              }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "col-md-8" },
          [
            _c("ofcold-form-select", {
              staticClass: "mb-3",
              attrs: { options: _vm.options },
              model: {
                value: _vm.selected,
                callback: function($$v) {
                  _vm.selected = $$v
                },
                expression: "selected"
              }
            }),
            _vm._v(" "),
            _c("div", [
              _vm._v("Selected: "),
              _c("strong", [_vm._v(_vm._s(_vm.selected))])
            ])
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        [
          _c("h5", [_vm._v("No label")]),
          _vm._v(" "),
          _c("ofcold-progress", {
            staticClass: "mb-3",
            attrs: { value: _vm.value, max: _vm.max }
          }),
          _vm._v(" "),
          _c("h5", [_vm._v("Value label")]),
          _vm._v(" "),
          _c("ofcold-progress", {
            staticClass: "mb-3",
            attrs: { value: _vm.value, max: _vm.max, "show-value": "" }
          }),
          _vm._v(" "),
          _c("h5", [_vm._v("Progress label")]),
          _vm._v(" "),
          _c("ofcold-progress", {
            staticClass: "mb-3",
            attrs: { value: _vm.value, max: _vm.max, "show-progress": "" }
          }),
          _vm._v(" "),
          _c("h5", [_vm._v("Value label with precision")]),
          _vm._v(" "),
          _c("ofcold-progress", {
            staticClass: "mb-3",
            attrs: {
              value: _vm.value,
              max: _vm.max,
              precision: 2,
              "show-value": ""
            }
          }),
          _vm._v(" "),
          _c("h5", [_vm._v("Progress label with precision")]),
          _vm._v(" "),
          _c("ofcold-progress", {
            staticClass: "w-50 mb-3",
            attrs: {
              value: _vm.value,
              max: _vm.max,
              precision: 2,
              "show-progress": ""
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "row" },
        [
          _vm._l(_vm.imgs, function(img) {
            return [
              _c(
                "ofcold-column",
                { attrs: { xs: 8 } },
                [
                  _c("ofcold-img-lazy", {
                    staticClass: "my-5",
                    attrs: {
                      src: img,
                      center: "",
                      "fluid-grow": "",
                      width: "300",
                      height: "500",
                      "blank-color": "#bbb",
                      alt: "img"
                    }
                  })
                ],
                1
              )
            ]
          })
        ],
        2
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-27991978", module.exports)
  }
}

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(198)
}
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(200)
/* template */
var __vue_template__ = __webpack_require__(201)
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
Component.options.__file = "app/pages/home/App.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-27991978", Component.options)
  } else {
    hotAPI.reload("data-v-27991978", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});