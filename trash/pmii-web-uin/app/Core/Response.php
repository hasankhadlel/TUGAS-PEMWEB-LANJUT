<?php
namespace App\Core;

class Response {
    public function json($data, $statusCode = 200) {
        header('Content-Type: application/json');
        http_response_code($statusCode);
        echo json_encode($data);
        exit();
    }

    public function html($html, $statusCode = 200) {
        header('Content-Type: text/html');
        http_response_code($statusCode);
        echo $html;
        exit();
    }
}
