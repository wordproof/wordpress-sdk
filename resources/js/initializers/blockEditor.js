import timestampBlockEditorInitializer from "./timestampBlockEditorInitializer";
import authenticationInitializer from "./authenticationInitializer";

const blockEditor = () => {

    authenticationInitializer();
    timestampBlockEditorInitializer();

}

export default blockEditor;