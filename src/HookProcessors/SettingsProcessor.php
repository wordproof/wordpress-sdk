<?php


namespace WordProof\Wordpress\HookProcessors;


class SettingsProcessor implements Processor
{
    private array $settings = [
        'endpoint' => 'http://my.wordproof.com/',
        'scope' => ''
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
        if (is_array($key))
            $this->settings = array_merge($this->settings, $key);
        
        $this->settings[$key] = $value;
    }
    
    public function handle()
    {
        // TODO: Implement handle() method.
    }
}