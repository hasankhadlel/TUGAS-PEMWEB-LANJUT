<?php
namespace App\Models;

use App\Core\Database;

class Announcement {
    protected static $table = 'announcements';

    public static function getLatest() {
        $pdo = Database::getConnection();
        $stmt = $pdo->query("SELECT * FROM " . self::$table . " ORDER BY created_at DESC LIMIT 1");
        return $stmt->fetch();
    }
}
