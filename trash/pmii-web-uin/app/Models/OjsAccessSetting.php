<?php
namespace App\Models;

use App\Core\Database;

class OjsAccessSetting {
    protected static $table = 'ojs_access_settings';

    public static function getSetting($key) {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare("SELECT value FROM " . self::$table . " WHERE setting_key = :setting_key LIMIT 1");
        $stmt->bindValue(':setting_key', $key, \PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetchColumn();
    }
}
