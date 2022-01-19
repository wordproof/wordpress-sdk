<?php

namespace WordProof\SDK\Helpers;

class AuthenticationHelper
{
    public static function isValidWebhookRequest(\WP_REST_Request $request)
    {
        $hashedToken = hash('sha256', Options::accessToken());
        $hmac = hash_hmac('sha256', $request->get_body(), $hashedToken);
        
        return $request->get_header('signature') === $hmac;
    }
}
