<?php


namespace WordProof\Wordpress\Contracts;


interface ProcessorInterface
{
    public function init();
    
    public function handle();
}