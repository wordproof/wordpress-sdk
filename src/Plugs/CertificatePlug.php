<?php

namespace WordProof\SDK\Plugs;

use WordProof\SDK\Helpers\PostMeta;
use WordProofSDK\includes\Controller\SchemaController;

class CertificatePlug
{
    /**
     * Add scripts and schema
     */
    public function head()
    {
        if (!$this->show())
            return;
    
        global $post;
        
        $schema = "\n" . '<script type="application/ld+json" class="' . esc_attr('wordproof-schema-graph') . '">';
        $schema .= PostMeta::get($post->ID, 'wordproof_schema');
        $schema .= "</script>" . "\n";
        
        echo $schema;
    }
    
    /**
     * Add certificate html tag
     */
    public function certificateTag($content)
    {
        if (!$this->show())
            return $content;
        
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