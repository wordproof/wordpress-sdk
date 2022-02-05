import {requestTimestamp} from "../helpers/api";

const {useState, useCallback, useEffect} = wp.element;
const {debounce} = lodash;
import PropTypes from 'prop-types';

import WebhookFailedModal from "./modals/WebhookFailedModal";
import {executeOnSave, getPostEditorNoticeActions, onSave} from "../helpers/postEditorHelper";
import {timestampErrorNotice, noBalanceNotice, timestampSuccessNotice} from "../notices/notices";

const Timestamper = (props) => {
    const {} = props;

    const [showModal, setShowModal] = useState(null);
    const [timestampResponse, setTimestampResponse] = useState(null);

    const {createSuccessNoticeCallback, createErrorNoticeCallback} = getPostEditorNoticeActions();

    /**
     * Add notice on new timestamp response.
     */
    useEffect(() => {
        if (timestampResponse === null) {
            return;
        }

        const successNoticeOptions = {type: 'snackbar', id: 'wordproof-timestamp-notice'};
        const errorNoticeOptions = {id: 'wordproof-timestamp-notice'};

        if (timestampResponse) {
            if (timestampResponse.balance === 0) {
                createErrorNoticeCallback(noBalanceNotice, errorNoticeOptions);
                //TODO check for webhook in 10 seconds.
            } else {
                createSuccessNoticeCallback(timestampSuccessNotice, successNoticeOptions);
            }
        } else {
            createErrorNoticeCallback(timestampErrorNotice, errorNoticeOptions);
        }
    }, [timestampResponse]);

    const handleRequestTimeStamp = useCallback(
            debounce(async () => {
                const success = await requestTimestamp();
                setTimestampResponse(success);
            }, 500),
            [requestTimestamp, setTimestampResponse]
    );

    /**
     * Request timestamp on save action of current editor.
     */
    executeOnSave({action: handleRequestTimeStamp});

    return (
            <></>
    );
}

Timestamper.proptypes = {}

export default Timestamper;