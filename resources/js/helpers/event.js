export function dispatch(name) {
    let event = new CustomEvent(name);
    console.warn('Event dispatch: ' + name)
    window.dispatchEvent(event);
}