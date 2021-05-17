<?php

namespace WordProof\SDK;

use Throwable;
use WordProof\SDK\Factories\EntityFactory;
use WordProof\SDK\Plugs\ApiPlug;
use WordProof\SDK\Plugs\AuthenticationPlug;
use WordProof\SDK\Plugs\CertificatePlug;
use WordProof\SDK\Plugs\WebhookPlug;
use WordProof\SDK\Processors\BulkProcessor;
use WordProof\SDK\Processors\MetaBoxesProcessor;
use WordProof\SDK\Processors\SettingsProcessor;
use WordProof\SDK\Support\Loader;
use WordProof\SDK\Traits\CanAddActionsTrait;
use WordProof\SDK\Traits\CanMakeRequestTrait;
use WordProof\SDK\Vendor\WordProof\ApiClient\WordProofApi;
use WordProof\SDK\Workers\SourceWorker;

class WordProofTimestamp
{
    use CanMakeRequestTrait, CanAddActionsTrait;
    
    /**
     * @var BulkProcessor
     */
    private $bulkProcessor;
    
    /**
     * @var MetaBoxesProcessor
     */
    private $metaBoxesProcessor;
    
    /**
     * @var SettingsProcessor
     */
    private $settingsProcessor;
    
    /**
     * @var EntityFactory
     */
    private $entityFactory;
    
    /**
     * @var Loader
     */
    private $loader;
    
    /**
     * WordProofTimestamp constructor.
     * @throws Throwable
     */
    public function __construct()
    {
        $this->loader = new Loader();
    
        $this->constants();
        $this->authentication();
        $this->api();
        $this->webhook();
        $this->certificate();

        $this->loader->run();
    }
    
    public function constants() {
        define('WORDPROOF_URL', 'https://myv2.test');
        define('WORDPROOF_CLIENT', 3);
    }
    
    public function authentication() {
        $class = new AuthenticationPlug();

        $this->loader->add_action('wordproof_authenticate', $class, 'authenticate');
    }
    
    public function api() {
        $class = new ApiPlug();
        
        $this->loader->add_action('rest_api_init', $class, 'init');
    }
    
    public function webhook() {
        $class = new WebhookPlug();
        
        $this->loader->add_action('wordproof_webhook', $class, 'webhook');
    }
    
    
    public function certificate() {
        $class = new CertificatePlug();
    
        $this->loader->add_action('wp_head', $class, 'head');
        $this->loader->add_filter('the_content', $class, 'certificateTag');
    }
    
    
    /**
     * Initialize workers
     * @return void
     */
    public function initWorkers()
    {
        // TODO: make this elegant, save worker instance
        (new SourceWorker($this))->registerHooks();
    }

    /**
     * @return SettingsProcessor
     */
    public function settings()
    {
        return $this->settingsProcessor;
    }
    
    /**
     * @return MetaBoxesProcessor
     */
    public function metaBoxes()
    {
        return $this->metaBoxesProcessor;
    }
    
    /**
     * @return BulkProcessor
     */
    public function bulk()
    {
        return $this->bulkProcessor;
    }
    
    /**
     * Add SDK SDK handlers for external calls
     * @return void
     * @throws Throwable
     */
    private function initAjaxHandlers()
    {
        $this->add_action('wp_ajax_wordproof_webhook_handle', 'webhookHandle');
        $this->add_action('wp_ajax_nopriv_wordproof_webhook_handle', 'webhookHandle');
        
        $this->add_action('wp_ajax_wordproof_login', 'login');
        $this->add_action('wp_ajax_nopriv_wordproof_login', 'login');
    
        $this->add_action('wp_ajax_wordproof_settings_form', 'settingsFormRedirect');
        $this->add_action('wp_ajax_nopriv_wordproof_settings_form', 'settingsFormRedirect');
    }
    
//    /**
//     * Add rendered HTML to the <head> tag of the page
//     * @return void
//     */
//    public function embedHeader()
//    {
//        Template::render("embed_header.html", [
//            "endpoint" => $this->settings()->getSetting('endpoint'),
//            "assets_url" => plugin_dir_url(__DIR__) . "resources/assets/"
//        ]);
//    }
//
//    /**
//     * Add rendered HTML to the <body> tag of the page
//     * @return void
//     */
//    public function embedBody()
//    {
//        Template::render("embed_body.html");
//    }
    
    /**
     * @return $this
     */
    public function withMetaBoxes(): self
    {
        $this->metaBoxesProcessor->init();
        return $this;
    }
    
    /**
     * @return $this
     */
    public function withBulk(): self
    {
        $this->bulkProcessor->init();
        return $this;
    }
    
    /**
     * @param array $settings
     * @return $this
     */
    public function withSettings(array $settings): self
    {
        $this->settings()->setSettings($settings);
        $this->settings()->init();
        return $this;
    }

    
    /**
     * @return EntityFactory
     */
    public function make()
    {
        return $this->entityFactory;
    }
    
    private function settingsFormRedirect()
    {
        $source = get_option('wordproof_source');
        $url = $this->settings()->getSetting('endpoint') . "/sources/".$source->id."/settings";
        header("Location: $url");
        die();
    }
}