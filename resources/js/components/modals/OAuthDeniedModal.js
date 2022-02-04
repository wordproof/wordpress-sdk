import WordProofModal from "./Modal";

const {__} = wp.i18n;
const {compose} = wp.compose;
const {Button} = wp.components;
import PropTypes from 'prop-types';

const OAuthDeniedModal = (props) => {
    const {
        retry
    } = props;

    return (
            <WordProofModal
                    title={__('WordProof Authentication', 'wordproof_timestamp')}>
                <>
                    <h3>Authorize denied!</h3>
                    <p>Denied!</p>
                    <Button variant={'primary'} onClick={retry}>{__('Retry', 'wordproof_timestamp')}</Button>
                </>
            </WordProofModal>
    );
}

OAuthDeniedModal.proptypes = {
    retry: PropTypes.func.isRequired
}

export default compose([])(OAuthDeniedModal);
