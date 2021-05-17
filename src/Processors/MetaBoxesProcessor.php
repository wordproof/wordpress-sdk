<?php

namespace WordProof\SDK\Processors;

use WordProof\SDK\Contracts\ProcessorInterface;

class MetaBoxesProcessor implements ProcessorInterface
{
    public function __construct()
    {

    }
    
    public function init()
    {
        add_action('plugins_loaded', [$this, 'handle']);
    }
    
    public function handle()
    {
        // TODO: Implement handle() method.
    }
}