<?php
require_once dirname(__DIR__).'/vendor/autoload.php';

use Dmoen\Bootstrap;
use Dotenv\Dotenv;
use Synfony\Component\HttpFoundation\Response;

if(getenv('DEBUG') === "true"){
  error_reporting(E_ALL);
  ini_set('display_errors', 'On');
}

ini_set('log_errors', TRUE);
ini_set('error_log', dirname(__DIR__, 1).'/error.log'); // Logging file
ini_set('log_errors_max_len', 1024);

// Override the default error handler behavior
set_exception_handler(function($exception) {
   error_log($exception);
});

$dotenv = new Dotenv(dirname(__DIR__, 1), 'config.env');
$dotenv->load();

$app = new Silex\Application();

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => dirname(__DIR__, 1).'/edit-me/views'
));


$app['debug'] = getenv('DEBUG') === 'true';


require "routes.php";

$app->run();