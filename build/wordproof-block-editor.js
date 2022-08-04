/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/components/ActionLink.js":
/*!***********************************************!*\
  !*** ./resources/js/components/ActionLink.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/data */ "./resources/js/helpers/data.js");
/* harmony import */ var _helpers_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/event */ "./resources/js/helpers/event.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);



const {
  __
} = wp.i18n;
const {
  useCallback
} = wp.element;
const {
  withSelect
} = wp.data;
const {
  compose
} = wp.compose;


const ActionLink = props => {
  const {
    isAuthenticated
  } = props;
  const authenticationLink = (0,_helpers_data__WEBPACK_IMPORTED_MODULE_1__.getData)('popup_redirect_authentication_url');
  const settingsLink = (0,_helpers_data__WEBPACK_IMPORTED_MODULE_1__.getData)('popup_redirect_settings_url');
  const openSettings = useCallback(event => {
    event.preventDefault();
    (0,_helpers_event__WEBPACK_IMPORTED_MODULE_2__.dispatchOpenSettingsEvent)();
  });
  const openAuthentication = useCallback(event => {
    event.preventDefault();
    (0,_helpers_event__WEBPACK_IMPORTED_MODULE_2__.dispatchOpenAuthenticationEvent)();
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, isAuthenticated && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: settingsLink,
    onClick: openSettings
  }, __('Open settings', 'wordproof')), !isAuthenticated && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: authenticationLink,
    onClick: openAuthentication
  }, __('Open authentication', 'wordproof')));
};

ActionLink.proptypes = {
  isAuthenticated: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool.isRequired)
};
/* harmony default export */ __webpack_exports__["default"] = (compose([withSelect(select => {
  return {
    isAuthenticated: select('wordproof').getIsAuthenticated()
  };
})])(ActionLink));

/***/ }),

/***/ "./resources/js/components/AuthenticationModals.js":
/*!*********************************************************!*\
  !*** ./resources/js/components/AuthenticationModals.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modals_OauthDeniedContent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modals/OauthDeniedContent */ "./resources/js/components/modals/OauthDeniedContent.js");
/* harmony import */ var _modals_OauthFailedContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modals/OauthFailedContent */ "./resources/js/components/modals/OauthFailedContent.js");
/* harmony import */ var _modals_OauthSuccessContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modals/OauthSuccessContent */ "./resources/js/components/modals/OauthSuccessContent.js");
/* harmony import */ var _modals_WebhookFailedContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modals/WebhookFailedContent */ "./resources/js/components/modals/WebhookFailedContent.js");

const {
  useState,
  useCallback,
  useEffect
} = wp.element;





const AuthenticationModals = () => {
  const [modal, setModal] = useState(null);
  /**
   * Show oauth failed content.
   *
   * @return {void} Returns no value.
   */

  const setOauthFailed = useCallback(() => {
    setModal('oauth:failed');
  });
  /**
   * Show oauth denied content.
   *
   * @return {void} Returns no value.
   */

  const setOauthDenied = useCallback(() => {
    setModal('oauth:denied');
  });
  /**
   * Show oauth webhook failed content.
   *
   * @return {void} Returns no value.
   */

  const setWebhookFailed = useCallback(() => {
    setModal('webhook:failed');
  });
  /**
   * Show oauth success content.
   *
   * @return {void} Returns no value.
   */

  const setOauthSuccess = useCallback(() => {
    setModal('oauth:success');
  });
  /**
   * Stop displaying the current modal.
   *
   * @return {void} Returns no value.
   */

  const closeModal = useCallback(() => {
    setModal(null);
  });
  useEffect(() => {
    window.addEventListener('wordproof:oauth:success', setOauthSuccess, false);
    window.addEventListener('wordproof:oauth:failed', setOauthFailed, false);
    window.addEventListener('wordproof:oauth:denied', setOauthDenied, false);
    window.addEventListener('wordproof:webhook:failed', setWebhookFailed, false);
    return () => {
      window.removeEventListener('wordproof:oauth:success', setOauthSuccess, false);
      window.removeEventListener('wordproof:oauth:failed', setOauthFailed, false);
      window.removeEventListener('wordproof:oauth:denied', setOauthDenied, false);
      window.removeEventListener('wordproof:webhook:failed', setWebhookFailed, false);
    };
  }, []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, modal === 'oauth:success' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_modals_OauthSuccessContent__WEBPACK_IMPORTED_MODULE_3__["default"], {
    close: closeModal
  }), modal === 'oauth:denied' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_modals_OauthDeniedContent__WEBPACK_IMPORTED_MODULE_1__["default"], {
    close: closeModal
  }), modal === 'oauth:failed' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_modals_OauthFailedContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
    close: closeModal
  }), modal === 'webhook:failed' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_modals_WebhookFailedContent__WEBPACK_IMPORTED_MODULE_4__["default"], {
    close: closeModal
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (AuthenticationModals);

/***/ }),

/***/ "./resources/js/components/EditorPanel.js":
/*!************************************************!*\
  !*** ./resources/js/components/EditorPanel.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ActionLink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActionLink */ "./resources/js/components/ActionLink.js");
/* harmony import */ var _AuthenticationModals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AuthenticationModals */ "./resources/js/components/AuthenticationModals.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _helpers_event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/event */ "./resources/js/helpers/event.js");



const {
  __,
  sprintf
} = wp.i18n;
const {
  PluginDocumentSettingPanel
} = wp.editPost;
const {
  ToggleControl,
  PanelRow
} = wp.components;
const {
  compose
} = wp.compose;
const {
  withSelect,
  withDispatch
} = wp.data;
const {
  useCallback
} = wp.element;



const EditorPanel = _ref => {
  let {
    postType,
    postMeta,
    isAuthenticated,
    selectedPostTypes,
    setPostMeta
  } = _ref;
  const timestampedAutomatically = useCallback(() => {
    return selectedPostTypes.includes(postType);
  }, [selectedPostTypes, postType]);
  const openAuthentication = useCallback(() => {
    (0,_helpers_event__WEBPACK_IMPORTED_MODULE_3__.dispatch)('wordproof:open_authentication');
  });

  if (postMeta === undefined) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PluginDocumentSettingPanel, {
    title: __('WordProof Timestamp', 'wordproof'),
    initialOpen: "true"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
    label: sprintf(
    /* translators: %s expands to the post type */
    __('Timestamp this %s', 'wordproof'), postType),
    onChange: value => {
      setPostMeta({
        _wordproof_timestamp: value
      });

      if (!isAuthenticated && value === true) {
        openAuthentication();
      }
    },
    checked: postMeta._wordproof_timestamp || timestampedAutomatically(),
    disabled: timestampedAutomatically()
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ActionLink__WEBPACK_IMPORTED_MODULE_1__["default"], null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_AuthenticationModals__WEBPACK_IMPORTED_MODULE_2__["default"], null));
};

EditorPanel.proptypes = {
  postType: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string.isRequired),
  postMeta: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().object.isRequired),
  isAuthenticated: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool.isRequired),
  setPostMeta: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().func.isRequired)
};
/* harmony default export */ __webpack_exports__["default"] = (compose([withSelect(select => {
  return {
    postMeta: select('core/editor').getEditedPostAttribute('meta'),
    postType: select('core/editor').getCurrentPostType(),
    isAuthenticated: select('wordproof').getIsAuthenticated(),
    selectedPostTypes: select('wordproof').getSelectedPostTypes()
  };
}), withDispatch(dispatch => {
  return {
    setPostMeta(newMeta) {
      dispatch('core/editor').editPost({
        meta: newMeta
      });
    }

  };
})])(EditorPanel));

/***/ }),

/***/ "./resources/js/components/icon/Wordproof.js":
/*!***************************************************!*\
  !*** ./resources/js/components/icon/Wordproof.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);



const WordproofIcon = _ref => {
  let {
    size = 20,
    className
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    className: className,
    icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      width: "47px",
      height: "47px",
      viewBox: "0 0 47 47",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("title", null, "Wordproof"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
      id: "W",
      stroke: "none",
      strokeWidth: 1,
      fill: "none",
      fillRule: "evenodd"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
      id: "Wordprooof",
      transform: "translate(-660.000000, -420.000000)",
      fillRule: "nonzero"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
      id: "Group-11",
      transform: "translate(453.000000, 385.000000)"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
      id: "Group-14",
      transform: "translate(207.000000, 35.000000)"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
      id: "Rectangle",
      fill: "#FFFFFF",
      x: 0,
      y: 0,
      width: 47,
      height: 47,
      rx: 2
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      id: "Path",
      d: "M39.6614857,12.2595482 L33.48004,35.2595482 C33.3626398,35.6963721 32.9666349,36 32.5143098,36 L27.1766613,36 L27.1766613,36 L24,22.9791667 L29.015235,22.9791667 L30.2703404,28.9192708 L35.2259319,11 L38.6957555,11 C39.2480403,11 39.6957555,11.4477153 39.6957555,12 C39.6957555,12.087644 39.6842336,12.1749077 39.6614857,12.2595482 Z",
      fill: "#2000FF"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      id: "Path",
      d: "M21.1985748,11 L16.2409209,28.8776042 L12.4159244,11 L8.27453359,11 C7.72224884,11 7.27453359,11.4477153 7.27453359,12 C7.27453359,12.080175 7.2841755,12.160059 7.30325164,12.2379315 L12.9374794,35.2379315 C13.0470794,35.6853395 13.4481247,36 13.9087614,36 L18.4850888,36 C18.9369965,36 19.332745,35.6969214 19.4505269,35.2606326 L25.6596759,12.2606326 C25.8036192,11.7274358 25.4880671,11.1785053 24.9548703,11.0345619 C24.8698925,11.0116211 24.7822578,11 24.6942378,11 L21.1985748,11 L21.1985748,11 Z",
      fill: "#2000FF",
      opacity: "0.8"
    }))))))
  });
};

/* harmony default export */ __webpack_exports__["default"] = (WordproofIcon);

/***/ }),

/***/ "./resources/js/components/modals/Modal.js":
/*!*************************************************!*\
  !*** ./resources/js/components/modals/Modal.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);

const {
  Modal
} = wp.components;


const WordProofModal = props => {
  const {
    title,
    children,
    close
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Modal, {
    style: {
      maxWidth: '440px'
    },
    title: title,
    onRequestClose: close
  }, children));
};

WordProofModal.proptypes = {
  title: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string.isRequired),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().any),
  close: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func.isRequired)
};
/* harmony default export */ __webpack_exports__["default"] = (WordProofModal);

/***/ }),

/***/ "./resources/js/components/modals/OauthDeniedContent.js":
/*!**************************************************************!*\
  !*** ./resources/js/components/modals/OauthDeniedContent.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal */ "./resources/js/components/modals/Modal.js");
/* harmony import */ var _helpers_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/event */ "./resources/js/helpers/event.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);




const {
  Button
} = wp.components;
const {
  useCallback
} = wp.element;
const {
  __
} = wp.i18n;

const OauthDeniedContent = props => {
  const {
    close
  } = props;
  const retry = useCallback(event => {
    event.preventDefault();
    (0,_helpers_event__WEBPACK_IMPORTED_MODULE_2__.dispatch)('wordproof:open_authentication');
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Modal__WEBPACK_IMPORTED_MODULE_1__["default"], {
    close: close,
    title: __('Authentication denied', 'wordproof')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, __('You need to allow WordProof to access your site to finish the WordProof installation.', 'wordproof')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    variant: 'primary',
    onClick: retry
  }, __('Retry authentication', 'wordproof'))));
};

OauthDeniedContent.proptypes = {
  close: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func.isRequired)
};
/* harmony default export */ __webpack_exports__["default"] = (OauthDeniedContent);

/***/ }),

/***/ "./resources/js/components/modals/OauthFailedContent.js":
/*!**************************************************************!*\
  !*** ./resources/js/components/modals/OauthFailedContent.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal */ "./resources/js/components/modals/Modal.js");
/* harmony import */ var _helpers_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/event */ "./resources/js/helpers/event.js");
/* harmony import */ var _helpers_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../helpers/string */ "./resources/js/helpers/string.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);





const {
  Button
} = wp.components;
const {
  useCallback
} = wp.element;
const {
  __,
  sprintf
} = wp.i18n;

const OauthDeniedModal = props => {
  const {
    close
  } = props;
  const retry = useCallback(event => {
    event.preventDefault();
    (0,_helpers_event__WEBPACK_IMPORTED_MODULE_2__.dispatch)('wordproof:open_authentication');
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Modal__WEBPACK_IMPORTED_MODULE_1__["default"], {
    close: close,
    title: __('Authentication failed', 'wordproof')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, sprintf(
  /* Translators: %s expands to WordProof */
  __('Something failed during the authentication of your %s account.', 'wordproof'), 'WordProof'), (0,_helpers_string__WEBPACK_IMPORTED_MODULE_3__.addLinkToString)(sprintf(
  /* Translators: %1s and %2s are html tags. %3s expands to WordProof */
  __('Please try again or contact the %1$s%3$s support team%2$s.', 'wordpress-seo'), '<a>', '</a>', 'WordProof'), 'https://help.wordproof.com/')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    variant: 'primary',
    onClick: retry
  }, __('Retry authentication', 'wordproof'))));
};

OauthDeniedModal.proptypes = {
  close: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().func.isRequired)
};
/* harmony default export */ __webpack_exports__["default"] = (OauthDeniedModal);

/***/ }),

/***/ "./resources/js/components/modals/OauthSuccessContent.js":
/*!***************************************************************!*\
  !*** ./resources/js/components/modals/OauthSuccessContent.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal */ "./resources/js/components/modals/Modal.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);


const {
  __,
  sprintf
} = wp.i18n;
const {
  compose
} = wp.compose;
const {
  withSelect
} = wp.data;


const OauthSuccessContent = props => {
  const {
    close,
    postType
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Modal__WEBPACK_IMPORTED_MODULE_1__["default"], {
    close: close,
    title: __('Authenticated', 'wordproof')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, sprintf(
  /* translators: %s expands to WordProof. */
  __('You have successfully connected your %s account with this site.', 'wordproof'), 'WordProof'), postType && sprintf(
  /* translators: %s is the singular post type. */
  __('Your %s will now be timestamped everytime you update or publish.', 'wordproof'), postType)));
};

OauthSuccessContent.proptypes = {
  close: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func.isRequired)
};
/* harmony default export */ __webpack_exports__["default"] = (compose([withSelect(select => {
  return {
    postType: select('core/editor').getCurrentPostType()
  };
})])(OauthSuccessContent));

/***/ }),

/***/ "./resources/js/components/modals/WebhookFailedContent.js":
/*!****************************************************************!*\
  !*** ./resources/js/components/modals/WebhookFailedContent.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal */ "./resources/js/components/modals/Modal.js");
/* harmony import */ var _helpers_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/string */ "./resources/js/helpers/string.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);



const {
  __,
  sprintf
} = wp.i18n;


const WebhookFailedContent = props => {
  const {
    close
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Modal__WEBPACK_IMPORTED_MODULE_1__["default"], {
    close: close,
    title: __('Webhook failed', 'wordproof')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, sprintf(
  /* Translators: %s expands to WordProof */
  __('The timestamp sent by %s was not received on your website.', 'WordProof'), 'WordProof'), (0,_helpers_string__WEBPACK_IMPORTED_MODULE_2__.addLinkToString)(sprintf(
  /* Translators: %1s and %2s are html tags. %3s expands to WordProof */
  __('Please contact the %1$s%3$s support team%2$s to help solve this problem.', 'wordpress-seo'), '<a>', '</a>', 'WordProof'), 'https://help.wordproof.com/')));
};

WebhookFailedContent.proptypes = {
  close: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func.isRequired)
};
/* harmony default export */ __webpack_exports__["default"] = (WebhookFailedContent);

/***/ }),

/***/ "./resources/js/helpers/api.js":
/*!*************************************!*\
  !*** ./resources/js/helpers/api.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "callEndpoint": function() { return /* binding */ callEndpoint; },
/* harmony export */   "destroyAuthentication": function() { return /* binding */ destroyAuthentication; },
/* harmony export */   "fetchIsAuthenticated": function() { return /* binding */ fetchIsAuthenticated; },
/* harmony export */   "fetchSettings": function() { return /* binding */ fetchSettings; },
/* harmony export */   "handleAPIResponse": function() { return /* binding */ handleAPIResponse; }
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
  } catch (e) {}
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


    if (e instanceof window.Response) {
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
  return await handleAPIResponse(async () => await (0,_endpoints__WEBPACK_IMPORTED_MODULE_1__.getSettingsRequest)(), settings => settings, () => false);
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

"use strict";
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

/***/ "./resources/js/helpers/editors/blockEditor.js":
/*!*****************************************************!*\
  !*** ./resources/js/helpers/editors/blockEditor.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "callbackOnSave": function() { return /* binding */ callbackOnSave; }
/* harmony export */ });
const {
  subscribe,
  select
} = wp.data;
/**
 * Executes callback on post editor save.
 *
 * @param {Function} callback The callback.
 *
 * @return {void}
 */

function callbackOnSave(callback) {
  let firstTime = true;
  subscribe(() => {
    const isSavingPost = select('core/editor').isSavingPost();
    const isAutosavingPost = select('core/editor').isAutosavingPost();
    const didPostSaveRequestSucceed = select('core/editor').didPostSaveRequestSucceed();

    if (isSavingPost && didPostSaveRequestSucceed && !isAutosavingPost) {
      if (firstTime) {
        firstTime = false;
        return;
      }

      callback();
    }
  });
}

/***/ }),

/***/ "./resources/js/helpers/editors/editor.js":
/*!************************************************!*\
  !*** ./resources/js/helpers/editors/editor.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleNoticesAfterTimestamp": function() { return /* binding */ handleNoticesAfterTimestamp; },
/* harmony export */   "isBlockEditor": function() { return /* binding */ isBlockEditor; },
/* harmony export */   "isClassicEditor": function() { return /* binding */ isClassicEditor; },
/* harmony export */   "isElementorEditor": function() { return /* binding */ isElementorEditor; }
/* harmony export */ });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data */ "./resources/js/helpers/data.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _endpoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../endpoints */ "./resources/js/helpers/endpoints.js");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../event */ "./resources/js/helpers/event.js");




const isElementorEditor = () => {
  return (0,_data__WEBPACK_IMPORTED_MODULE_0__.getData)('post_editor') === 'elementor';
};
const isBlockEditor = () => {
  return (0,_data__WEBPACK_IMPORTED_MODULE_0__.getData)('post_editor') === 'block';
};
const isClassicEditor = () => {
  return (0,_data__WEBPACK_IMPORTED_MODULE_0__.getData)('post_editor') === 'classic';
};

const handleNoticesAfterTimestamp = props => {
  const {
    response,
    createSuccessNotice,
    createErrorNotice,
    postId
  } = props;

  if (response === null || response.status === 200) {
    return;
  }

  const successNoticeOptions = {
    type: 'snackbar',
    id: 'wordproof-timestamp-notice'
  };
  const errorNoticeOptions = {
    id: 'wordproof-timestamp-notice'
  };

  if (response && response.status === 201) {
    if (response.balance === 0) {
      errorNoticeOptions.actions = [{
        label: (0,_data__WEBPACK_IMPORTED_MODULE_0__.getData)('translations.open_settings_button_text'),
        onClick: () => {
          (0,_event__WEBPACK_IMPORTED_MODULE_2__.dispatch)('wordproof:open_settings');
        },
        variant: 'link'
      }];
      createErrorNotice((0,_data__WEBPACK_IMPORTED_MODULE_0__.getData)('translations.no_balance'), errorNoticeOptions);
    } else {
      createSuccessNotice((0,_data__WEBPACK_IMPORTED_MODULE_0__.getData)('translations.timestamp_success'), successNoticeOptions);
      checkForWebhook(postId, response.hash, createErrorNotice, errorNoticeOptions);
    }
  } else if (response.error) {
    switch (response.error) {
      case 'not_authenticated':
        errorNoticeOptions.type = 'snackbar';
        errorNoticeOptions.actions = [{
          label: (0,_data__WEBPACK_IMPORTED_MODULE_0__.getData)('translations.open_authentication_button_text'),
          onClick: () => {
            (0,_event__WEBPACK_IMPORTED_MODULE_2__.dispatch)('wordproof:open_authentication');
          },
          variant: 'link'
        }];
        createErrorNotice((0,_data__WEBPACK_IMPORTED_MODULE_0__.getData)('translations.not_authenticated'), errorNoticeOptions);
        break;

      case 'timestamp_failed':
      default:
        createErrorNotice((0,_data__WEBPACK_IMPORTED_MODULE_0__.getData)('translations.timestamp_failed'), errorNoticeOptions);
    }
  }
};

const checkForWebhook = async (postId, hash, createErrorNotice, errorNoticeOptions) => {
  setTimeout(async () => {
    const transaction = await (0,_endpoints__WEBPACK_IMPORTED_MODULE_1__.getLatestTimestampTransactionRequest)(postId);

    if (transaction.hash !== hash) {
      errorNoticeOptions.type = 'snackbar';
      createErrorNotice((0,_data__WEBPACK_IMPORTED_MODULE_0__.getData)('translations.webhook_failed'), errorNoticeOptions);
    }
  }, 10000);
};

handleNoticesAfterTimestamp.proptypes = {
  timestampResponse: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().any.isRequired),
  createSuccessNotice: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func.isRequired),
  createErrorNotice: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func.isRequired),
  postId: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number.isRequired)
};


/***/ }),

/***/ "./resources/js/helpers/endpoints.js":
/*!*******************************************!*\
  !*** ./resources/js/helpers/endpoints.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "destroyAuthenticationRequest": function() { return /* binding */ destroyAuthenticationRequest; },
/* harmony export */   "getIsAuthenticatedRequest": function() { return /* binding */ getIsAuthenticatedRequest; },
/* harmony export */   "getLatestTimestampTransactionRequest": function() { return /* binding */ getLatestTimestampTransactionRequest; },
/* harmony export */   "getSettingsRequest": function() { return /* binding */ getSettingsRequest; },
/* harmony export */   "postAuthenticationRequest": function() { return /* binding */ postAuthenticationRequest; },
/* harmony export */   "postSettingsRequest": function() { return /* binding */ postSettingsRequest; },
/* harmony export */   "postTimestampRequest": function() { return /* binding */ postTimestampRequest; }
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./resources/js/helpers/api.js");

const WORDPROOF_REST_API_NAMESPACE = 'wordproof/v1';
/**
 * Request Access token from WordProof
 *
 * @param {Object} props
 * @return {Promise<*>} The access token.
 */

const postAuthenticationRequest = async props => {
  const {
    state,
    code
  } = props;
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
 * Set settings received from WordProof
 *
 * @param {Object} props
 * @return {Promise<*>} .
 */

const postSettingsRequest = async props => {
  const {
    settings
  } = props;
  return await (0,_api__WEBPACK_IMPORTED_MODULE_0__.callEndpoint)({
    path: `${WORDPROOF_REST_API_NAMESPACE}/settings`,
    method: 'POST',
    data: {
      settings
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
 * @param {number} postId The post id
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
 * @param {number} postId The post id
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dispatch": function() { return /* binding */ dispatch; },
/* harmony export */   "dispatchOpenAuthenticationEvent": function() { return /* binding */ dispatchOpenAuthenticationEvent; },
/* harmony export */   "dispatchOpenSettingsEvent": function() { return /* binding */ dispatchOpenSettingsEvent; }
/* harmony export */ });
/**
 * Dispatch custom event helper.
 *
 * @param {string} name
 */
function dispatch(name) {
  const event = new window.CustomEvent(name);
  window.dispatchEvent(event);
}
/**
 * Helper to open the WordProof authentication.
 */

function dispatchOpenAuthenticationEvent() {
  dispatch('wordproof:open_authentication');
}
/**
 * Helper to open the WordProof settings.
 */

function dispatchOpenSettingsEvent() {
  dispatch('wordproof:open_settings');
}

/***/ }),

/***/ "./resources/js/helpers/popup.js":
/*!***************************************!*\
  !*** ./resources/js/helpers/popup.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ "./resources/js/helpers/string.js":
/*!****************************************!*\
  !*** ./resources/js/helpers/string.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addLinkToString": function() { return /* binding */ addLinkToString; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Adds a link to a string containing anchor tags (in string form).
 *
 * @example "This is an example text in which <a>this part should be a link</a> and this part shouldn't."
 *
 * @param {string} text   The text to add links to. Make sure it contains <a> and </a> tags surrounding the link part.
 * @param {string} linkTo The target URL for the link (href).
 * @param {string} id     The id to attach to the link.
 */

function addLinkToString(text, linkTo) {
  let id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createInterpolateElement)(text, {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    a: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      id: id,
      href: linkTo,
      target: "_blank",
      rel: "noopener noreferrer"
    })
  });
}

/***/ }),

/***/ "./resources/js/initializers/authentication.js":
/*!*****************************************************!*\
  !*** ./resources/js/initializers/authentication.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    setIsAuthenticated,
    setSelectedPostTypes
  } = dispatch('wordproof');
  const authenticationLink = (0,_helpers_data__WEBPACK_IMPORTED_MODULE_1__.getData)('popup_redirect_authentication_url');
  const settingsLink = (0,_helpers_data__WEBPACK_IMPORTED_MODULE_1__.getData)('popup_redirect_settings_url');
  let popup = null;
  /**
   * Open the settings popup.
   *
   * @param {Event} event
   */

  const openSettings = event => {
    event.preventDefault();
    openPopup(settingsLink, 'WordProof_Settings');
  };
  /**
   * Open the authentication popup.
   *
   * @param {Event} event
   */


  const openAuthentication = event => {
    event.preventDefault();
    openPopup(authenticationLink, 'WordProof_Authentication');
  };
  /**
   * Opens popup and set in state.
   *
   * @param {string} link
   * @param {string} name
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

      case 'wordproof:oauth:invalid_token':
        await postMessageResult('wordproof:oauth:invalid_token', false);
        break;

      case 'wordproof:webhook:success':
        await postMessageResult('wordproof:oauth:success', true);
        break;

      case 'wordproof:webhook:failed':
        await postMessageResult('wordproof:webhook:failed', false);
        break;

      case 'wordproof:settings:updated':
        await postMessageResult('wordproof:settings:updated');
        await performSettingsRequest(data);
        break;

      case 'wordproof:oauth:destroy':
        await postMessageResult('wordproof:oauth:destroy', false);
        break;

      case 'wordproof:oauth:retry':
        await postMessageResult('wordproof:open_authentication', false);
        break;

      case 'wordproof:oauth:close':
        closeModal();
        break;
    }
  };

  const postMessageResult = async function (event) {
    let isAuthenticated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    closeModal();
    (0,_helpers_event__WEBPACK_IMPORTED_MODULE_3__.dispatch)(event);

    if (isAuthenticated === false) {
      await (0,_helpers_api__WEBPACK_IMPORTED_MODULE_0__.destroyAuthentication)();
      setIsAuthenticated(false);
    }

    if (isAuthenticated === true) {
      setIsAuthenticated(true);
    }
  };

  const closeModal = () => {
    window.removeEventListener('message', onPostMessage, false);
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
    }, async () => {
      return false;
    });
  };

  const performSettingsRequest = async data => {
    await (0,_helpers_api__WEBPACK_IMPORTED_MODULE_0__.handleAPIResponse)(() => (0,_helpers_endpoints__WEBPACK_IMPORTED_MODULE_4__.postSettingsRequest)(data), async () => {
      const settings = data.settings;

      if (settings.selectedPostTypes) {
        setSelectedPostTypes(settings.selectedPostTypes);
      }

      return true;
    }, async () => {
      return false;
    });
  }; // Open the authentication and settings popup from other parts in the application.


  window.addEventListener('wordproof:open_authentication', openAuthentication, false);
  window.addEventListener('wordproof:open_settings', openSettings, false);
}

/***/ }),

/***/ "./resources/js/initializers/blockEditor.js":
/*!**************************************************!*\
  !*** ./resources/js/initializers/blockEditor.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ initializeBlockEditor; }
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _timestamper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timestamper */ "./resources/js/initializers/timestamper.js");
/* harmony import */ var _authentication__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./authentication */ "./resources/js/initializers/authentication.js");
/* harmony import */ var _helpers_editors_blockEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/editors/blockEditor */ "./resources/js/helpers/editors/blockEditor.js");




/**
 * Initializes the WordProof integration.
 *
 * @return {void}
 */

function initializeBlockEditor() {
  const {
    createSuccessNotice,
    createErrorNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('core/notices');
  (0,_authentication__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_timestamper__WEBPACK_IMPORTED_MODULE_1__["default"])(_helpers_editors_blockEditor__WEBPACK_IMPORTED_MODULE_3__.callbackOnSave, createSuccessNotice, createErrorNotice);
}

/***/ }),

/***/ "./resources/js/initializers/timestamper.js":
/*!**************************************************!*\
  !*** ./resources/js/initializers/timestamper.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ initializeTimestamper; }
/* harmony export */ });
/* harmony import */ var _helpers_endpoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/endpoints */ "./resources/js/helpers/endpoints.js");
/* harmony import */ var _helpers_editors_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/editors/editor */ "./resources/js/helpers/editors/editor.js");
/* harmony import */ var _helpers_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/data */ "./resources/js/helpers/data.js");


 // eslint-disable-next-line no-undef

const {
  debounce
} = lodash;
const {
  applyFilters
} = wp.hooks;
/**
 * Initializes the timestamper.
 *
 * @param {Function} callbackOnSave      Function to register the timestamp callback
 * @param {Function} createSuccessNotice Function to display a success notice.
 * @param {Function} createErrorNotice   Function to display an error notice.
 * @return {void}
 */

function initializeTimestamper(callbackOnSave, createSuccessNotice, createErrorNotice) {
  const sendTimestampRequest = debounce(async () => {
    if (applyFilters('wordproof.timestamp', true)) {
      const postId = (0,_helpers_data__WEBPACK_IMPORTED_MODULE_2__.getData)('current_post_id');
      const response = await (0,_helpers_endpoints__WEBPACK_IMPORTED_MODULE_0__.postTimestampRequest)(postId);
      (0,_helpers_editors_editor__WEBPACK_IMPORTED_MODULE_1__.handleNoticesAfterTimestamp)({
        response,
        createSuccessNotice,
        createErrorNotice,
        postId
      });
    }
  }, 500);
  callbackOnSave(sendTimestampRequest);
}

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ (function(module) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/***/ (function(module) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/prop-types/lib/has.js":
/*!********************************************!*\
  !*** ./node_modules/prop-types/lib/has.js ***!
  \********************************************/
/***/ (function(module) {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/index.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!************************************************!*\
  !*** ./resources/js/wordproof-block-editor.js ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _initializers_blockEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initializers/blockEditor */ "./resources/js/initializers/blockEditor.js");
/* harmony import */ var _components_EditorPanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/EditorPanel */ "./resources/js/components/EditorPanel.js");
/* harmony import */ var _components_icon_Wordproof__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/icon/Wordproof */ "./resources/js/components/icon/Wordproof.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_ActionLink__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/ActionLink */ "./resources/js/components/ActionLink.js");


const {
  __
} = wp.i18n;
const {
  registerPlugin
} = wp.plugins;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.blockEditor;
const {
  PanelBody
} = wp.components;
const {
  PanelRow
} = wp.components;




registerPlugin('wordproof-timestamp-panel', {
  render() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_EditorPanel__WEBPACK_IMPORTED_MODULE_2__["default"], null);
  }

});
registerBlockType('wordproof/certificate-button', {
  title: __('Certificate Button'),
  description: __('Add the certificate button to the content'),
  category: 'embed',
  keywords: [__('timestsamp'), __('wordproof'), __('certificate')],
  icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_icon_Wordproof__WEBPACK_IMPORTED_MODULE_3__["default"], null),
  example: {},
  edit: () => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_4__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wp-block-wordproof-certificate-button "
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      },
      className: "wp-block-wordproof-certificate-button--content"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_icon_Wordproof__WEBPACK_IMPORTED_MODULE_3__["default"], null), __('We will render your certificate button here')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelRow, null, __('Customize the look of your certificate button')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ActionLink__WEBPACK_IMPORTED_MODULE_5__["default"], null)))));
  }
});
(0,_initializers_blockEditor__WEBPACK_IMPORTED_MODULE_1__["default"])();
}();
/******/ })()
;
//# sourceMappingURL=wordproof-block-editor.js.map