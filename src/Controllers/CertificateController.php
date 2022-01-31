<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\CertificateHelper;
use WordProof\SDK\Helpers\PostMetaHelper;
use WordProof\SDK\Helpers\SettingsHelper;
use WordProofSDK\includes\Controller\SchemaController;

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
        $schema .= '<script type="module" src="https://unpkg.com/@wordproof/uikit/dist/uikit/uikit.esm.js"></script>';
        $schema .= "\n";
        $schema .= '<script nomodule src="https://unpkg.com/@wordproof/uikit/dist/uikit/uikit.js"></script>';
        $schema .= "\n";
        $schema .= '<script type="application/ld+json" class="' . esc_attr('wordproof-schema-graph') . '">';
        $schema .= json_encode(PostMetaHelper::get($post->ID, '_wordproof_schema'), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $schema .= "</script>";
        $schema .= "\n";

        // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        echo $schema;
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

        if (SettingsHelper::hideCertificateLink()) {
            return $content;
        }
        
        global $post;
        $identifier = $post->ID;

        $text = SettingsHelper::certificateLinkText();
        $showRevisions = SettingsHelper::showRevisions() ? 'true' : 'false';

        $content.= "\n" . '<w-certificate shared-identifier="' . $identifier . '" render-without-button="true" show-revisions="' . $showRevisions . '"></w-certificate>';
        $content.= "\n" . '<p><w-certificate-button shared-identifier="' . $identifier . '" icon="shield" shape="text" text="' . $text . '"></w-certificate-button></p>';
        $content.= "\n";

        return $content;
    }
    

}
