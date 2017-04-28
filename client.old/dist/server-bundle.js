module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("vue");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_App_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_App_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex_router_sync___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__filters__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__router__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__store__["a"]; });
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return app; });







// sync the router with the vuex store.
// this registers `store.state.route`
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__["sync"])(__WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__router__["a" /* default */])

// register global utility filters.
Object.keys(__WEBPACK_IMPORTED_MODULE_5__filters__).forEach(function (key) {
  __WEBPACK_IMPORTED_MODULE_0_vue___default.a.filter(key, __WEBPACK_IMPORTED_MODULE_5__filters__[key])
})

// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(Object.assign({}, {router: __WEBPACK_IMPORTED_MODULE_3__router__["a" /* default */],
  store: __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */]},
  __WEBPACK_IMPORTED_MODULE_1__components_App_vue___default.a))

// expose the app, the router and the store.
// note we are not mounting the app here, since bootstrapping will be
// different depending on whether we are in a browser or on the server.



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

/* harmony default export */ exports["default"] = {
  computed: {
    count: function count() {
      return this.$store.state.count
    }
  }
};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Counter_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Counter_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Counter_vue__);
//
//
//
//
//
//
//
//
//



/* harmony default export */ exports["default"] = {
  components: {
    Counter: __WEBPACK_IMPORTED_MODULE_0__components_Counter_vue___default.a
  }
};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony export (immutable) */ exports["foo"] = foo;
function foo() {}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_Home_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_Home_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__views_Home_vue__);



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router___default.a)



/* harmony default export */ exports["a"] = new __WEBPACK_IMPORTED_MODULE_1_vue_router___default.a({
  mode: 'history',
  scrollBehavior: function () { return ({ y: 0 }); },
  routes: [
    { path: '/',  component: __WEBPACK_IMPORTED_MODULE_2__views_Home_vue___default.a }
  ]
});


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuex__);



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex___default.a)

var state = {
  count: 0
}

var mutations = {
  INCREMENT: function INCREMENT(state) {
    state.count++
  },
  DECREMENT: function DECREMENT(state) {
    state.count--
  }
}

var actions = {
  incrementAsync: function incrementAsync(ref) {
    var commit = ref.commit;

    setTimeout(function () {
      commit('INCREMENT')
    }, 200)
  }
}

var store = new __WEBPACK_IMPORTED_MODULE_1_vuex___default.a.Store({
  state: state,
  mutations: mutations,
  actions: actions
})

/* harmony default export */ exports["a"] = store;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */

/* template */
var __vue_template__ = __webpack_require__(10)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

module.exports = __vue_exports__


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */

/* script */
__vue_exports__ = __webpack_require__(2)

/* template */
var __vue_template__ = __webpack_require__(11)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

module.exports = __vue_exports__


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(3)

/* template */
var __vue_template__ = __webpack_require__(12)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

module.exports = __vue_exports__


/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ },
/* 11 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "counter-wrapper"
  }, [_c('div', {
    staticClass: "counter"
  }, [_vm._v("\n    " + _vm._s(_vm.count) + "\n  ")]), _c('button', {
    on: {
      "click": function($event) {
        _vm.$store.commit('INCREMENT')
      }
    }
  }, [_vm._v("Increment")]), _c('button', {
    on: {
      "click": function($event) {
        _vm.$store.commit('DECREMENT')
      }
    }
  }, [_vm._v("Decrement")]), _c('button', {
    on: {
      "click": function($event) {
        _vm.$store.dispatch('incrementAsync')
      }
    }
  }, [_vm._v("Increment Async")])])
},staticRenderFns: []}

/***/ },
/* 12 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "page"
  }, [_c('counter'), _vm._m(0)], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_vm._v("\n    To get started, edit files in "), _c('code', [_vm._v("./client")]), _vm._v(" and save.\n  ")])
}]}

/***/ },
/* 13 */
/***/ function(module, exports) {

module.exports = require("vue-router");

/***/ },
/* 14 */
/***/ function(module, exports) {

module.exports = require("vuex");

/***/ },
/* 15 */
/***/ function(module, exports) {

module.exports = require("vuex-router-sync");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(1);


var isDev = "production" !== 'production'

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
/* harmony default export */ exports["default"] = function (context) {
  var s = isDev && Date.now()

  // set router's location
  __WEBPACK_IMPORTED_MODULE_0__app__["a" /* router */].push(context.url)
  var matchedComponents = __WEBPACK_IMPORTED_MODULE_0__app__["a" /* router */].getMatchedComponents()

  // no matched routes
  if (!matchedComponents.length) {
    return Promise.reject({ code: '404' })
  }

  // Call preFetch hooks on components matched by the route.
  // A preFetch hook dispatches a store action and returns a Promise,
  // which is resolved when the action is complete and store state has been
  // updated.
  return Promise.all(matchedComponents.map(function (component) {
    if (component.preFetch) {
      return component.preFetch(__WEBPACK_IMPORTED_MODULE_0__app__["b" /* store */])
    }
  })).then(function () {
    isDev && console.log(("data pre-fetch: " + (Date.now() - s) + "ms"))
    // After all preFetch hooks are resolved, our store is now
    // filled with the state needed to render the app.
    // Expose the state on the render context, and let the request handler
    // inline the state in the HTML response. This allows the client-side
    // store to pick-up the server-side state without having to duplicate
    // the initial data fetching on the client.
    context.initialState = __WEBPACK_IMPORTED_MODULE_0__app__["b" /* store */].state
    return __WEBPACK_IMPORTED_MODULE_0__app__["c" /* app */]
  })
};


/***/ }
/******/ ]);