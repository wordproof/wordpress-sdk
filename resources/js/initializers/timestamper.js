import { postTimestampRequest } from '../helpers/endpoints';
import { handleNoticesAfterTimestamp } from '../helpers/editors/editor';

const { debounce } = lodash;
const { applyFilters } = wp.hooks;
const { select } = wp.data;

/**
 * Initializes the timestamper.
 *
 * @param {Function} callbackOnSave      Function to register the timestamp callback
 * @param {Function} createSuccessNotice Function to display a success notice.
 * @param {Function} createErrorNotice   Function to display an error notice.
 *
 * @return {void}
 */
export default function initializeTimestamper(
	callbackOnSave,
	createSuccessNotice,
	createErrorNotice
) {
	const sendTimestampRequest = debounce( async () => {
		if ( applyFilters( 'wordproof.timestamp', true ) ) {
			const postId = select( 'core/editor' ).getCurrentPostId();

			const response = await postTimestampRequest( postId );

			handleNoticesAfterTimestamp( {
				response,
				createSuccessNotice,
				createErrorNotice,
			} );
		}
	}, 500 );

	callbackOnSave( sendTimestampRequest );
}
