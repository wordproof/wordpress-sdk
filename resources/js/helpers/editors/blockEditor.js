import {handleTimestampRequest} from "./editor";

const {useEffect, useCallback} = wp.element;
const {useSelect, useDispatch} = wp.data;
import PropTypes from 'prop-types';

export const getNoticeActions = () => {

    const blockEditorNoticeActions = useDispatch("core/notices");

    const {
        createSuccessNotice,
        createErrorNotice
    } = blockEditorNoticeActions;

    const createSuccessNoticeCallback = useCallback((props) => {
        createSuccessNotice(props)
    }, []);

    const createErrorNoticeCallback = useCallback((props) => {
        createErrorNotice(props)
    }, []);

    return {createSuccessNoticeCallback, createErrorNoticeCallback}
}

const onSave = (props) => {
    console.log('Init onSave');
    const isBlockEditorSavePost = useSelect((select) => select("core/editor").isSavingPost(), []);
    const isBlockEditorAutoSavePost = useSelect((select) => select("core/editor").isAutosavingPost(), []);
    const didBlockEditorPostSaveRequestSucceed = useSelect((select) => select("core/editor").didPostSaveRequestSucceed(), []);

    useEffect(() => {
        if (isBlockEditorSavePost && didBlockEditorPostSaveRequestSucceed && !isBlockEditorAutoSavePost) {
            handleTimestampRequest(props)
        }
    }, [isBlockEditorSavePost, isBlockEditorAutoSavePost, didBlockEditorPostSaveRequestSucceed]);
}
onSave.proptypes = {
    setTimestampResponse: PropTypes.func.isRequired
}
export {onSave};