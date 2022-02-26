<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\AssetHelper;
use WordProof\SDK\Helpers\PostEditorHelper;
use WordProof\SDK\Translations\TranslationsInterface;

class PostEditorDataController
{
    /**
     * @var TranslationsInterface The translations objects,
     */
    private $translations;

    /**
     * PostEditorDataController constructor.
     *
     * @param TranslationsInterface $translations The implemented translations interface.
     */
    public function __construct(TranslationsInterface $translations)
    {
        $this->translations = $translations;
    }

    /**
     * Localizes the post edit scripts.
     *
     * @param string $hook The current page.
     */
    public function addScript($hook)
    {
        if (! PostEditorHelper::isPostEdit($hook)) {
            return;
        }

        $this->enqueueAndLocalizeScript();
    }

    /**
     * Localizes the elementor script.
     */
    public function addScriptForElementor()
    {
        $this->enqueueAndLocalizeScript();
    }

    /**
     * Enqueues and localizes data script.
     */
    private function enqueueAndLocalizeScript()
    {
        $data = PostEditorHelper::getPostEditorData($this->translations);

        AssetHelper::enqueue('data');
        AssetHelper::localize('data', 'wordproofSdk', $data);
    }
}
