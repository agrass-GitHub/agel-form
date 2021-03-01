((typeof self !== 'undefined' ? self : this)["webpackJsonpagelForm"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpagelForm"] || []).push([[3],{

/***/ "8d40":
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "b34d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("61a2");
var global = __webpack_require__("73cd");
var isForced = __webpack_require__("f4fa");
var redefine = __webpack_require__("016d");
var has = __webpack_require__("b587");
var classof = __webpack_require__("3563");
var inheritIfRequired = __webpack_require__("b57c");
var toPrimitive = __webpack_require__("448d");
var fails = __webpack_require__("bc5d");
var create = __webpack_require__("08bf");
var getOwnPropertyNames = __webpack_require__("f9d5").f;
var getOwnPropertyDescriptor = __webpack_require__("016e").f;
var defineProperty = __webpack_require__("58ea").f;
var trim = __webpack_require__("f9f8").trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,' +
    // ESNext
    'fromString,range'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ "b57c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("3079");
var setPrototypeOf = __webpack_require__("3724");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "c376":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/_cache-loader@3.0.1@cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"83b24dc8-vue-loader-template"}!./node_modules/_vue-loader@15.9.6@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_cache-loader@3.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.6@vue-loader/lib??vue-loader-options!./src/components/agel-checkbox-group.vue?vue&type=template&id=30ab2042&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-checkbox-group',_vm._g(_vm._b({ref:"ref",staticClass:"agel-checkbox-group",attrs:{"value":_vm.value},on:{"input":_vm.input}},'el-checkbox-group',_vm.$attrs,false),_vm.on),_vm._l((_vm.options),function(option){return _c(_vm.checkboxComponent,_vm._b({key:option.value,tag:"component",attrs:{"label":option.value}},'component',option,false),[_vm._v("\n    "+_vm._s(option.label)+"\n  ")])}),1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/agel-checkbox-group.vue?vue&type=template&id=30ab2042&

// EXTERNAL MODULE: ./src/components/formMixin.js
var formMixin = __webpack_require__("ff1c");

// CONCATENATED MODULE: ./node_modules/_cache-loader@3.0.1@cache-loader/dist/cjs.js??ref--12-0!./node_modules/_thread-loader@2.1.3@thread-loader/dist/cjs.js!./node_modules/_babel-loader@8.2.2@babel-loader/lib!./node_modules/_cache-loader@3.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.6@vue-loader/lib??vue-loader-options!./src/components/agel-checkbox-group.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//

/* harmony default export */ var agel_checkbox_groupvue_type_script_lang_js_ = ({
  name: "agel-checkbox-group",
  mixins: [formMixin["a" /* default */]],
  props: {
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    button: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {};
  },
  created: function created() {},
  computed: {
    checkboxComponent: function checkboxComponent() {
      return this.button ? "el-checkbox-button" : "el-checkbox";
    }
  }
});
// CONCATENATED MODULE: ./src/components/agel-checkbox-group.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_agel_checkbox_groupvue_type_script_lang_js_ = (agel_checkbox_groupvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/_vue-loader@15.9.6@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("5d22");

// CONCATENATED MODULE: ./src/components/agel-checkbox-group.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_agel_checkbox_groupvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var agel_checkbox_group = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "f9f8":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("11a1");
var whitespaces = __webpack_require__("8d40");

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "ff1c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b34d");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    value: [Number, String, Array, Boolean],
    on: {
      type: Object,
      default: function _default() {
        return new Object();
      }
    }
  },
  data: function data() {
    return {};
  },
  methods: {
    input: function input(v) {
      this.$emit("input", v);
    },
    getRef: function getRef() {
      return this.$refs.ref;
    }
  }
});

/***/ })

}]);