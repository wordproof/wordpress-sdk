import {registerElementorDataHookAfter} from "../elementorHook";

/**
 * Creates an elementor notice.
 *
 * @param {string} content The message content.
 *
 * @returns {void}
 */
export function createNotice( content ) {
    window.elementor.notifications.showToast( {
        message: content,
    } );
}

/**
 * Executes callback on post editor save.
 *
 * @param {Function} callback The callback.
 *
 * @returns {void}
 */
export function callbackOnSave( callback ) {
    registerElementorDataHookAfter( "document/save/save", "wordproof/timestamper", callback );
}