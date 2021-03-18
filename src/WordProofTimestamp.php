<?php


namespace WordProof\Wordpress;


use WordProof\Wordpress\HookProcessors\BulkProcessor;
use WordProof\Wordpress\HookProcessors\MetaBoxesProcessor;
use WordProof\Wordpress\HookProcessors\SettingsProcessor;

class WordProofTimestamp
{
    private int $clientId;
    
    private string $clientSecret;
    
    private ?BulkProcessor $bulkProcessor = null;
    
    private ?MetaBoxesProcessor $metaBoxesProcessor = null;
    
    private ?SettingsProcessor $settingsProcessor = null;
    
    private Vendor\WordProof\ApiClient\WordProofApi $client;
    
    public function __construct(int $clientId, string $clientSecret)
    {
        $this->clientId = $clientId;
        $this->clientSecret = str_replace('"','', str_replace("'","", $clientSecret));
        $this->client = new Vendor\WordProof\ApiClient\WordProofApi();
    }
    
    public function withMetaBoxes(): self
    {
        $this->metaBoxesProcessor = new MetaBoxesProcessor();
        return $this;
    }
    
    public function withBulk(): self
    {
        $this->bulkProcessor = new BulkProcessor();
        return $this;
    }
    
    public function withSettings(array $settings): self
    {
        $this->settingsProcessor = new SettingsProcessor($settings);
        return $this;
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
    }
}