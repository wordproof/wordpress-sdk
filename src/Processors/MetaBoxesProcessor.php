<?php


namespace WordProof\Wordpress\Processors;


use WordProof\Wordpress\Contracts\Processor;

class MetaBoxesProcessor implements Processor
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