const {useState} = wp.element;
import PropTypes from 'prop-types';

import {getNoticeActions, onSave} from "../helpers/editors/blockEditor";
import {handleNoticesAfterTimestamp, isBlockEditor} from "../helpers/editors/editor";

/**
 * Handles timestamping new posts in the Block editor.
 *
 * @param props
 */
const timestampBlockEditorInitializer = (props) => {

    if (!isBlockEditor()) {
        return;
    }

    const {} = props;

    const [timestampResponse, setTimestampResponse] = useState(null);

    const {createSuccessNoticeCallback, createErrorNoticeCallback} = getNoticeActions();

    handleNoticesAfterTimestamp({
        timestampResponse,
        createSuccessNoticeCallback,
        createErrorNoticeCallback,
    });

    onSave({setTimestampResponse});
}

export default timestampBlockEditorInitializer;