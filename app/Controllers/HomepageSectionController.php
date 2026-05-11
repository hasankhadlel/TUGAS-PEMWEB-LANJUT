<?php
namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Models\HomepageSection; // Menambahkan use statement untuk model HomepageSection

class HomepageSectionController {
    public function getHomepageContent(Request $request, Response $response) {
        try {
            // Data ini saat ini hardcoded. Dalam implementasi nyata,
            // Anda akan mengambilnya dari database menggunakan model HomepageSection.
            // Contoh: $heroMainTitle = HomepageSection::getSectionContent('hero_main_title');
            // Contoh: $announcementText = HomepageSection::getSectionContent('announcement_text');
            // Contoh: $aboutP1 = HomepageSection::getSectionContent('about_p1');

            $data = [
                'heroMainTitle' => "Pengurus Komisariat<br>Pergerakan Mahasiswa Islam Indonesia<br>UIN Sunan Gunung Djati<br>Cabang Kota Bandung",
                'announcementText' => "Pengumuman Penting: Acara Dies Natalis akan dilaksanakan pada tanggal 10 Agustus 2025!",
                'aboutP1' => "Pergerakan Mahasiswa Islam Indonesia (PMII) Komisariat UIN Sunan Gunung Djati Bandung adalah organisasi kemahasiswaan Islam yang berlandaskan Ahlussunnah wal Jama'ah an-Nahdliyah. Kami berkomitmen untuk mencetak kader-kader Ulul Albab yang memiliki kedalaman spiritual, keluasan ilmu pengetahuan, dan kepedulian sosial yang tinggi."
            ];

            $response->json($data); // Metode ini harus mengirim JSON dan menghentikan eksekusi

        } catch (\Exception $e) {
            // Jika ada error PHP di sini, pastikan responsnya tetap JSON
            $response->json(['message' => 'Terjadi kesalahan server saat memuat konten beranda: ' . $e->getMessage()], 500);
        }
    }
}
