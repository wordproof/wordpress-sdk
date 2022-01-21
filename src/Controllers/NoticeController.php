<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\NoticeHelper;
use WordProof\SDK\Helpers\TransientHelper;

class NoticeController
{
    private $screens = ['post'];
    
    public function show()
    {
        $screen = get_current_screen();
        if (!in_array($screen->base, $this->screens)) {
            return;
        }
        
        $notice = TransientHelper::getOnce(NoticeHelper::$transientKey);
        
        if (!isset($notice) || !$notice) {
            return;
        }

        switch ($notice) {
            case 'timestamp_success':
                $type = 'success';
                $description = sprintf(__('WordProof has successfully timestamped this page.', 'wordpress-seo'), get_preview_post_link());
                break;
            case 'timestamp_failed':
                $type = 'error';
                $description = __('WordProof failed to timestamp this page. Please check if you\'re correctly authenticated with WordProof and try to save this page again.', 'wordpress-seo');
                break;
            default:
                break;
        }
    
        if (isset($description) && isset($type)) {
            $noticeClass = 'notice-' . $type;
            echo \sprintf(
                '<div class="notice %1$s is-dismissible"><p>%2$s</p></div>',
                $noticeClass,
                $description
            );
        }
    }
}