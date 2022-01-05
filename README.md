# WordProof SDK for SDK

## Requirements

- PHP 7.1.3+

## Installation
```
composer require wordproof/wordpress-sdk
```

## Usage

```php
use WordProof\SDK\WordPressSDK;

add_action('init', 'init_sdk');

function init_sdk() {
    WordPressSDK('your-partner-slug', 'staging')->getInstance()->certificate()->initialize();
}

//Use in different parts of your application.
do_action('wordproof_authenticate');
do_action('wordproof_timestamp', $post);
```