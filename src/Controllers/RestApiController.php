<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\RestApiHelper;
use WordProof\SDK\Helpers\PostMetaHelper;
use WordProof\SDK\Helpers\SchemaHelper;
use WordProof\SDK\Helpers\SettingsHelper;
use WordProof\SDK\Helpers\AuthenticationHelper;
use WordProof\SDK\Support\Authentication;

class RestApiController
{
    
    public function init()
    {
        register_rest_route(RestApiHelper::getNamespace(), RestApiHelper::endpoint('callback'), [
            'methods'             => 'GET',
            'callback'            => [$this, 'oauthCallback'],
            'permission_callback' => function () {
                return true;
            }
        ]);
        
        register_rest_route(RestApiHelper::getNamespace(), RestApiHelper::endpoint('webhook'), [
            'methods'             => 'POST',
            'callback'            => [$this, 'webhook'],
            'permission_callback' => function () {
                return true;
            }
        ]);
        
        register_rest_route(RestApiHelper::getNamespace(), RestApiHelper::endpoint('hashInput'), [
            'methods'             => 'GET',
            'callback'            => [$this, 'hashInput'],
            'permission_callback' => function () {
                return true;
            },
        ]);
        
        register_rest_route(RestApiHelper::getNamespace(), RestApiHelper::endpoint('timestamp'), [
            'methods'             => 'POST',
            'callback'            => [$this, 'timestamp'],
            'permission_callback' => [$this, 'canPublishPermission'],
        ]);
        
        register_rest_route(RestApiHelper::getNamespace(), RestApiHelper::endpoint('settings'), [
            'methods'             => 'GET',
            'callback'            => [$this, 'settings'],
            'permission_callback' => [$this, 'canPublishPermission'],
        ]);
        
        register_rest_route(RestApiHelper::getNamespace(), RestApiHelper::endpoint('authentication'), [
            'methods'             => 'GET',
            'callback'            => [$this, 'authentication'],
            'permission_callback' => [$this, 'canPublishPermission'],
        ]);
    }
    
    public function settings()
    {
        $data = SettingsHelper::get(null, (object)[]);
        $data->status = 200;
        
        return new \WP_REST_Response($data, $data->status);
    }
    
    public function authentication()
    {
        $data = (object)[
            'is_authenticated' => AuthenticationHelper::isAuthenticated(),
            'status'           => 200
        ];
        
        return new \WP_REST_Response($data, $data->status);
    }
    
    public function canPublishPermission()
    {
        return current_user_can('publish_posts') && current_user_can('publish_pages');
    }
    
    public function timestamp(\WP_REST_Request $request)
    {
        $data = $request->get_params();
        
        $postId = intval($data['id']);
        
        return TimestampController::timestamp($postId);
    }
    
    public function hashInput(\WP_REST_Request $request)
    {
        $data = $request->get_params();
        
        $postId = intval($data['id']);
        $hash = sanitize_text_field($data['hash']);
        
        $hashInput = PostMetaHelper::get($postId, '_wordproof_hash_input_' . $hash);
        
        return new \WP_REST_Response((object)$hashInput);
    }
    
    public function oauthCallback()
    {
        Authentication::token();
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
                    return SettingsHelper::set($response->data);
                case 'logout':
                    return AuthenticationHelper::logout();
                default:
                    break;
            }
        }
        
        /**
         * Handle timestamping webhooks without type
         */
        if (isset($response->uid) && isset($response->schema)) {
            $postId = intval($response->uid);
            
            $blockchainTransaction = SchemaHelper::getBlockchainTransaction($response);
            PostMetaHelper::add($postId, '_wordproof_blockchain_transaction', $blockchainTransaction);
            
            $schema = SchemaHelper::getSchema($postId);
            PostMetaHelper::update($postId, '_wordproof_schema', $schema);
        }
        
    }
    
}