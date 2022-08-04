import initializeBlockEditor from './initializers/blockEditor';

const {__} = wp.i18n
const {registerPlugin} = wp.plugins;
const {registerBlockType} = wp.blocks;
const {InspectorControls} = wp.blockEditor;
const {PanelBody} = wp.components;
const {PanelRow} = wp.components;

import EditorPanel from './components/EditorPanel';
import WordproofIcon from "./components/icon/Wordproof";
import {Fragment} from "react";
import ActionLink from "./components/ActionLink";

registerPlugin('wordproof-timestamp-panel', {
    render() {
        return <EditorPanel/>;
    },
});

registerBlockType('wordproof/certificate-button', {
    title: __('Certificate Button'),
    description: __('Add the certificate button to the content'),
    category: 'embed',
    keywords: [__('timestsamp'), __('wordproof'), __('certificate')],
    icon: <WordproofIcon/>,
    example: {},
    edit: () => {
        return (
                <Fragment>
                    <div className="wp-block-wordproof-certificate-button ">
                        <hr/>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}} className="wp-block-wordproof-certificate-button--content">
                            <WordproofIcon/>
                            {__('We will render your certificate button here')}
                        </div>
                        <hr/>
                    </div>

                    <InspectorControls>
                        <PanelBody initialOpen={true}>
                            <PanelRow>
                                { __('Customize the look of your certificate button') }
                            </PanelRow>
                            <PanelRow>
                                <ActionLink/>
                            </PanelRow>
                        </PanelBody>
                    </InspectorControls>
                </Fragment>
        );
    },
});

initializeBlockEditor();
