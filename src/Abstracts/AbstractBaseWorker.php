<?php


namespace WordProof\Wordpress\Abstracts;


use WordProof\Wordpress\Contracts\WorkerInterface;
use WordProof\Wordpress\WordProofTimestamp;

abstract class AbstractBaseWorker implements WorkerInterface
{
    protected $wordProofTimestamp;
    
    public function __construct(WordProofTimestamp $wordProofTimestamp)
    {
        $this->wordProofTimestamp = $wordProofTimestamp;
    }
}