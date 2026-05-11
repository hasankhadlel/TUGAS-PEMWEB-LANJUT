<?php
namespace App\Models;

use App\Core\Database;

class DigitalSignature {
    protected static $table = 'digital_signatures';

    public static function create($data) {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare("INSERT INTO " . self::$table . " (document_id, qr_code_path, signed_by, status) VALUES (:document_id, :qr_code_path, :signed_by, :status)");
        $stmt->execute($data);
        return $pdo->lastInsertId();
    }
}
