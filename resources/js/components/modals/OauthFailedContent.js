import WordProofModal from './Modal';
import { dispatch } from '../../helpers/event';
import { addLinkToString } from '../../helpers/string';

import PropTypes from 'prop-types';

const { Button } = wp.components;
const { useCallback } = wp.element;
const { __, sprintf } = wp.i18n;

const OauthDeniedModal = ( props ) => {
	const { close } = props;

	const retry = useCallback( ( event ) => {
		event.preventDefault();
		dispatch( 'wordproof:open_authentication' );
	} );

	return (
		<WordProofModal
			close={ close }
			title={ __( 'Authentication failed', 'wordproof' ) }
		>
			<>
				<p>
					{ sprintf(
						/* Translators: %s expands to WordProof */
						__(
							'Something failed during the authentication of your %s account.',
							'wordproof'
						),
						'WordProof'
					) }

					{ addLinkToString(
						sprintf(
							/* Translators: %1s and %2s are html tags. %3s expands to WordProof */
							__(
								'Please try again or contact the %1$s%3$s support team%2$s.',
								'wordpress-seo'
							),
							'<a>',
							'</a>',
							'WordProof'
						),
						'https://help.wordproof.com/'
					) }
				</p>
				<Button variant={ 'primary' } onClick={ retry }>
					{ __( 'Retry authentication', 'wordproof' ) }
				</Button>
			</>
		</WordProofModal>
	);
};

OauthDeniedModal.proptypes = {
	close: PropTypes.func.isRequired,
};

export default OauthDeniedModal;
