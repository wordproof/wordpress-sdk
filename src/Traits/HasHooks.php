<?php


namespace WordProof\Wordpress\Traits;


use WordProof\Wordpress\WordProofTimestamp;

trait HasHooks
{
    public function registerHooks()
    {
        add_action('wordproof_tokens_received', [$this, 'handlerTokensReceived']);
        add_action('wordproof_got_source', [$this, 'handlerGotSource']);
    }
    
    public function handlerTokensReceived()
    {
        $source = $this->makeSource([
            'url'         => $this->settingsProcessor->getSetting('wordpress_domain'),
            'webhook_url' => $this->settingsProcessor->getSetting('wordpress_domain') . '/wp-admin/admin-ajax.php?action=wordproof_webhook_handle',
            'type'        => 'wordpress',
            'blockchain_key'  => 'eos_free',
        ]);
        
        do_action('wordproof_got_source', $source);
    }
    
    public function handlerGotSource($source)
    {
        $isAdded = update_option('wordproof_source', $source);
        
        if (!$isAdded) {
            $isAdded = get_option('wordproof_source') == $source;
        }
        
        if (!$isAdded) {
            include WordProofTimestamp::getRootDir() . "/resources/assets/source_error.php";
        } else {
            include WordProofTimestamp::getRootDir() . "/resources/assets/oauth_success.php";
        }
    }
}