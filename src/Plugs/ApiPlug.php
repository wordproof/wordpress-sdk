<?php

namespace WordProof\SDK\Plugs;

use WordProof\SDK\Helpers\PostMeta;
use WordProof\SDK\Support\Authentication;

class ApiPlug
{
    
    public function init()
    {
        register_rest_route('wordproof/v1', '/oauth/callback', [
            'methods'  => 'GET',
            'callback' => [$this, 'oauthCallback'],
            'permission_callback' => function () { return true; }
        ]);
        
        register_rest_route('wordproof/v1', '/webhook', [
            'methods'  => 'POST',
            'callback' => [$this, 'webhook'],
            'permission_callback' => function () { return true; }

        ]);
        
        register_rest_route('wordproof/v1', '/posts/(?P<id>\d+)/hashinput', [
            'methods'  => 'GET',
            'callback' => [$this, 'hashInput'],
            'permission_callback' => [$this, 'hashInputPermission'],
        ]);
    }
    
    public function hashInputPermission()
    {
       return current_user_can('publish_posts');
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
        if (Authentication::isValidRequest($request)) {
    
            $response = json_decode($request->get_body());
            $postId = intval($response->uid);
            $schema = $response->schema;

            PostMeta::set($postId, 'wordproof_schema', $schema);
        }
    }

}