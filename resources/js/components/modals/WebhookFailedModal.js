import WordProofModal from './Modal';

const { __ } = wp.i18n;

const WebhookFailedModal = () => {
	return (
		<WordProofModal
			title={ __( 'WordProof', 'wordproof_timestamp' ) }
		>
            <h3>Webhook failed</h3>
            <p>The timestamp send by WordProof was not received on your website. Please contact support to help solve this problem.</p>
		</WordProofModal>
	);
};

export default WebhookFailedModal;
