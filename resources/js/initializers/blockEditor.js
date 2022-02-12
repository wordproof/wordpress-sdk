import timestampBlockEditorInitializer from "./timestampBlockEditorInitializer";
import authenticationInitializer from "./authenticationInitializer";

const initializeBlockEditor = () => {

    authenticationInitializer();
    timestampBlockEditorInitializer();

}

export default initializeBlockEditor;