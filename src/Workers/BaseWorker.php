<?php


namespace WordProof\Wordpress\Workers;


use WordProof\Wordpress\Contracts\Worker;
use WordProof\Wordpress\WordProofTimestamp;

abstract class BaseWorker implements Worker
{
    protected $wordProofTimestamp;
    
    public function __construct(WordProofTimestamp $wordProofTimestamp)
    {
        $this->wordProofTimestamp = $wordProofTimestamp;
    }
}