<?php
require_once __DIR__.'/../vendor/autoload.php';

use Dmoen\Bootstrap;
use Dotenv\Dotenv;
use Synfony\Component\HttpFoundation\Response;

$dotenv = new Dotenv(dirname(__DIR__), 'config.env');
$dotenv->load();

if(getenv('DEBUG') === "true"){
	error_reporting(E_ALL);
	ini_set('display_errors', 'On');
}


$app = new Silex\Application();

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => dirname(__DIR__).'/edit-me/views',
));


$app['debug'] = getenv('DEBUG') === 'true';


require(dirname(__DIR__)."/core/routes.php");

$app->run();