import initializeClassicEditor from './initializers/classicEditor';
import ActionLink from './components/ActionLink';
import { getData } from './helpers/data';
import { dispatchOpenAuthenticationEvent } from './helpers/event';

const { render } = wp.element;
const { select, subscribe } = wp.data;

initializeClassicEditor();

window.addEventListener( 'DOMContentLoaded', ( event ) => {
	init();
} );

const currentPostType = getData( 'current_post_type' );

let toggle = null;
let initialToggleChecked = null;
let actionLink = null;

function init() {
	toggle = document.querySelector( '#_wordproof_timestamp' );
	initialToggleChecked = toggle.checked;
	if ( ! toggle ) {
		return;
	}

	actionLink = document.querySelector( '#wordproof-action-link' );
	if ( actionLink ) {
		render( <ActionLink />, actionLink );
	}

	//Set toggle on load and subscribe for changes.
	setToggle( getSelectedPostTypes() );

	subscribe( () => {
		const selectedPostTypes = getSelectedPostTypes();
		setToggle( selectedPostTypes );
	} );

	//Set event listener to toggle to open authentication on click.
	toggle.addEventListener( 'change', ( event ) => {
		if ( ! isAuthenticated() && toggle.checked ) {
			dispatchOpenAuthenticationEvent();
		}
	} );
}

function setToggle( selectedPostTypes ) {
	const disabled = selectedPostTypes.includes( currentPostType );

	if ( disabled ) {
		toggle.disabled = true;
		toggle.checked = true;
	} else {
		toggle.disabled = false;
		toggle.checked = initialToggleChecked;
	}
}

function getSelectedPostTypes() {
	return select( 'wordproof' ).getSelectedPostTypes();
}

function isAuthenticated() {
	return select( 'wordproof' ).getIsAuthenticated();
}
