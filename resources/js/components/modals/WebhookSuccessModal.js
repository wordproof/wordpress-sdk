import WordProofModal from "./Modal";

const {__} = wp.i18n;
const {compose} = wp.compose;
const {withSelect} = wp.data;
import PropTypes from 'prop-types';

const WebhookSuccessModal = ({postType}) => {
    return (
            <WordProofModal
                    title={__('WordProof Authentication', 'wordproof_timestamp')}>
                <p>Success!</p>
            </WordProofModal>
    );
}

export default compose([
    withSelect((select) => {
        return {
            postType: select('core/editor').getCurrentPostType(),
        };
    })
])(WebhookSuccessModal);
