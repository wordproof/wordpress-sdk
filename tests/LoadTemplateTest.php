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
        
        Template::setCachePath($path . '/cache/');
        Template::setTemplatePath($path . '/templates/');
        
        $content = Template::render('about.html', [
            'title' => 'Home Page',
            'colors' => ['red','blue','green']
        ]);
        ray($content);
    }
}