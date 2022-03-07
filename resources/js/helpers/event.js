export function dispatch( name ) {
	const event = new window.CustomEvent( name );
	window.dispatchEvent( event );
}
