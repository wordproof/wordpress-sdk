<?php

namespace WordProof\SDK\Processors;

use WordProof\SDK\Contracts\ProcessorInterface;

class SettingsProcessor implements ProcessorInterface
{
    private $settings = [
        'endpoint' => 'http://my.wordproof.com',
        'scope' => '*'
    ];
    
    public function __construct(array $settings = [])
    {
        if ($settings) $this->setSettings($settings);
    }
    
    public function init()
    {
        add_action('plugins_loaded', [$this, 'handle']);
    }
    
    public function getSetting($key)
    {
        return isset($this->settings[$key]) ? $this->settings[$key] : null;
    }
    
    public function setSettings($key, $value = null)
    {
        if (is_array($key)) {
            $this->settings = array_merge($this->settings, $key);
        } else {
            $this->settings[$key] = $value;
        }
    }
    
    public function handle()
    {
        // TODO: Implement handle() method.
    }
}