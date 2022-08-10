import initializeBlockEditor from './initializers/blockEditor';

const {registerPlugin} = wp.plugins;

import EditorPanel from './components/EditorPanel';
import certificateButton from "./blocks/certificateButton";

registerPlugin('wordproof-timestamp-panel', {
    render() {
        return <EditorPanel/>;
    },
});

certificateButton();

initializeBlockEditor();
