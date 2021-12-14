<?php

namespace WordProof\SDK\Abstracts;

use WordProof\SDK\Contracts\WorkerInterface;
use WordProof\SDK\Traits\ReceiveWordProofSDKTrait;

abstract class AbstractBaseWorker implements WorkerInterface
{
    use ReceiveWordProofSDKTrait;
}