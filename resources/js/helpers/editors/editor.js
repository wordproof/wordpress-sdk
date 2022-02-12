import {
	noBalanceNotice,
	timestampErrorNotice,
	timestampSuccessNotice,
} from '../../notices/notices';
import { getData } from '../data';
import PropTypes from 'prop-types';

export const isElementorEditor = () => {
	return getData( 'post_editor' ) === 'elementor';
};

export const isBlockEditor = () => {
	return getData( 'post_editor' ) === 'block';
};

export const isClassicEditor = () => {
	return getData( 'post_editor' ) === 'classic';
};

const handleNoticesAfterTimestamp = ( props ) => {
	const { response, createSuccessNotice, createErrorNotice } = props;

	if ( response === null ) {
		return;
	}

	const successNoticeOptions = {
		type: 'snackbar',
		id: 'wordproof-timestamp-notice',
	};

	const errorNoticeOptions = { id: 'wordproof-timestamp-notice' };

	if ( response ) {
		if ( response.balance === 0 ) {
			createErrorNotice( noBalanceNotice, errorNoticeOptions );
			// TODO check for webhook in 10 seconds.
			// GET posts/id/timestamp/hash
		} else {
			createSuccessNotice( timestampSuccessNotice, successNoticeOptions );
		}
	} else {
		createSuccessNotice( timestampErrorNotice, errorNoticeOptions );
	}
};

handleNoticesAfterTimestamp.proptypes = {
	timestampResponse: PropTypes.any.isRequired,
	createSuccessNoticeCallback: PropTypes.func.isRequired,
	createErrorNoticeCallback: PropTypes.func.isRequired,
};

export { handleNoticesAfterTimestamp };
