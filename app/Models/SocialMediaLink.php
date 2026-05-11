<?php
namespace App\Models;

use App\Core\Database;

class SocialMediaLink {
    protected static $table = 'social_media_links';

    public static function getAll() {
        $pdo = Database::getConnection();
        $stmt = $pdo->query("SELECT * FROM " . self::$table . " ORDER BY name ASC");
        return $stmt->fetchAll();
    }
}
