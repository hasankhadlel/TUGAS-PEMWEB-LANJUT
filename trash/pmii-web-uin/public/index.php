<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../app/core/helpers.php';

use App\Core\Router;
use App\Core\Request;
use App\Core\Response;

$request = new Request();
$response = new Response();
$router = new Router();

require_once __DIR__ . '/../app/routes/api.php';

$router->dispatch($request, $response);

die("Dispatch router selesai, tapi tidak ada respons JSON yang dikirimkan oleh controller.");
?>