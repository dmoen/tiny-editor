<?php
use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;
use \GuzzleHttp\Cookie\CookieJar;

class EditorSetupTest extends TestCase
{
    const URL = 'http://localhost:8000';

    private $client;

    private function addValidConfig()
    {
        copy(dirname(__DIR__).'/test.env', dirname(__DIR__, 2).'/config.env');        
    }

    private function addInsecureConfig()
    {
       copy(dirname(__DIR__).'/weak.credentials.env', dirname(__DIR__, 2).'/config.env');       
    }    

    private function createDatabase()
    {
        $dbFile = dirname(__DIR__, 2)."/db/content.sqlite";

        mkdir(dirname(__DIR__, 2)."/db");
        touch($dbFile);
    }

    private function removeDatabase()
    {
        @unlink(dirname(__DIR__, 2)."/db/content.sqlite");
        @rmdir(dirname(__DIR__, 2)."/db");
    }

    protected function setUp()
    {
        $this->addValidConfig();
        $this->createDatabase();
        $this->client = new Client();
    }    

    public function test_if_a_auth_isnt_secure_an_error_dialog_is_shown()
    {
        $this->addInsecureConfig();

        
        $response = $this->client->request('GET', self::URL.'/edit-me');

        $this->assertContains("Weak password", (string)$response->getBody());
    }

    public function test_if_no_db_exists_a_create_dialog_is_shown()
    {
        $this->removeDatabase();


        $response = $this->client->request('GET', self::URL.'/edit-me');

        $this->assertContains("A new database needs to be created", (string)$response->getBody());
    }


    public function test_a_database_can_be_created()
    {
        $this->removeDatabase();


        $response = $this->client->request('POST', self::URL.'/edit-me/create-db');

        $this->assertTrue(file_exists(dirname(__DIR__, 2)."/db/content.sqlite"));
    }

    public function test_a_user_without_valid_auth_cant_login()
    {

        $response = $this->client->request('POST', self::URL.'/edit-me/login');

        $this->assertContains("Login failed", (string)$response->getBody());
    }

    public function test_a_user_can_login()
    {

        $response = $this->client->request('GET', self::URL.'/edit-me');

        $this->assertContains("Login", (string)$response->getBody()); 

        $jar = new CookieJar;
        $response = $this->client->request('POST', self::URL.'/edit-me/login', [
            'cookies' => $jar,
            'form_params' => [
                'user' => 'dwSDdwdwdw222e2e',
                'pass' => 'wwFGdwdfefe43434334'
            ]
        ]);

        $this->assertEquals(1, $jar->count());

    }

    public function test_only_logged_in_users_can_edit_content()
    {

        copy(dirname(__DIR__).'/test-view.php', dirname(__DIR__, 2).'/views/test-view.php');

        $jar = new CookieJar;
        $response = $this->client->request('POST', self::URL.'/edit-me/login', [
            'cookies' => $jar,
            'form_params' => [
                'user' => 'dwSDdwdwdw222e2e',
                'pass' => 'wwFGdwdfefe43434334'
            ]
        ]);

        $response = $this->client->request('GET', self::URL.'/views/test-view.php', [
            'cookies' => $jar
        ]);

        $this->assertContains("Edit block", (string)$response->getBody());
    }  

    public function test_only_logged_in_users_can_update_content()
    {
        try{
            $response = $this->client->request('POST', self::URL.'/edit-me/update');
        }
        catch(\Exception $ex) {
            $this->assertEquals(401, $ex->getCode());
        }    
    }  

    protected function tearDown()
    {
        @unlink(dirname(__DIR__, 2).'/config.env');
        $this->removeDatabase();
    }    
}