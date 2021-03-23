<?php


namespace WordProof\Wordpress;


use Exception;
use WordProof\Wordpress\HookProcessors\BulkProcessor;
use WordProof\Wordpress\HookProcessors\MetaBoxesProcessor;
use WordProof\Wordpress\HookProcessors\SettingsProcessor;
use WordProof\Wordpress\Vendor\Nyholm\Psr7\Request;
use WordProof\Wordpress\Vendor\WordProof\ApiClient\WordProofApi;

class WordProofTimestamp
{
    private $clientId;
    
    private $clientSecret;
    
    private $bulkProcessor;
    
    private $metaBoxesProcessor;
    
    private $settingsProcessor;
    
    private $client;
    
    public function __construct(int $clientId, string $clientSecret)
    {
        $this->clientId = $clientId;
        $this->clientSecret = str_replace('"','', str_replace("'","", $clientSecret));
        $this->client = new WordProofApi();
        
        $this->bulkProcessor = new BulkProcessor();
        $this->metaBoxesProcessor = new MetaBoxesProcessor();
        $this->settingsProcessor = new SettingsProcessor();
        
        $pluginsLoadedClosure = function () {
            $this->initAjaxHandlers();
        };
        $pluginsLoadedClosure->bindTo($this);
        add_action('plugins_loaded', $pluginsLoadedClosure);
    }
    
    private function initAjaxHandlers()
    {
        $webhookHandleClosure = function () {
            $this->webhookHandle();
        };
        $webhookHandleClosure->bindTo($this);
        add_action('wp_ajax_wordproof_webhook_handle', $webhookHandleClosure);
        add_action('wp_ajax_nopriv_wordproof_webhook_handle', $webhookHandleClosure);
    }
    
    public function withMetaBoxes(): self
    {
        $this->metaBoxesProcessor->init();
        return $this;
    }
    
    public function withBulk(): self
    {
        $this->bulkProcessor->init();
        return $this;
    }
    
    public function withSettings(array $settings): self
    {
        $this->settingsProcessor->setSettings($settings);
        $this->settingsProcessor->init();
        return $this;
    }

    private function webhookHandle()
    {
        $data = $_GET;
        do_action('wordproof_webhook_handle', $data);
    }
    
    public function authorizeRedirect()
    {
        $params = [
            'client_id' => $this->clientId,
            'redirect_uri' => $this->settingsProcessor->getSetting('redirect_uri'),
            'response_type' => $this->settingsProcessor->getSetting('response_type'),
            'scope' => $this->settingsProcessor->getSetting('scope'),
        ];
        
        $url = $this->settingsProcessor->getSetting('endpoint') . "/oauth/authorize?" . http_build_query($params);
        
        header("Location: " . $url);
        
        die();
    }
    
    public function exchangeCodeToToken($code)
    {
        $params = [
            'grant_type' => 'authorization_code',
            'client_id' => $this->clientId,
            'client_secret' => $this->clientSecret,
            'redirect_uri' => $this->settingsProcessor->getSetting('redirect_uri'),
            'code' => $code
        ];
    
        $url = $this->settingsProcessor->getSetting('endpoint') . "/oauth/token?" . http_build_query($params);
    
        try {
            $response = $this->client->sendRequest(new Request("POST", $url, [], http_build_query($params)));
            return json_decode($response->getBody()->getContents());
        } catch (Exception $exception) {
            // TODO: do something with exception
            throw $exception;
        }
    }
}