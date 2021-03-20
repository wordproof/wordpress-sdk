<?php


namespace WordProof\Wordpress\HookProcessors;


interface Processor
{
    public function init();
    
    public function handle();
}