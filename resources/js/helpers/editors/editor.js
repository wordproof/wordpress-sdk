import {noBalanceNotice, timestampErrorNotice, timestampSuccessNotice} from "../../notices/notices";
import {getData} from "../data";
import {requestTimestamp} from "../api";

const {useEffect} = wp.element;
import PropTypes from 'prop-types';

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

    const {timestampResponse, createSuccessNoticeCallback, createErrorNoticeCallback} = props;

    useEffect(() => {
        if (timestampResponse === null) {
            return;
        }

        const successNoticeOptions = {type: 'snackbar', id: 'wordproof-timestamp-notice'};
        const errorNoticeOptions = {id: 'wordproof-timestamp-notice'};

        if (timestampResponse) {
            if (timestampResponse.balance === 0) {
                createErrorNoticeCallback(noBalanceNotice, errorNoticeOptions);
                // TODO check for webhook in 10 seconds.
                // GET posts/id/timestamp/hash
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
    createErrorNoticeCallback: PropTypes.func.isRequired
}

const handleTimestampRequest = async (props) => {
    const {setTimestampResponse} = props;

    const result = await requestTimestamp();

    setTimestampResponse(result);
}

handleTimestampRequest.proptypes = {
    setTimestampResponse: PropTypes.func.isRequired,
}

export {handleTimestampRequest, handleNoticesAfterTimestamp};
