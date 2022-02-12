import { getData } from '../helpers/data';
import ActionLink from './ActionLink';
import AuthenticationModals from './AuthenticationModals';

const { __, sprintf } = wp.i18n;
const { PluginDocumentSettingPanel } = wp.editPost;
const { ToggleControl, PanelRow } = wp.components;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { useState, useMemo, useEffect } = wp.element;
import PropTypes from 'prop-types';

const Editor_Panel = ( {
	postType,
	postMeta,
	isAuthenticated,
	setPostMeta,
} ) => {
	const initialData = getData();

	const [ selectedPostTypes ] = useState(
		initialData?.settings?.selected_post_types ?? []
	);

	useEffect( () => {
		// TODO on update selected post types
		// TODO on update isAuthenticated
	}, [ isAuthenticated, selectedPostTypes ] );

	const timestampedAutomatically = useMemo( () => {
		selectedPostTypes.includes( postType );
	}, [ selectedPostTypes, postType ] );

	return (
		<PluginDocumentSettingPanel
			title={ __( 'WordProof Timestamp', 'wordproof_timestamp' ) }
			initialOpen="true"
		>
			<PanelRow>
				<ToggleControl
					label={ sprintf(
						/* translators: %s expands to the post type */
						__( 'Timestamp this %s', 'wordproof-timestamp' ),
						postType
					) }
					onChange={ ( value ) =>
						setPostMeta( { _wordproof_timestamp: value } )
					}
					checked={
						postMeta._wordproof_timestamp ||
						timestampedAutomatically
					}
					disabled={ timestampedAutomatically }
				/>
				<ActionLink />

				<AuthenticationModals />
			</PanelRow>
		</PluginDocumentSettingPanel>
	);
};

Editor_Panel.proptypes = {
	postType: PropTypes.string.isRequired,
	postMeta: PropTypes.object.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	setPostMeta: PropTypes.func.isRequired,
};

export default compose( [
	withSelect( ( select ) => {
		return {
			postMeta: select( 'core/editor' ).getEditedPostAttribute( 'meta' ),
			postType: select( 'core/editor' ).getCurrentPostType(),
			isAuthenticated: select( 'wordproof' ).getIsAuthenticated(),
		};
	} ),
	withDispatch( ( dispatch ) => {
		return {
			setPostMeta( newMeta ) {
				dispatch( 'core/editor' ).editPost( { meta: newMeta } );
			},
		};
	} ),
] )( Editor_Panel );
