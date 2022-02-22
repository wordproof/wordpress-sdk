import { callEndpoint } from './api';

const WORDPROOF_REST_API_NAMESPACE = 'wordproof/v1';

/**
 * Request Access token from WordProof
 *
 * @param  state.state
 * @param  state The state returned by WordProof
 * @param  code The code returned by WordProof
 * @param  state.code
 * @return {Promise<*>}
 */
export const postAuthenticationRequest = async ( { state, code } ) => {
	return await callEndpoint( {
		path: `${ WORDPROOF_REST_API_NAMESPACE }/oauth/authenticate`,
		method: 'POST',
		data: {
			state,
			code,
		},
	} );
};

/**
 * Destroy oauth token
 *
 * @return {Promise<Object|boolean>} The response object or false if request fails.
 */
export const destroyAuthenticationRequest = async () => {
	return await callEndpoint( {
		path: `${ WORDPROOF_REST_API_NAMESPACE }/oauth/destroy`,
		method: 'POST',
	} );
};

/**
 * Retrieves WordProof settings.
 *
 * @return {Promise<Object|boolean>} The response object or false if request fails.
 */
export const getSettingsRequest = async () => {
	return await callEndpoint( {
		path: `${ WORDPROOF_REST_API_NAMESPACE }/settings`,
		method: 'GET',
	} );
};

/**
 * Retrieves WordProof authentication status.
 *
 * @return {Promise<boolean>} The authentication status.
 */
export const getIsAuthenticatedRequest = async () => {
	return await callEndpoint( {
		path: `${ WORDPROOF_REST_API_NAMESPACE }/authentication`,
		method: 'GET',
	} );
};

/**
 * The post timestamp request
 *
 * @param  postId The post id
 * @return {Promise<Object>} The promise wrapping the response object.
 */
export const postTimestampRequest = async ( postId ) => {
	return callEndpoint( {
		path: `${ WORDPROOF_REST_API_NAMESPACE }/posts/${ postId }/timestamp`,
		method: 'POST',
	} );
};

/**
 * Retrieves the latest timestamp transaction for a post.
 *
 * @param  postId The post id
 * @return {Promise<Object>} The promise wrapping the response object.
 */
export const getLatestTimestampTransactionRequest = async ( postId ) => {
	return callEndpoint( {
		path: `${ WORDPROOF_REST_API_NAMESPACE }/posts/${ postId }/timestamp/transaction/latest`,
		method: 'GET',
	} );
};
