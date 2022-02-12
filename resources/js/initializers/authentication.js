import {
	authenticationRequest,
	destroyAuthenticationRequest,
	handleAPIResponse,
} from '../helpers/api';

const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;

import PropTypes from 'prop-types';

import { getData } from '../helpers/data';
import popupWindow from '../helpers/popup';
import { dispatch as dispatchEvent } from '../helpers/event';

const initializeAuthentication = ( props ) => {
	const { isAuthenticated, setIsAuthenticated } = props;

	let popup = null;
	const authenticationLink = getData( 'popup_redirect_authentication_url' );
	const settingsLink = getData( 'popup_redirect_settings_url' );

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
};

initializeAuthentication.proptypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	setIsAuthenticated: PropTypes.func.isRequired,
};

export default compose( [
	withSelect( ( select ) => {
		return {
			isAuthenticated: select( 'wordproof' ).getIsAuthenticated(),
		};
	} ),
	withDispatch( ( dispatch ) => {
		return {
			setIsAuthenticated( isAuthenticated ) {
				dispatch( 'wordproof' ).setIsAuthenticated( {
					isAuthenticated,
				} );
			},
		};
	} ),
] )( initializeAuthentication );