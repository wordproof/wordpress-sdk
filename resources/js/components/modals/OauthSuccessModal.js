import WordProofModal from './Modal';

const { __ } = wp.i18n;
const { compose } = wp.compose;
const { withSelect } = wp.data;
import PropTypes from 'prop-types';

const OauthSuccessModal = ( { postType } ) => {
	const { close } = props;

	return (
		<WordProofModal
			close={ close }
			title={ __( 'Authenticated', 'wordproof_timestamp' ) }
		>
			<p>
				You have successfully connected your WordProof account with this
				site.
			</p>
		</WordProofModal>
	);
};

OauthSuccessModal.proptypes = {
	close: PropTypes.func.isRequired,
};

export default compose( [
	withSelect( ( select ) => {
		return {
			postType: select( 'core/editor' ).getCurrentPostType(),
		};
	} ),
] )( OauthSuccessModal );
