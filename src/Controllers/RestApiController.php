<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\Api;
use WordProof\SDK\Helpers\PostMeta;
use WordProof\SDK\Helpers\Schema;
use WordProof\SDK\Helpers\Settings;
use WordProof\SDK\Helpers\AuthenticationHelper;
use WordProof\SDK\Support\Authentication;

class RestApiController
{
    
    public function init()
    {
        register_rest_route(Api::getNamespace(), Api::endpoint('callback'), [
            'methods'             => 'GET',
            'callback'            => [$this, 'oauthCallback'],
            'permission_callback' => function () {
                return true;
            }
        ]);
        
        register_rest_route(Api::getNamespace(), Api::endpoint('webhook'), [
            'methods'             => 'POST',
            'callback'            => [$this, 'webhook'],
            'permission_callback' => function () {
                return true;
            }
        ]);
        
        register_rest_route(Api::getNamespace(), Api::endpoint('hashInput'), [
            'methods'             => 'GET',
            'callback'            => [$this, 'hashInput'],
            'permission_callback' => function () {
                return true;
            },
        ]);
        
        register_rest_route(Api::getNamespace(), Api::endpoint('settings'), [
            'methods'             => 'GET',
            'callback'            => [$this, 'settings'],
            'permission_callback' => [$this, 'canPublishPermission'],
        ]);
        
        register_rest_route(Api::getNamespace(), Api::endpoint('authentication'), [
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
        $data = (object)[
            'is_authenticated' => Authentication::isAuthenticated(),
            'status'           => 200
        ];
        
        return new \WP_REST_Response($data, $data->status);
    }
    
    public function canPublishPermission()
    {
        return current_user_can('publish_posts') && current_user_can('publish_pages');
    }
    
    public function hashInput(\WP_REST_Request $request)
    {
        $data = $request->get_params();
        
        $postId = intval($data['id']);
        $hash = sanitize_text_field($data['hash']);
        
        $hashInput = PostMeta::get($postId, '_wordproof_hash_input_' . $hash);
        
        return new \WP_REST_Response((object)$hashInput);
    }
    
    public function oauthCallback()
    {
        return Authentication::token();
    }
    
    public function webhook(\WP_REST_Request $request)
    {
        if (!AuthenticationHelper::isValidWebhookRequest($request))
            return null;
        
        $response = json_decode($request->get_body());
        
        /**
         * Handle webhooks with type and data
         */
        if (isset($response->type) && isset($response->data)) {
            switch ($response->type) {
                case 'source_settings':
                    return Settings::set($response->data);
                case 'logout':
                    return Authentication::logout();
                default:
                    break;
            }
        }
        
        /**
         * Handle timestamping webhooks without type
         */
        if (isset($response->uid) && isset($response->schema)) {
            $postId = intval($response->uid);
            
            $blockchainTransaction = Schema::getBlockchainTransaction($response);
            PostMeta::add($postId, '_wordproof_blockchain_transaction', $blockchainTransaction);
            
            $schema = Schema::getSchema($postId);
            PostMeta::update($postId, '_wordproof_schema', $schema);
        }
        
    }
    
}