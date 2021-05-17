<?php

namespace WordProof\SDK;

use Throwable;
use WordProof\SDK\Factories\EntityFactory;
use WordProof\SDK\Processors\BulkProcessor;
use WordProof\SDK\Processors\MetaBoxesProcessor;
use WordProof\SDK\Processors\SettingsProcessor;
use WordProof\SDK\Support\Authentication;
use WordProof\SDK\Support\Loader;
use WordProof\SDK\Support\Webhook;
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
        ray('Hi!');
//        $this->client = new WordProofApi();
        $this->loader = new Loader();
    
        $this->authentication();
        $this->webhook();

//        Template::setCachePath(self::getRootDir() . "/resources/cache/");
//        Template::setTemplatePath(self::getRootDir() . "/resources/assets/templates/");

//        $this->bulkProcessor = new BulkProcessor();
//        $this->metaBoxesProcessor = new MetaBoxesProcessor();
//        $this->settingsProcessor = new SettingsProcessor();

//        $this->entityFactory = new EntityFactory($this);

//        $this->initWorkers();
        
        $this->loader->run();
    }
    
    public function authentication() {
        $class = new Authentication();
        
        $this->loader->add_action('wordproof_authenticate', $class, 'redirect');
    }
    
    public function webhook() {
        $class = new Webh();
        
        $this->loader->add_action('wordproof_webhook', $class, 'webhook');
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
     * @return void
     */
    public function initHooks()
    {
//        $this->add_action('plugins_loaded', 'initAjaxHandlers');
//        $this->add_action('admin_head', 'embedHeader');
//        $this->add_action('admin_footer', 'embedBody');
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
     * @return void
     * @throws Throwable
     */
    private function webhookHandle()
    {
        $data = $_GET;
        if ($data['code']) {
            $auth = $this->withSettings([
                'endpoint' => $this->settings()->getSetting('endpoint'),
                'redirect_uri' => $this->settings()->getSetting('wordpress_domain') . '/wp-admin/admin-ajax.php?action=wordproof_webhook_handle',
            ])->exchangeCodeToToken($data['code']);
            
            add_option('wordproof_oauth_tokens', $auth, '', 'yes');
            
            do_action('wordproof_tokens_received');
        }
    }
    
    /**
     * Redirect user to Wordproof for OAuth
     * @return void
     */
    public function login()
    {
        $this->withSettings([
            'endpoint' => $this->settings()->getSetting('endpoint'),
            'redirect_uri' => $this->settings()->getSetting('wordpress_domain') . '/wp-admin/admin-ajax.php?action=wordproof_webhook_handle',
            'response_type' => 'code',
            'scope' => ''
        ])->authorizeRedirect();
    }
    
    /**
     * @return void
     */
    public function authorizeRedirect()
    {
        $params = [
            'client_id' => $this->clientId,
            'redirect_uri' => $this->settings()->getSetting('redirect_uri'),
            'response_type' => $this->settings()->getSetting('response_type'),
            'scope' => $this->settings()->getSetting('scope'),
        ];
        
        $url = $this->settings()->getSetting('endpoint') . "/oauth/authorize?" . http_build_query($params);
        
        header("Location: " . $url);
        
        die();
    }
    
    /**
     * @param $code
     * @return mixed
     * @throws Throwable
     */
    public function exchangeCodeToToken($code)
    {
        $params = [
            'grant_type' => 'authorization_code',
            'client_id' => $this->clientId,
            'client_secret' => $this->clientSecret,
            'redirect_uri' => $this->settings()->getSetting('redirect_uri'),
            'code' => $code
        ];
    
        $url = $this->settings()->getSetting('endpoint') . "/oauth/token";
    
        return $this->send("POST", $url, $params);
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