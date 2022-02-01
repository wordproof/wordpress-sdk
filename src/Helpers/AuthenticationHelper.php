<?php

namespace WordProof\SDK\Helpers;

class AuthenticationHelper
{
    /**
     * Validates if the webhook is valid and signed with the correct secret.
     *
     * @param \WP_REST_Request $request The Rest Request.
     * @return bool If the webhook can be accepted.
     */
    public static function isValidWebhookRequest(\WP_REST_Request $request)
    {
        $hashedToken = hash('sha256', OptionsHelper::accessToken());
        $hmac = hash_hmac('sha256', $request->get_body(), $hashedToken);

        return $request->get_header('signature') === $hmac;
    }
    
    /**
     * Removes all the options set by WordProof.
     */
    public static function logout()
    {
        return OptionsHelper::reset();
    }
    
    /**
     * Returns if the user is authenticated.
     *
     * @return bool If the user is authenticated.
     */
    public static function isAuthenticated()
    {
        $options = OptionsHelper::all();
        return $options->access_token && $options->source_id;
    }
}
