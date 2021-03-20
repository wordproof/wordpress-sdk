# Wordproof SDK for Wordpress

## Requirements

- PHP 7.4+

## Installation
```
composer require wordproof/wordpress-sdk
```

## Usage

```injectablephp
use WordProof\Wordpress\WordProofTimestamp;

$clientId = 123;
$clientSecret = "YOURCLIENTSECRET";

$wordproof = new WordProofTimestamp($clientId, $clientSecret);

$wordproof->authorizeRedirect();
```