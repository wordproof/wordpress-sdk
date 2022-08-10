<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\AppConfigHelper;
use WordProof\SDK\Helpers\BlocksHelper;
use WordProof\SDK\Helpers\CertificateHelper;
use WordProof\SDK\Helpers\EnvironmentHelper;
use WordProof\SDK\Helpers\PostMetaHelper;
use WordProof\SDK\Helpers\SettingsHelper;

class CertificateController
{

    /**
     * Add scripts and schema to the head of the current page.
     *
     * @action wp_head
     */
    public function head()
    {
        if (!CertificateHelper::show()) {
            return;
        }

        global $post;
    
        $schema = "\n";
        
        if (AppConfigHelper::getLoadUikitFromCdn() === true) {
            $schema .= '<script type="module" src="https://unpkg.com/@wordproof/uikit@1.0.*/dist/uikit/uikit.esm.js"></script>';
            $schema .= "\n";
            $schema .= '<script nomodule src="https://unpkg.com/@wordproof/uikit@1.0.*/dist/uikit/uikit.js"></script>';
            $schema .= "\n";
        }

        $schema .= '<script type="application/ld+json" class="' . \esc_attr('wordproof-schema-graph') . '">';
        $schema .= json_encode(PostMetaHelper::get($post->ID, '_wordproof_schema'), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $schema .= "</script>";
        $schema .= "\n";

        // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        echo $schema;
    }
    
    /**
     * @param bool $output
     * @return string|void
     */
    public function certificateButton($output = false) {
        global $post;
        $identifier = $post->ID;
    
        $text = SettingsHelper::certificateLinkText();
        $showRevisions = SettingsHelper::showRevisions() ? 'true' : 'false';
        $debug = EnvironmentHelper::development() ? 'true' : 'false';
        $lastModified = \get_the_modified_date('c', $post->ID);
        
        $content = "\n" . '<w-certificate debug="' . $debug . '" shared-identifier="' . $identifier . '" render-without-button="true" show-revisions="' . $showRevisions . '" last-modified="' . $lastModified . '"></w-certificate>';
        $content.= "\n" . '<p><w-certificate-button shared-identifier="' . $identifier . '" icon="shield" shape="text" text="' . $text . '"></w-certificate-button></p>';
        $content.= "\n";
    
        if (!$output) {
            return $content;
        }
        
        // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        echo $content;
    }

    /**
     * Adds the certificate tag to the content before rendering it.
     *
     * @param $content
     * @return mixed|string Content string from 'the_content' filter
     * @filter the_content
     */
    public function certificateTag($content)
    {
        if (!CertificateHelper::show()) {
            return $content;
        }
    
        if (BlocksHelper::getContainsBlock(get_the_ID())) {
            return $content;
        }

        if (SettingsHelper::hideCertificateLink()) {
            return $content;
        }

        return $content . $this->certificateButton();
    }
}
