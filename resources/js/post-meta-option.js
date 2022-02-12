const { registerPlugin } = wp.plugins;

import EditorPanel from './components/EditorPanel';

registerPlugin( 'wordproof-timestamp-panel', {
	render() {
		return <EditorPanel />;
	},
} );
