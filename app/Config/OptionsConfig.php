<?php

namespace WordProof\SDK\Config;

class OptionsConfig extends Config
{
    /**
     * Returns an array with the settings config.
     *
     * @return array
     */
    protected static function values()
    {
        return [
            'source_id'    => [
                'escape'  => 'integer',
                'default' => null,
            ],
            'access_token' => [
                'escape'  => 'text_field',
                'default' => null,
            ],
            'settings'     => [
                'cast' => 'object',
                'options' => [
                    'certificate_link_text' => [
                        'escape'  => 'text_field',
                        'default' => __('View this content\'s Timestamp certificate', 'wordproof')
                    ],
                    'hide_certificate_link' => [
                        'escape'  => 'boolean',
                        'default' => false,
                    ],
                    'selected_post_types'   => [
                        'escape'  => 'text_field',
                        'default' => [],
                    ],
                    'show_revisions'        => [
                        'escape'  => 'boolean',
                        'default' => true,
                    ],
                    
                ]
            ]
        ];
    }
}