<?php
namespace App\Middleware;

use App\Core\Request;
use App\Core\Response;

class RoleMiddleware {
    public function handle(Request $request, Response $response, $next, $requiredRole) {
        // Logika otorisasi berdasarkan peran
        // Misalnya, ambil peran pengguna dari token/sesi
        // $userRole = $request->user()->role;
        // if ($userRole !== $requiredRole) {
        //     $response->json(['message' => 'Forbidden: Insufficient role'], 403);
        // }
        
        $next($request, $response);
    }
}
