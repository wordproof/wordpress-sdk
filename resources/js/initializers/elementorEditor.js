import authenticationInitializer from './authenticationInitializer';
import timestampElementorEditorInitializer from './timestampElementorEditorInitializer';

const initializeElementorEditor = () => {
	authenticationInitializer();
	timestampElementorEditorInitializer();
};

export default initializeElementorEditor;
