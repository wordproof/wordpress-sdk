<?php

namespace WordProof\Wordpress\Factories;

use WordProof\Wordpress\Abstracts\AbstractFactory;
use WordProof\Wordpress\Entities\Client;
use WordProof\Wordpress\Entities\Source;

class EntityFactory extends AbstractFactory
{
    /**
     * @param array $data
     * @return Source
     * @throws \Throwable
     */
    public function source($data)
    {
        $url = $this->wordProofTimestamp->settings()->getSetting('endpoint') . "/api/sources";
        return new Source((array)$this->wordProofTimestamp->authenticate()->send("POST", $url, $data, ['Accept' => 'application/json',]));
    }
    
    /**
     * @param array $data
     * @return Client
     * @throws \Exception
     */
    public function client($data)
    {
        $url = $this->wordProofTimestamp->settings()->getSetting('endpoint') . "/oauth/clients";
        return new Client((array)$this->wordProofTimestamp->send("POST", $url, $data, ['Accept' => 'application/json',]));
    }
}