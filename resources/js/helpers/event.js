/**
 * Dispatch custom event helper.
 *
 * @param {string} name
 */
export function dispatch( name ) {
	const event = new window.CustomEvent( name );
	window.dispatchEvent( event );
}

/**
 * Helper to open the WordProof authentication.
 */
export function openAuthentication() {
    dispatch('wordproof:open_authentication')
}

/**
 * Helper to open the WordProof settings.
 */
export function openSettings() {
    dispatch('wordproof:open_settings')
}