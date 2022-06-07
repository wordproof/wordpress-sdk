import { createInterpolateElement } from '@wordpress/element';

/**
 * Adds a link to a string containing anchor tags (in string form).
 *
 * @example "This is an example text in which <a>this part should be a link</a> and this part shouldn't."
 *
 * @param {string} text   The text to add links to. Make sure it contains <a> and </a> tags surrounding the link part.
 * @param {string} linkTo The target URL for the link (href).
 * @param {string} id     The id to attach to the link.
 */
export function addLinkToString( text, linkTo, id = '' ) {
	return createInterpolateElement( text, {
		// eslint-disable-next-line jsx-a11y/anchor-has-content
		a: (
			<a
				id={ id }
				href={ linkTo }
				target="_blank"
				rel="noopener noreferrer"
			/>
		),
	} );
}
