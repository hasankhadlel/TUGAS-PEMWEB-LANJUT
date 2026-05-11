<?php
namespace App\Models;

use App\Core\Database;

class Rayon {
    protected static $table = 'rayons';

    public static function getAll() {
        $pdo = Database::getConnection();
        $stmt = $pdo->query("SELECT * FROM " . self::$table . " ORDER BY name ASC");
        return $stmt->fetchAll();
    }
}
