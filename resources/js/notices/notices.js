import { __, sprintf } from '@wordpress/i18n';

const elementor = window.elementor;

const timestampSuccessNotice = sprintf(
	/** Translators: %s expands to WordProof */
	__( '%s has successfully timestamped this page.', 'wordpress-timestamp' ),
	'WordProof'
);
const timestampErrorNotice = sprintf(
	/** Translators: %s expands to WordProof */
	__(
		'%s failed to timestamp this page. ' +
			"Please check if you're correctly authenticated with WordProof and try to save this page again.",
		'wordpress-timestamp'
	),
	'WordProof'
);
const noBalanceNotice = sprintf(
	/** Translators: %s expands to WordProof */
	__(
		'You are out of timestamps. Please upgrade your account by opening the %s settings.',
		'wordpress-timestamp'
	),
	'WordProof'
);

export { timestampSuccessNotice, timestampErrorNotice, noBalanceNotice };
