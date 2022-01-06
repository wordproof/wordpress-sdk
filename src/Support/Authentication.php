<?php

namespace WordProof\SDK\Support;

use WordProof\SDK\Helpers\Config;
use WordProof\SDK\Helpers\SDK;
use WordProof\SDK\WordPressSDK;

class Authentication
{
    private static $callbackEndpoint = 'wordproof/v1/oauth/callback';
    
    public static function authorize($redirectUrl = null)
    {
        $state = wp_generate_password(40, false);
        $codeVerifier = wp_generate_password(128, false);
        $originalUrl = admin_url(sprintf(basename($_SERVER['REQUEST_URI'])));
        
        $_SESSION['wordproof_authorize_state'] = $state;
        $_SESSION['wordproof_authorize_code_verifier'] = $codeVerifier;
        $_SESSION['wordproof_authorize_current_url'] = $redirectUrl ?: admin_url(sprintf(basename($_SERVER['REQUEST_URI'])));
        
        ray($state, $codeVerifier, $originalUrl);
        
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
        $state = $_SESSION['wordproof_authorize_state'];
        $codeVerifier = $_SESSION['wordproof_authorize_code_verifier'];
        $originalUrl = $_SESSION['wordproof_authorize_current_url'];
        
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
        
        $accessToken = $response->access_token;
        update_option('wordproof_access_token', $accessToken);
        
        $data = [
            'webhook_url'          => get_rest_url(null, 'wordproof/v1/webhook'),
            'url'                  => preg_replace('#^https?://#', '', get_site_url()),
            'available_post_types' => array_values(get_post_types(['public' => true]))
        ];
        
        $response = json_decode(self::post('/api/wordpress-sdk/source', $data, $accessToken));
        
        update_option('wordproof_source_id', $response->source_id);
        
        nocache_headers();
        return wp_safe_redirect($originalUrl);
    }
    
    public static function isValidRequest(\WP_REST_Request $request)
    {
        $hashedToken = hash('sha256', get_option('wordproof_access_token'));
        $hmac = hash_hmac('sha256', $request->get_body(), $hashedToken);
        
        return $request->get_header('signature') === $hmac;
    }
    
    public static function isAuthenticated()
    {
        return (get_option('wordproof_access_token', false) && get_option('wordproof_source_id', false));
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
        $response = wp_remote_retrieve_body($request);
        return $response;
    }
}