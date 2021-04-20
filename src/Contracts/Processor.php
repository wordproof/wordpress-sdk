<?php


namespace WordProof\Wordpress\Contracts;


interface Processor
{
    public function init();
    
    public function handle();
}