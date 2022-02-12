const { registerPlugin } = wp.plugins;

import Editor_Panel from './components/EditorPanel';

registerPlugin( 'wordproof-timestamp-panel', {
	render() {
		return <Editor_Panel />;
	},
} );
