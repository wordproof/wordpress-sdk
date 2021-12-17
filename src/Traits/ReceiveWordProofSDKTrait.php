<?php

namespace WordProof\SDK\Traits;

use WordProof\SDK\WordPressSDK;

trait ReceiveWordProofSDKTrait
{
    protected $wordProofSDK;

    public function __construct(WordPressSDK $wordProofSDK)
    {
        $this->wordProofSDK = $wordProofSDK;
    }
}