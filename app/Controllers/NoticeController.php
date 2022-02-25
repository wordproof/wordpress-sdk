<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\ClassicNoticeHelper;
use WordProof\SDK\Helpers\TransientHelper;
use WordProof\SDK\Translations\TranslationsInterface;

class NoticeController
{
    /**
     * @var string[] The screens on which notices should be rendered.
     */
    private $screens = ['post'];

    /**
     * @var TranslationsInterface The translations objects,
     */
    private $translations;

    public function __construct(TranslationsInterface $translations)
    {
        $this->translations = $translations;
    }

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

        $notice = TransientHelper::getOnce(ClassicNoticeHelper::$transientKey);

        if (!isset($notice) || !$notice) {
            return;
        }

        switch ($notice) {
            case 'no_balance':
                $type = 'error';
                $description = $this->translations->getNoBalanceNotice();
                break;
            case 'timestamp_success':
                $type = 'success';
                $description = $this->translations->getTimestampSuccessNotice();
                break;
            case 'timestamp_failed':
                $type = 'error';
                $description = $this->translations->getTimestampFailedNotice();
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
