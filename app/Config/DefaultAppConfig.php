<?php

namespace WordProof\SDK\Config;

class DefaultAppConfig implements AppConfigInterface
{
    public function get_partner()
    {
        return 'wordproof';
    }
    
    public function get_environment()
    {
        return 'production';
    }
}
