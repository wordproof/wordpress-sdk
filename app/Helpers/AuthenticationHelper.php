<?php

namespace WordProof\SDK\Helpers;

class AuthenticationHelper
{
    /**
     * Removes all the options set by WordProof.
     *
     * @return void
     */
    public static function logout()
    {
        OptionsHelper::resetAuthentication();
        
        TransientHelper::getOnce('wordproof_v2_authenticate_with_token');
        TransientHelper::getOnce('wordproof_v2_get_existing_source');
    }

    /**
     * Returns if the user is authenticated.
     *
     * @return bool If the user is authenticated.
     */
    public static function isAuthenticated()
    {
        $options = OptionsHelper::all();
        return $options->access_token && $options->source_id;
    }
}
