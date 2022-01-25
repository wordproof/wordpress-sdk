<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\PostMetaHelper;
use WordProof\SDK\Helpers\SettingsHelper;
use WordProofSDK\includes\Controller\SchemaController;

class CertificateController
{
    /**
     * Add scripts and schema
     */
    public function head()
    {
        if (!$this->show()) {
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
     * Add certificate html tag
     */
    public function certificateTag($content)
    {
        if (!$this->show()) {
            return $content;
        }

        if (SettingsHelper::hideCertificateLink()) {
            return false;
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

    private function show()
    {
        if (!is_singular()) {
            return false;
        }

        if (!is_main_query()) {
            return false;
        }

        global $post;
        return apply_filters(
            'wordproof_timestamp_show_certificate',
            PostMetaHelper::has($post->ID, '_wordproof_schema'),
            $post
        );
    }
}
