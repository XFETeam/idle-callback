(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("@xfe-team/idle-callback", [], factory);
	else if(typeof exports === 'object')
		exports["@xfe-team/idle-callback"] = factory();
	else
		root["@xfe-team/idle-callback"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestIdlePromise = exports.cancelIdleCallback = exports.requestIdleCallback = void 0;

// noinspection JSUnresolvedVariable

/**
 * 空闲时段内调用的函数, 启动调度函数
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback
 * @type {function(*): number}
 */
var requestIdleCallback = window.requestIdleCallback = window.requestIdleCallback || function (handler) {
  var startTime = Date.now();
  return setTimeout(function () {
    handler({
      didTimeout: false,
      timeRemaining: function timeRemaining() {
        return Math.max(0, 50.0 - (Date.now() - startTime));
      }
    });
  }, 1);
}; // noinspection JSUnresolvedVariable

/**
 * 空闲时段内调用的函数, 取消调度函数
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback
 * @type {function(*): number}
 */


exports.requestIdleCallback = requestIdleCallback;

var cancelIdleCallback = window.cancelIdleCallback = window.cancelIdleCallback || function (id) {
  clearTimeout(id);
};
/**
 * 空闲时段内调用的函数, 启动调度函数
 * e.g.
 * await requestIdlePromise().promise
 *
 * @returns {{cancel: cancel, promise: Promise<any>}}
 */


exports.cancelIdleCallback = cancelIdleCallback;

var requestIdlePromise = function requestIdlePromise(options) {
  var requestIdleCallbackHook;
  return {
    promise: new Promise(function (resolve) {
      requestIdleCallbackHook = window.requestIdleCallback(resolve, options);
    }),
    cancel: function cancel() {
      cancelIdleCallback(requestIdleCallbackHook);
    }
  };
};

exports.requestIdlePromise = requestIdlePromise;

/***/ })

/******/ });
});
//# sourceMappingURL=idle-callback.js.map