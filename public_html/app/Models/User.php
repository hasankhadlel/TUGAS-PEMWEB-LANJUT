<?php
namespace App\Models;

use App\Core\Database;

class User {
    protected static $table = 'users';

    public static function findByUsername($username) {
        $pdo = Database::getConnection();
        // Mengubah 'username' menjadi 'nim_username' sesuai skema database Anda
        $stmt = $pdo->prepare("SELECT * FROM " . self::$table . " WHERE nim_username = :username LIMIT 1");
        $stmt->bindValue(':username', $username, \PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetch();
    }
}
