<?php

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;
use \GuzzleHttp\Cookie\CookieJar;

class ImageUploadTest extends TestCase
{

    const URL = 'http://localhost:8000';

    private function addValidConfig()
    {
        copy(dirname(__DIR__).'/test.env', dirname(__DIR__, 2).'/config.env');        
    }

    protected function setUp()
    {
        $this->client = new Client();
        $this->addValidConfig();
    }

    public function test_an_image_can_be_uploaded()
    {
      $response = $this->client->request('POST', self::URL.'/edit-me/upload-image', [
          'multipart' => [
              [
                'name'     => 'image_upload',
                'contents' => fopen(dirname(__DIR__).'/test-image.png', 'r'),
                'filename' => 'test-image.png'
              ]
          ]
      ]);

      $this->assertEquals(200, $response->getStatusCode());
      $this->assertTrue(file_exists(dirname(__DIR__, 2).'/uploads/'.date('Y-m-d').'/test-image.png'));
    }

    public function test_a_file_that_isnt_an_image_wont_upload() 
    {
      try{
        $response = $this->client->request('POST', self::URL.'/edit-me/upload-image', [
            'multipart' => [
                [
                  'name'     => 'image_upload',
                  'contents' => fopen(dirname(__DIR__).'/invalid-image.txt', 'r'),
                  'filename' => 'invalid-image.txt'
                ]
            ]
        ]);
      }
      catch(\Exception $ex) {
          $this->assertEquals(400, $ex->getCode());
      }       

      $this->assertFalse(file_exists(dirname(__DIR__, 2).'/uploads/'.date('Y-m-d').'/invalid-image.txt'));
    }

    public function test_a_too_large_image_wont_upload() 
    {
      copy(dirname(__DIR__).'/small.image.size.env', dirname(__DIR__, 2).'/config.env'); 

      try{
        $response = $this->client->request('POST', self::URL.'/edit-me/upload-image', [
            'multipart' => [
                [
                  'name'     => 'image_upload',
                  'contents' => fopen(dirname(__DIR__).'/test-image.png', 'r'),
                  'filename' => 'test-image.png'
                ]
            ]
        ]);
        $responseCode = $response->getStatusCode();
      }
      catch(\Exception $ex) {
          $responseCode = $ex->getCode();
      }       

      $this->assertEquals(413, $responseCode);
      $this->assertFalse(file_exists(dirname(__DIR__, 2).'/uploads/'.date('Y-m-d').'/invalid-image.txt'));
    }

    protected function tearDown()
    {
        @unlink(dirname(__DIR__, 2).'/uploads/'.date('Y-m-d').'/test-image.png');
        @unlink(dirname(__DIR__, 2).'/uploads/'.date('Y-m-d').'/invalid-image.txt');        
        @rmdir(dirname(__DIR__, 2).'/uploads/'.date('Y-m-d'));  
        @rmdir(dirname(__DIR__, 2).'/uploads');     
    }   
}