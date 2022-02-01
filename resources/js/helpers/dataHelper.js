const {get, debounce, noop, last} = lodash;

export const getData = ( prop ) => get( window, `wordproofSdk.data${ prop ? `.${prop}` : "" }`, {} );