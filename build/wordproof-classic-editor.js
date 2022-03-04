/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/helpers/api.js":
/*!*************************************!*\
  !*** ./resources/js/helpers/api.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleAPIResponse": function() { return /* binding */ handleAPIResponse; },
/* harmony export */   "callEndpoint": function() { return /* binding */ callEndpoint; },
/* harmony export */   "destroyAuthentication": function() { return /* binding */ destroyAuthentication; },
/* harmony export */   "fetchSettings": function() { return /* binding */ fetchSettings; },
/* harmony export */   "fetchIsAuthenticated": function() { return /* binding */ fetchIsAuthenticated; }
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _endpoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./endpoints */ "./resources/js/helpers/endpoints.js");


/**
 * Wraps the API requests and handles the API responses.
 *
 * @param {Function} apiRequest         The API request function call to handle.
 * @param {Function} onSuccessCallback  The callback to run on a successful response.
 * @param {Function} onFailureCallback  The callback to run on a failed response.
 * @param {number}   expectedStatusCode The expected status code to run the success callback on.
 *
 * @return {Promise} The handled response promise.
 */

async function handleAPIResponse(apiRequest, onSuccessCallback, onFailureCallback) {
  let expectedStatusCode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 200;

  try {
    const response = await apiRequest(); // No response if the request was aborted.

    if (response) {
      if (response.status === expectedStatusCode) {
        return onSuccessCallback(response);
      }

      return onFailureCallback(response);
    }

    return false;
  } catch (e) {
    console.error(e.message);
  }
}
/**
 * Calls the passed endpoint and handles any potential errors.
 *
 * @param {Object} endpoint The endpoint object.
 *
 * @return {Promise} The API response promise.
 */

async function callEndpoint(endpoint) {
  try {
    return await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()(endpoint);
  } catch (e) {
    // If the error object looks like what we expect, return it.
    if (e.error && e.status) {
      return e;
    } // Sometimes we get a Response instance back instead of the data itself.


    if (e instanceof Response) {
      return await e.json();
    } // Likely AbortError, otherwise a connection error.
    // We need to somehow upgrade @wordpress/api-fetch to differentiate between these.


    return false;
  }
}
/**
 * Destroy oauth token
 *
 * @return {Promise<Object|boolean>} The response object or false if request fails.
 */

const destroyAuthentication = async () => {
  return await handleAPIResponse(async () => await (0,_endpoints__WEBPACK_IMPORTED_MODULE_1__.destroyAuthenticationRequest)(), response => response, () => false);
};
/**
 * Retrieves WordProof settings.
 *
 * @return {Promise<Object|boolean>} The response object or false if request fails.
 */

const fetchSettings = async () => {
  return await handleAPIResponse(async () => await (0,_endpoints__WEBPACK_IMPORTED_MODULE_1__.getSettingsRequest)(), response => response, () => false);
};
/**
 * Retrieves WordProof authentication status.
 *
 * @return {Promise<boolean>} The authentication status.
 */

const fetchIsAuthenticated = async () => {
  return await handleAPIResponse(async () => await (0,_endpoints__WEBPACK_IMPORTED_MODULE_1__.getIsAuthenticatedRequest)(), // eslint-disable-next-line camelcase
  _ref => {
    let {
      is_authenticated
    } = _ref;
    return is_authenticated;
  }, () => false);
};

/***/ }),

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

/***/ }),

/***/ "./resources/js/helpers/endpoints.js":
/*!*******************************************!*\
  !*** ./resources/js/helpers/endpoints.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postAuthenticationRequest": function() { return /* binding */ postAuthenticationRequest; },
/* harmony export */   "destroyAuthenticationRequest": function() { return /* binding */ destroyAuthenticationRequest; },
/* harmony export */   "getSettingsRequest": function() { return /* binding */ getSettingsRequest; },
/* harmony export */   "getIsAuthenticatedRequest": function() { return /* binding */ getIsAuthenticatedRequest; },
/* harmony export */   "postTimestampRequest": function() { return /* binding */ postTimestampRequest; },
/* harmony export */   "getLatestTimestampTransactionRequest": function() { return /* binding */ getLatestTimestampTransactionRequest; }
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./resources/js/helpers/api.js");

const WORDPROOF_REST_API_NAMESPACE = 'wordproof/v1';
/**
 * Request Access token from WordProof
 *
 * @param  state.state
 * @param  state The state returned by WordProof
 * @param  code The code returned by WordProof
 * @param  state.code
 * @return {Promise<*>}
 */

const postAuthenticationRequest = async _ref => {
  let {
    state,
    code
  } = _ref;
  return await (0,_api__WEBPACK_IMPORTED_MODULE_0__.callEndpoint)({
    path: `${WORDPROOF_REST_API_NAMESPACE}/oauth/authenticate`,
    method: 'POST',
    data: {
      state,
      code
    }
  });
};
/**
 * Destroy oauth token
 *
 * @return {Promise<Object|boolean>} The response object or false if request fails.
 */

const destroyAuthenticationRequest = async () => {
  return await (0,_api__WEBPACK_IMPORTED_MODULE_0__.callEndpoint)({
    path: `${WORDPROOF_REST_API_NAMESPACE}/oauth/destroy`,
    method: 'POST'
  });
};
/**
 * Retrieves WordProof settings.
 *
 * @return {Promise<Object|boolean>} The response object or false if request fails.
 */

const getSettingsRequest = async () => {
  return await (0,_api__WEBPACK_IMPORTED_MODULE_0__.callEndpoint)({
    path: `${WORDPROOF_REST_API_NAMESPACE}/settings`,
    method: 'GET'
  });
};
/**
 * Retrieves WordProof authentication status.
 *
 * @return {Promise<boolean>} The authentication status.
 */

const getIsAuthenticatedRequest = async () => {
  return await (0,_api__WEBPACK_IMPORTED_MODULE_0__.callEndpoint)({
    path: `${WORDPROOF_REST_API_NAMESPACE}/authentication`,
    method: 'GET'
  });
};
/**
 * The post timestamp request
 *
 * @param  postId The post id
 * @return {Promise<Object>} The promise wrapping the response object.
 */

const postTimestampRequest = async postId => {
  return (0,_api__WEBPACK_IMPORTED_MODULE_0__.callEndpoint)({
    path: `${WORDPROOF_REST_API_NAMESPACE}/posts/${postId}/timestamp`,
    method: 'POST'
  });
};
/**
 * Retrieves the latest timestamp transaction for a post.
 *
 * @param  postId The post id
 * @return {Promise<Object>} The promise wrapping the response object.
 */

const getLatestTimestampTransactionRequest = async postId => {
  return (0,_api__WEBPACK_IMPORTED_MODULE_0__.callEndpoint)({
    path: `${WORDPROOF_REST_API_NAMESPACE}/posts/${postId}/timestamp/transaction/latest`,
    method: 'GET'
  });
};

/***/ }),

/***/ "./resources/js/helpers/event.js":
/*!***************************************!*\
  !*** ./resources/js/helpers/event.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dispatch": function() { return /* binding */ dispatch; }
/* harmony export */ });
function dispatch(name) {
  const event = new window.CustomEvent(name);
  console.warn('Event dispatch: ' + name);
  window.dispatchEvent(event);
}

/***/ }),

/***/ "./resources/js/helpers/popup.js":
/*!***************************************!*\
  !*** ./resources/js/helpers/popup.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ popupWindow; }
/* harmony export */ });
/**
 * Creates a new window on top of the current window.
 *
 * @param {Window} window     Reference to the current window.
 * @param {string} url        Url to visit in new window.
 * @param {string} windowName Name of the new window.
 * @param {number} width      Width of the new window.
 * @param {number} height     Height of the new window.
 * @return {Window} Reference to the new window.
 */
function popupWindow(window, url) {
  let windowName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  let width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 800;
  let height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 680;
  const y = window.top.outerHeight / 2 + window.top.screenY - height / 2;
  const x = window.top.outerWidth / 2 + window.top.screenX - width / 2;
  return window.open(url, windowName, `toolbar=no,
		location=no,
		directories=no,
		status=no,
		menubar=no,
		resizable=no,
		copyhistory=no,
		width=${width},
		height=${height},
		top=${y},
		left=${x}`);
}

/***/ }),

/***/ "./resources/js/initializers/authentication.js":
/*!*****************************************************!*\
  !*** ./resources/js/initializers/authentication.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ initializeAuthentication; }
/* harmony export */ });
/* harmony import */ var _helpers_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/api */ "./resources/js/helpers/api.js");
/* harmony import */ var _helpers_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/data */ "./resources/js/helpers/data.js");
/* harmony import */ var _helpers_popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/popup */ "./resources/js/helpers/popup.js");
/* harmony import */ var _helpers_event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/event */ "./resources/js/helpers/event.js");
/* harmony import */ var _helpers_endpoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/endpoints */ "./resources/js/helpers/endpoints.js");

const {
  dispatch
} = wp.data;




function initializeAuthentication() {
  const {
    setIsAuthenticated
  } = dispatch('wordproof');
  const authenticationLink = (0,_helpers_data__WEBPACK_IMPORTED_MODULE_1__.getData)('popup_redirect_authentication_url');
  const settingsLink = (0,_helpers_data__WEBPACK_IMPORTED_MODULE_1__.getData)('popup_redirect_settings_url');
  let popup = null;
  /**
   * Open the settings popup.
   *
   * @param  event
   */

  const openSettings = event => {
    event.preventDefault();
    openPopup(settingsLink, 'WordProof_Settings');
  };
  /**
   * Open the authentication popup.
   *
   * @param  event
   */


  const openAuthentication = event => {
    event.preventDefault();
    openPopup(authenticationLink, 'WordProof_Authentication');
  };
  /**
   * Opens popup and set in state.
   *
   * @param  link
   * @param  name
   */


  const openPopup = (link, name) => {
    popup = (0,_helpers_popup__WEBPACK_IMPORTED_MODULE_2__["default"])(window, link, name);

    if (popup) {
      popup.focus();
    }

    window.addEventListener('message', onPostMessage, false);
  };
  /**
   * Listens to message events from the WordProof popup.
   *
   * @param {event} event The message event.
   *
   * @return {void}
   */


  const onPostMessage = async event => {
    const {
      data,
      source,
      origin
    } = event;

    if (origin !== (0,_helpers_data__WEBPACK_IMPORTED_MODULE_1__.getData)('origin') || popup !== source) {
      return;
    }

    console.warn('Post message: ' + data.type);

    switch (data.type) {
      case 'wordproof:oauth:granted':
        if ((await performAuthenticationRequest(data)) === false) {
          await postMessageResult('wordproof:oauth:failed', false);
        }

        break;

      case 'wordproof:oauth:failed':
        await postMessageResult('wordproof:oauth:failed', false);
        break;

      case 'wordproof:oauth:denied':
        await postMessageResult('wordproof:oauth:denied', false);
        break;

      case 'wordproof:webhook:success':
        await postMessageResult('wordproof:oauth:success', true);
        break;

      case 'wordproof:webhook:failed':
        await postMessageResult('wordproof:webhook:failed', false);
        break;

      case 'wordproof:settings:updated':
        await postMessageResult('wordproof:settings:updated');
        await (0,_helpers_api__WEBPACK_IMPORTED_MODULE_0__.fetchSettings)(); // TODO Save settings. Unnecessary for Yoast integration.

        break;

      case 'wordproof:oauth:destroy':
        await postMessageResult('wordproof:oauth:destroy', false);
        break;
    }
  };

  const postMessageResult = async function (event) {
    let isAuthenticated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    window.removeEventListener('message', onPostMessage, false);
    (0,_helpers_event__WEBPACK_IMPORTED_MODULE_3__.dispatch)(event);

    if (isAuthenticated === false) {
      await (0,_helpers_api__WEBPACK_IMPORTED_MODULE_0__.destroyAuthentication)();
      setIsAuthenticated(false);
    }

    if (isAuthenticated === true) {
      setIsAuthenticated(true);
    }

    popup.close();
  };

  const performAuthenticationRequest = async data => {
    await (0,_helpers_api__WEBPACK_IMPORTED_MODULE_0__.handleAPIResponse)(() => (0,_helpers_endpoints__WEBPACK_IMPORTED_MODULE_4__.postAuthenticationRequest)(data), async response => {
      const message = {
        type: 'wordproof:sdk:access-token',
        source_id: response.source_id
      };
      popup.postMessage(message, (0,_helpers_data__WEBPACK_IMPORTED_MODULE_1__.getData)('origin'));
      return true;
    }, async response => {
      return false;
    });
  }; // Open the authentication and settings popup from other parts in the application.


  window.addEventListener('wordproof:open_authentication', openAuthentication, false);
  window.addEventListener('wordproof:open_settings', openSettings, false);
}

/***/ }),

/***/ "./resources/js/initializers/classicEditor.js":
/*!****************************************************!*\
  !*** ./resources/js/initializers/classicEditor.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ initializeClassicEditor; }
/* harmony export */ });
/* harmony import */ var _authentication__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authentication */ "./resources/js/initializers/authentication.js");

/**
 * Initializes the WordProof integration.
 *
 * @return {void}
 */

function initializeClassicEditor() {
  (0,_authentication__WEBPACK_IMPORTED_MODULE_0__["default"])();
}

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
/*!**************************************************!*\
  !*** ./resources/js/wordproof-classic-editor.js ***!
  \**************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _initializers_classicEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initializers/classicEditor */ "./resources/js/initializers/classicEditor.js");

(0,_initializers_classicEditor__WEBPACK_IMPORTED_MODULE_0__["default"])();
}();
/******/ })()
;
//# sourceMappingURL=wordproof-classic-editor.js.map