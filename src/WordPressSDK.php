<?php

namespace WordProof\SDK;

use WordProof\SDK\Controllers\PostEditorController;
use WordProof\SDK\Controllers\RestApiController;
use WordProof\SDK\Controllers\AuthenticationController;
use WordProof\SDK\Controllers\CertificateController;
use WordProof\SDK\Controllers\SettingsController;
use WordProof\SDK\Controllers\TimestampController;
use WordProof\SDK\Support\Loader;

class WordPressSDK
{
    /**
     * Loader responsible for the WordPress hooks
     * @var Loader
     */
    private $loader;
    
    /**
     * The partner used for displaying custom auth pages
     * @var mixed|null
     */
    public $partner = null;
    
    /**
     * The environment being used. development|staging|production
     * @var mixed|string
     */
    public $environment = 'production';
    
    /**
     * @var null|WordPressSDK
     */
    private static $instance = null;
    
    /**
     * WordPressSDK constructor.
     * @throws \Exception
     */
    public function __construct($partner = null, $env = 'production')
    {
        if (!headers_sent() && !session_id())
            session_start();
    
        $this->loader = new Loader();
    
        $this->partner = $partner;
        
        if ($env)
            $this->environment = $env;
        
        $this->authentication();
        $this->api();
        $this->timestamp();
        $this->settings();
        $this->postEditor();
        
        ray('SDK: Constructed')->red();
        
        $this->loader->run();
    }
    
    public static function getInstance($partner = null, $env = null)
    {
        if (self::$instance == null)
            self::$instance = new WordPressSDK($partner, $env);
        
        return self::$instance;
    }
    
    private function authentication()
    {
        $class = new AuthenticationController();
        
        $this->loader->add_action('wordproof_authenticate', $class, 'authenticate');
    
        //Add hidden admin page that redirects to the WordProof login page.
        $this->loader->add_action('admin_menu', $class, 'addRedirectPage');
        $this->loader->add_action('admin_menu', $class, 'addSelfDestructPage');
        $this->loader->add_action('load-admin_page_wordproof-redirect-authenticate', $class, 'redirectOnLoad');
    }
    
    private function api()
    {
        $class = new RestApiController();
        
        $this->loader->add_action('rest_api_init', $class, 'init');
    }
    
    private function timestamp()
    {
        $class = new TimestampController();
    
        $this->loader->add_action( 'rest_after_insert_post', $class, 'timestampAfterRestApiRequest' );
        $this->loader->add_action( 'wp_insert_post', $class, 'timestampAfterPostRequest', \PHP_INT_MAX, 2 );
    
        $this->loader->add_action('wordproof_timestamp', $class, 'timestamp');
    }
    
    private function settings()
    {
        $class = new SettingsController();
        
        $this->loader->add_action('wordproof_settings', $class, 'redirect');
    
        //Add hidden admin page that redirects to the WordProof login page.
        $this->loader->add_action('admin_menu', $class, 'addRedirectPage');
        $this->loader->add_action('load-admin_page_wordproof-redirect-settings', $class, 'redirectOnLoad');
    
    }
    
    private function postEditor()
    {
        $class = new PostEditorController();
        
        $this->loader->add_action('admin_enqueue_scripts', $class, 'localizeScripts');
    }
    
    public function certificate()
    {
        $class = new CertificateController();
        
        $this->loader->add_action('wp_head', $class, 'head');
        $this->loader->add_filter('the_content', $class, 'certificateTag');
        
        return $this;
    }
}