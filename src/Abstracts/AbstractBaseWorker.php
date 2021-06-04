<?php

namespace WordProof\SDK\Abstracts;

use WordProof\SDK\Contracts\WorkerInterface;
use WordProof\SDK\Traits\ReceiveWordProofTimestampTrait;

abstract class AbstractBaseWorker implements WorkerInterface
{
    use ReceiveWordProofTimestampTrait;
}