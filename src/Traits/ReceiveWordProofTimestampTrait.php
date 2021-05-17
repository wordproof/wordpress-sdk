<?php

namespace WordProof\SDK\Traits;

use WordProof\SDK\WordProofTimestamp;

trait ReceiveWordProofTimestampTrait
{
    protected $wordProofTimestamp;
    
    public function __construct(WordProofTimestamp $wordProofTimestamp)
    {
        $this->wordProofTimestamp = $wordProofTimestamp;
    }
}