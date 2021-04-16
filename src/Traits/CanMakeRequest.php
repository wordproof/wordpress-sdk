<?php


namespace WordProof\Wordpress\Traits;


use Exception;
use Throwable;
use WordProof\Wordpress\Exceptions\ValidationException;
use WordProof\Wordpress\Vendor\Nyholm\Psr7\Request;
use WordProof\Wordpress\Vendor\WordProof\ApiClient\WordProofApi;

trait CanMakeRequest
{
    /**
     * @var array
     */
    private $headers;
    
    /**
     * @var WordProofApi
     */
    private $client;
    
    /**
     * @param string $token
     * @return self
     * @throws Throwable
     */
    public function authenticate($token = "")
    {
        if (!$token) {
            $oauthTokens = get_option('wordproof_oauth_tokens');
            if (!$oauthTokens) {
                throw new ValidationException("Token is not correct");
            }
            $token = $oauthTokens->access_token;
        }
        
        $this->headers = [
            'Authorization' => 'Bearer ' . $token
        ];
        
        return $this;
    }
    
    /**
     * @param string $method
     * @param string $url
     * @param array $data
     * @param array $headers
     * @return mixed
     * @throws Exception
     */
    public function send(string $method, string $url, $data = [], $headers = [])
    {
        if ($this->headers) {
            $headers = array_merge($this->headers, $headers);
        }
        
        try {
            $response = $this->client->sendRequest(new Request($method, $url, $headers, http_build_query($data)));
            return json_decode((string)$response->getBody());
        } catch (Exception $exception) {
            // TODO: do something with exception
            throw $exception;
        }
    }
}