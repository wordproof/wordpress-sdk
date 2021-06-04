<?php

namespace WordProof\SDK\Contracts;

interface ProcessorInterface
{
    public function init();
    
    public function handle();
}