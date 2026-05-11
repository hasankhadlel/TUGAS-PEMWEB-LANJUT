<?php
namespace App\Models;

use App\Core\Database;

class GalleryItem {
    protected static $table = 'gallery_items'; // Nama tabel di database

    public static function getByStatusAndLimit($status, $limit) {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare("SELECT * FROM " . self::$table . " WHERE status = :status ORDER BY id DESC LIMIT :limit");
        $stmt->bindValue(':status', $status, \PDO::PARAM_STR);
        $stmt->bindValue(':limit', (int)$limit, \PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    // Anda dapat menambahkan metode lain di sini, seperti:
    // public static function find($id) { ... }
    // public static function create($data) { ... }
    // public static function update($id, $data) { ... }
    // public static function delete($id) { ... }
}
