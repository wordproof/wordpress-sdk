<?php

namespace WordProof\SDK\Support;

use WordProof\SDK\Helpers\AdminHelper;
use WordProof\SDK\Helpers\EnvironmentHelper;
use WordProof\SDK\Helpers\OptionsHelper;
use WordProof\SDK\Helpers\RedirectHelper;
use WordProof\SDK\Helpers\SdkHelper;
use WordProof\SDK\Helpers\TransientHelper;

class Authentication
{
    private static $callbackEndpoint = 'wordproof/v1/oauth/callback';

    public static function authorize($redirectUrl = null)
    {
        $state = wp_generate_password(40, false);
        $codeVerifier = wp_generate_password(128, false);
        $originalUrl = AdminHelper::currentUrl();

        set_site_transient('wordproof_authorize_state', $state);
        set_site_transient('wordproof_authorize_code_verifier', $codeVerifier);
        set_site_transient('wordproof_authorize_current_url', $redirectUrl ?: $originalUrl);

        $encoded = base64_encode(hash('sha256', $codeVerifier, true));
        $codeChallenge = strtr(rtrim($encoded, '='), '+/', '-_');

        $data = [
            'client_id'             => EnvironmentHelper::client(),
            'redirect_uri'          => self::getCallbackUrl(),
            'response_type'         => 'code',
            'scope'                 => '',
            'state'                 => $state,
            'code_challenge'        => $codeChallenge,
            'code_challenge_method' => 'S256',
            'partner'               => SdkHelper::getPartner(),
        ];

        self::redirect('/wordpress-sdk/authorize', $data);
    }

    public static function token()
    {
        $state = TransientHelper::getOnce('wordproof_authorize_state');
        $codeVerifier = TransientHelper::getOnce('wordproof_authorize_code_verifier');
        $originalUrl = TransientHelper::getOnce('wordproof_authorize_current_url');

        // phpcs:ignore WordPress.Security.NonceVerification
        if (isset($_REQUEST['error']) && $_REQUEST['error'] === 'access_denied') {
            RedirectHelper::safe($originalUrl);
        }

        // phpcs:ignore WordPress.Security.NonceVerification
        if (strlen($state) <= 0 || !isset($_REQUEST['state']) || !$state === $_REQUEST['state'] || !isset($_REQUEST['code'])) {
            throw new \Exception('WordProof: No state or code found');
        }

        $data = [
            'grant_type'    => 'authorization_code',
            'client_id'     => EnvironmentHelper::client(),
            'redirect_uri'  => self::getCallbackUrl(),
            'code_verifier' => $codeVerifier,
            // phpcs:ignore WordPress.Security.NonceVerification
            'code'          => sanitize_text_field(wp_unslash($_REQUEST['code'])),
        ];

        $response = Api::post('/api/wordpress-sdk/token', $data);

        if (isset($response->error) && $response->error === 'invalid_grant') {
            //TODO
        }

        if (!isset($response->access_token)) {
            throw new \Exception('No access token found');
        }

        $accessToken = sanitize_text_field($response->access_token);
        OptionsHelper::setAccessToken($accessToken);

        $data = [
            'webhook_url'          => get_rest_url(null, 'wordproof/v1/webhook'),
            'url'                  => get_site_url(),
            'available_post_types' => array_values(get_post_types(['public' => true])),
            'partner'              => SdkHelper::getPartner()
        ];

        $response = Api::post('/api/wordpress-sdk/source', $data);

        OptionsHelper::setSourceId(intval($response->source_id));

        RedirectHelper::safe($originalUrl);
    }

    private static function getCallbackUrl()
    {
        return get_rest_url(null, self::$callbackEndpoint);
    }

    public static function redirect($endpoint, $parameters)
    {
        $location = EnvironmentHelper::url() . $endpoint . '?' . http_build_query($parameters);
        header("Location: " . $location);
    }
}
