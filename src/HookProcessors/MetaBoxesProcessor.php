<?php


namespace WordProof\Wordpress\HookProcessors;


class MetaBoxesProcessor implements Processor
{
    public function __construct()
    {
        add_action('plugins_loaded', [$this, 'init']);
    }
    
    public function init()
    {
        //
    }
}