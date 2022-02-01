<?php

namespace WordProof\SDK\Config;

class ScriptsConfig extends Config
{
    /**
     * Returns an array with the environment config.
     *
     * @return array
     */
    protected static function values()
    {
        return [
            'index' => [
                'dependencies' => [],
            ],
            'post-meta-option' => [
                'dependencies' => ['wp-i18n', 'wp-element', 'wp-components', 'wp-editor', 'wp-edit-post', 'lodash'],
            ],
        ];
    }
}