# Wordproof SDK for SDK

## Requirements

- PHP 7.1.3+

## Installation
```
composer require wordproof/wordpress-sdk
```

## Usage

```php
use WordProof\SDK\WordProofTimestamp;

$wordproof = new WordProofTimestamp();
$wordproof->login();

do_action('wordproof_oauth_authenticate');
```