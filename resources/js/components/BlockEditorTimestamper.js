const {useState} = wp.element;
import PropTypes from 'prop-types';

import {getNoticeActions, onSave} from "../helpers/editors/blockEditor";
import {handleNoticesAfterTimestamp, isBlockEditor} from "../helpers/editors/editor";

/**
 * Timestamps updated posts for the Elementor editor.
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const BlockEditorTimestamper = (props) => {

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

    return (<></>);
}

BlockEditorTimestamper.proptypes = {}

export default BlockEditorTimestamper;