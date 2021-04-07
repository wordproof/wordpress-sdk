<?php


namespace WordProof\Wordpress\Processors;


interface Processor
{
    public function init();
    
    public function handle();
}