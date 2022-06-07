import WordProofModal from './Modal';

const { __, sprintf } = wp.i18n;
const { compose } = wp.compose;
const { withSelect } = wp.data;
import PropTypes from 'prop-types';

const OauthSuccessContent = ( props ) => {
	const { close, postType } = props;

	return (
		<WordProofModal
			close={ close }
			title={ __( 'Authenticated', 'wordproof' ) }
		>
			<p>
				{ sprintf(
					/* translators: %s expands to WordProof. */
					__(
						'You have successfully connected your %s account with this site.',
						'wordproof'
					),
					'WordProof'
				) }

				{ postType &&
					sprintf(
						/* translators: %s is the singular post type. */
						__(
							'Your %s will now be timestamped everytime you update or publish.',
							'wordproof'
						),
						postType
					) }
			</p>
		</WordProofModal>
	);
};

OauthSuccessContent.proptypes = {
	close: PropTypes.func.isRequired,
};

export default compose( [
	withSelect( ( select ) => {
		return {
			postType: select( 'core/editor' ).getCurrentPostType(),
		};
	} ),
] )( OauthSuccessContent );
