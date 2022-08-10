import edit from './edit'

import WordproofIcon from "../../components/icon/Wordproof";

const {__} = wp.i18n
const {registerBlockType} = wp.blocks

export default () => {
    registerBlockType('wordproof/certificate-button', {
        title: __('Certificate Button'),
        description: __('Add the certificate button to the content'),
        category: 'embed',
        keywords: [__('timestsamp'), __('wordproof'), __('certificate')],
        icon: <WordproofIcon/>,
        example: {},
        edit,
    });
}
