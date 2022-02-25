<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\AssetHelper;
use WordProof\SDK\Helpers\PostEditorHelper;

class PostEditorDataController
{
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
        $data = PostEditorHelper::getPostEditorData();

        AssetHelper::enqueue('data');
        AssetHelper::localize('data', 'wordproofSdk', $data);
    }
}
