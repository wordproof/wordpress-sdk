import {
    authenticationRequest,
    destroyAuthenticationRequest,
    handleAPIResponse,
    performAuthenticationRequest
} from "../helpers/api";

const {__, sprintf} = wp.i18n;
const {useState, useCallback, useEffect} = wp.element;
import PropTypes from 'prop-types';

import {getData} from "../helpers/dataHelper";
import popupWindow from "../helpers/popupHelper";
import WebhookSuccessModal from "./modals/WebhookSuccessModal";
import WebhookFailedModal from "./modals/WebhookFailedModal";
import OAuthDeniedModal from "./modals/OAuthDeniedModal";

const ActionLink = (props) => {
    const {
        isAuthenticated,
        setIsAuthenticated
    } = props;

    let popup = null;
    const [showModal, setShowModal] = useState(null);

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

        switch (data.type) {
            case "wordproof:oauth:success":
                await performAuthenticationRequest(data);
                break;
            case "wordproof:oauth:denied":
                window.removeEventListener("message", onPostMessage, false);
                popup.close();
                setIsAuthenticated(false);
                setShowModal('oauth:denied');
                break;
            case "wordproof:webhook:success":
                window.removeEventListener("message", onPostMessage, false);
                popup.close();
                setIsAuthenticated(true);
                setShowModal('webhook:success');
                break;
            case "wordproof:webhook:failed":
                window.removeEventListener("message", onPostMessage, false);
                popup.close();
                setShowModal('webhook:failed');
                console.log(data); // TODO Open Modal
                break;
            case "wordproof:settings:updated":
                console.log('here');
                console.log(popup);
                // TODO Retrieve settings
                popup.close();
            case "wordproof:oauth:destroy":
                window.removeEventListener("message", onPostMessage, false);
                popup.close();
                destroyAuthenticationRequest();
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

    return (
            <>
                {isAuthenticated &&
                <a href={settingsLink} onClick={openSettings}>Open Settings</a>
                }

                {!isAuthenticated &&
                <a href={authenticationLink} onClick={openAuthentication}>Open Authentication</a>
                }

                {showModal === 'webhook:success' &&
                <WebhookSuccessModal/>
                }

                {showModal === 'webhook:failed' &&
                <WebhookFailedModal/>
                }

                {showModal === 'oauth:denied' &&
                <OAuthDeniedModal retry={openAuthentication}/>
                }
            </>
    );
}

ActionLink.proptypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    setIsAuthenticated: PropTypes.func.isRequired,
}

export default ActionLink;
