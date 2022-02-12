import {
	authenticationRequest,
	destroyAuthenticationRequest,
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
				await performAuthenticationRequest( data );
				break;
			case 'wordproof:oauth:denied':
				window.removeEventListener( 'message', onPostMessage, false );

				dispatchEvent( 'wordproof:oauth:denied' );
				setIsAuthenticated( false );

				popup.close();
				break;
			case 'wordproof:webhook:success':
				window.removeEventListener( 'message', onPostMessage, false );

				dispatchEvent( 'wordproof:oauth:success' );
				setIsAuthenticated( true );

				popup.close();
				break;
			case 'wordproof:webhook:failed':
				window.removeEventListener( 'message', onPostMessage, false );

				dispatchEvent( 'wordproof:webhook:failed' );
				destroyAuthenticationRequest();
				setIsAuthenticated( false );

				popup.close();
				break;
			case 'wordproof:settings:updated':
				window.removeEventListener( 'message', onPostMessage, false );

				dispatchEvent( 'wordproof:settings:updated' );
				// TODO Retrieve settings
				popup.close();
				break;
			case 'wordproof:oauth:destroy':
				window.removeEventListener( 'message', onPostMessage, false );

				dispatchEvent( 'wordproof:oauth:destroy' );
				destroyAuthenticationRequest();
				setIsAuthenticated( false );

				popup.close();
				break;
		}
	};

	const performAuthenticationRequest = async ( data ) => {
		await handleAPIResponse(
			() => authenticationRequest( data ),
			async ( response ) => {
				const message = {
					type: 'wordproof:sdk:access-token',
					source_id: response.source_id,
				};
				popup.postMessage( message, getData( 'origin' ) );
			},
			async ( response ) => {
				console.warn( response );
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
