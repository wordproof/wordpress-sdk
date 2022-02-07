const {__} = wp.i18n;
const {useCallback} = wp.element;
const {withSelect} = wp.data;
const {compose} = wp.compose;
import PropTypes from 'prop-types';

const ActionLink = (props) => {
    const {
        isAuthenticated,
    } = props;

    const openSettings = useCallback(event => {
        event.preventDefault();
        dispatchEvent('wordproof:open_settings')
    });

    const openAuthentication = useCallback(event => {
        event.preventDefault();
        dispatchEvent('wordproof:open_authentication')
    });

    return (
            <>
                {isAuthenticated &&
                <a href={settingsLink} onClick={openSettings}>{__('Open Settings', 'wordproof_timestamp')}</a>
                }

                {!isAuthenticated &&
                <a href={authenticationLink}
                   onClick={openAuthentication}>{__('Open Authentication', 'wordproof_timestamp')}</a>
                }
            </>
    );
}

ActionLink.proptypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}

export default compose([
    withSelect((select) => {
        return {
            isAuthenticated: select('wordproof').getIsAuthenticated(),
        };
    })
])(ActionLink);