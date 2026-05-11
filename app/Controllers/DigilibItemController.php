<?php
namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;

class DigilibItemController {
    public function getItems(Request $request, Response $response) {
        try {
            $data = [
                ['id' => 1, 'title' => 'Judul Buku 1', 'category' => 'Buku Referensi'],
                ['id' => 2, 'title' => 'Judul Prosiding Seminar', 'category' => 'Prosiding Seminar']
            ];
            $response->json($data);
        } catch (\Exception $e) {
            $response->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }
}
