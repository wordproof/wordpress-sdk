<?php

namespace WordProof\SDK\Helpers;

class Settings
{
    private static $key = 'wordproof_settings';
    
    public static function set($data)
    {
        return update_option(self::$key, $data);
    }
    
    public static function get($setting = null)
    {
        $settings = get_option(self::$key);
        
        if ($setting)
            return $settings->$setting;
    
        return $settings;
    }
    
    public static function showRevisions()
    {
        return self::get('show_revisions') ?: true;
    }
    
    public static function certificateLinkText()
    {
        return self::get('certificate_link_text') ?: '';
    }
    
    public static function hideCertificateLink()
    {
        return self::get('hide_certificate_link') ?: false;
    }
    
    public static function selectedPostTypes()
    {
        return self::get('selected_post_types') ?: [];
    }
    
    public static function postTypeIsInSelectedPostTypes($postType)
    {
        $postTypes = self::selectedPostTypes();
        return in_array($postType, $postTypes);
    }
    
    
}