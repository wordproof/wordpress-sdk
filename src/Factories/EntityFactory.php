<?php

namespace WordProof\SDK\Factories;

use WordProof\SDK\Abstracts\AbstractFactory;
use WordProof\SDK\Entities\Client;
use WordProof\SDK\Entities\Source;

class EntityFactory extends AbstractFactory
{
    /**
     * @param array $data
     * @return Source
     * @throws \Exception
     */
    public function source($data)
    {
        $url = $this->wordProofSDK->settings()->getSetting('endpoint') . "/api/sources";
        return new Source((array)$this->wordProofSDK->authenticate()->send("POST", $url, $data, ['Accept' => 'application/json',]));
    }
    
    /**
     * @param array $data
     * @return Client
     * @throws \Exception
     */
    public function client($data)
    {
        $url = $this->wordProofSDK->settings()->getSetting('endpoint') . "/oauth/clients";
        return new Client((array)$this->wordProofSDK->send("POST", $url, $data, ['Accept' => 'application/json',]));
    }
}