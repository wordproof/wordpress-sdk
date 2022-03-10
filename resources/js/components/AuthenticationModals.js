const { useState } = wp.element;

import OauthDeniedContent from './modals/OauthDeniedContent';
import OauthFailedContent from './modals/OauthFailedContent';
import OauthSuccessContent from './modals/OauthSuccessContent';
import WebhookFailedContent from './modals/WebhookFailedContent';

const AuthenticationModals = () => {
	const [ modal, setModal ] = useState( null );

	window.addEventListener(
		'wordproof:oauth:success',
		() => {
			setModal( 'oauth:success' );
		},
		false
	);

	window.addEventListener(
		'wordproof:oauth:failed',
		() => {
			setModal( 'oauth:failed' );
		},
		false
	);

	window.addEventListener(
		'wordproof:oauth:denied',
		() => {
			setModal( 'oauth:denied' );
		},
		false
	);

	window.addEventListener(
		'wordproof:webhook:failed',
		() => {
			setModal( 'webhook:failed' );
		},
		false
	);

	const closeModal = () => {
		setModal( null );
	};

	return (
		<>
			{ modal === 'oauth:success' && (
				<OauthSuccessContent close={ closeModal } />
			) }

			{ modal === 'oauth:denied' && (
				<OauthDeniedContent close={ closeModal } />
			) }

			{ modal === 'oauth:failed' && (
				<OauthFailedContent close={ closeModal } />
			) }

			{ modal === 'webhook:failed' && (
				<WebhookFailedContent close={ closeModal } />
			) }
		</>
	);
};

export default AuthenticationModals;
