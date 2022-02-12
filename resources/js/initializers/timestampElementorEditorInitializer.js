const {useState} = wp.element;

import {getNoticeActions, onSave} from "../helpers/editors/elementorEditor";
import {handleNoticesAfterTimestamp, isElementorEditor} from "../helpers/editors/editor";

/**
 * Handles timestamping new posts in the Elementor editor.
 *
 * @param props
 */
const timestampElementorEditorInitializer = (props) => {

    if (!isElementorEditor()) {
        return;
    }

    const {} = props;

    const [timestampResponse, setTimestampResponse] = useState(null);

    const {createSuccessNoticeCallback, createErrorNoticeCallback} = getNoticeActions();

    handleNoticesAfterTimestamp({
        timestampResponse,
        createSuccessNoticeCallback,
        createErrorNoticeCallback
    });

    onSave({setTimestampResponse});
}

export default timestampElementorEditorInitializer;