<?php

namespace WordProof\SDK\Helpers;

class AuthenticationHelper
{
    public static function isValidWebhookRequest(\WP_REST_Request $request)
    {
        $hashedToken = hash('sha256', OptionsHelper::accessToken());
        $hmac = hash_hmac('sha256', $request->get_body(), $hashedToken);

        return $request->get_header('signature') === $hmac;
    }

    public static function logout()
    {
        return OptionsHelper::reset();
    }

    public static function isAuthenticated()
    {
        $options = OptionsHelper::all();
        return $options->access_token && $options->source_id;
    }
}
