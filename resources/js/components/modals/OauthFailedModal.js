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
				<h3>Authentication failed!</h3>
				<p>
					{ __(
						'Something failed during the authentication of your WordProof account. Please try again or contact the support team.',
						'wordproof_sdk'
					) }
				</p>
				<Button variant={ 'primary' } onClick={ retry }>
					{ __( 'Retry authentication', 'wordproof_timestamp' ) }
				</Button>
			</>
		</WordProofModal>
	);
};

export default OauthDeniedModal;
