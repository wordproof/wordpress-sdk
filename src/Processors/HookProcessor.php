<?php

namespace WordProof\SDK\Processors;

use WordProof\SDK\Contracts\ProcessorInterface;

class HookProcessor implements ProcessorInterface
{
    
    public function __construct()
    {
        $this->init();
    }
    
    public function init()
    {
        add_action('wordproof_tokens_received', [$this, 'handlerTokensReceived']);
    }
    
    public function handle()
    {
        // TODO: Implement handle() method.
    }
    
    public function handlerTokensReceived()
    {
        echo file_get_contents(__DIR__ . "/../../assets/oauth_success.php");
    }
}