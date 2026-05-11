<?php
namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;

class GalleryController {
    public function getApprovedGallery(Request $request, Response $response) {
        try {
            $galleryData = [
                [ 'id' => 1, 'imageUrl' => "https://placehold.co/400x400/005c97/FFFFFF?text=Galeri+1", 'caption' => "Momen Kebersamaan PKD Raya 2023", 'status' => "approved" ],
                [ 'id' => 2, 'imageUrl' => "https://placehold.co/400x400/fdd835/004a7c?text=Galeri+2", 'caption' => "Diskusi Mingguan di Basecamp", 'status' => "approved" ],
                [ 'id' => 3, 'imageUrl' => "https://placehold.co/400x400/22c55e/FFFFFF?text=Galeri+3", 'caption' => "Bakti Sosial Ramadhan 1445H", 'status' => "approved" ],
                [ 'id' => 4, 'imageUrl' => "https://placehold.co/400x400/dc2626/FFFFFF?text=Galeri+4", 'caption' => "Delegasi Konferensi Cabang", 'status' => "approved" ]
            ];

            $limit = $request->query('limit', 4);
            $status = $request->query('status', 'approved');

            $filteredGallery = array_filter($galleryData, function($item) use ($status) {
                return $item['status'] === $status;
            });

            $response->json(array_slice($filteredGallery, 0, $limit));

        } catch (\Exception $e) {
            $response->json(['message' => 'Terjadi kesalahan server saat memuat galeri: ' . $e->getMessage()], 500);
        }
    }
}
