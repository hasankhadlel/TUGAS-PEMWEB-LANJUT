<?php
namespace App\Middleware;

use App\Core\Request;
use App\Core\Response;

class LogActivityMiddleware {
    public function handle(Request $request, Response $response, $next) {
        $startTime = microtime(true);
        $next($request, $response);
        $endTime = microtime(true);
        $duration = round(($endTime - $startTime) * 1000, 2);
        error_log("Request " . $request->method() . " " . $request->uri() . " took " . $duration . "ms");
    }
}
