<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\PostMeta;
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
        $schema .= '<script nomodule src="https://unpkg.com/@wordproof/uikit/dist//uikit/uikit.js"></script>';
        $schema .= "\n";
        $schema .= '<script type="application/ld+json" class="' . esc_attr('wordproof-schema-graph') . '">';
        $schema .= PostMeta::get($post->ID, 'wordproof_schema');
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
            return $content . "\n" . "<w-certificate></w-certificate>";
        
        return $content;
    
    }
    
    private function show()
    {
        if (!is_singular())
            return false;

        if (!is_main_query())
            return false;
    
        global $post;
        return PostMeta::has($post->ID, 'wordproof_schema');
    }

}