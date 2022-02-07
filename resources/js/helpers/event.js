export function dispatch(name) {
    let event = new CustomEvent(name);
    window.dispatchEvent(event);
}