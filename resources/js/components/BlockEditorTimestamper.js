import Authenticator from "./Authenticator";

const {useState} = wp.element;
import PropTypes from 'prop-types';

import WebhookFailedModal from "./modals/WebhookFailedModal";
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

    const [showModal, setShowModal] = useState(null);
    const [timestampResponse, setTimestampResponse] = useState(null);

    const {createSuccessNoticeCallback, createErrorNoticeCallback} = getNoticeActions();

    handleNoticesAfterTimestamp({
        timestampResponse,
        createSuccessNoticeCallback,
        createErrorNoticeCallback,
        setShowModal
    });

    onSave({setTimestampResponse});

    return (
            <>
                <Authenticator/>
            </>
    );
}

BlockEditorTimestamper.proptypes = {}

export default BlockEditorTimestamper;