// public/js/api.js

// Modul ini menyediakan fungsi-fungsi pembantu untuk melakukan panggilan HTTP (fetch) ke API backend.

// Base URL untuk API Anda. Pastikan ini sesuai dengan konfigurasi web server Anda.
// Contoh: '/api' jika web server Anda mengarahkan /api/* ke index.php backend.
const API_BASE_URL = '/api';

/**
 * Mengambil token autentikasi dari localStorage.
 * @returns {string|null} Token JWT atau null jika tidak ada.
 */
function getAuthToken() {
    return localStorage.getItem('authToken');
}

/**
 * Fungsi generik untuk melakukan panggilan HTTP ke API backend.
 *
 * @param {string} endpoint Bagian endpoint API setelah API_BASE_URL (misal: '/users', '/news/1').
 * @param {string} method Metode HTTP (GET, POST, PUT, DELETE). Default: 'GET'.
 * @param {object|null} data Data yang akan dikirim dalam body permintaan (untuk POST/PUT).
 * @param {boolean} requiresAuth Menunjukkan apakah endpoint memerlukan token autentikasi. Default: true.
 * @returns {Promise<object>} Promise yang me-resolve dengan data respons JSON.
 * @throws {Error} Melemparkan error jika respons API tidak OK atau ada masalah jaringan.
 */
export async function callApi(endpoint, method = 'GET', data = null, requiresAuth = true) {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = {
        method: method,
        headers: {
            // Default Content-Type untuk JSON
            'Content-Type': 'application/json',
            // Tambahkan header lain jika diperlukan (misal: Accept)
            'Accept': 'application/json'
        },
    };

    // Tambahkan token autentikasi jika diperlukan
    if (requiresAuth) {
        const authToken = getAuthToken();
        if (authToken) {
            options.headers['Authorization'] = `Bearer ${authToken}`;
        } else {
            // Jika memerlukan autentikasi tapi token tidak ada, lemparkan error
            // Atau redirect ke halaman login
            throw new Error('Authentication token is missing. Please log in.');
        }
    }

    // Tambahkan body permintaan untuk metode POST, PUT, DELETE
    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        const responseData = await response.json(); // Selalu coba parse JSON, bahkan untuk error

        if (!response.ok) {
            // Tangani respons non-OK (status code 4xx atau 5xx)
            // Pesan error dari backend akan ada di responseData.message
            throw new Error(responseData.message || `API Error: ${response.status} ${response.statusText}`);
        }

        return responseData; // Mengembalikan data JSON dari respons sukses
    } catch (error) {
        console.error(`Error calling API ${method} ${endpoint}:`, error);
        // Anda bisa menambahkan logika UI di sini, seperti menampilkan pesan toast/notifikasi
        // showCustomMessage(error.message, 'error'); // Asumsi showCustomMessage tersedia secara global
        throw error; // Melemparkan error agar bisa ditangani di komponen yang memanggil
    }
}

// --- Fungsi-fungsi API spesifik untuk modul Anda (contoh) ---

// Autentikasi
export const loginUser = (email, password) => callApi('/auth/login', 'POST', { email, password }, false); // Login tidak memerlukan token
export const registerKader = (userData) => callApi('/auth/register', 'POST', userData, false); // Registrasi tidak memerlukan token
export const forgotPassword = (identifierData) => callApi('/auth/forgot-password', 'POST', identifierData, false);
export const resetPassword = (resetData) => callApi('/auth/reset-password', 'POST', resetData, false);

// Pengguna (memerlukan autentikasi dan peran)
export const getUsers = () => callApi('/users', 'GET');
export const createUser = (userData) => callApi('/users', 'POST', userData);
export const getUserById = (id) => callApi(`/users/${id}`, 'GET');
export const updateUser = (id, userData) => callApi(`/users/${id}`, 'PUT', userData);
export const deleteUser = (id) => callApi(`/users/${id}`, 'DELETE');
export const resetUserPassword = (id, newPassword) => callApi(`/users/${id}/reset-password`, 'POST', { new_password: newPassword });

// Rayon
export const getAllRayons = () => callApi('/rayons', 'GET', null, false); // Bisa diakses publik
export const getRayonById = (id) => callApi(`/rayons/${id}`, 'GET', null, false); // Bisa diakses publik
export const updateRayon = (id, rayonData) => callApi(`/rayons/${id}`, 'PUT', rayonData);

// Profil Kader
export const getKaderProfile = (userId) => callApi(`/kaders/profile/${userId}`, 'GET');
export const updateKaderProfile = (userId, profileData) => callApi(`/kaders/profile/${userId}`, 'PUT', profileData);

// Berita & Artikel
export const getApprovedNews = () => callApi('/news', 'GET', null, false);
export const getNewsById = (id) => callApi(`/news/${id}`, 'GET', null, false);
export const submitNews = (newsData) => callApi('/news', 'POST', newsData);
export const updateNews = (id, newsData) => callApi(`/news/${id}`, 'PUT', newsData);
export const deleteNews = (id) => callApi(`/news/${id}`, 'DELETE');
export const getPendingNews = () => callApi('/news/pending', 'GET');
export const approveNews = (id) => callApi(`/news/${id}/approve`, 'PUT');
export const rejectNews = (id) => callApi(`/news/${id}/reject`, 'PUT');

// Kegiatan
export const getApprovedActivities = () => callApi('/activities', 'GET', null, false);
export const getActivityById = (id) => callApi(`/activities/${id}`, 'GET', null, false);
export const submitActivity = (activityData) => callApi('/activities', 'POST', activityData);
export const updateActivity = (id, activityData) => callApi(`/activities/${id}`, 'PUT', activityData);
export const deleteActivity = (id) => callApi(`/activities/${id}`, 'DELETE');
export const getPendingActivities = () => callApi('/activities/pending', 'GET');
export const approveActivity = (id) => callApi(`/activities/${id}/approve`, 'PUT');
export const rejectActivity = (id) => callApi(`/activities/${id}/reject`, 'PUT');
export const registerForActivity = (activityId, registrationData) => callApi(`/activities/${activityId}/register`, 'POST', registrationData);
export const getActivityRegistrants = (activityId) => callApi(`/activities/${activityId}/registrants`, 'GET');
export const deleteActivityRegistration = (id) => callApi(`/activities/registrations/${id}`, 'DELETE');

// Galeri
export const getApprovedGalleryItems = () => callApi('/gallery', 'GET', null, false);
export const getGalleryItemById = (id) => callApi(`/gallery/${id}`, 'GET', null, false);
export const uploadGalleryItem = (galleryData) => callApi('/gallery', 'POST', galleryData);
export const updateGalleryItem = (id, galleryData) => callApi(`/gallery/${id}`, 'PUT', galleryData);
export const deleteGalleryItem = (id) => callApi(`/gallery/${id}`, 'DELETE');
export const getPendingGalleryItems = () => callApi('/gallery/pending', 'GET');
export const approveGalleryItem = (id) => callApi(`/gallery/${id}/approve`, 'PUT');
export const rejectGalleryItem = (id) => callApi(`/gallery/${id}/reject`, 'PUT');

// Pengaturan Situs
export const getSiteSettings = () => callApi('/settings', 'GET');
export const updateSiteSettings = (settingsData) => callApi('/settings', 'PUT', settingsData);

// Bagian Beranda
export const getHomepageSections = () => callApi('/homepage-sections', 'GET'); // Untuk publik
export const updateHomepageSection = (sectionName, content) => callApi(`/homepage-sections/${sectionName}`, 'PUT', { content_json: content });

// Pengumuman
export const getAnnouncements = (activeOnly = true) => callApi(`/announcements?active=${activeOnly ? 'true' : 'false'}`, 'GET', null, activeOnly); // Public can get active, admin can get all
export const createAnnouncement = (announcementData) => callApi('/announcements', 'POST', announcementData);
export const updateAnnouncement = (id, announcementData) => callApi(`/announcements/${id}`, 'PUT', announcementData);
export const deleteAnnouncement = (id) => callApi(`/announcements/${id}`, 'DELETE');
export const activateAnnouncement = (id) => callApi(`/announcements/${id}/activate`, 'PUT');
export const deactivateAnnouncement = (id) => callApi(`/announcements/${id}/deactivate`, 'PUT');

// Tautan Media Sosial
export const getSocialMediaLinks = (activeOnly = true) => callApi(`/social-media?active=${activeOnly ? 'true' : 'false'}`, 'GET', null, activeOnly); // Public can get active, admin can get all
export const createSocialMediaLink = (linkData) => callApi('/social-media', 'POST', linkData);
export const updateSocialMediaLink = (platform, linkData) => callApi(`/social-media/${platform}`, 'PUT', linkData);
export const deleteSocialMediaLink = (platform) => callApi(`/social-media/${platform}`, 'DELETE');

// Notifikasi
export const getSentNotifications = () => callApi('/notifications/sent', 'GET');
export const getMyNotifications = () => callApi('/notifications/my', 'GET');
export const sendManualNotification = (notificationData) => callApi('/notifications/send', 'POST', notificationData);
export const deleteNotification = (id) => callApi(`/notifications/${id}`, 'DELETE');
export const triggerAutomaticNotifications = () => callApi('/notifications/trigger-auto', 'POST');
// export const markNotificationAsRead = (id) => callApi(`/notifications/${id}/read`, 'PUT'); // Jika ada fitur ini

// Log Aktivitas Sistem
export const getSystemActivityLogs = (filters = {}) => callApi(`/logs/activities?${new URLSearchParams(filters).toString()}`, 'GET');
export const getSystemActivityLogById = (id) => callApi(`/logs/activities/${id}`, 'GET');
export const getUserActivityLogs = (userId) => callApi(`/logs/activities/${userId}`, 'GET');
export const deleteSystemActivityLog = (id) => callApi(`/logs/activities/${id}`, 'DELETE');

// TTD Digital & QR Link
export const generateQrCode = (qrData) => callApi('/digital-signatures/generate', 'POST', qrData);
export const getQrCodeDetails = (id) => callApi(`/digital-signatures/${id}`, 'GET');
export const verifyPublicQrCode = (id) => callApi(`/digital-signatures/verify/${id}`, 'GET', null, false); // Publik, tidak perlu autentikasi

// Arsip Kepengurusan
export const getKepengurusanArchives = (filters = {}) => callApi(`/archives/kepengurusan?${new URLSearchParams(filters).toString()}`, 'GET');
export const getKepengurusanArchiveById = (id) => callApi(`/archives/kepengurusan/${id}`, 'GET');
export const createKepengurusanArchive = (archiveData) => callApi('/archives/kepengurusan', 'POST', archiveData);
export const updateKepengurusanArchive = (id, archiveData) => callApi(`/archives/kepengurusan/${id}`, 'PUT', archiveData);
export const deleteKepengurusanArchive = (id) => callApi(`/archives/kepengurusan/${id}`, 'DELETE');

// Kategori Digilib
export const getDigilibCategories = (activeOnly = true) => callApi(`/digilib/categories?active=${activeOnly ? 'true' : 'false'}`, 'GET', null, activeOnly);
export const createDigilibCategory = (categoryData) => callApi('/digilib/categories', 'POST', categoryData);
export const updateDigilibCategory = (id, categoryData) => callApi(`/digilib/categories/${id}`, 'PUT', categoryData);
export const deleteDigilibCategory = (id) => callApi(`/digilib/categories/${id}`, 'DELETE');

// Item Digilib
export const getDigilibItems = (filters = {}) => callApi(`/digilib/items?${new URLSearchParams(filters).toString()}`, 'GET', null, false); // Publik
export const getDigilibItemById = (id) => callApi(`/digilib/items/${id}`, 'GET', null, false); // Publik
export const uploadDigilibItem = (itemData) => callApi('/digilib/items', 'POST', itemData);
export const updateDigilibItem = (id, itemData) => callApi(`/digilib/items/${id}`, 'PUT', itemData);
export const deleteDigilibItem = (id) => callApi(`/digilib/items/${id}`, 'DELETE');
export const approveDigilibItem = (id) => callApi(`/digilib/items/${id}/approve`, 'PUT');
export const rejectDigilibItem = (id) => callApi(`/digilib/items/${id}/reject`, 'PUT');

// Karya Ilmiah
export const getScientificWorks = (filters = {}) => callApi(`/scientific-works?${new URLSearchParams(filters).toString()}`, 'GET', null, false); // Publik
export const getMyScientificWorks = (userId) => callApi(`/scientific-works/my?author_user_id=${userId}`, 'GET');
export const getScientificWorkById = (id) => callApi(`/scientific-works/${id}`, 'GET', null, false); // Publik
export const uploadScientificWork = (workData) => callApi('/scientific-works', 'POST', workData);
export const updateScientificWork = (id, workData) => callApi(`/scientific-works/${id}`, 'PUT', workData);
export const deleteScientificWork = (id) => callApi(`/scientific-works/${id}`, 'DELETE');
export const approveScientificWork = (id) => callApi(`/scientific-works/${id}/approve`, 'PUT');
export const rejectScientificWork = (id) => callApi(`/scientific-works/${id}/reject`, 'PUT');

// Pengaturan Akses OJS
export const getOjsSettings = () => callApi('/ojs-settings', 'GET');
export const updateOjsSettings = (id, settingsData) => callApi(`/ojs-settings/${id}`, 'PUT', settingsData);
export const syncOjsData = () => callApi('/ojs-settings/sync', 'POST');

// Laporan & Analisis
export const generateReport = (reportData) => callApi('/reports/generate', 'POST', reportData);
export const exportReport = (reportType, filters = {}) => callApi(`/reports/export/${reportType}?${new URLSearchParams(filters).toString()}`, 'GET');

// Unggah File Umum
// Catatan: Untuk unggah file, Anda perlu menggunakan FormData, bukan JSON.
// Fungsi callApi ini tidak dirancang untuk FormData secara langsung.
// Anda mungkin perlu fungsi terpisah untuk unggah file.
export async function uploadFile(fileInput, metadata = {}) {
    const formData = new FormData();
    // Jika multiple files
    if (fileInput.files && fileInput.files.length > 1) {
        for (const file of fileInput.files) {
            formData.append('file[]', file); // Backend mengharapkan 'file[]'
        }
    } else if (fileInput.files && fileInput.files.length === 1) {
        formData.append('file', fileInput.files[0]); // Backend mengharapkan 'file'
    } else {
        throw new Error('No file selected for upload.');
    }

    // Tambahkan metadata lain jika diperlukan oleh backend
    for (const key in metadata) {
        formData.append(key, metadata[key]);
    }

    const authToken = getAuthToken();
    if (!authToken) {
        throw new Error('Authentication token is missing for file upload. Please log in.');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/upload/file`, {
            method: 'POST',
            // PENTING: Jangan set Content-Type untuk FormData, browser akan menanganinya secara otomatis
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
            body: formData
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || `File upload error: ${response.status} ${response.statusText}`);
        }
        return responseData;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}
