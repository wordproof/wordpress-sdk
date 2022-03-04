/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/helpers/data.js":
/*!**************************************!*\
  !*** ./resources/js/helpers/data.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": function() { return /* binding */ getData; }
/* harmony export */ });
const {
  get
} = lodash;
const getData = prop => get(window, `wordproofSdk.data${prop ? `.${prop}` : ''}`, {});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!******************************!*\
  !*** ./resources/js/data.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/data */ "./resources/js/helpers/data.js");

const {
  createReduxStore,
  registerStore,
  register
} = wp.data;
const storeName = 'wordproof';
const initialState = {
  isAuthenticated: (0,_helpers_data__WEBPACK_IMPORTED_MODULE_0__.getData)('is_authenticated')
};
const actions = {
  setIsAuthenticated(isAuthenticated) {
    return {
      type: 'SET_IS_AUTHENTICATED',
      isAuthenticated
    };
  },

  getIsAuthenticated() {
    return {
      type: 'GET_IS_AUTHENTICATED'
    };
  }

};

const reducer = function () {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_IS_AUTHENTICATED':
      {
        return { ...state,
          isAuthenticated: action.isAuthenticated
        };
      }

    default:
      {
        return state;
      }
  }
};

const selectors = {
  getIsAuthenticated(state) {
    const {
      isAuthenticated
    } = state;
    return isAuthenticated;
  }

};
const controls = {
  fetchIsAuthenticated(action) {
    return apiFetch({
      path: action.path
    });
  }

};
const resolvers = {
  *fetchIsAuthenticated() {
    const isAuthenticated = yield actions.getIsAuthenticated();
    return actions.setIsAuthenticated(isAuthenticated);
  }

};
const storeConfig = {
  reducer,
  controls,
  selectors,
  resolvers,
  actions
};

if (createReduxStore) {
  const store = createReduxStore('wordproof', storeConfig);
  register(store);
} else {
  /*
   * Compatibility fix for WP 5.6.
   * Remove this and the related import when WP 5.6 is no longer supported.
   */
  registerStore('wordproof', storeConfig);
}
}();
/******/ })()
;
//# sourceMappingURL=data.js.map