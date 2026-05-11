<?php
namespace App\Models;

use App\Core\Database;

class ActivityRegistration {
    protected static $table = 'activity_registrations';

    public static function create($data) {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare("INSERT INTO " . self::$table . " (activity_id, user_id, registration_date) VALUES (:activity_id, :user_id, :registration_date)");
        $stmt->execute($data);
        return $pdo->lastInsertId();
    }
}
