<?php
namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;

class ActivityController {
    public function getApprovedActivities(Request $request, Response $response) {
        try {
            $activitiesData = [
                [ 'id' => 1, 'title' => "Diskusi Rutin Fiqh Kontemporer", 'day' => "20", 'month' => "JUN", 'year' => "2024", 'time' => "14:00 - 16:00 WIB", 'location' => "Sekretariat PMII", 'description' => "Kajian mendalam isu-isu fiqh terkini dengan pendekatan kontekstual.", 'link' => "#", 'status' => "approved" ],
                [ 'id' => 2, 'title' => "Pelatihan Kepemimpinan Dasar (PKD) Batch 2", 'day' => "05", 'month' => "JUL", 'year' => "2024", 'time' => "08:00 - Selesai", 'location' => "Villa Sejahtera, Lembang", 'description' => "Program pembentukan karakter dan kepemimpinan bagi calon kader muda PMII.", 'link' => "#", 'status' => "approved" ]
            ];

            $limit = $request->query('limit', 2);
            $status = $request->query('status', 'approved');

            $filteredActivities = array_filter($activitiesData, function($item) use ($status) {
                return $item['status'] === $status;
            });

            usort($filteredActivities, function($a, $b) {
                $dateA = strtotime("{$a['year']}-{$a['month']}-{$a['day']}");
                $dateB = strtotime("{$b['year']}-{$b['month']}-{$b['day']}");
                return $dateA - $dateB;
            });

            $response->json(array_slice($filteredActivities, 0, $limit));

        } catch (\Exception $e) {
            $response->json(['message' => 'Terjadi kesalahan server saat memuat kegiatan: ' . $e->getMessage()], 500);
        }
    }
}
