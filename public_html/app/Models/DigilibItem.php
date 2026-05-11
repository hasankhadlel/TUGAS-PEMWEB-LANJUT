<?php
namespace App\Models;

use App\Core\Database;

class DigilibItem {
    protected static $table = 'digilib_items';

    public static function getByCategory($category, $limit = null) {
        $pdo = Database::getConnection();
        $sql = "SELECT * FROM " . self::$table . " WHERE category = :category ORDER BY id DESC";
        if ($limit) {
            $sql .= " LIMIT :limit";
        }
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':category', $category, \PDO::PARAM_STR);
        if ($limit) {
            $stmt->bindValue(':limit', (int)$limit, \PDO::PARAM_INT);
        }
        $stmt->execute();
        return $stmt->fetchAll();
    }
}
