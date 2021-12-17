<?php

namespace WordProof\SDK;

use WordProof\SDK\Controllers\RestApiController;
use WordProof\SDK\Controllers\AuthenticationController;
use WordProof\SDK\Controllers\CertificateController;
use WordProof\SDK\Controllers\TimestampController;
use WordProof\SDK\Support\Loader;

class WordPressSDK
{
    /**
     * @var Loader
     */
    private $loader;
    
    /**
     * WordProofSDK constructor.
     * @throws \Exception
     */
    public function __construct()
    {
        $this->loader = new Loader();
        
        if (!headers_sent() && !session_id())
            session_start();
        
        $this->constants();
        $this->authentication();
        $this->api();
        $this->timestamp();
        
        $this->loader->run();
    }
    
    private function constants()
    {
        define('WORDPROOF_URL', 'https://staging.wordproof.com');
        define('WORDPROOF_CLIENT', 77);
    }
    
    private function authentication()
    {
        $class = new AuthenticationController();
        
        $this->loader->add_action('wordproof_authenticate', $class, 'authenticate');
    
        //Add hidden admin page that redirects to the WordProof login page.
        $this->loader->add_action('admin_menu', $class, 'redirect_on_load_page');
        $this->loader->add_action('load-admin_page_wordproof-redirect-authenticate', $class, 'redirect_on_load');
    }
    
    private function api()
    {
        $class = new RestApiController();
        
        $this->loader->add_action('rest_api_init', $class, 'init');
    }
    
    private function timestamp()
    {
        $class = new TimestampController();
        
        $this->loader->add_action('wordproof_timestamp', $class, 'timestamp');
    }
    
    public function certificate()
    {
        $class = new CertificateController();
    
        ray('with certificate');
    
        $this->loader->add_action('wp_head', $class, 'head');
        $this->loader->add_filter('the_content', $class, 'certificateTag');
        
        return $this;
    }
}