<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Exceptions\ValidationException;
use WordProof\SDK\Helpers\OptionsHelper;

class IdentityController
{
    /**
     * Validate identity data
     *
     * @param array $data
     *
     * @return array
     * @throws ValidationException
     */
    public function validate($data) {
        if (!isset($data['first_name']) || !is_string($data['first_name'])) {
            throw new ValidationException("Invalid field 'first_name'");
        }

        if (!isset($data['last_name']) || !is_string($data['last_name'])) {
            throw new ValidationException("Invalid field 'last_name'");
        }

        if (!isset($data['source']) || !is_string($data['source'])) {
            throw new ValidationException("Invalid field 'source'");
        }

        if (
            isset($data['profile_picture'])
            && !filter_var($data['profile_picture'], FILTER_VALIDATE_URL)
        ) {
            throw new ValidationException("Invalid field 'profile_picture'");
        }

        return [
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'source' => $data['source'],
            'profile_picture' => $data['profile_picture'],
        ];
    }

    /**
     * Store identity data
     *
     * @param array $data
     *
     * @return bool
     * @throws ValidationException
     */
    public function store($data) {
        return OptionsHelper::set('identity', $this->validate($data));
    }
    
    /**
     * Delete the stored identity data
     *
     * @return mixed
     */
    public function delete() {
        return OptionsHelper::delete('identity');
    }
}
