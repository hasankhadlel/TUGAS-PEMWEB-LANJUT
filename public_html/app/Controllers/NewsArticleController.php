<?php
namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;

class NewsArticleController {
    public function getApprovedNews(Request $request, Response $response) {
        try {
            $newsData = [
                [ 'id' => 1, 'title' => "PMII Sukses Gelar Webinar Nasional Hukum Progresif", 'category' => "Kegiatan", 'imageUrl' => "https://placehold.co/600x400/005c97/FFFFFF?text=Webinar+Hukum", 'description' => "Webinar membahas implementasi hukum progresif di Indonesia, dihadiri akademisi dan praktisi hukum.", 'date' => "2024-06-10", 'status' => "approved" ],
                [ 'id' => 2, 'title' => "Kader PMII Berpartisipasi dalam Aksi Bersih Lingkungan", 'category' => "Sosial", 'imageUrl' => "https://placehold.co/600x400/22c55e/FFFFFF?text=Aksi+Lingkungan", 'description' => "Puluhan kader PMII turun ke jalan membersihkan area sekitar kampus sebagai bentuk kepedulian lingkungan.", 'date' => "2024-06-05", 'status' => "approved" ],
                [ 'id' => 3, 'title' => "Artikel: Tantangan Demokrasi di Era Digital menurut PMII", 'category' => "Artikel", 'imageUrl' => "https://placehold.co/600x400/fdd835/004a7c?text=Demokrasi+Digital", 'description' => "Analisis mendalam mengenai bagaimana platform digital mempengaruhi partisipasi dan kualitas demokrasi di Indonesia.", 'date' => "2024-06-01", 'status' => "approved" ]
            ];

            $limit = $request->query('limit', 3);
            $status = $request->query('status', 'approved');

            $filteredNews = array_filter($newsData, function($item) use ($status) {
                return $item['status'] === $status;
            });

            usort($filteredNews, function($a, $b) {
                return strtotime($b['date']) - strtotime($a['date']);
            });

            $response->json(array_slice($filteredNews, 0, $limit));

        } catch (\Exception $e) {
            $response->json(['message' => 'Terjadi kesalahan server saat memuat berita: ' . $e->getMessage()], 500);
        }
    }
}
