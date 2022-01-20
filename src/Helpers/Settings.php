<?php

namespace WordProof\SDK\Helpers;

class Settings
{
    private static $key = 'settings';
    
    public static function set($data)
    {
        return Options::set(self::$key, $data);
    }
    
    public static function get($setting = null, $default = null)
    {
        $settings = Options::get(self::$key);
        
        if ($setting) {
            if (isset($settings->$setting))
                return $settings->$setting;
            
            return $default;
        }
    
        return $settings;
    }
    
    public static function reset()
    {
        return Options::delete(self::$key);
    }
    
    public static function showRevisions()
    {
        return self::get('show_revisions', true);
    }
    
    public static function certificateLinkText()
    {
        return self::get('certificate_link_text', "View this content's Timestamp certificate");
    }
    
    public static function hideCertificateLink()
    {
        return self::get('hide_certificate_link', false);
    }
    
    public static function selectedPostTypes()
    {
        return self::get('selected_post_types', []);
    }
    
    public static function postTypeIsInSelectedPostTypes($postType)
    {
        $postTypes = self::selectedPostTypes();
        return in_array($postType, $postTypes);
    }
    
    
}