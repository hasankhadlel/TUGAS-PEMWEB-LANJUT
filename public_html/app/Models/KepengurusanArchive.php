<?php
namespace App\Models;

use App\Core\Database;

class KepengurusanArchive {
    protected static $table = 'kepengurusan_archives';

    public static function getAll() {
        $pdo = Database::getConnection();
        $stmt = $pdo->query("SELECT * FROM " . self::$table . " ORDER BY year DESC");
        return $stmt->fetchAll();
    }
}
