<?php

namespace WordProof\SDK\Plugs;

use WordProofTimestamp\includes\Controller\SchemaController;

class CertificatePlug
{
    /**
     * Add scripts and schema
     */
    public function head()
    {
        if (!$this->allowed()) {
            return;
        }
        
        global $post;
        
        
    }
    
    /**
     * Add certificate html tag
     */
    public function certificateTag($content)
    {
        if (!$this->allowed()) {
            return $content;
        }
        
        
        
    }
    
    private function allowed(): bool
    {
        return is_singular && is_main_query();
    }
}