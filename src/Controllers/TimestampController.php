<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\Config;
use WordProof\SDK\Helpers\Timestamp;
use WordProof\SDK\Requests\TimestampRequest;
use WordProof\SDK\Helpers\PostMeta;

class TimestampController
{
    
    public function timestamp($postId)
    {
        $sourceId = get_option('wordproof_source_id');
        
        $data = TimestampRequest::fromPostId($postId);
        $this->post($postId, '/api/sources/' . $sourceId . '/timestamps', $data);
    }
    
    public function timestampAfterPostRequest($postId, $post)
    {
        if (\defined('REST_REQUEST') && \REST_REQUEST)
            return;
        
        if (!Timestamp::shouldBeTimestamped($post))
            return;
        
        ray('timestampAfterPostRequest');
        $this->timestamp($post->ID);
        
    }
    
    public function timestampAfterRestApiRequest($post)
    {
        if (!Timestamp::shouldBeTimestamped($post))
            return;
        
        ray('timestampAfterRestApiRequest');
        $this->timestamp($post->ID);
    }
    
    /**
     * @param int $postId
     * @param string $endpoint
     * @param array $body
     * @return mixed|void
     *
     * TODO: Move
     */
    private function post($postId, $endpoint, $body = [])
    {
        $location = Config::url() . $endpoint;
        $body = wp_json_encode($body);
        
        $accessToken = get_option('wordproof_access_token');
        
        $headers = [
            'Content-Type'  => 'application/json',
            'Accept'        => 'application/json',
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