<?php


namespace WordProof\SDK\Tests;


use WordProof\SDK\Support\Template;
use WordProof\SDK\WordProofTimestamp;

class LoadTemplateTest extends TestCase
{
    public function testRenderedSuccessfully()
    {
        $path = WordProofTimestamp::getRootDir();
        $path = $path . "/tests/testfiles/resources";
        
        Template::setOptions([
            'cache_path' => $path . '/cache/',
            'template_path' => $path . '/templates/',
            'store_cache' => false
        ]);
        
        $content = Template::render('about.html', [
            'title' => 'Home Page'
        ]);
        
        $this->assertStringContainsString('Home Page', $content);
    }
}