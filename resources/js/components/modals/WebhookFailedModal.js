import WordProofModal from "./Modal";

const {__} = wp.i18n;
const {compose} = wp.compose;
import PropTypes from 'prop-types';

const WebhookFailedModal = () => {
    return (
            <WordProofModal
                    title={__('WordProof Authentication', 'wordproof_timestamp')}>
                <p>Webhook Failed!</p>
            </WordProofModal>
    );
}

WebhookFailedModal.proptypes = {}

export default compose([])(WebhookFailedModal);
