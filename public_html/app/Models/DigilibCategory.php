<?php
namespace App\Models;

use App\Core\Database;

class DigilibCategory {
    protected static $table = 'digilib_categories';

    public static function getAll() {
        $pdo = Database::getConnection();
        $stmt = $pdo->query("SELECT * FROM " . self::$table . " ORDER BY name ASC");
        return $stmt->fetchAll();
    }
}
