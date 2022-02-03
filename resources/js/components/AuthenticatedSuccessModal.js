import {getData} from "../helpers/dataHelper";

const {__, sprintf} = wp.i18n;
const {Modal} = wp.components;
const {compose} = wp.compose;
const {withSelect} = wp.data;
const { } = wp.element;

const AuthenticatedSuccessModal = ({postType}) => {
    return (
            <Modal>

            </Modal>
    );
}

export default compose([
    withSelect((select) => {
        return {
            postType: select('core/editor').getCurrentPostType(),
        };
    })
])(AuthenticatedSuccessModal);
