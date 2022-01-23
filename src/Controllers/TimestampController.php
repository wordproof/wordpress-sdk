<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\AuthenticationHelper;
use WordProof\SDK\Helpers\ConfigHelper;
use WordProof\SDK\Helpers\OptionsHelper;
use WordProof\SDK\Helpers\TimestampHelper;
use WordProof\SDK\DataTransferObjects\TimestampData;
use WordProof\SDK\Helpers\PostMetaHelper;

class TimestampController
{
    public static function timestamp($postId)
    {
        $post = get_post(intval($postId));
        $data = TimestampData::fromPost($post);
    
        if (!TimestampHelper::shouldBeTimestamped($post, $data))
            return;
        
        return self::sendPostRequest($data);
    }
    
    public function timestampAfterPostRequest($postId, $post)
    {
        if (\defined('REST_REQUEST') && \REST_REQUEST)
            return;
    
        $data = TimestampData::fromPost($post);
    
        if (!TimestampHelper::shouldBeTimestamped($post, $data))
            return;
    
        $response = self::sendPostRequest($data);
        
        //Add notice for the classic editor.
        TimestampHelper::addNotice($response);
        
        return $response;
    }
    
    public function timestampAfterRestApiRequest($post)
    {
        $data = TimestampData::fromPost($post);
        
        if (!TimestampHelper::shouldBeTimestamped($post, $data))
            return;
        
        return self::sendPostRequest($data);
        
    }
    
    /**
     * @param array $data
     */
    private static function sendPostRequest($data)
    {
        $sourceId = OptionsHelper::sourceId();
    
        $response =  self::post($data['uid'], '/api/sources/' . $sourceId . '/timestamps', $data);
        
        if (!$response)
            AuthenticationHelper::logout();

        return $response;
    }
    
    /**
     * @param int $postId
     * @param string $endpoint
     * @param array $body
     * @return void
     */
    private static function post($postId, $endpoint, $body = [])
    {
        $location = ConfigHelper::url() . $endpoint;
        $body = wp_json_encode($body);
        
        $accessToken = OptionsHelper::accessToken();
        
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
            'sslverify'   => ConfigHelper::sslVerify()
        ];
    
        $request = wp_remote_post($location, $options);
        
        $status = wp_remote_retrieve_response_code($request);
        
        if ($status < 200 || $status >= 300) {
            return;
        }
        
        $response = json_decode(wp_remote_retrieve_body($request));
        
        $key = '_wordproof_hash_input_' . $response->hash;
        PostMetaHelper::update($postId, $key, json_decode($response->hash_input));
        
        return $response;
    }
}