<?php

namespace WordProof\Wordpress\Abstracts;

abstract class AbstractEntity
{
    public function __construct($entityData = [])
    {
        foreach ($entityData as $entityDatumKey => $entityDatumValue) {
            $this->{$entityDatumKey} = $entityDatumValue;
        }
    }
}