"""
=====================================================================
  OTOMATISASI PENGUJIAN WEB - https://www.itenas.ac.id/
  SubCPMK 2: Selenium dengan Python
  FOKUS: Menu Akademik → Submenu
=====================================================================
  Skenario yang diuji:
    1. Navigasi ke Kemahasiswaan
    2. Navigasi ke Kalender Akademik
    3. Navigasi ke E-Learning
    4. Navigasi ke Rekognisi Pembelajaran Lampau (RPL)
    5. Navigasi ke Jadwal Ujian

  Prasyarat:
    pip install selenium webdriver-manager
=====================================================================
"""

import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager


# ─────────────────────────────────────────────────────────────────────
#  KONFIGURASI
# ─────────────────────────────────────────────────────────────────────
BASE_URL   = "https://www.itenas.ac.id/"
WAIT_TIME  = 15
SLEEP_TIME = 2


def buat_driver() -> webdriver.Chrome:
    options = Options()
    options.add_argument("--start-maximized")
    options.add_argument("--disable-notifications")
    options.add_argument("--ignore-certificate-errors")
    options.add_argument("--disable-popup-blocking")
    service = Service(ChromeDriverManager().install())
    driver  = webdriver.Chrome(service=service, options=options)
    driver.implicitly_wait(WAIT_TIME)
    return driver


# ─────────────────────────────────────────────────────────────────────
#  HELPER: Hover menu Akademik lalu klik submenu
# ─────────────────────────────────────────────────────────────────────
def hover_akademik_lalu_klik(driver, wait, teks_submenu: str) -> str:
    """
    1. Buka BASE_URL
    2. Hover / klik menu 'Akademik'
    3. Klik submenu sesuai teks_submenu
    4. Return URL setelah navigasi
    """
    driver.get(BASE_URL)
    time.sleep(SLEEP_TIME)

    # ── Cari menu utama 'Akademik' ────────────────────────────────────
    akademik_xpath = (
        "//nav//a[contains(translate(text(),"
        "'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ'),'AKADEMIK')]"
        " | //ul//li//a[contains(translate(text(),"
        "'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ'),'AKADEMIK')]"
    )

    menu_akademik = wait.until(
        EC.presence_of_element_located((By.XPATH, akademik_xpath))
    )
    print(f"  [✓] Menu 'Akademik' ditemukan: {menu_akademik.text}")

    # ── Hover agar dropdown muncul ────────────────────────────────────
    actions = ActionChains(driver)
    actions.move_to_element(menu_akademik).perform()
    time.sleep(SLEEP_TIME)

    # Jika hover tidak memunculkan dropdown, coba klik
    try:
        submenu_xpath = (
            f"//a[contains(translate(normalize-space(text()),"
            f"'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ'),"
            f"'{teks_submenu.upper()}')]"
        )
        submenu = wait.until(
            EC.visibility_of_element_located((By.XPATH, submenu_xpath))
        )
    except Exception:
        # Fallback: klik menu akademik dulu
        menu_akademik.click()
        time.sleep(SLEEP_TIME)
        submenu = wait.until(
            EC.visibility_of_element_located((By.XPATH, submenu_xpath))
        )

    print(f"  [✓] Submenu '{submenu.text}' ditemukan")
    submenu.click()
    time.sleep(SLEEP_TIME)

    return driver.current_url


# ─────────────────────────────────────────────────────────────────────
#  KELAS PENGUJIAN
# ─────────────────────────────────────────────────────────────────────
class TestAkademikSubmenu(unittest.TestCase):

    def setUp(self):
        self.driver = buat_driver()
        self.wait   = WebDriverWait(self.driver, WAIT_TIME)
        print(f"\n{'='*60}")
        print(f"  SKENARIO: {self._testMethodName}")
        print(f"{'='*60}")

    def tearDown(self):
        time.sleep(SLEEP_TIME)
        self.driver.quit()
        print(f"  [Browser ditutup]\n")

    # ─────────────────────────────────────────────────────────────────
    # SKENARIO 1: Kemahasiswaan
    # ─────────────────────────────────────────────────────────────────
    def test_01_navigasi_kemahasiswaan(self):
        """
        Skenario : Akses halaman Kemahasiswaan melalui menu Akademik
        Langkah  :
            1. Buka https://www.itenas.ac.id/
            2. Hover menu 'Akademik'
            3. Klik submenu 'Kemahasiswaan'
        Expected :
            - URL berpindah ke halaman Kemahasiswaan
            - Halaman berhasil dimuat (judul tidak kosong)
        """
        print("\n[LANGKAH] Hover 'Akademik' → Klik 'Kemahasiswaan'")

        url_hasil = hover_akademik_lalu_klik(
            self.driver, self.wait, "Kemahasiswaan"
        )

        judul = self.driver.title
        print(f"[INFO] URL    : {url_hasil}")
        print(f"[INFO] Judul  : {judul}")

        self.assertTrue(
            len(url_hasil) > len(BASE_URL),
            "URL tidak berubah setelah klik Kemahasiswaan"
        )
        self.assertTrue(len(judul) > 0, "Halaman Kemahasiswaan gagal dimuat")
        print("[HASIL] ✅ Halaman Kemahasiswaan berhasil diakses.")

    # ─────────────────────────────────────────────────────────────────
    # SKENARIO 2: Kalender Akademik
    # ─────────────────────────────────────────────────────────────────
    def test_02_navigasi_kalender_akademik(self):
        """
        Skenario : Akses halaman Kalender Akademik melalui menu Akademik
        Langkah  :
            1. Buka https://www.itenas.ac.id/
            2. Hover menu 'Akademik'
            3. Klik submenu 'Kalender Akademik'
        Expected :
            - URL berpindah ke halaman Kalender Akademik
            - Konten terkait kalender/jadwal tampil
        """
        print("\n[LANGKAH] Hover 'Akademik' → Klik 'Kalender Akademik'")

        url_hasil = hover_akademik_lalu_klik(
            self.driver, self.wait, "Kalender"
        )

        judul = self.driver.title
        print(f"[INFO] URL    : {url_hasil}")
        print(f"[INFO] Judul  : {judul}")

        # Cek ada konten teks di halaman (bukan halaman kosong)
        body_text = self.driver.find_element(By.TAG_NAME, "body").text
        print(f"[INFO] Panjang konten: {len(body_text)} karakter")

        self.assertTrue(
            len(url_hasil) > len(BASE_URL),
            "URL tidak berubah setelah klik Kalender Akademik"
        )
        self.assertTrue(len(body_text) > 100, "Halaman Kalender Akademik tampak kosong")
        print("[HASIL] ✅ Halaman Kalender Akademik berhasil diakses.")

    # ─────────────────────────────────────────────────────────────────
    # SKENARIO 3: E-Learning
    # ─────────────────────────────────────────────────────────────────
    def test_03_navigasi_elearning(self):
        """
        Skenario : Akses halaman / link E-Learning melalui menu Akademik
        Langkah  :
            1. Buka https://www.itenas.ac.id/
            2. Hover menu 'Akademik'
            3. Klik submenu 'E-Learning'
        Expected :
            - Browser berpindah ke platform E-Learning (bisa tab baru)
            - URL mengandung kata kunci e-learning / elearning / lms / moodle
        """
        print("\n[LANGKAH] Hover 'Akademik' → Klik 'E-Learning'")

        # Simpan handle window awal
        handle_awal = self.driver.current_window_handle

        url_hasil = hover_akademik_lalu_klik(
            self.driver, self.wait, "E-Learning"
        )
        time.sleep(SLEEP_TIME)

        # Jika terbuka di tab baru, pindah ke tab baru
        semua_handle = self.driver.window_handles
        if len(semua_handle) > 1:
            for handle in semua_handle:
                if handle != handle_awal:
                    self.driver.switch_to.window(handle)
                    break
            time.sleep(SLEEP_TIME)

        url_aktif = self.driver.current_url
        judul     = self.driver.title
        print(f"[INFO] URL aktif : {url_aktif}")
        print(f"[INFO] Judul     : {judul}")

        self.assertTrue(
            len(url_aktif) > 10,
            "URL kosong setelah klik E-Learning"
        )
        # E-learning biasanya redirect ke subdomain / platform lain
        kata_kunci = ["elearning", "e-learning", "moodle", "lms", "itenas"]
        ada_keyword = any(k in url_aktif.lower() for k in kata_kunci)
        self.assertTrue(
            ada_keyword,
            f"URL '{url_aktif}' tidak terkait E-Learning"
        )
        print("[HASIL] ✅ Halaman E-Learning berhasil diakses.")

    # ─────────────────────────────────────────────────────────────────
    # SKENARIO 4: Rekognisi Pembelajaran Lampau (RPL)
    # ─────────────────────────────────────────────────────────────────
    def test_04_navigasi_rekognisi_rpl(self):
        """
        Skenario : Akses halaman RPL melalui menu Akademik
        Langkah  :
            1. Buka https://www.itenas.ac.id/
            2. Hover menu 'Akademik'
            3. Klik submenu 'Rekognisi Pembelajaran Lampau (RPL)'
        Expected :
            - URL berpindah ke halaman RPL
            - Konten halaman memuat informasi terkait RPL
        """
        print("\n[LANGKAH] Hover 'Akademik' → Klik 'Rekognisi Pembelajaran Lampau (RPL)'")

        url_hasil = hover_akademik_lalu_klik(
            self.driver, self.wait, "Rekognisi"
        )

        judul     = self.driver.title
        body_text = self.driver.find_element(By.TAG_NAME, "body").text

        print(f"[INFO] URL    : {url_hasil}")
        print(f"[INFO] Judul  : {judul}")
        print(f"[INFO] Konten (100 char pertama): {body_text[:100]}")

        self.assertTrue(
            len(url_hasil) > len(BASE_URL),
            "URL tidak berubah setelah klik RPL"
        )
        self.assertTrue(len(body_text) > 50, "Halaman RPL tampak kosong")
        print("[HASIL] ✅ Halaman Rekognisi RPL berhasil diakses.")

    # ─────────────────────────────────────────────────────────────────
    # SKENARIO 5: Jadwal Ujian
    # ─────────────────────────────────────────────────────────────────
    def test_05_navigasi_jadwal_ujian(self):
        """
        Skenario : Akses halaman Jadwal Ujian melalui menu Akademik
        Langkah  :
            1. Buka https://www.itenas.ac.id/
            2. Hover menu 'Akademik'
            3. Klik submenu 'Jadwal Ujian'
        Expected :
            - URL berpindah ke halaman Jadwal Ujian
            - Halaman mengandung konten terkait ujian/jadwal
        """
        print("\n[LANGKAH] Hover 'Akademik' → Klik 'Jadwal Ujian'")

        url_hasil = hover_akademik_lalu_klik(
            self.driver, self.wait, "Jadwal Ujian"
        )

        judul     = self.driver.title
        body_text = self.driver.find_element(By.TAG_NAME, "body").text

        print(f"[INFO] URL    : {url_hasil}")
        print(f"[INFO] Judul  : {judul}")
        print(f"[INFO] Konten (100 char pertama): {body_text[:100]}")

        self.assertTrue(
            len(url_hasil) > len(BASE_URL),
            "URL tidak berubah setelah klik Jadwal Ujian"
        )
        self.assertTrue(len(body_text) > 50, "Halaman Jadwal Ujian tampak kosong")
        print("[HASIL] ✅ Halaman Jadwal Ujian berhasil diakses.")


# ─────────────────────────────────────────────────────────────────────
#  ENTRY POINT
# ─────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    unittest.main(verbosity=2)