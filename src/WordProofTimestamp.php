<?php

namespace WordProof\SDK;

use Throwable;
use WordProof\SDK\Plugs\ApiPlug;
use WordProof\SDK\Plugs\AuthenticationPlug;
use WordProof\SDK\Plugs\CertificatePlug;
use WordProof\SDK\Plugs\TimestampPlug;
use WordProof\SDK\Support\Loader;

class WordProofTimestamp
{
    
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
    
        if (!headers_sent() && !session_id())
            session_start();
        
        $this->constants();
        $this->authentication();
        $this->api();
        $this->certificate();
        $this->timestamp();
        
        $this->loader->run();
    }
    
    public function constants()
    {
        define('WORDPROOF_URL', 'https://staging.wordproof.com');
        define('WORDPROOF_CLIENT', 77);
    }
    
    public function authentication()
    {
        $class = new AuthenticationPlug();
        
        $this->loader->add_action('wordproof_authenticate', $class, 'authenticate');
    }
    
    public function api()
    {
        $class = new ApiPlug();
        
        $this->loader->add_action('rest_api_init', $class, 'init');
    }
    
    public function certificate()
    {
        $class = new CertificatePlug();
        
        $this->loader->add_action('wp_head', $class, 'head');
        $this->loader->add_filter('the_content', $class, 'certificateTag');
    }
    
    public function timestamp()
    {
        $class = new TimestampPlug();
        
        $this->loader->add_action('wordproof_timestamp', $class, 'timestamp');
    }
    
    
}