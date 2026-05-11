<?php
namespace App\Services;

use App\Models\User;

class AuthService {
    public function authenticate($username, $password) {
        $user = User::findByUsername($username);
        if ($user && password_verify($password, $user['password'])) {
            return $user;
        }
        return false;
    }
}
