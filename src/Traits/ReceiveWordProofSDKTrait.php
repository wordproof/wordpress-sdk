<?php

namespace WordProof\SDK\Traits;

use WordProof\SDK\WordProofSDK;

trait ReceiveWordProofSDKTrait
{
    protected $wordProofSDK;

    public function __construct(WordProofSDK $wordProofSDK)
    {
        $this->wordProofSDK = $wordProofSDK;
    }
}