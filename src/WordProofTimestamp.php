<?php


namespace WordProof\Wordpress;


use WordProof\Wordpress\HookProcessors\BulkProcessor;
use WordProof\Wordpress\HookProcessors\MetaBoxesProcessor;
use WordProof\Wordpress\HookProcessors\SettingsProcessor;

class WordProofTimestamp
{
    private ?BulkProcessor $bulkProcessor = null;
    
    private ?MetaBoxesProcessor $metaBoxesProcessor = null;
    
    private ?SettingsProcessor $settingsProcessor = null;
    
    public function __construct()
    {
        //
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
}