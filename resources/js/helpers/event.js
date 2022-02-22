export function dispatch( name ) {
	const event = new window.CustomEvent( name );
	console.warn( 'Event dispatch: ' + name );
	window.dispatchEvent( event );
}
