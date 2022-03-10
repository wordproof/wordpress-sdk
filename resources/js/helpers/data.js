// eslint-disable-next-line no-undef
const { get } = lodash;

export const getData = ( prop ) =>
	get( window, `wordproofSdk.data${ prop ? `.${ prop }` : '' }`, {} );
