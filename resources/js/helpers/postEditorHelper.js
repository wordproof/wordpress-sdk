const {noop} = lodash;
const {useEffect, useCallback} = wp.element;
const {useSelect, useDispatch} = wp.data;
import PropTypes from 'prop-types';

import {getData} from "./dataHelper";

export const isElementorEditor = () => {
    return getData('post_editor') === 'elementor';
}

export const isBlockEditor = () => {
    return getData('post_editor') === 'block';
}

export const isClassicEditor = () => {
    return getData('post_editor') === 'classic';
}

export const getPostEditorNoticeActions = () => {
    const createSuccessNotice = noop;
    const createErrorNotice = noop;

    let noticeActions = {createSuccessNotice, createErrorNotice};

    if (isElementorEditor()) {

        const elementor = window.elementor;

        const createSuccessNotice = (notice, options) => {
            elementor.notifications.showToast({
                message: notice,
            });
        }

        const createErrorNotice = (notice, options) => {
            elementor.notifications.showToast({
                message: notice,
            });
        }

        noticeActions = {createSuccessNotice, createErrorNotice};

    } else if (isBlockEditor()) {
        const blockEditorNoticeActions = useDispatch( "core/notices" );

        const {
            createSuccessNotice,
            createErrorNotice
        } = blockEditorNoticeActions;

        noticeActions = {createSuccessNotice, createErrorNotice};
    }

    const createSuccessNoticeCallback = useCallback((props) => {
        noticeActions.createSuccessNotice(props)
    }, []);

    const createErrorNoticeCallback = useCallback((props) => {
        noticeActions.createErrorNotice(props)
    }, []);

    return {createSuccessNoticeCallback, createErrorNoticeCallback}
}

export const executeOnSave = (props) => {
    if (isElementorEditor) {
        console.warn('Implement Elementor action');
        // RegisterElementorDataHookAfter( "document/save/save", "wordproof/timestamper", props.action);
    }

    if (isBlockEditor) {
        const isBlockEditorSavePost = useSelect((select) => select("core/editor").isSavingPost(), []);
        const isBlockEditorAutoSavePost = useSelect((select) => select("core/editor").isAutosavingPost(), []);
        const didBlockEditorPostSaveRequestSucceed = useSelect((select) => select("core/editor").didPostSaveRequestSucceed(), []);

        useEffect(() => {
            if (isBlockEditorSavePost && didBlockEditorPostSaveRequestSucceed && !isBlockEditorAutoSavePost) {
                props.action();
            }
        }, [isBlockEditorSavePost, isBlockEditorAutoSavePost, didBlockEditorPostSaveRequestSucceed]);
    }
}

executeOnSave.proptypes = {
    action: PropTypes.func.isRequired
}