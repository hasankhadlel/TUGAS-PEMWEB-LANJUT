<?php
namespace App\Models;

use App\Core\Database;

class NewsArticle {
    protected static $table = 'news_articles';

    public static function getByStatusAndLimit($status, $limit) {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare("SELECT * FROM " . self::$table . " WHERE status = :status ORDER BY published_at DESC LIMIT :limit");
        $stmt->bindValue(':status', $status, \PDO::PARAM_STR);
        $stmt->bindValue(':limit', (int)$limit, \PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }
}
