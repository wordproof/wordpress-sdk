const {__, sprintf} = wp.i18n;
const {useState, useCallback} = wp.element;
import PropTypes from 'prop-types';

import {getData} from "../helpers/dataHelper";
import popupWindow from "../helpers/popupHelper";

const Action_Link = (props) => {
    const {
        isAuthenticated,
        setIsAuthenticated
    } = props;

    let {popup} = useState(null);

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

        window.addEventListener("message", listenToMessages, false);
    });

    /**
     * Listens to message events from the WordProof popup.
     *
     * @param {event} event The message event.
     *
     * @returns {void}
     */
    const listenToMessages = async (event) => {
        const {data, source, origin} = event;

        if (origin !== getData('origin') || popup !== source) {
        // console.log(source);
            return;
        }

        if (data.type === "wordproof:oauth:success") {
            popup.close();
            window.removeEventListener("message", listenToMessages, false);
            // await this.performAuthenticationRequest(data);
            console.log(data)
            //TODO
        }

        if (data.type === "wordproof:oauth:denied") {
            popup.close();
            window.removeEventListener("message", listenToMessages, false);
            setIsAuthenticated(false);
            console.log(data)
            //TODO
        }

        if (data.type === "wordproof:webhook:rejected") {
            popup.close();
            window.removeEventListener("message", listenToMessages, false);
            console.log(data)
            //TODO
        }

        if (data.type === "wordproof:settings:updated") {
            popup.close();
            window.removeEventListener("message", listenToMessages, false);
            console.log(data)
            //TODO
        }
    }


    if (isAuthenticated) {
        return (
                <a href={settingsLink} onClick={openSettings}>Open Settings</a>
        )
    }

    if (!isAuthenticated) {
        return (
                <a href={authenticationLink} onClick={openAuthentication}>Open Authentication</a>
        )
    }
}

Action_Link.proptypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    setIsAuthenticated: PropTypes.func.isRequired,
}

export default Action_Link;
