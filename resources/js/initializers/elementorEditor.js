import authenticationInitializer from "./authenticationInitializer";
import timestampElementorEditorInitializer from "./timestampElementorEditorInitializer";

const elementorEditor = () => {

    authenticationInitializer();
    timestampElementorEditorInitializer();

}

export default elementorEditor;