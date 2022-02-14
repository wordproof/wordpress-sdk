import WordProofModal from './Modal';
import { dispatch } from '../../helpers/event';

import PropTypes from 'prop-types';
const { Button } = wp.components;
const { useCallback } = wp.element;
const { __ } = wp.i18n;

const OauthDeniedModal = () => {
	const { close } = props;

	const retry = useCallback( ( event ) => {
		event.preventDefault();
		dispatch( 'wordproof:open_authentication' );
	} );

	return (
		<WordProofModal
			close={ close }
			title={ __( 'Authentication denied', 'wordproof_timestamp' ) }
		>
			<>
				<p>
					{ __(
						'You need to allow WordProof to access your site to finish the WordProof installation.',
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

OauthDeniedModal.proptypes = {
	close: PropTypes.func.isRequired,
};

export default OauthDeniedModal;
