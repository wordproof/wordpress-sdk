import {handleTimestampRequest} from "./editor";

const {useCallback} = wp.element;
import PropTypes from 'prop-types';
import {registerElementorDataHookAfter} from "../elementorHook";

export const getNoticeActions = () => {

    const elementor = window.elementor;

    const createSuccessNoticeCallback = useCallback((props) => {
            elementor.notifications.showToast({
                message: props.notice,
            });
    }, []);

    const createErrorNoticeCallback = useCallback((props) => {
            elementor.notifications.showToast({
                message: props.notice,
            });
    }, []);

    return {createSuccessNoticeCallback, createErrorNoticeCallback}
}

const onSave = (props) => {
    console.log('onSave elementor')
    const { setTimestampResponse } = props;

    registerElementorDataHookAfter("document/save/save", "wordproof-timestamp", () => {
        console.log('here!');
        /*
        * Do not save our data to a revision.
        *
        * WordPress saves the metadata to the post parent, not the revision. See `update_post_meta`.
        * Most likely this is because saving a revision on a published post will unpublish in WordPress itself.
        * But Elementor does not unpublish your post when you save a draft.
        * This would result in a new timestamp while saving a draft.
        */
        if (window.elementor.config.document.id === window.elementor.config.document.revisions.current_id) {
            handleTimestampRequest(props)
        }
    });

}
onSave.proptypes = {
    setTimestampResponse: PropTypes.func.isRequired
}
export {onSave};