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
// eslint-disable-next-line no-undef
const {
  get
} = lodash;
/**
 * Helper to get data from added JavaScript window variable.
 *
 * @param {string} prop
 * @param {any}    defaultValue
 * @return {*} The variable.
 */

const getData = function (prop) {
  let defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return get(window, `wordproofSdk.data${prop ? `.${prop}` : ''}`, defaultValue);
};

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["apiFetch"];

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
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
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/data */ "./resources/js/helpers/data.js");


const {
  createReduxStore,
  registerStore,
  register
} = wp.data;
const storeName = 'wordproof';
const initialState = {
  isAuthenticated: (0,_helpers_data__WEBPACK_IMPORTED_MODULE_1__.getData)('is_authenticated', false),
  balance: (0,_helpers_data__WEBPACK_IMPORTED_MODULE_1__.getData)('balance', 0),
  selectedPostTypes: (0,_helpers_data__WEBPACK_IMPORTED_MODULE_1__.getData)('settings.selected_post_types', [])
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
  },

  setBalance(balance) {
    return {
      type: 'SET_BALANCE',
      balance
    };
  },

  getBalance() {
    return {
      type: 'GET_BALANCE'
    };
  },

  setSelectedPostTypes(selectedPostTypes) {
    return {
      type: 'SET_SELECTED_POST_TYPES',
      selectedPostTypes
    };
  },

  getSelectedPostTypes() {
    return {
      type: 'GET_SELECTED_POST_TYPES'
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

    case 'SET_BALANCE':
      {
        return { ...state,
          balance: action.balance
        };
      }

    case 'SET_SELECTED_POST_TYPES':
      {
        return { ...state,
          selectedPostTypes: action.selectedPostTypes
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
  },

  getBalance(state) {
    const {
      balance
    } = state;
    return balance;
  },

  getSelectedPostTypes(state) {
    const {
      selectedPostTypes
    } = state;
    return selectedPostTypes;
  }

};
const controls = {
  fetchIsAuthenticated(action) {
    return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
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
  const store = createReduxStore(storeName, storeConfig);
  register(store);
} else {
  /*
   * Compatibility fix for WP 5.6.
   * Remove this and the related import when WP 5.6 is no longer supported.
   */
  registerStore(storeName, storeConfig);
}
}();
/******/ })()
;
//# sourceMappingURL=data.js.map