import WordProofModal from './Modal';

const { __ } = wp.i18n;
const { compose } = wp.compose;
const { withSelect } = wp.data;
import PropTypes from 'prop-types';

const OauthSuccessModal = ( { postType } ) => {
	return (
		<WordProofModal
			title={ __( 'WordProof Authentication', 'wordproof_timestamp' ) }
		>
			<h3>Authenticated!</h3>
			<p>
				You have successfully connected your WordProof account with this
				site.
			</p>
		</WordProofModal>
	);
};

export default compose( [
	withSelect( ( select ) => {
		return {
			postType: select( 'core/editor' ).getCurrentPostType(),
		};
	} ),
] )( OauthSuccessModal );
