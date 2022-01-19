<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\Config;
use WordProof\SDK\Helpers\Options;
use WordProof\SDK\Helpers\Timestamp;
use WordProof\SDK\DataTransferObjects\TimestampData;
use WordProof\SDK\Helpers\PostMeta;

class TimestampController
{
    public static function timestamp($postId)
    {
        $post = get_post($postId);
        $data = TimestampData::fromPost($postId);
    
        if (!Timestamp::shouldBeTimestamped($post, $data))
            return;
        
        return self::postTimestamp($data);
    }
    
    public function timestampAfterPostRequest($postId, $post)
    {
        if (\defined('REST_REQUEST') && \REST_REQUEST)
            return;
    
        $data = TimestampData::fromPost($post);
    
        if (!Timestamp::shouldBeTimestamped($post, $data))
            return;
    
        return self::postTimestamp($data);
    }
    
    public function timestampAfterRestApiRequest($post)
    {
        $data = TimestampData::fromPost($post);
        
        if (!Timestamp::shouldBeTimestamped($post, $data))
            return;
        
        return self::postTimestamp($data);
    }
    
    /**
     * @param array $data
     */
    private static function postTimestamp($data)
    {
        $sourceId = Options::sourceId();
        
        return self::post($data['uid'], '/api/sources/' . $sourceId . '/timestamps', $data);
    }
    
    
    /**
     * @param int $postId
     * @param string $endpoint
     * @param array $body
     * @return void
     *
     * TODO: Move
     */
    private static function post($postId, $endpoint, $body = [])
    {
        $location = Config::url() . $endpoint;
        $body = wp_json_encode($body);
        
        $accessToken = Options::accessToken();
        
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
            'sslverify'   => Config::sslVerify()
        ];
    
        $request = wp_remote_post($location, $options);
        
        $status = wp_remote_retrieve_response_code($request);
        
        if ($status < 200 || $status >= 300) {
            return;
        }
        
        $response = json_decode(wp_remote_retrieve_body($request));
        
        $key = '_wordproof_hash_input_' . $response->hash;
        PostMeta::update($postId, $key, json_decode($response->hash_input));
        
        return $response;
    }
}