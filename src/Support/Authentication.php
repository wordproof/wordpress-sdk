<?php

namespace WordProof\SDK\Support;

class Authentication
{
    public static function authorize()
    {
        $state = wp_generate_password(40, false);
        $codeVerifier = wp_generate_password(128, false);
        
        $_SESSION['wordproof_authorize_state'] = $state;
        $_SESSION['wordproof_authorize_code_verifier'] = $codeVerifier;
        
        $encoded = base64_encode(hash('sha256', $codeVerifier, true));
        $codeChallenge = strtr(rtrim($encoded, '='), '+/', '-_');
        
        $data = [
            'client_id'             => WORDPROOF_CLIENT,
            'redirect_uri'          => self::getCallbackUrl(),
            'response_type'         => 'code',
            'scope'                 => '',
            'state'                 => $state,
            'code_challenge'        => $codeChallenge,
            'code_challenge_method' => 'S256',
        ];
        
        self::redirect('/wordpress-sdk/authorize', $data);
    }
    
    public static function token()
    {
        $state = $_SESSION['wordproof_authorize_state'];
        $codeVerifier = $_SESSION['wordproof_authorize_code_verifier'];
        
        if (strlen($state) <= 0 || !isset($_REQUEST['state']) || !$state === $_REQUEST['state'] || !isset($_REQUEST['code'])) {
            throw new \Exception('WordProof: No state or code found');
        }
        
        $data = [
            'grant_type'    => 'authorization_code',
            'client_id'     => WORDPROOF_CLIENT,
            'redirect_uri'  => self::getCallbackUrl(),
            'code_verifier' => $codeVerifier,
            'code'          => $_REQUEST['code'],
        ];
        
        $response =  json_decode(self::post('/api/wordpress-sdk/token', $data));
    
        update_option('wordproof_access_token', $response->access_token);
        
        //TODO get or create source
        
        //TODO save source
        
        //TODO show settings?
    }
    
    private static function getCallbackUrl()
    {
        return get_rest_url(null, 'wordproof/v1/oauth/callback');
    }
    
    private static function redirect($endpoint, $parameters)
    {
        $location = WORDPROOF_URL . $endpoint . '?' . http_build_query($parameters);
        header("Location: " . $location);
    }
    
    private static function post($endpoint, $parameters)
    {
        $location = WORDPROOF_URL . $endpoint;
        $body = wp_json_encode($parameters);
        
        $options = [
            'body'        => $body,
            'headers'     => [
                'Content-Type' => 'application/json',
                'Accept' => 'application/json'
            ],
            'timeout'     => 60,
            'redirection' => 5,
            'blocking'    => true,
            'data_format' => 'body',
            'sslverify' => false //TODO remove
        ];
        
        $response = wp_remote_post($location, $options);
        return $response['body'];
    }
}