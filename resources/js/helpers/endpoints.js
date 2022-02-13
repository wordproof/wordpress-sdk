import { getData } from './data';
import { callEndpoint } from './api';

const WORDPROOF_REST_API_NAMESPACE = 'wordproof/v1';

/**
 * Request Access token
 *
 * @param  root0
 * @param  root0.state
 * @param  root0.code
 * @return {Promise<Object|boolean>} The response object or false if request fails.
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
 * @param  post_id
 * @return {Promise<Object>} The promise wrapping the response object.
 */
export const postTimestampRequest = async ( post_id ) => {
	return callEndpoint( {
		path: `${ WORDPROOF_REST_API_NAMESPACE }/posts/${ post_id }/timestamp`,
		method: 'POST',
	} );
};

/**
 * Retrieves the latest timestamp transaction for a post.
 *
 * @param  post_id
 * @return {Promise<Object>} The promise wrapping the response object.
 */
export const getLatestTimestampTransactionRequest = async ( post_id ) => {
	return callEndpoint( {
		path: `${ WORDPROOF_REST_API_NAMESPACE }/posts/${ post_id }/timestamp`,
		method: 'POST',
	} );
};
