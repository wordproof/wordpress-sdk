import { select } from "@wordpress/data";
import { debounce } from "lodash";
import {requestTimestamp} from "../helpers/api";
import {handleNoticesAfterTimestamp} from "../helpers/editors/editor";
const { applyFilters } = wp.hooks;

/**
 * Initializes the timestamper.
 *
 * @param {Function} callbackOnSave Function to register the timestamp callback
 * @param {Function} createSuccessNotice Function to display a success notice.
 * @param {Function} createErrorNotice Function to display an error notice.
 *
 * @returns {void}
 */
export default function initializeTimestamper( callbackOnSave, createSuccessNotice, createErrorNotice ) {
    const sendTimestampRequest = debounce( async() => {

        if (applyFilters('wordproof.timestamp', true)) {
            const response = await requestTimestamp();
            handleNoticesAfterTimestamp( response, createSuccessNotice, createErrorNotice );
        }

    }, 500 );

    callbackOnSave( sendTimestampRequest );
}