import {noBalanceNotice, timestampErrorNotice, timestampSuccessNotice} from "../../notices/notices";
import {getData} from "../data";
import {requestTimestamp} from "../api";

const {useEffect, useCallback} = wp.element;
import PropTypes from 'prop-types';

const {debounce} = lodash;

export const isElementorEditor = () => {
    return getData('post_editor') === 'elementor';
}

export const isBlockEditor = () => {
    return getData('post_editor') === 'block';
}

export const isClassicEditor = () => {
    return getData('post_editor') === 'classic';
}

const handleNoticesAfterTimestamp = (props) => {

    const {timestampResponse, createSuccessNoticeCallback, createErrorNoticeCallback, setShowModal} = props;

    useEffect(() => {
        console.log('timestampResponse');
        console.log(timestampResponse);
        if (timestampResponse === null) {
            return;
        }

        const successNoticeOptions = {type: 'snackbar', id: 'wordproof-timestamp-notice'};
        const errorNoticeOptions = {id: 'wordproof-timestamp-notice'};

        if (timestampResponse) {
            if (timestampResponse.balance === 0) {
                createErrorNoticeCallback(noBalanceNotice, errorNoticeOptions);
                //TODO check for webhook in 10 seconds.
                //GET posts/id/timestamp/hash
            } else {
                createSuccessNoticeCallback(timestampSuccessNotice, successNoticeOptions);
            }
        } else {
            createErrorNoticeCallback(timestampErrorNotice, errorNoticeOptions);
        }

    }, [timestampResponse]);
}
handleNoticesAfterTimestamp.proptypes = {
    timestampResponse: PropTypes.any.isRequired,
    createSuccessNoticeCallback: PropTypes.func.isRequired,
    createErrorNoticeCallback: PropTypes.func.isRequired,
    setShowModal: PropTypes.func.isRequired
}
export {handleNoticesAfterTimestamp};

const handleTimestampRequest = async (props) => {i
    const {setTimestampResponse} = props;
    const success = await requestTimestamp();
    setTimestampResponse(success);
}
handleTimestampRequest.proptypes = {
    setTimestampResponse: PropTypes.func.isRequired,
}
export {handleTimestampRequest};
