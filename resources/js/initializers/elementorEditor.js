import initializeTimestamper from './timestamper';
import initializeAuthentication from './authenticationInitializer';
import {
	callbackOnSave,
	createNotice,
} from '../helpers/editors/elementorEditor';

/**
 * Initializes the WordProof integration.
 *
 * @return {void}
 */
export default function initializeWordProofIntegration() {
	initializeAuthentication();

	initializeTimestamper( callbackOnSave, createNotice, createNotice );
}
