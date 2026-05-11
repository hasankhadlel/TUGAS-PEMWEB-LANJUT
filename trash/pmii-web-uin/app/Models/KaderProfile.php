<?php
namespace App\Models;

use App\Core\Database;

class KaderProfile {
    protected static $table = 'kader_profiles';

    public static function getByUserId($userId) {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare("SELECT * FROM " . self::$table . " WHERE user_id = :user_id LIMIT 1");
        $stmt->bindValue(':user_id', $userId, \PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch();
    }
}
