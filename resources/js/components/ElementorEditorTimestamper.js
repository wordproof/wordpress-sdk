const {useState} = wp.element;
import PropTypes from 'prop-types';

import {getNoticeActions, onSave} from "../helpers/editors/elementorEditor";
import {handleNoticesAfterTimestamp, isElementorEditor} from "../helpers/editors/editor";

/**
 * Timestamps updated posts for the Elementor editor.
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ElementorEditorTimestamper = (props) => {

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

    return (<></>);
}

ElementorEditorTimestamper.proptypes = {}

export default ElementorEditorTimestamper;