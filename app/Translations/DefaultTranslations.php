<?php

namespace WordProof\SDK\Translations;

class DefaultTranslations implements TranslationsInterface
{
    public function getNoBalanceNotice()
    {
        /* translators: %s expands to WordProof. */
        return sprintf(__('You are out of timestamps. Please upgrade your account by opening the %s settings.', 'wordproof'), 'WordProof');
    }

    public function getTimestampFailedNotice()
    {
        /* translators: %s expands to WordProof. */
        return sprintf(__('%s has successfully timestamped this page.', 'wordproof'), 'WordProof');
    }

    public function getTimestampSuccessNotice()
    {
        /* translators: %s expands to WordProof. */
        return sprintf(__('%1$s failed to timestamp this page. Please check if you\'re correctly authenticated with %1$s and try to save this page again.', 'wordproof'), 'WordProof');
    }
}
