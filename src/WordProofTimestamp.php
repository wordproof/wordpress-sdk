<?php


namespace WordProof\Wordpress;


use WordProof\Wordpress\HookProcessors\BulkProcessor;
use WordProof\Wordpress\HookProcessors\MetaBoxesProcessor;
use WordProof\Wordpress\HookProcessors\SettingsProcessor;
use WordProof\Wordpress\Vendor\WordProof\ApiClient\WordProofApi;

class WordProofTimestamp
{
    private int $clientId;
    
    private string $clientSecret;
    
    private BulkProcessor $bulkProcessor;
    
    private MetaBoxesProcessor $metaBoxesProcessor;
    
    private SettingsProcessor $settingsProcessor;
    
    private WordProofApi $client;
    
    public function __construct(int $clientId, string $clientSecret)
    {
        $this->clientId = $clientId;
        $this->clientSecret = str_replace('"','', str_replace("'","", $clientSecret));
        $this->client = new WordProofApi();
        
        $this->bulkProcessor = new BulkProcessor();
        $this->metaBoxesProcessor = new MetaBoxesProcessor();
        $this->settingsProcessor = new SettingsProcessor();
        
        add_action('wp_ajax_nopriv_wordproof_webhook_handle', [$this, 'webhookHandle']);
        add_action('wp_ajax_nopriv_wordproof_authorize_redirect', [$this, 'authorizeRedirect']);
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
    
    public function webhookHandle()
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
}