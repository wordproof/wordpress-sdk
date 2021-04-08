# Wordproof SDK for Wordpress

## Requirements

- PHP 7.4+

## Installation
```
composer require wordproof/wordpress-sdk
```

## Usage

```php
use WordProof\Wordpress\WordProofTimestamp;

$clientId = 123;
$clientSecret = "YOURCLIENTSECRET";

$wordproof = new WordProofTimestamp($clientId, $clientSecret);

$wordproof->login(); // redirect to Wordproof for getting OAuth token
```