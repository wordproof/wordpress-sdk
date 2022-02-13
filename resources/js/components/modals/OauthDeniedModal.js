import WordProofModal from './Modal';
import { dispatch } from '../../helpers/event';

const { Button } = wp.components;
const { useCallback } = wp.element;
const { __ } = wp.i18n;

const OauthDeniedModal = () => {
	const retry = useCallback( ( event ) => {
		event.preventDefault();
		dispatch( 'wordproof:open_authentication' );
	} );

	return (
		<WordProofModal
			title={ __( 'WordProof Authentication', 'wordproof_timestamp' ) }
		>
			<>
				<h3>Authorize denied!</h3>
                <p>{__('You need to allow WordProof to access your site to finish the WordProof installation.', 'wordproof_sdk')}</p>
				<Button variant={ 'primary' } onClick={ retry }>
					{ __( 'Retry authentication', 'wordproof_timestamp' ) }
				</Button>
			</>
		</WordProofModal>
	);
};

OauthDeniedModal.proptypes = {};

export default OauthDeniedModal;
