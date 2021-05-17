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
        
        self::redirect('oauth/authorize', $data);
    }
    
    public static function token()
    {
        ray($_REQUEST, $_SESSION)->green();
        
        $state = $_SESSION['wordproof_authorize_state'];
        $codeVerifier = $_SESSION['wordproof_authorize_code_verifier'];
        
        throw_unless(
            strlen($state) > 0 && isset($_REQUEST['state']) && $state === $_REQUEST['state'] && isset($_REQUEST['code']),
            \Exception::class
        );
        
        $data = [
            'grant_type'    => 'authorization_code',
            'client_id'     => WORDPROOF_CLIENT,
            'redirect_uri'  => self::getCallbackUrl(),
            'code_verifier' => $codeVerifier,
            'code'          => $_REQUEST['code'],
        ];
        
        $response =  self::post('oauth/token', $data);
        
        //TODO save access token
        
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
        ray('redirect ' . $location)->red();
        
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
            ],
            'timeout'     => 60,
            'redirection' => 5,
            'blocking'    => true,
            'data_format' => 'body',
        ];
        
        $response = wp_remote_post($location, $options);
        ray("RESPONSE", $response);
        return $response;
    }
}