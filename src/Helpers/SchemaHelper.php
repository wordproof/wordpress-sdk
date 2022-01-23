<?php

namespace WordProof\SDK\Helpers;

class SchemaHelper
{
    public static function getBlockchainTransaction($response)
    {
        $postId = $response->uid;
        $hashLink = RestApiHelper::getRestRoute('hashInput', [$postId, $response->hash]);

        return [
            '@type' => 'BlockchainTransaction',
            'identifier' => $response->transaction->transactionId,
            'hash' => $response->hash,
            'hashLink' => $hashLink,
            'recordedIn' => [
                '@type' => 'Blockchain',
                'name' => $response->transaction->blockchain
            ]
        ];
    }

    public static function getSchema($postId)
    {
        $transactions = PostMetaHelper::get($postId, '_wordproof_blockchain_transaction', false);
        $latest = array_pop($transactions);

        if (count($transactions) === 0) {
            return ['timestamp' => $latest];
        }

        return ['timestamp' => array_merge($latest, ['revisions' => array_reverse($transactions)])];
    }
}
