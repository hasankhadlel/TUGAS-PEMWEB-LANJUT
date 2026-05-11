CREATE DATABASE IF NOT EXISTS pmii_uin_bandung CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE pmii_uin_bandung;

CREATE TABLE IF NOT EXISTS `rayons` (
    `id` VARCHAR(255) PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL UNIQUE,
    `chairman` VARCHAR(255) NULL,
    `chairman_photo_url` TEXT NULL,
    `description` TEXT NULL,
    `contact_phone` VARCHAR(50) NULL,
    `email` VARCHAR(255) NULL,
    `address` TEXT NULL,
    `instagram_url` TEXT NULL,
    `facebook_url` TEXT NULL,
    `twitter_url` TEXT NULL,
    `youtube_url` TEXT NULL,
    `logo_url` TEXT NULL,
    `cadre_count` INT DEFAULT 0,
    `established_date` DATE NULL,
    `vision` TEXT NULL,
    `mission` TEXT NULL,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `users` (
    `id` VARCHAR(255) PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `nim_username` VARCHAR(255) UNIQUE NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('kader', 'rayon', 'komisariat') NOT NULL,
    `jabatan` VARCHAR(255) NULL,
    `rayon_id` VARCHAR(255) NULL,
    `klasifikasi` VARCHAR(255) NULL,
    `status_akun` ENUM('aktif', 'nonaktif', 'alumni') NOT NULL DEFAULT 'aktif',
    `last_login` DATETIME NULL,
    `profile_visibility` BOOLEAN NOT NULL DEFAULT TRUE,
    `notification_emails` BOOLEAN NOT NULL DEFAULT TRUE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `users`
ADD CONSTRAINT `fk_users_rayon_id` FOREIGN KEY (`rayon_id`) REFERENCES `rayons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `kaders_profile` (
    `user_id` VARCHAR(255) PRIMARY KEY,
    `nik` VARCHAR(255) UNIQUE NULL,
    `tempat_lahir` VARCHAR(255) NULL,
    `tanggal_lahir` DATE NULL,
    `jenis_kelamin` ENUM('Laki-laki', 'Perempuan') NULL,
    `alamat_lengkap` TEXT NULL,
    `provinsi` VARCHAR(255) NULL,
    `kota_kabupaten` VARCHAR(255) NULL,
    `kecamatan` VARCHAR(255) NULL,
    `desa_kelurahan` VARCHAR(255) NULL,
    `kampung_komplek_perumahan` VARCHAR(255) NULL,
    `rt` VARCHAR(10) NULL,
    `rw` VARCHAR(10) NULL,
    `no_hp` VARCHAR(50) NULL,
    `email_pribadi` VARCHAR(255) NULL,
    `universitas` VARCHAR(255) NULL,
    `fakultas` VARCHAR(255) NULL,
    `jurusan` VARCHAR(255) NULL,
    `tahun_masuk_kuliah` INT NULL,
    `status_mahasiswa` ENUM('Aktif', 'Lulus', 'Cuti', 'Nonaktif') NULL,
    `ipk` DECIMAL(3,2) NULL,
    `tahun_masuk_pmii` INT NULL,
    `riwayat_jabatan` TEXT NULL,
    `keahlian_minat` TEXT NULL,
    `media_sosial` JSON NULL,
    `karya_tulis_kontribusi` TEXT NULL,
    `profile_picture_url` TEXT NULL,
    `ipk_transcript_file_url` TEXT NULL,
    `ktp_file_url` TEXT NULL,
    `ktm_file_url` TEXT NULL,
    `sertifikat_kaderisasi_file_url` TEXT NULL,
    `last_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `kaders_profile`
ADD CONSTRAINT `fk_kaders_profile_user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` VARCHAR(255) NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `email_index` (`email`),
  INDEX `token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `surat_submissions` (
    `id` VARCHAR(255) PRIMARY KEY,
    `type` VARCHAR(255) NOT NULL,
    `applicant_user_id` VARCHAR(255) NOT NULL,
    `applicant_name` VARCHAR(255) NOT NULL,
    `applicant_role` ENUM('kader', 'rayon') NOT NULL,
    `applicant_rayon_id` VARCHAR(255) NULL,
    `submission_date` DATE NOT NULL,
    `status` ENUM('pending', 'acc', 'revisi', 'ditolak') NOT NULL DEFAULT 'pending',
    `admin_comment` TEXT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NULL,
    `target_destination` VARCHAR(255) NULL,
    `file_url` TEXT NULL,
    `file_database_pelantikan_url` TEXT NULL,
    `file_permohonan_rekomendasi_pelantikan_url` TEXT NULL,
    `file_lpj_kepengurusan_url` TEXT NULL,
    `file_berita_acara_rtar_url` TEXT NULL,
    `file_berita_acara_tim_formatur_url` TEXT NULL,
    `file_struktur_kepengurusan_url` TEXT NULL,
    `file_database_rtar_url` TEXT NULL,
    `file_permohonan_rekomendasi_rtar_url` TEXT NULL,
    `file_suket_mapaba_url` TEXT NULL,
    `file_hasil_screening_pkd_url` TEXT NULL,
    `file_rekomendasi_pkd_rayon_url` TEXT NULL,
    `verification_date` DATETIME NULL,
    `verified_by_user_id` VARCHAR(255) NULL,
    `last_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `surat_submissions`
ADD CONSTRAINT `fk_surat_applicant_user_id` FOREIGN KEY (`applicant_user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
ADD CONSTRAINT `fk_surat_applicant_rayon_id` FOREIGN KEY (`applicant_rayon_id`) REFERENCES `rayons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT `fk_surat_verified_by_user_id` FOREIGN KEY (`verified_by_user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `news_articles` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `category` VARCHAR(50) NOT NULL,
    `image_url` TEXT NULL,
    `description` TEXT NOT NULL,
    `publication_date` DATE NOT NULL,
    `submitted_by_user_id` VARCHAR(255) NULL,
    `submitted_by_rayon_id` VARCHAR(255) NULL,
    `status` ENUM('draft', 'pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    `last_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `news_articles`
ADD CONSTRAINT `fk_news_submitted_by_user` FOREIGN KEY (`submitted_by_user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT `fk_news_submitted_by_rayon` FOREIGN KEY (`submitted_by_rayon_id`) REFERENCES `rayons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `activities` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `activity_date` DATE NOT NULL,
    `activity_time` VARCHAR(50) NULL,
    `location` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `image_url` TEXT NULL,
    `registration_enabled` BOOLEAN NOT NULL DEFAULT FALSE,
    `submitted_by_user_id` VARCHAR(255) NULL,
    `submitted_by_rayon_id` VARCHAR(255) NULL,
    `status` ENUM('pending', 'approved', 'rejected', 'terlaksana', 'mendatang', 'dibatalkan') NOT NULL DEFAULT 'pending',
    `external_link` TEXT NULL,
    `last_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `activities`
ADD CONSTRAINT `fk_activities_submitted_by_user` FOREIGN KEY (`submitted_by_user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT `fk_activities_submitted_by_rayon` FOREIGN KEY (`submitted_by_rayon_id`) REFERENCES `rayons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `activity_registrations` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `activity_id` INT NOT NULL,
    `registrant_name` VARCHAR(255) NOT NULL,
    `registrant_email` VARCHAR(255) NULL,
    `registrant_phone` VARCHAR(50) NULL,
    `registrant_type` ENUM('Kader', 'Umum') NOT NULL,
    `registered_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `registrant_user_id` VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `activity_registrations`
ADD CONSTRAINT `fk_registrations_activity_id` FOREIGN KEY (`activity_id`) REFERENCES `activities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `fk_registrations_registrant_user_id` FOREIGN KEY (`registrant_user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `gallery_items` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `caption` VARCHAR(255) NULL,
    `image_url` TEXT NOT NULL,
    `upload_date` DATE NOT NULL,
    `related_activity_id` INT NULL,
    `submitted_by_user_id` VARCHAR(255) NULL,
    `submitted_by_rayon_id` VARCHAR(255) NULL,
    `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    `last_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `gallery_items`
ADD CONSTRAINT `fk_gallery_related_activity_id` FOREIGN KEY (`related_activity_id`) REFERENCES `activities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT `fk_gallery_submitted_by_user` FOREIGN KEY (`submitted_by_user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT `fk_gallery_submitted_by_rayon` FOREIGN KEY (`submitted_by_rayon_id`) REFERENCES `rayons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `site_settings` (
    `setting_key` VARCHAR(255) PRIMARY KEY,
    `setting_value` TEXT NULL,
    `last_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `homepage_sections` (
    `section_name` VARCHAR(50) PRIMARY KEY,
    `content_json` JSON NULL,
    `last_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `announcements` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `text_content` TEXT NOT NULL,
    `target_url` TEXT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
    `published_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `last_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `social_media_links` (
    `platform` VARCHAR(50) PRIMARY KEY,
    `url` TEXT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
    `last_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `notifications` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `type` VARCHAR(50) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `target_role` VARCHAR(50) NOT NULL,
    `target_user_id` VARCHAR(255) NULL,
    `target_rayon_id` VARCHAR(255) NULL,
    `sender_user_id` VARCHAR(255) NOT NULL,
    `sender_role` VARCHAR(50) NOT NULL,
    `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `notifications`
ADD CONSTRAINT `fk_notifications_target_user` FOREIGN KEY (`target_user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT `fk_notifications_target_rayon` FOREIGN KEY (`target_rayon_id`) REFERENCES `rayons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT `fk_notifications_sender_user` FOREIGN KEY (`sender_user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `system_activity_logs` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `activity_type` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `user_id` VARCHAR(255) NULL,
    `user_name` VARCHAR(255) NULL,
    `user_role` VARCHAR(50) NULL,
    `target_id` VARCHAR(255) NULL,
    `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `ip_address` VARCHAR(45) NULL,
    `details` JSON NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `system_activity_logs`
ADD CONSTRAINT `fk_logs_user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `digital_signatures` (
    `id` VARCHAR(255) PRIMARY KEY,
    `qr_type` ENUM('ttdDigital', 'accessLink') NOT NULL,
    `document_ref_id` VARCHAR(255) NULL,
    `nomor_surat` VARCHAR(255) NULL,
    `signed_by_name` VARCHAR(255) NULL,
    `signed_by_position` VARCHAR(255) NULL,
    `signed_date` DATE NULL,
    `perihal_surat` TEXT NULL,
    `link_url` TEXT NULL,
    `link_title` VARCHAR(255) NULL,
    `link_description` TEXT NULL,
    `link_creator` VARCHAR(255) NULL,
    `qr_code_value` TEXT NOT NULL UNIQUE,
    `logo_url_in_qr` TEXT NULL,
    `generated_by_user_id` VARCHAR(255) NULL,
    `generated_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `is_valid` BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `digital_signatures`
ADD CONSTRAINT `fk_digisign_document_ref` FOREIGN KEY (`document_ref_id`) REFERENCES `surat_submissions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT `fk_digisign_generated_by_user` FOREIGN KEY (`generated_by_user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `kepengurusan_archives` (
    `id` VARCHAR(255) PRIMARY KEY,
    `rayon_id` VARCHAR(255) NOT NULL,
    `nama_rayon` VARCHAR(255) NOT NULL,
    `periode` VARCHAR(50) NOT NULL,
    `ketua` VARCHAR(255) NOT NULL,
    `sekretaris` VARCHAR(255) NOT NULL,
    `bendahara` VARCHAR(255) NOT NULL,
    `jumlah_kader` INT DEFAULT 0,
    `tanggal_berdiri_periode` DATE NULL,
    `uploaded_by_user_id` VARCHAR(255) NULL,
    `uploaded_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `file_sk_url` TEXT NULL,
    `other_files_json` JSON NULL,
    `last_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `kepengurusan_archives`
ADD CONSTRAINT `fk_archives_uploaded_by_user` FOREIGN KEY (`uploaded_by_user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `digilib_categories` (
    `id` VARCHAR(50) PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `icon_class` VARCHAR(255) NULL,
    `target_page_url` TEXT NULL,
    `is_external_link` BOOLEAN NOT NULL DEFAULT FALSE,
    `is_active` BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `digilib_items` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `category_id` VARCHAR(50) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `author` VARCHAR(255) NOT NULL,
    `abstract_description` TEXT NULL,
    `file_url` TEXT NOT NULL,
    `file_name` VARCHAR(255) NULL,
    `publication_year` INT NULL,
    `publisher` VARCHAR(255) NULL,
    `isbn` VARCHAR(20) NULL,
    `rayon_id` VARCHAR(255) NULL,
    `period` VARCHAR(100) NULL,
    `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    `uploaded_by_user_id` VARCHAR(255) NULL,
    `upload_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `last_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `digilib_items`
ADD CONSTRAINT `fk_digilib_category_id` FOREIGN KEY (`category_id`) REFERENCES `digilib_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
ADD CONSTRAINT `fk_digilib_rayon_id` FOREIGN KEY (`rayon_id`) REFERENCES `rayons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT `fk_digilib_uploaded_by_user` FOREIGN KEY (`uploaded_by_user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `scientific_works` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `author_name` VARCHAR(255) NOT NULL,
    `author_user_id` VARCHAR(255) NULL,
    `type` VARCHAR(50) NOT NULL,
    `abstract` TEXT NULL,
    `publication_year` INT NULL,
    `publisher` VARCHAR(255) NULL,
    `isbn` VARCHAR(20) NULL,
    `file_url` TEXT NULL,
    `upload_date` DATE NOT NULL,
    `status` ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    `last_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `scientific_works`
ADD CONSTRAINT `fk_scientific_works_author_user` FOREIGN KEY (`author_user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `ojs_access_settings` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `ojs_base_url` TEXT NOT NULL,
    `api_key` VARCHAR(255) NULL,
    `admin_username` VARCHAR(255) NULL,
    `admin_password` VARCHAR(255) NULL,
    `last_synced_at` DATETIME NULL,
    `active` BOOLEAN NOT NULL DEFAULT TRUE,
    `last_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
