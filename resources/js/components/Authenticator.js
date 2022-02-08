import {
    authenticationRequest,
    destroyAuthenticationRequest,
    handleAPIResponse,
} from "../helpers/api";

const {__, sprintf} = wp.i18n;
const {useState, useCallback, useEffect} = wp.element;
const {compose} = wp.compose;
const {withSelect, withDispatch} = wp.data;

import PropTypes from 'prop-types';

import {getData} from "../helpers/data";
import popupWindow from "../helpers/popup";
import WebhookSuccessModal from "./modals/WebhookSuccessModal";
import WebhookFailedModal from "./modals/WebhookFailedModal";
import OAuthDeniedModal from "./modals/OAuthDeniedModal";
import {dispatch} from "../helpers/event";

const Authenticator = (props) => {

    const {
        oauthSuccessModal,
        oauthDeniedModal,
        oauthFailedModal,
        isAuthenticated,
        setIsAuthenticated
    } = props;


    const [showModal, setShowModal] = useState(null);

    let popup = null;
    const authenticationLink = getData('popup_redirect_authentication_url');
    const settingsLink = getData('popup_redirect_settings_url');

    /**
     * Open the settings popup.
     */
    const openSettings = useCallback(event => {
        event.preventDefault();
        openPopup(settingsLink, 'WordProof_Settings');
    });

    /**
     * Open the authentication popup.
     */
    const openAuthentication = useCallback(event => {
        event.preventDefault();
        openPopup(authenticationLink, 'WordProof_Authentication');
    });

    /**
     * Opens popup and set in state.
     */
    const openPopup = ((link, name) => {
        popup = popupWindow(window, link, name);

        if (popup) {
            popup.focus();
        }

        window.addEventListener("message", onPostMessage, false);
    });

    /**
     * Listens to message events from the WordProof popup.
     *
     * @param {event} event The message event.
     *
     * @returns {void}
     */
    const onPostMessage = async (event) => {
        const {data, source, origin} = event;

        if (origin !== getData('origin') || popup !== source) {
            return;
        }

        console.warn('Post message: ' + data.type);

        switch (data.type) {
            case "wordproof:oauth:granted":
                await performAuthenticationRequest(data);
                break;
            case "wordproof:oauth:denied":
                window.removeEventListener("message", onPostMessage, false);

                dispatch('wordproof:oauth:denied');
                setShowModal('oauth:denied');
                setIsAuthenticated(false);

                popup.close();
                break;
            case "wordproof:webhook:success":
                window.removeEventListener("message", onPostMessage, false);

                dispatch('wordproof:oauth:success');
                setShowModal('oauth:success');
                setIsAuthenticated(true);

                popup.close();
                break;
            case "wordproof:webhook:failed":
                window.removeEventListener("message", onPostMessage, false);

                dispatch('wordproof:webhook:failed');
                destroyAuthenticationRequest();
                setShowModal('oauth:failed');
                setIsAuthenticated(false);

                popup.close();
                break;
            case "wordproof:settings:updated":
                window.removeEventListener("message", onPostMessage, false);

                dispatch('wordproof:settings:updated');
                // TODO Retrieve settings
                popup.close();
                break;
            case "wordproof:oauth:destroy":
                window.removeEventListener("message", onPostMessage, false);

                dispatch('wordproof:oauth:destroy');
                destroyAuthenticationRequest();
                setIsAuthenticated(false);

                popup.close();
                break;
        }
    }

    const performAuthenticationRequest = async (data) => {
        await handleAPIResponse(
                () => authenticationRequest(data),
                async (response) => {
                    const message = {
                        type: 'wordproof:sdk:access-token',
                        source_id: response.source_id
                    }
                    popup.postMessage(message, getData('origin'));
                },
                async (response) => {
                    console.warn(response);
                });
    }

    // Open the authentication and settings popup from other parts in the application.
    window.addEventListener('wordproof:open_authentication', openAuthentication, false);
    window.addEventListener('wordproof:open_settings', openSettings, false);

    return (
            <>
                {showModal === 'oauth:success' && oauthSuccessModal}
                {showModal === 'oauth:failed' && oauthFailedModal}
                {showModal === 'oauth:denied' && oauthDeniedModal}
            </>
    );
}

Authenticator.proptypes = {
    oauthSuccessModal: PropTypes.elementType,
    oauthDeniedModal: PropTypes.elementType,
    oauthFailedModal: PropTypes.elementType,
    isAuthenticated: PropTypes.bool.isRequired,
    setIsAuthenticated: PropTypes.func.isRequired,
}


Authenticator.defaultProps = {
    oauthSuccessModal: WebhookSuccessModal,
    oauthDeniedModal: OAuthDeniedModal,
    oauthFailedModal: WebhookFailedModal,
}

export default compose([
    withSelect((select) => {
        return {
            isAuthenticated: select('wordproof').getIsAuthenticated(),
        };
    }),
    withDispatch((dispatch) => {
        return {
            setIsAuthenticated(isAuthenticated) {
                dispatch('wordproof').setIsAuthenticated({isAuthenticated});
            }
        };
    })
])(Authenticator);