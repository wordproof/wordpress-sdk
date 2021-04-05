<?php


namespace WordProof\Wordpress\Traits;


use Exception;
use WordProof\Wordpress\Vendor\Nyholm\Psr7\Request;
use WordProof\Wordpress\Vendor\WordProof\ApiClient\WordProofApi;

trait CanMakeRequest
{
    /**
     * @var WordProofApi
     */
    private $client;
    
    /**
     * @param string $method
     * @param string $url
     * @param array $data
     * @return mixed
     * @throws Exception
     */
    public function send(string $method, string $url, $data = [])
    {
        try {
            $response = $this->client->sendRequest(new Request($method, $url, [], http_build_query($data)));
            return json_decode((string)$response->getBody());
        } catch (Exception $exception) {
            // TODO: do something with exception
            throw $exception;
        }
    }
}