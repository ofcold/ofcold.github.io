webpackJsonp([14],{

/***/ 415:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(6)
/* script */
var __vue_script__ = __webpack_require__(416)
/* template */
var __vue_template__ = __webpack_require__(417)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
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
Component.options.__file = "app/pages/src/home/Text.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0a88230a", Component.options)
  } else {
    hotAPI.reload("data-v-0a88230a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 416:
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


/* harmony default export */ __webpack_exports__["default"] = ({
	name: "myForm",
	data: function data() {
		return {
			foods: ["apple", "orange"],
			form: {}
		};
	},

	methods: {
		onSubmit: function onSubmit() {
			// form submit logic
		},
		validateState: function validateState(ref) {
			if (this.veeFields[ref] && this.veeFields[ref].dirty) {
				return !this.errors.has(ref);
			}
			return null;
		}
	}
});

/***/ }),

/***/ 417:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ofcold-form",
    { on: { submit: _vm.onSubmit } },
    [
      _c(
        "ofcold-form-group",
        {
          attrs: {
            id: "exampleInputGroup1",
            label: "Name",
            "label-for": "exampleInput1"
          }
        },
        [
          _c("ofcold-form-input", {
            directives: [
              {
                name: "validate",
                rawName: "v-validate",
                value: { required: true, min: 2 },
                expression: "{required: true, min:2}"
              }
            ],
            attrs: {
              id: "exampleInput1",
              type: "text",
              state: _vm.validateState("form.name"),
              "aria-describedby": "input1LiveFeedback",
              placeholder: "Enter name"
            },
            model: {
              value: _vm.form.name,
              callback: function($$v) {
                _vm.$set(_vm.form, "name", $$v)
              },
              expression: "form.name"
            }
          }),
          _vm._v(" "),
          _c(
            "ofcold-form-invalid-feedback",
            { attrs: { id: "input1LiveFeedback" } },
            [
              _vm._v(
                "\n\t\t\tThis is a required field and must be at least 3 characters\n\t\t"
              )
            ]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "ofcold-form-group",
        {
          attrs: {
            id: "exampleInputGroup2",
            label: "Food",
            "label-for": "exampleInput2"
          }
        },
        [
          _c("ofcold-form-select", {
            directives: [
              {
                name: "validate",
                rawName: "v-validate",
                value: { required: true },
                expression: "{required: true}"
              }
            ],
            attrs: {
              id: "exampleInput2",
              options: _vm.foods,
              state: _vm.validateState("form.foods")
            },
            model: {
              value: _vm.form.food,
              callback: function($$v) {
                _vm.$set(_vm.form, "food", $$v)
              },
              expression: "form.food"
            }
          }),
          _vm._v(" "),
          _c(
            "ofcold-form-invalid-feedback",
            { attrs: { id: "input2LiveFeedback" } },
            [_vm._v("\n\t\t\tThis is a required field\n\t\t")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("ofcold-button", { attrs: { type: "submit", variant: "primary" } }, [
        _vm._v("\n\t\tSubmit\n\t")
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0a88230a", module.exports)
  }
}

/***/ })

});