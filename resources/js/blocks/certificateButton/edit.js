import {Fragment} from "react";
import ActionLink from "../../components/ActionLink";
import WordproofIcon from "../../components/icon/Wordproof";

const {__} = wp.i18n
const {InspectorControls} = wp.blockEditor;
const {PanelBody} = wp.components;
const {PanelRow} = wp.components;

export default () => {
    return (
            <Fragment>
                <div className="wp-block-wordproof-certificate-button ">
                    <hr/>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                         className="wp-block-wordproof-certificate-button--content">
                        <WordproofIcon/>
                        { __('The certificate button will be placed here') }
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
}