<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\NoticeHelper;
use WordProof\SDK\Helpers\TransientHelper;

class NoticeController
{
    /**
     * @var string[] The screens on which notices should be rendered.
     */
    private $screens = ['post'];
    
    /**
     * Showing notices for the classic editor and delete them so they are only shown once.
     *
     * @action admin_notices
     */
    public function show()
    {
        $screen = get_current_screen();
        if (!in_array($screen->base, $this->screens, true)) {
            return;
        }

        $notice = TransientHelper::getOnce(NoticeHelper::$transientKey);

        if (!isset($notice) || !$notice) {
            return;
        }

        switch ($notice) {
            case 'no_balance':
                $type = 'error';
                /* translators: %s expands to WordProof. */
                $description = sprintf(__('You are out of timestamps. Please upgrade your account by opening the %s settings.', 'wordpress-seo'), 'WordProof');
                break;
            case 'timestamp_success':
                $type = 'success';
                /* translators: %s expands to WordProof. */
                $description = sprintf(__('%s has successfully timestamped this page.', 'wordpress-seo'), 'WordProof');
                break;
            case 'timestamp_failed':
                $type = 'error';
                /* translators: %s expands to WordProof. */
                $description = sprintf(__('%1$s failed to timestamp this page. Please check if you\'re correctly authenticated with %1$s and try to save this page again.', 'wordpress-seo'), 'WordProof');
                break;
            default:
                break;
        }

        if (isset($description) && isset($type)) {
            $noticeClass = 'notice-' . $type;
            echo \sprintf(
                '<div class="notice %1$s is-dismissible"><p>%2$s</p></div>',
                esc_attr($noticeClass),
                esc_html($description)
            );
        }
    }
}