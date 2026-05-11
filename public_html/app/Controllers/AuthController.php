<?php
namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Models\User;
use App\Services\AuthService;

class AuthController {
    public function login(Request $request, Response $response) {
        try {
            $credentials = $request->json();

            $username = $credentials['username'] ?? null;
            $password = $credentials['password'] ?? null;

            if (empty($username) || empty($password)) {
                $response->json(['message' => 'Username dan password harus diisi.'], 400);
            }

            $authService = new AuthService();
            $user = $authService->authenticate($username, $password);

            if ($user) {
                $authToken = bin2hex(random_bytes(16));

                $response->json([
                    'message' => 'Login berhasil!',
                    'user' => [
                        'username' => $user['username'],
                        'role' => $user['role']
                    ],
                    'authToken' => $authToken
                ], 200);
            } else {
                $response->json(['message' => 'Username atau password salah.'], 401);
            }

        } catch (\Exception $e) {
            error_log("Login Error: " . $e->getMessage());
            // Mengembalikan pesan error yang lebih spesifik untuk debugging
            $response->json(['message' => 'Terjadi kesalahan server saat login: ' . $e->getMessage()], 500);
        }
    }

    public function logout(Request $request, Response $response) {
        try {
            error_log("Pengguna berhasil logout (simulasi).");
            $response->json(['message' => 'Logout berhasil.'], 200);
        } catch (\Exception $e) {
            $response->json(['message' => 'Terjadi kesalahan server saat logout: ' . $e->getMessage()], 500);
        }
    }
}
