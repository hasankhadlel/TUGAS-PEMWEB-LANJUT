<?php
namespace App\Core;

class Database {
    private static $pdo;
    private static $instance = null;

    private function __construct() {
        $host = 'localhost';
        $db = 'pmii_uin_bandung';
        $user = 'root';
        $pass = '';
        $charset = 'utf8mb4';

        $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
        $options = [
            \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            \PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try {
            self::$pdo = new \PDO($dsn, $user, $pass, $options);
        } catch (\PDOException $e) {
            // Log the specific database connection error message
            error_log("Database Connection Error: " . $e->getMessage());
            // Re-throw the exception so it can be caught by the controller or higher up
            throw new \PDOException($e->getMessage(), (int)$e->getCode());
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public static function getConnection() {
        if (self::$pdo === null) {
            self::getInstance();
        }
        return self::$pdo;
    }
}
