/**
 * Pause execution for a given amount of milliseconds.
 *
 * @param {int} time
 * @returns {Promise<unknown>}
 */
export function wait(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}