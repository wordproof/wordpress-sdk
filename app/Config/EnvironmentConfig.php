<?php

namespace WordProof\SDK\Config;

class EnvironmentConfig extends Config
{
    /**
     * Returns an array with the environment config.
     *
     * @return array
     */
    protected static function values()
    {
        return [
            'development-ngrok' => [
                'url'    => 'https://mywordproof.eu.ngrok.io',
                'client' => 4
            ],
            'development' => [
                'url'    => 'https://myv2.test',
                'client' => 3,
                'file_overwrite' => 'https://wproof.test/wp-content/plugins/wordpress-seo/vendor/wordproof/wordpress-sdk/app/'
            ],
            'staging' => [
                'url'    => 'https://staging.wordproof.com',
                'client' => 78
            ],
            'production' => [
                'url'    => 'https://my.wordproof.com',
                'client' => 79
            ],
        ];
    }
}