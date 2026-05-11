<?php
namespace App\Models;

use App\Core\Database;

class ScientificWork {
    protected static $table = 'scientific_works';

    public static function getApprovedWorks($limit = null) {
        $pdo = Database::getConnection();
        $sql = "SELECT * FROM " . self::$table . " WHERE status = 'approved' ORDER BY published_date DESC";
        if ($limit) {
            $sql .= " LIMIT :limit";
        }
        $stmt = $pdo->prepare($sql);
        if ($limit) {
            $stmt->bindValue(':limit', (int)$limit, \PDO::PARAM_INT);
        }
        $stmt->execute();
        return $stmt->fetchAll();
    }
}
