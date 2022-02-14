import WordProofModal from './Modal';

const { __ } = wp.i18n;
import PropTypes from 'prop-types';

const WebhookFailedModal = ( props ) => {
	const { close } = props;

	return (
		<WordProofModal
			close={ close }
			title={ __( 'Webhook failed', 'wordproof_timestamp' ) }
		>
			<p>
				The timestamp send by WordProof was not received on your
				website. Please contact support to help solve this problem.
			</p>
		</WordProofModal>
	);
};

WebhookFailedModal.proptypes = {
	close: PropTypes.func.isRequired,
};

export default WebhookFailedModal;
