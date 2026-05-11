<?php
namespace App\Models;

use App\Core\Database;

class SystemActivityLog {
    protected static $table = 'system_activity_logs';

    public static function log($userId, $activity, $details = null) {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare("INSERT INTO " . self::$table . " (user_id, activity, details, timestamp) VALUES (:user_id, :activity, :details, NOW())");
        $stmt->bindValue(':user_id', $userId, \PDO::PARAM_INT);
        $stmt->bindValue(':activity', $activity, \PDO::PARAM_STR);
        $stmt->bindValue(':details', json_encode($details), \PDO::PARAM_STR);
        $stmt->execute();
    }
}
