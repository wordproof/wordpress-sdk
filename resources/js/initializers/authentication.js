import {
    authenticationRequest,
    destroyAuthenticationRequest, fetchSettings,
    handleAPIResponse,
} from '../helpers/api';

const { select, dispatch } = wp.data;

import { getData } from '../helpers/data';
import popupWindow from '../helpers/popup';
import { dispatch as dispatchEvent } from '../helpers/event';

export default function initializeAuthentication() {
	const { setIsAuthenticated } = dispatch( 'wordproof' );
	const authenticationLink = getData( 'popup_redirect_authentication_url' );
	const settingsLink = getData( 'popup_redirect_settings_url' );

	let popup = null;

	/**
	 * Open the settings popup.
	 *
	 * @param  event
	 */
	const openSettings = ( event ) => {
		event.preventDefault();
		openPopup( settingsLink, 'WordProof_Settings' );
	};

	/**
	 * Open the authentication popup.
	 *
	 * @param  event
	 */
	const openAuthentication = ( event ) => {
		event.preventDefault();
		openPopup( authenticationLink, 'WordProof_Authentication' );
	};

	/**
	 * Opens popup and set in state.
	 *
	 * @param  link
	 * @param  name
	 */
	const openPopup = ( link, name ) => {
		popup = popupWindow( window, link, name );

		if ( popup ) {
			popup.focus();
		}

		window.addEventListener( 'message', onPostMessage, false );
	};

	/**
	 * Listens to message events from the WordProof popup.
	 *
	 * @param {event} event The message event.
	 *
	 * @return {void}
	 */
	const onPostMessage = async ( event ) => {
		const { data, source, origin } = event;

		if ( origin !== getData( 'origin' ) || popup !== source ) {
			return;
		}

		console.warn( 'Post message: ' + data.type );

		switch ( data.type ) {
			case 'wordproof:oauth:granted':
				if ( await performAuthenticationRequest( data ) === false ) {
				    await postMessageResult('wordproof:oauth:failed', false);
                }
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
				await fetchSettings();
				// TODO Save settings. Unnecessary for Yoast integration.
				break;
			case 'wordproof:oauth:destroy':
                await postMessageResult('wordproof:oauth:destroy', false);
				break;
		}
	};

    const postMessageResult = async ( event, isAuthenticated = null ) => {
        window.removeEventListener( 'message', onPostMessage, false );

        dispatchEvent( event );

        if (isAuthenticated === false) {
            await destroyAuthenticationRequest();
            setIsAuthenticated(false)
        }

        if (isAuthenticated === true) {
            setIsAuthenticated(true)
        }

        popup.close();
    }

    const performAuthenticationRequest = async ( data ) => {
		await handleAPIResponse(
			() => authenticationRequest( data ),
			async ( response ) => {
				const message = {
					type: 'wordproof:sdk:access-token',
					source_id: response.source_id,
				};
				popup.postMessage( message, getData( 'origin' ) );

				return true;
			},
			async ( response ) => {
				return false;
			}
		);
	};

	// Open the authentication and settings popup from other parts in the application.
	window.addEventListener(
		'wordproof:open_authentication',
		openAuthentication,
		false
	);

	window.addEventListener( 'wordproof:open_settings', openSettings, false );
}
