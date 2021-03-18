<?php


namespace WordProof\Wordpress\HookProcessors;


class SettingsProcessor implements Processor
{
    private array $settings = [
        'endpoint' => 'http://my.wordproof.com/',
        'scope' => ''
    ];
    
    public function __construct(array $settings)
    {
        $this->setSettings($settings);
        
        add_action('plugins_loaded', [$this, 'init']);
    }
    
    public function init()
    {
        //
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
}