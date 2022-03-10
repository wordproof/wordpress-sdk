import WordProofModal from './Modal';

const { __ } = wp.i18n;
const { compose } = wp.compose;
const { withSelect } = wp.data;
import PropTypes from 'prop-types';

const OauthSuccessContent = (props ) => {
	const { close, postType } = props;

	return (
		<WordProofModal
			close={ close }
			title={ __( 'Authenticated', 'wordproof' ) }
		>
			<p>
				You have successfully connected your WordProof account with this
				site.
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
