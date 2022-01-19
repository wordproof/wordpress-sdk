<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\PostMeta;
use WordProof\SDK\Helpers\Settings;
use WordProofSDK\includes\Controller\SchemaController;

class CertificateController
{
    /**
     * Add scripts and schema
     */
    public function head()
    {
        if (!$this->show())
            return;
    
        global $post;
    
        $schema = "\n";
        $schema .= '<script type="module" src="https://unpkg.com/@wordproof/uikit/dist/uikit/uikit.esm.js"></script>';
        $schema .= "\n";
        $schema .= '<script nomodule src="https://unpkg.com/@wordproof/uikit/dist/uikit/uikit.js"></script>';
        $schema .= "\n";
        $schema .= '<script type="application/ld+json" class="' . esc_attr('wordproof-schema-graph') . '">';
        $schema .= json_encode(PostMeta::get($post->ID, '_wordproof_schema'), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $schema .= "</script>";
        $schema .= "\n";
    
        echo $schema;
    }
    
    /**
     * Add certificate html tag
     */
    public function certificateTag($content)
    {
        if (!$this->show())
            return $content;
        
        $text = Settings::certificateLinkText();
        $showRevisions = Settings::showRevisions();
    
        $content.= "\n" . "<w-certificate debug='true' show-revisions='" . $showRevisions . "'>";
        $content.= $text;
//        $content.= "\n" . "<w-certificate-button>" . $text . "</w-certificate-button>";
        $content.= "\n" . "</w-certificate>";
        $content.= "\n";
        
        return $content;
    }
    
    private function show()
    {
        if (!is_singular())
            return false;

        if (!is_main_query())
            return false;
        
        if (Settings::hideCertificateLink())
            return false;
    
        global $post;
        return apply_filters('wordproof_timestamp_show_certificate',
            PostMeta::has($post->ID, '_wordproof_schema'),
            $post
        );
    }

}