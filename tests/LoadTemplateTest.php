<?php


namespace WordProof\Wordpress\Tests;


use WordProof\Wordpress\Support\Template;
use WordProof\Wordpress\WordProofTimestamp;

class LoadTemplateTest extends TestCase
{
    public function testFileLoadedSuccessfully()
    {
        $path = WordProofTimestamp::getRootDir();
        $path = $path . "/tests/testfiles/resources";
        
        Template::setOptions([
            'cache_path' => $path . '/cache/',
            'template_path' => $path . '/templates/',
            'store_cache' => false
        ]);
        
        $content = Template::render('about.html', [
            'title' => 'Home Page',
            'colors' => ['red','blue','green']
        ]);
        ray($content);
    }
}