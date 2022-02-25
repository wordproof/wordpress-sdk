<?php

namespace WordProof\SDK\Helpers;

class AuthenticationHelper
{
    /**
     * Removes all the options set by WordProof.
     */
    public static function logout()
    {
        OptionsHelper::reset();
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
