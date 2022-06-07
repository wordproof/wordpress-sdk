import WordProofModal from './Modal';
import { addLinkToString } from '../../helpers/string';

const { __, sprintf } = wp.i18n;
import PropTypes from 'prop-types';

const WebhookFailedContent = ( props ) => {
	const { close } = props;

	return (
		<WordProofModal
			close={ close }
			title={ __( 'Webhook failed', 'wordproof' ) }
		>
			<p>
				{ sprintf(
					/* Translators: %s expands to WordProof */
					__(
						'The timestamp sent by %s was not received on your website.',
						'WordProof'
					),
					'WordProof'
				) }

				{ addLinkToString(
					sprintf(
						/* Translators: %1s and %2s are html tags. %3s expands to WordProof */
						__(
							'Please contact the %1$s%3$s support team%2$s to help solve this problem.',
							'wordpress-seo'
						),
						'<a>',
						'</a>',
						'WordProof'
					),
					'https://help.wordproof.com/'
				) }
			</p>
		</WordProofModal>
	);
};

WebhookFailedContent.proptypes = {
	close: PropTypes.func.isRequired,
};

export default WebhookFailedContent;
