<?php
namespace App\Models;

use App\Core\Database;

class Notification {
    protected static $table = 'notifications';

    public static function create($data) {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare("INSERT INTO " . self::$table . " (user_id, message, type, is_read) VALUES (:user_id, :message, :type, :is_read)");
        $stmt->execute($data);
        return $pdo->lastInsertId();
    }
}
