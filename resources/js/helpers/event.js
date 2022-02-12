export function dispatch( name ) {
	const event = new CustomEvent( name );
	console.warn( 'Event dispatch: ' + name );
	window.dispatchEvent( event );
}
