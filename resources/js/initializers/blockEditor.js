import { dispatch } from '@wordpress/data';

import initializeWordProofTimestamper from './timestamper';
import initializeAuthentication from './authenticationInitializer';
import { callbackOnSave } from '../helpers/editors/blockEditor';

/**
 * Initializes the WordProof integration.
 *
 * @return {void}
 */
export default function initializeWordProofIntegration() {
	const { createSuccessNotice, createErrorNotice } = dispatch(
		'core/notices'
	);

	initializeAuthentication();

	initializeWordProofTimestamper(
		callbackOnSave,
		createSuccessNotice,
		createErrorNotice
	);
}
