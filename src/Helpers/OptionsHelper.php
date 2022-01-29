<?php

namespace WordProof\SDK\Helpers;

use WordProof\SDK\Config\OptionsConfig;

class OptionsHelper
{
    private static $prefix = 'wordproof_';
    private static $optionKeys = ['access_token', 'source_id', 'settings'];
    
    /**
     * Sets site option while properly sanitizing the data.
     *
     * @param string $key The key to set.
     * @param mixed $value The value to save.
     * @return bool If update_option succeeded.
     */
    public static function set($key, $value)
    {
        if (self::optionContainsOptions($key)) {
    
            if (is_object($value)) {
                $value = (array)$value;
            }
            
            if (is_array($value)) {
                
                $values = [];
                
                foreach ($value as $optionKey => $optionValue) {
                    $optionConfig = self::getOptionFromConfig($key . '.options.' . $optionKey);
                    
                    if (!$optionConfig) {
                        continue;
                    }
                    
                    $sanitizedValue = SanitizeHelper::sanitize($optionValue, $optionConfig['escape']);
                    $values[$optionKey] = $sanitizedValue;
                }
                
                return update_site_option(self::$prefix . $key, $values);
            }
            
        } else {
            $option = self::getOptionFromConfig($key);
            $sanitizedValue = SanitizeHelper::sanitize($value, $option['escape']);
            
            return update_site_option(self::$prefix . $key, $sanitizedValue);
        }
    }
    
    public static function delete($key)
    {
        return delete_site_option(self::$prefix . $key);
    }
    
    public static function get($key)
    {
        $option = self::getOptionFromConfig($key);
        $value = get_site_option(self::$prefix . $key);
        
        return EscapeHelper::escape($value, $option['escape']);
    }
    
    public static function all()
    {
        foreach (self::$optionKeys as $key) {
            $options[$key] = self::get($key);
        }
        return (object)$options;
    }
    
    public static function reset()
    {
        foreach (self::$optionKeys as $key) {
            self::delete($key);
        }
    }
    
    public static function accessToken()
    {
        return self::get('access_token') ?: null;
    }
    
    public static function sourceId()
    {
        return self::get('source_id') ?: null;
    }
    
    public static function setAccessToken($value)
    {
        return self::set('access_token', $value);
    }
    
    public static function setSourceId($value)
    {
        return self::set('source_id', $value);
    }
    
    private static function getOptionFromConfig($key)
    {
        $option = OptionsConfig::get($key);
        
        if ($option && array_key_exists('escape', $option) && array_key_exists('default', $option)) {
            return $option;
        }
        
        return false;
    }
    
    private static function optionContainsOptions($key)
    {
        $option = OptionsConfig::get($key);
        
        return ($option && array_key_exists('options', $option));
    }
}
