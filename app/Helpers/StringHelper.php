<?php

namespace WordProof\SDK\Helpers;

class StringHelper
{
    /**
     * Replace the last occurrence.
     *
     * @param string $search
     * @param string $replace
     * @param string $subject
     * @return string
     */
    public static function lastReplace($search, $replace, $subject)
    {
        $pos = strrpos($subject, $search);

        if ($pos !== false) {
            $subject = substr_replace($subject, $replace, $pos, strlen($search));
        }

        return $subject;
    }
}
