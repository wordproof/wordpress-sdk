<?php


namespace WordProof\Wordpress\Traits;


use WordProof\Wordpress\WordProofTimestamp;

trait ReceiveWordProofTimestampTrait
{
    protected $wordProofTimestamp;
    
    public function __construct(WordProofTimestamp $wordProofTimestamp)
    {
        $this->wordProofTimestamp = $wordProofTimestamp;
    }
}