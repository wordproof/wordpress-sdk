<?php

namespace WordProof\SDK\Config;

class DefaultAppConfig implements AppConfigInterface
{
    public function getPartner()
    {
        return 'wordproof';
    }
    
    public function getEnvironment()
    {
        return 'production';
    }
}
