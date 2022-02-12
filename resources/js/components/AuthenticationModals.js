const {useState} = wp.element;

import OAuthDeniedModal from "./modals/OAuthDeniedModal";
import WebhookSuccessModal from "./modals/WebhookSuccessModal";
import WebhookFailedModal from "./modals/WebhookFailedModal";

const AuthenticationModals = () => {

    const {modal, setModal} = useState(null);

    window.addEventListener('wordproof:oauth:success', () => {
        setModal('oauth:success');
    }, false);

    window.addEventListener('wordproof:oauth:failed', () => {
        setModal('oauth:failed');
    }, false);

    window.addEventListener('wordproof:oauth:denied', () => {
        setModal('oauth:denied');
    }, false);

    window.addEventListener('wordproof:webhook:failed', () => {
        setModal('webhook:failed');
    }, false);

    return (
            <>
                {modal === 'oauth:success' &&
                <WebhookSuccessModal/>
                }

                {modal === 'oauth:denied' &&
                <OAuthDeniedModal/>
                }

                {modal === 'oauth:failed' &&
                <OAuthDeniedModal/>
                }

                {modal === 'webhook:failed' &&
                <WebhookFailedModal/>
                }
            </>
    );
}

export default AuthenticationModals;