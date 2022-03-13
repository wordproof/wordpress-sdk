// eslint-disable-next-line no-undef
const { get } = lodash;

/**
 * Helper to get data from added JavaScript window variable.
 *
 * @param prop
 * @returns {*}
 */
export const getData = ( prop ) =>
	get( window, `wordproofSdk.data${ prop ? `.${ prop }` : '' }`, {} );
