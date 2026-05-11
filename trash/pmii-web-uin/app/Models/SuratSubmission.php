<?php
namespace App\Models;

use App\Core\Database;

class SuratSubmission {
    protected static $table = 'surat_submissions';

    public static function create($data) {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare("INSERT INTO " . self::$table . " (user_id, type, status, submission_date) VALUES (:user_id, :type, :status, :submission_date)");
        $stmt->execute($data);
        return $pdo->lastInsertId();
    }
}
