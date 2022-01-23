<?php

namespace WordProof\SDK\Support;

use WordProof\SDK\Helpers\AuthenticationHelper;
use WordProof\SDK\Helpers\OptionsHelper;
use WordProof\SDK\Helpers\PostMetaHelper;

class Timestamp
{
    /**
     * @param array $data
     */
    public static function sendPostRequest($data)
    {
        $sourceId = OptionsHelper::sourceId();
        $endpoint = '/api/sources/' . $sourceId . '/timestamps';
        $response = Api::post($endpoint, $data);

        if (!$response || !isset($response->hash)) {
            return AuthenticationHelper::logout();
        }

        $key = '_wordproof_hash_input_' . $response->hash;
        PostMetaHelper::update($data['uid'], $key, json_decode($response->hash_input));

        return $response;
    }
}
