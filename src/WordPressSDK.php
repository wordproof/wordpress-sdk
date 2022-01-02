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
    
    private $loader;
    
    public $partner = null;
    
    private static $instance = null;
    
    
    /**
     * WordProofSDK constructor.
     * @throws \Exception
     */
    public function __construct($partner = null)
    {
        $this->loader = new Loader();
        
        if (!headers_sent() && !session_id())
            session_start();
        
        $this->partner = $partner;
        
        $this->constants();
        $this->authentication();
        $this->api();
        $this->timestamp();
        $this->settings();
        $this->postEditor();
        
        ray('SDK: Constructed')->red();
        
        $this->loader->run();
    }
    
    public static function getInstance($partner = null)
    {
        if (self::$instance == null)
            self::$instance = new WordPressSDK($partner);
        
        ray('returning instance');
        return self::$instance;
    }
    
    private function constants()
    {
        define('WORDPROOF_URL', 'https://myv2.test');
        define('WORDPROOF_CLIENT', 3);
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