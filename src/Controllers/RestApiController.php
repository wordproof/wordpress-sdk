<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\PostMeta;
use WordProof\SDK\Helpers\Settings;
use WordProof\SDK\Support\Authentication;

class RestApiController
{
    
    const API_V1_NAMESPACE = 'wordproof/v1';
    
    public function init()
    {
        register_rest_route(self::API_V1_NAMESPACE, '/oauth/callback', [
            'methods'             => 'GET',
            'callback'            => [$this, 'oauthCallback'],
            'permission_callback' => function () {
                return true;
            }
        ]);
        
        register_rest_route(self::API_V1_NAMESPACE, '/webhook', [
            'methods'             => 'POST',
            'callback'            => [$this, 'webhook'],
            'permission_callback' => function () {
                return true;
            }
        ]);
        
        register_rest_route(self::API_V1_NAMESPACE, '/posts/(?P<id>\d+)/hashinput', [
            'methods'             => 'GET',
            'callback'            => [$this, 'hashInput'],
            'permission_callback' => [$this, 'canPublishPermission'],
        ]);
        
        register_rest_route(self::API_V1_NAMESPACE, '/settings', [
            'methods'             => 'GET',
            'callback'            => [$this, 'settings'],
            'permission_callback' => [$this, 'canPublishPermission'],
        ]);
        
        register_rest_route(self::API_V1_NAMESPACE, '/authentication', [
            'methods'             => 'GET',
            'callback'            => [$this, 'authentication'],
            'permission_callback' => [$this, 'canPublishPermission'],
        ]);
    }
    
    public function settings()
    {
        $data = Settings::get();
        $data->status = 200;
        
        return new \WP_REST_Response($data, $data->status);
    }
    
    public function authentication()
    {
        $data = [
            'is_authenticated' => Authentication::isAuthenticated(),
            'status'           => 200
        ];
        
        return new \WP_REST_Response((object)$data, $data['status']);
    }
    
    public function canPublishPermission()
    {
        return current_user_can('publish_posts') && current_user_can('publish_pages');
    }
    
    public function hashInput(\WP_REST_Request $request)
    {
        $data = $request->get_params();
        $postId = intval($data['id']);
        
        return get_post_meta($postId, 'wordproof_hash_input', true);
    }
    
    public function oauthCallback()
    {
        Authentication::token();
    }
    
    public function webhook(\WP_REST_Request $request)
    {
        if (!Authentication::isValidRequest($request))
            return null;
        
        $response = json_decode($request->get_body());
        
        /**
         * Handle webhooks with type and data
         */
        if (isset($response->type) && isset($response->data)) {
            switch ($response->type) {
                case 'source_settings':
                    return Settings::set($response->data);
                default:
                    break;
            }
        }
        
        /**
         * Handle timestamping webhooks without type
         */
        if (isset($response->uid) && isset($response->schema)) {
            $postId = intval($response->uid);
            $schema = $response->schema;
            PostMeta::set($postId, 'wordproof_schema', $schema);
        }
        
    }
    
}