# WordProof SDK for SDK

## Requirements

- PHP 7.1.3+

## Installation
```
composer require wordproof/wordpress-sdk
```

## Usage

```php

//Initialize during load
use WordProof\SDK\WordProofSDK;
new \WordProof\SDK\WordProofSDK();

//Authenticate on staging.wordproof.com
do_action('wordproof_authenticate');

//Timestamp a post
do_action('wordproof_timestamp', $postId);
```