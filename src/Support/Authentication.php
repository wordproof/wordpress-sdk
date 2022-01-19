<?php

namespace WordProof\SDK\Support;

use WordProof\SDK\Helpers\Config;
use WordProof\SDK\Helpers\Options;
use WordProof\SDK\Helpers\SDK;
use WordProof\SDK\Helpers\TransientHelper;

class Authentication
{
    private static $callbackEndpoint = 'wordproof/v1/oauth/callback';
    
    public static function authorize($redirectUrl = null)
    {
        $state = wp_generate_password(40, false);
        $codeVerifier = wp_generate_password(128, false);
        $originalUrl = admin_url(sprintf(basename($_SERVER['REQUEST_URI'])));
    
        set_site_transient('wordproof_authorize_state', $state);
        set_site_transient('wordproof_authorize_code_verifier', $codeVerifier);
        set_site_transient('wordproof_authorize_current_url', $redirectUrl ?: $originalUrl);
        
        ray($state, $codeVerifier)->blue();
        
        $encoded = base64_encode(hash('sha256', $codeVerifier, true));
        $codeChallenge = strtr(rtrim($encoded, '='), '+/', '-_');
        
        $data = [
            'client_id'             => Config::client(),
            'redirect_uri'          => self::getCallbackUrl(),
            'response_type'         => 'code',
            'scope'                 => '',
            'state'                 => $state,
            'code_challenge'        => $codeChallenge,
            'code_challenge_method' => 'S256',
            'partner'               => SDK::getPartner(),
        ];
        
        self::redirect('/wordpress-sdk/authorize', $data);
    }
    
    public static function token()
    {
        $state = TransientHelper::getOnce('wordproof_authorize_state');
        $codeVerifier = TransientHelper::getOnce('wordproof_authorize_code_verifier');
        $originalUrl = TransientHelper::getOnce('wordproof_authorize_current_url');
        
        if (isset($_REQUEST['error']) && $_REQUEST['error'] === 'access_denied') {
            nocache_headers();
            return wp_safe_redirect($originalUrl);
        }
    
        ray($state, $codeVerifier, $_REQUEST['state'], $_REQUEST['code'])->blue();
    
        if (strlen($state) <= 0 || !isset($_REQUEST['state']) || !$state === $_REQUEST['state'] || !isset($_REQUEST['code'])) {
            throw new \Exception('WordProof: No state or code found');
        }
        
        $data = [
            'grant_type'    => 'authorization_code',
            'client_id'     => Config::client(),
            'redirect_uri'  => self::getCallbackUrl(),
            'code_verifier' => $codeVerifier,
            'code'          => $_REQUEST['code'],
        ];
        
        $response = json_decode(self::post('/api/wordpress-sdk/token', $data));

        if (isset($response->error) && $response->error === 'invalid_grant') {
            //TODO
        }

        if (!isset($response->access_token)) {
            throw new \Exception('No access token found');
        }

        $accessToken = sanitize_text_field($response->access_token);
        Options::setAccessToken($accessToken);

        $data = [
            'webhook_url'          => get_rest_url(null, 'wordproof/v1/webhook'),
            'url'                  => preg_replace('#^https?://#', '', get_site_url()),
            'available_post_types' => array_values(get_post_types(['public' => true]))
        ];

        $response = json_decode(self::post('/api/wordpress-sdk/source', $data, $accessToken));

        Options::setSourceId(intval($response->source_id));

        nocache_headers();
        return wp_safe_redirect($originalUrl);
    }
    
    private static function getCallbackUrl()
    {
        return get_rest_url(null, self::$callbackEndpoint);
    }
    
    public static function redirect($endpoint, $parameters)
    {
        $location = Config::url() . $endpoint . '?' . http_build_query($parameters);
        header("Location: " . $location);
    }
    
    private static function post($endpoint, $body, $bearerToken = null)
    {
        $location = Config::url() . $endpoint;
        $body = wp_json_encode($body);
        
        $headers = [
            'Content-Type' => 'application/json',
            'Accept'       => 'application/json'
        ];
        
        $headers = ($bearerToken) ? array_merge($headers, ['Authorization' => 'Bearer ' . $bearerToken]) : $headers;
        
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
        return wp_remote_retrieve_body($request);
    }
}