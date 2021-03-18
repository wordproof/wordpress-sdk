<?php


namespace WordProof\Wordpress\HookProcessors;


class SettingsProcessor implements Processor
{
    public function __construct(array $settings)
    {
        add_action('plugins_loaded', [$this, 'init']);
    }
    
    public function init()
    {
        //
    }
}