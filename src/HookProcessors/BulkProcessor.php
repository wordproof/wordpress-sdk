<?php


namespace WordProof\Wordpress\HookProcessors;


class BulkProcessor implements Processor
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