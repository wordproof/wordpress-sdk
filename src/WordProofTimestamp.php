<?php


namespace WordProof\Wordpress;


use Throwable;
use WordProof\Wordpress\Exceptions\ValidationException;
use WordProof\Wordpress\Processors\BulkProcessor;
use WordProof\Wordpress\Processors\MetaBoxesProcessor;
use WordProof\Wordpress\Processors\SettingsProcessor;
use WordProof\Wordpress\Traits\CanAddActions;
use WordProof\Wordpress\Traits\CanMakeRequest;
use WordProof\Wordpress\Traits\HasHooks;
use WordProof\Wordpress\Vendor\WordProof\ApiClient\WordProofApi;

class WordProofTimestamp
{
    use CanMakeRequest, HasHooks, CanAddActions;
    
    /**
     * @var int
     */
    private $clientId;
    
    /**
     * @var string|string[]
     */
    private $clientSecret;
    
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
     * WordProofTimestamp constructor.
     * @param int $clientId
     * @param string $clientSecret
     * @throws Throwable
     */
    public function __construct(int $clientId, string $clientSecret)
    {
        $this->clientId = $clientId;
        $this->clientSecret = str_replace('"','', str_replace("'","", $clientSecret));
        $this->client = new WordProofApi();
        
        $this->bulkProcessor = new BulkProcessor();
        $this->metaBoxesProcessor = new MetaBoxesProcessor();
        $this->settingsProcessor = new SettingsProcessor();
        
        $this->registerHooks();
        
        $this->setWordpressDomain();
        
        $this->add_action('plugins_loaded', 'initAjaxHandlers');
        
        $this->add_action('admin_head', 'embedHeader');
        $this->add_action('admin_footer', 'embedBody');
    }
    
    public static function getRootDir()
    {
        return realpath(__DIR__ . "/../");
    }
    
    private function setWordpressDomain()
    {
        $wordpressDomain = "";
        
        if (isset($_SERVER['REQUEST_SCHEME'])) {
            $wordpressDomain .= $_SERVER['REQUEST_SCHEME'];
        } else {
            $wordpressDomain .= "http";
        }
        
        $wordpressDomain .= "://";
    
        if (isset($_SERVER['HTTP_HOST'])) {
            $wordpressDomain .= $_SERVER['HTTP_HOST'];
        } else {
            if (isset($_SERVER['REQUEST_SCHEME'])) {
                $wordpressDomain .= $_SERVER['REQUEST_SCHEME'];
            } else {
                $wordpressDomain .= "localhost";
            }
        }
        
        if (!preg_match("|^http[s]?://([а-яА-Яa-zA-Z-0-9]+)(\.([а-яА-Яa-zA-Z-0-9]+\.?){1,4})$|", $wordpressDomain)) {
            throw new ValidationException("Wordpress domain can not be resolved from headers");
        }
        
        $this->withSettings([
            'wordpress_domain' => $wordpressDomain
        ]);
    }
    
    /**
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
    
    public function embedHeader()
    {
        $rootDir = self::getRootDir();
        include WordProofTimestamp::getRootDir() . "/resources/assets/embed_header.php";
    }
    
    public function embedBody()
    {
        $rootDir = self::getRootDir();
        include WordProofTimestamp::getRootDir() . "/resources/assets/embed_body.php";
    }
    
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
        $this->settingsProcessor->setSettings($settings);
        $this->settingsProcessor->init();
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
                'endpoint' => $this->settingsProcessor->getSetting('endpoint'),
                'redirect_uri' => $this->settingsProcessor->getSetting('wordpress_domain') . '/wp-admin/admin-ajax.php?action=wordproof_webhook_handle',
            ])->exchangeCodeToToken($data['code']);
            
            add_option('wordproof_oauth_tokens', $auth, '', 'yes');
            
            do_action('wordproof_tokens_received');
        }
    }
    
    /**
     * @return void
     */
    public function login()
    {
        $this->withSettings([
            'endpoint' => $this->settingsProcessor->getSetting('endpoint'),
            'redirect_uri' => $this->settingsProcessor->getSetting('wordpress_domain') . '/wp-admin/admin-ajax.php?action=wordproof_webhook_handle',
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
            'redirect_uri' => $this->settingsProcessor->getSetting('redirect_uri'),
            'response_type' => $this->settingsProcessor->getSetting('response_type'),
            'scope' => $this->settingsProcessor->getSetting('scope'),
        ];
        
        $url = $this->settingsProcessor->getSetting('endpoint') . "/oauth/authorize?" . http_build_query($params);
        
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
            'redirect_uri' => $this->settingsProcessor->getSetting('redirect_uri'),
            'code' => $code
        ];
    
        $url = $this->settingsProcessor->getSetting('endpoint') . "/oauth/token";
    
        return $this->send("POST", $url, $params);
    }
    
    /**
     * @param $data
     * @return mixed
     * @throws Throwable
     */
    public function makeSource($data)
    {
        $url = $this->settingsProcessor->getSetting('endpoint') . "/api/sources";
        return $this->authenticate()->send("POST", $url, $data, ['Accept' => 'application/json',]);
    }
    
    /**
     * @param $data
     * @return mixed
     * @throws Throwable
     */
    public function makeClient($data)
    {
        $url = $this->settingsProcessor->getSetting('endpoint') . "/oauth/clients";
        return $this->send("POST", $url, $data, ['Accept' => 'application/json',]);
    }
    
    private function settingsFormRedirect()
    {
        $source = get_option('wordproof_source');
        $url = $this->settingsProcessor->getSetting('endpoint') . "/sources/".$source->id."/settings";
        header("Location: $url");
        die();
    }
}