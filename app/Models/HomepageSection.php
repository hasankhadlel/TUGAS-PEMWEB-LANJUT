<?php
namespace App\Models;

use App\Core\Database;

class HomepageSection {
    protected static $table = 'homepage_sections';

    public static function getSectionContent($sectionName) {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare("SELECT content FROM " . self::$table . " WHERE section_name = :section_name LIMIT 1");
        $stmt->bindValue(':section_name', $sectionName, \PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetchColumn();
    }
}
