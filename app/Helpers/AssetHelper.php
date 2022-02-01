<?php

namespace WordProof\SDK\Helpers;

use WordProof\SDK\Config\EnvironmentConfig;
use WordProof\SDK\Config\ScriptsConfig;

class AssetHelper
{
    private static $prefix = 'wordproof-';
    private static $filePath = 'app/';
    private static $buildPath = 'build/';
    
    public static function register($name)
    {
        $config = ScriptsConfig::get($name);
        
        if (!isset($config)) {
            return;
        }
        
        $arguments = self::getData($name, $config['dependencies']);
        return call_user_func_array('wp_register_script', $arguments);
    }
    
    public static function enqueue($name)
    {
        $config = ScriptsConfig::get($name);
        
        if (!isset($config)) {
            return;
        }
        
        $arguments = self::getData($name, $config['dependencies']);
        return call_user_func_array('wp_enqueue_script', $arguments);
    }
    
    private static function getData($name, $dependencies)
    {
        $path = self::getPathUrl($name);
        
        return [
            self::getHandle($name),
            $path,
            $dependencies,
            false,
            false
        ];
    }
    
    private static function getHandle($name)
    {
        return self::$prefix . $name;
    }
    
    private static function getPathUrl($handle)
    {
        if (EnvironmentHelper::development()) {
            $config = EnvironmentConfig::get(SdkHelper::getEnvironment());
            
            if (isset($config['file_overwrite'])) {
                $url = $config['file_overwrite'];
            }
        } else {
            $url = plugin_dir_url(WORDPROOF_WORDPRESS_SDK_FILE);
        }
        
        $base = StringHelper::lastReplace(self::$filePath, self::$buildPath, $url);
        return $base . $handle . '.js';
    }
}
