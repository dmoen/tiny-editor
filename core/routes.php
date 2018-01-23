<?php
use duncan3dc\Sessions\SessionInstance;
use Dmoen\ImageUpload;

$app->post('/create-db', function () use ($app) {
	$dbFile = dirname(__DIR__)."/db/content.sqlite";

	if(!file_exists($dbFile)) {
		mkdir(dirname(__DIR__)."/db");
		touch($dbFile);
	}

	return $app->redirect('/edit-me');

});

$app->post('/update', function () use ($app) {
	$session = new SessionInstance("tiny-editor");
	
	if(!$session->get("can-edit")) {
		$app->abort(401);
	}
});

$app->get('/edit-me', function () use ($app) {
	$phpassStrength = new \Phpass\Strength;

	$passwordEntropy = $phpassStrength->calculate(getenv('EDITOR_PASSWORD'));

	if($passwordEntropy < 36) {
		return $app['twig']->render('weak-credentials.twig');
	}

	$dbFile = dirname(__DIR__)."/db/content.sqlite";

	if(!file_exists($dbFile)) {
	    return $app['twig']->render('create-db.twig');
	}

	return $app['twig']->render('login.twig');
});

$app->post('/login', function () use ($app) {
	if($_POST['user'] !== getenv('EDITOR_USER') || $_POST['pass'] !== getenv('EDITOR_PASSWORD') ) {
		return $app['twig']->render('login-fail.twig');
	}

	$session = new SessionInstance("tiny-editor");
	$session->set("can-edit", true);

	return $app['twig']->render('login-success.twig');
});

$app->post('/upload-image', function () use ($app) {
	$maxFileSize = getenv('MAX_IMAGE_SIZE') ? getenv('MAX_IMAGE_SIZE') : '2048';

	try {
		(new ImageUpload('image_upload', $maxFileSize))->process();
	}
	catch (\Exception $ex) {
		$app->abort($ex->getCode());
	}
	

	return "true";
});