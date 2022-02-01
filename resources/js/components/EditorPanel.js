import {getData, getWordProofSdkData} from "../helpers/dataHelper";

const {__, sprintf} = wp.i18n;
const {PluginDocumentSettingPanel} = wp.editPost;
const {ToggleControl, PanelRow} = wp.components;
const {compose} = wp.compose;
const {withSelect, withDispatch} = wp.data;
const {useState, useMemo, useEffect} = wp.element;


const Editor_Panel = ({postType, postMeta, setPostMeta}) => {

    const initialData = getData();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedPostTypes] = useState(initialData?.settings?.selected_post_types ?? []);

    useEffect( () => {
        //on update selected post types

        //on update isAuthenticated
    }, [ isAuthenticated, selectedPostTypes] );

    const timestampedAutomatically = useMemo(
            () => {
                console.log(selectedPostTypes);
                console.log(postType);
                selectedPostTypes.includes(postType);
            },
            [selectedPostTypes, postType],
    );

        return (
            <PluginDocumentSettingPanel
                    title={__('WordProof Timestamp', 'wordproof_timestamp')}
                    initialOpen="true">
                <PanelRow>
                    <ToggleControl
                            label={sprintf(
                                    /* translators: %s expands to the post type */
                                    __('Timestamp this %s', "wordproof-timestamp"),
                                    postType
                            )}
                            onChange={(value) => setPostMeta({_wordproof_timestamp: value})}
                            checked={postMeta._wordproof_timestamp || timestampedAutomatically}
                            disabled={timestampedAutomatically}
                    /> </PanelRow>
            </PluginDocumentSettingPanel>
    );
}

export default compose([
    withSelect((select) => {
        return {
            postMeta: select('core/editor').getEditedPostAttribute('meta'),
            postType: select('core/editor').getCurrentPostType(),
        };
    }),
    withDispatch((dispatch) => {
        return {
            setPostMeta(newMeta) {
                dispatch('core/editor').editPost({meta: newMeta});
            }
        };
    })
])(Editor_Panel);
