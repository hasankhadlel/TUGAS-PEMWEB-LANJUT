<?php
namespace App\Middleware;

use App\Core\Request;
use App\Core\Response;

class AuthMiddleware {
    public function handle(Request $request, Response $response, $next) {
        // Logika otentikasi
        // Misalnya, periksa token di header Authorization
        // if (!$request->headers()['Authorization'] ?? false) {
        //     $response->json(['message' => 'Unauthorized'], 401);
        // }
        
        $next($request, $response);
    }
}
