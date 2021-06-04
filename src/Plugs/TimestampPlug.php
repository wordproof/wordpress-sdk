<?php

namespace WordProof\SDK\Plugs;

use WordProof\SDK\Requests\TimestampRequest;
use WordProof\SDK\Helpers\PostMeta;
use WordProofTimestamp\includes\Controller\SchemaController;

class TimestampPlug
{

    public function timestamp(int $postId)
    {
        $sourceId = get_option('wordproof_source_id');
        
        $data = TimestampRequest::fromPostId($postId);
        $this->post($postId, '/api/sources/' . $sourceId . '/timestamps', $data);
    }
    
    private function post(int $postId, string $endpoint, array $body = []) {
        $location = WORDPROOF_URL . $endpoint;
        $body = wp_json_encode($body);
        
        $accessToken = get_option('wordproof_access_token');
    
        $headers = [
            'Content-Type' => 'application/json',
            'Accept'       => 'application/json',
            'Authorization' => 'Bearer ' . $accessToken,
        ];
        
        $options = [
            'body'        => $body,
            'headers'     => $headers,
            'timeout'     => 60,
            'redirection' => 5,
            'blocking'    => true,
            'data_format' => 'body',
            'sslverify'   => false //TODO remove
        ];
    
        $request = wp_remote_post($location, $options);
    
        $status = wp_remote_retrieve_response_code($request);
        
        if ($status < 200 || $status >= 300) {
            return;
        }
        
        $response = json_decode(wp_remote_retrieve_body($request));
        
        PostMeta::set($postId, 'wordproof_hash_input', $response->hash_input);
        
        return $response;
    }
}