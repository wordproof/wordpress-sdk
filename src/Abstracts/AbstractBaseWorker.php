<?php


namespace WordProof\Wordpress\Abstracts;


use WordProof\Wordpress\Contracts\WorkerInterface;
use WordProof\Wordpress\Traits\ReceiveWordProofTimestampTrait;

abstract class AbstractBaseWorker implements WorkerInterface
{
    use ReceiveWordProofTimestampTrait;
}