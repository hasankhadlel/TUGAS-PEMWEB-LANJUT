document.addEventListener('DOMContentLoaded', async function () {
    let loggedInUser = null;

    const headerTitleText = document.getElementById('header-title-text');
    const mobileHeaderTitleText = document.getElementById('mobile-header-title-text');
    const authLinkMain = document.getElementById('auth-link-main');
    const authLinkMobile = document.getElementById('auth-link-mobile');
    const desktopKaderMenuContainer = document.getElementById('desktop-kader-menu-container');
    const desktopAdminMenuContainer = document.getElementById('desktop-admin-menu-container');
    const editActivitiesButtonContainer = document.getElementById('edit-activities-button-container');

    const adminMenuLinks = {
        manajemenAkun: { desktop: document.getElementById('manajemen-akun-link-desktop'), mobile: null },
        manajemenKader: { desktop: document.getElementById('manajemen-kader-link-desktop'), mobile: null },
        repositoryIlmiah: { desktop: document.getElementById('repository-ilmiah-link-desktop'), mobile: null },
        pengajuanSurat: { desktop: document.getElementById('pengajuan-surat-link-desktop'), mobile: null },
        verifikasiSurat: { desktop: document.getElementById('verifikasi-surat-link-desktop'), mobile: null },
        dashboardRayon: { desktop: document.getElementById('dashboard-rayon-link-desktop'), mobile: null },
        adminDashboard: { desktop: document.getElementById('admin-dashboard-link-desktop'), mobile: null },
        editBeranda: { desktop: document.getElementById('edit-beranda-link-desktop'), mobile: null },
        jurnalAlharokahAdmin: { desktop: document.getElementById('jurnal-alharokah-link-desktop-admin'), mobile: null },
        editProfilKader: { desktop: document.getElementById('edit-profil-kader-link-desktop'), mobile: null },
        pengaturanAkunKader: { desktop: document.getElementById('pengaturan-akun-kader-link-desktop'), mobile: null },
        jurnalAlharokahKader: { desktop: document.getElementById('jurnal-alharokah-link-desktop-kader'), mobile: null },
        pengajuanSuratKader: { desktop: document.getElementById('pengajuan-surat-link-desktop-kader'), mobile: null },
        verifikasiKontenRayon: { desktop: document.getElementById('verifikasi-konten-link-desktop'), mobile: null },
        tambahBeritaRayon: { desktop: document.getElementById('tambah-berita-link-desktop'), mobile: null },
        tambahKegiatanRayon: { desktop: document.getElementById('tambah-kegiatan-link-desktop'), mobile: null },
        tambahGaleriRayon: { desktop: document.getElementById('tambah-galeri-link-desktop'), mobile: null },
        editProfilRayon: { desktop: document.getElementById('edit-profil-rayon-link-desktop'), mobile: null },
        pengaturanSitus: { desktop: document.getElementById('pengaturan-situs-link-desktop'), mobile: null },
        dashboardStatistik: { desktop: document.getElementById('dashboard-statistik-link-desktop'), mobile: null },
        kelolaNotifikasi: { desktop: document.getElementById('kelola-notifikasi-link-desktop'), mobile: null },
        laporanAnalisis: { desktop: document.getElementById('laporan-analisis-link-desktop'), mobile: null },
        ttdDigital: { desktop: document.getElementById('ttd-digital-link-desktop'), mobile: null }
    };

    let homepageContent = {
        heroMainTitle: "Pengurus Komisariat<br>Pergerakan Mahasiswa Islam Indonesia<br>UIN Sunan Gunung Djati<br>Cabang Kota Bandung",
        announcementText: "",
        aboutP1: `Pergerakan Mahasiswa Islam Indonesia (PMII) Komisariat UIN Sunan Gunung Djati Bandung adalah organisasi kemahasiswaan Islam yang berlandaskan Ahlussunnah wal Jama'ah an-Nahdliyah. Kami berkomitmen untuk mencetak kader-kader Ulul Albab yang memiliki kedalaman spiritual, keluasan ilmu pengetahuan, dan kepedulian sosial yang tinggi.`,
        news: [],
        activities: [],
        gallery: []
    };

    async function loadHomepageContent() {
        try {
            const homepageResponse = await fetch('/api/homepage-content');
            if (homepageResponse.ok) {
                const data = await homepageResponse.json();
                Object.assign(homepageContent, data);
            } else {
                console.warn("Failed to load homepage static content from API. Using default.");
            }

            if (document.getElementById('hero-main-title')) document.getElementById('hero-main-title').innerHTML = homepageContent.heroMainTitle;

            const announcementSection = document.getElementById('announcement-section');
            if (announcementSection) {
                if (homepageContent.announcementText && homepageContent.announcementText.trim() !== '') {
                    announcementSection.classList.remove('hidden');
                    document.getElementById('announcement-text').innerHTML = homepageContent.announcementText + ' <a href="#" class="underline font-bold hover:text-pmii-darkblue transition-colors duration-300">di sini</a>.';
                } else {
                    announcementSection.classList.add('hidden');
                }
            }
            if (document.getElementById('about-us-p1')) document.getElementById('about-us-p1').textContent = homepageContent.aboutP1;

            await renderNews();
            await renderActivities();
            await renderGallery();
        } catch (error) {
            console.error("Error during initial homepage content load:", error);
            showCustomMessage('Gagal memuat konten homepage. Mungkin ada masalah jaringan atau server.', 'error');
        }
    }

    async function renderNews() {
        const newsContainer = document.getElementById('news-container');
        if (!newsContainer) return;

        newsContainer.innerHTML = '';
        try {
            const response = await fetch('/api/news?status=approved&limit=3&sort=dateDesc');
            if (!response.ok) throw new Error('Failed to fetch news');
            const newsData = await response.json();

            if (newsData.length > 0) {
                newsData.forEach((item, index) => {
                    const newsCard = `<div class="bg-white rounded-xl shadow-lg overflow-hidden card-hover flex flex-col animated-section animate-card-entry stagger-${index + 1}">
                            <img src="${item.imageUrl}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/CCCCCC/333333?text=Image+Not+Found';" alt="${item.title}" class="w-full h-56 object-cover">
                            <div class="p-6 flex flex-col flex-grow">
                                <span class="text-xs text-pmii-blue font-semibold bg-pmii-yellow/50 px-2.5 py-1 rounded-full self-start mb-2.5">${item.category}</span>
                                <h3 class="text-xl font-bold text-pmii-darkblue mb-3 leading-tight hover:text-pmii-yellow transition-colors">${item.title}</h3>
                                <p class="text-text-secondary text-sm mb-5 flex-grow line-clamp-3">${item.description}</p>
                                <a href="berita-artikel.html" class="font-semibold text-pmii-blue hover:text-pmii-yellow transition-colors self-start group text-sm">
                                    Baca Selengkapnya <i class="fas fa-arrow-right text-xs ml-1 group-hover:translate-x-0.5 transition-transform"></i>
                                </a>
                            </div>
                        </div>`;
                    newsContainer.innerHTML += newsCard;
                });
            } else {
                newsContainer.innerHTML = `<p class="text-gray-500 text-center py-8 col-span-full">Belum ada berita atau artikel terbaru yang ditampilkan.</p>`;
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            newsContainer.innerHTML = `<p class="text-red-500 text-center py-8 col-span-full">Gagal memuat berita. Silakan coba lagi nanti.</p>`;
        }
    }

    async function renderActivities() {
        const activitiesContainer = document.getElementById('activities-container');
        if (!activitiesContainer) return;

        activitiesContainer.innerHTML = '';
        try {
            const response = await fetch('/api/activities?status=approved&limit=2&sort=dateAsc');
            if (!response.ok) throw new Error('Failed to fetch activities');
            const activitiesData = await response.json();

            if (activitiesData.length > 0) {
                activitiesData.forEach((item, index) => {
                    const activityCard = `
                        <div class="activity-card-enhanced flex items-center p-4 sm:p-6 mb-4 animated-section animate-card-entry stagger-${index + 1}">
                            <div class="activity-date-block-enhanced">
                                <p class="day">${item.day}</p>
                                <p class="month">${item.month}</p>
                                <p class="year">${item.year}</p>
                            </div>
                            <div class="activity-content-wrapper-enhanced flex-grow">
                                <h3 class="title text-lg font-semibold text-pmii-darkblue mb-2">${item.title}</h3>
                                <p class="activity-info-line flex items-center text-sm text-text-secondary mb-1"><i class="fas fa-clock mr-2 text-pmii-yellow"></i> ${item.time}</p>
                                <p class="activity-info-line flex items-center text-sm text-text-secondary"><i class="fas fa-map-marker-alt mr-2 text-pmii-yellow"></i> ${item.location}</p>
                            </div>
                            <a href="agenda-kegiatan.html" class="activity-detail-button-enhanced whitespace-nowrap btn btn-primary-pmii btn-sm" target="_self">Detail Acara</a>
                        </div>`;
                    activitiesContainer.innerHTML += activityCard;
                });
            } else {
                activitiesContainer.innerHTML = `<p class="text-gray-500 text-center py-8">Belum ada agenda kegiatan yang tersedia.</p>`;
            }
        } catch (error) {
            console.error("Error fetching activities:", error);
            activitiesContainer.innerHTML = `<p class="text-red-500 text-center py-8">Gagal memuat agenda kegiatan. Silakan coba lagi nanti.</p>`;
        }
    }

    async function renderGallery() {
        const galleryContainer = document.getElementById('gallery-container');
        if (!galleryContainer) return;

        galleryContainer.innerHTML = '';
        try {
            const response = await fetch('/api/gallery?status=approved&limit=4');
            if (!response.ok) throw new Error('Failed to fetch gallery');
            const galleryData = await response.json();

            if (galleryData.length > 0) {
                galleryData.forEach((item, index) => {
                    const galleryItem = `
                        <a href="${item.imageUrl}" data-fancybox="gallery" data-caption="${item.caption}"
                           class="block rounded-lg overflow-hidden shadow-md group relative aspect-w-1 aspect-h-1 animated-section animate-card-entry stagger-${index + 1}">
                            <img src="${item.imageUrl}" onerror="this.onerror=null;this.src='https://placehold.co/400x400/CCCCCC/333333?text=Image+Not+Found';" alt="${item.caption}"
                                         class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out">
                            <div class="absolute inset-0 bg-gradient-to-t from-pmii-blue/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                <p class="text-white text-xs font-medium translate-y-2 group-hover:translate-y-0 transition-transform duration-300">${item.caption}</p>
                            </div>
                            <div class="absolute top-1.5 right-1.5 bg-pmii-yellow text-pmii-blue p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100 text-xs">
                                <i class="fas fa-search-plus"></i>
                            </div>
                        </a>`;
                    galleryContainer.innerHTML += galleryItem;
                });
                Fancybox.bind("[data-fancybox]", { Thumbs: false, Toolbar: { display: { left: ["infobar"], middle: [], right: ["close"] } } });
            } else {
                galleryContainer.innerHTML = `<p class="text-gray-500 text-center py-8 col-span-full">Belum ada foto galeri yang ditampilkan.</p>`;
            }
        } catch (error) {
            console.error("Error fetching gallery:", error);
            galleryContainer.innerHTML = `<p class="text-red-500 text-center py-8 col-span-full">Gagal memuat galeri. Silakan coba lagi nanti.</p>`;
        }
    }

    function updateAdminUI() {
        const defaultTitle = 'PK PMII UIN Sunan Gunung Djati Cabang Kota Bandung';
        const loggedInTitle = 'SINTAKSIS (Sistem Informasi Terintegrasi Kaderisasi)';
        const loginText = "Login";
        const logoutText = "Logout";
        const loggedInStylesAuthLink = "logout-active";
        const loggedOutStylesAuthLinkClasses = ["bg-pmii-yellow", "text-pmii-blue", "hover:bg-yellow-400"];

        if (headerTitleText) {
            headerTitleText.textContent = (loggedInUser && (loggedInUser.role === 'rayon' || loggedInUser.role === 'komisariat' || loggedInUser.role === 'kader')) ? loggedInTitle : defaultTitle;
        }
        if (mobileHeaderTitleText) {
            mobileHeaderTitleText.textContent = (loggedInUser && (loggedInUser.role === 'rayon' || loggedInUser.role === 'komisariat' || loggedInUser.role === 'kader')) ? loggedInTitle : defaultTitle;
        }

        for (const key in adminMenuLinks) {
            const desktopLink = adminMenuLinks[key].desktop;
            if (desktopLink) {
                desktopLink.style.display = 'none';
            }
        }

        if(desktopAdminMenuContainer) desktopAdminMenuContainer.classList.add('hidden');
        if(desktopKaderMenuContainer) desktopKaderMenuContainer.classList.add('hidden');
        if(editActivitiesButtonContainer) editActivitiesButtonContainer.classList.add('hidden');

        if (loggedInUser) {
            if (authLinkMain) {
                authLinkMain.textContent = logoutText;
                authLinkMain.dataset.action = "logout";
                authLinkMain.classList.remove(...loggedOutStylesAuthLinkClasses);
                authLinkMain.classList.add(loggedInStylesAuthLink);
                authLinkMain.removeEventListener('click', handleAuthClick);
                authLinkMain.addEventListener('click', handleAuthClick);
            }
            if (authLinkMobile) {
                authLinkMobile.textContent = logoutText;
                authLinkMobile.dataset.action = "logout";
                authLinkMobile.classList.remove(...loggedOutStylesAuthLinkClasses);
                authLinkMobile.classList.add(loggedInStylesAuthLink);
                authLinkMobile.removeEventListener('click', handleAuthClick);
                authLinkMobile.addEventListener('click', handleAuthClick);
            }

            let visibleDesktopLinksKeys = [];
            if (loggedInUser.role === "rayon") {
                visibleDesktopLinksKeys = [
                    'manajemenKader', 'repositoryIlmiah',
                    'pengajuanSurat', 'dashboardRayon',
                    'jurnalAlharokahAdmin', 'tambahBeritaRayon',
                    'tambahKegiatanRayon', 'tambahGaleriRayon',
                    'verifikasiKontenRayon', 'editProfilRayon'
                ];
            } else if (loggedInUser.role === "komisariat") {
                visibleDesktopLinksKeys = [
                    'manajemenAkun', 'manajemenKader',
                    'repositoryIlmiah', 'pengajuanSurat',
                    'verifikasiSurat', 'adminDashboard',
                    'editBeranda', 'jurnalAlharokahAdmin',
                    'verifikasiKontenRayon', 'editProfilRayon',
                    'pengaturanSitus', 'dashboardStatistik',
                    'kelolaNotifikasi', 'laporanAnalisis',
                    'ttdDigital'
                ];
                if(editActivitiesButtonContainer) editActivitiesButtonContainer.classList.remove('hidden');
            } else if (loggedInUser.role === "kader") {
                visibleDesktopLinksKeys = [
                    'editProfilKader', 'pengaturanAkunKader',
                    'jurnalAlharokahKader', 'pengajuanSuratKader'
                ];
            }

            visibleDesktopLinksKeys.forEach(key => {
                const linkEl = adminMenuLinks[key].desktop;
                if (linkEl) linkEl.style.display = 'flex';
            });

            if (loggedInUser.role === "rayon" || loggedInUser.role === "komisariat") {
                if(desktopAdminMenuContainer) desktopAdminMenuContainer.classList.remove('hidden');
            } else if (loggedInUser.role === "kader") {
                if(desktopKaderMenuContainer) desktopKaderMenuContainer.classList.remove('hidden');
            }

        } else {
            if (authLinkMain) {
                authLinkMain.textContent = loginText;
                authLinkMain.dataset.action = "login";
                authLinkMain.classList.remove(loggedInStylesAuthLink);
                authLinkMain.classList.add(...loggedOutStylesAuthLinkClasses);
                authLinkMain.removeEventListener('click', handleAuthClick);
                authLinkMain.addEventListener('click', handleAuthClick);
            }
            if (authLinkMobile) {
                authLinkMobile.textContent = loginText;
                authLinkMobile.dataset.action = "login";
                authLinkMobile.classList.remove(loggedInStylesAuthLink);
                authLinkMobile.classList.add(...loggedOutStylesAuthLinkClasses);
                authLinkMobile.removeEventListener('click', handleAuthClick);
                authLinkMobile.addEventListener('click', handleAuthClick);
            }
        }
    }

    function showCustomMessage(message, type = 'info', callback = null) {
        const messageBox = document.getElementById('customMessageBox');
        messageBox.textContent = message;
        messageBox.className = 'fixed top-4 right-4 z-[9999] px-6 py-3 rounded-lg shadow-xl text-white text-sm font-semibold transition-all duration-300 transform translate-x-full opacity-0';

        if (type === 'success') {
            messageBox.classList.add('bg-green-500');
        } else if (type === 'error') {
            messageBox.classList.add('bg-red-500');
        } else {
            messageBox.classList.add('bg-blue-500');
        }

        messageBox.classList.remove('translate-x-full', 'opacity-0');
        messageBox.classList.add('translate-x-0', 'opacity-100');

        setTimeout(() => {
            messageBox.classList.remove('translate-x-0', 'opacity-100');
            messageBox.classList.add('translate-x-full', 'opacity-0');
            if (callback) {
                messageBox.addEventListener('transitionend', function handler() {
                    callback();
                    messageBox.removeEventListener('transitionend', handler);
                });
            }
        }, 3000);
    }

    async function handleAuthClick(e) {
        e.preventDefault();
        const action = e.target.dataset.action;

        if (action === 'login') {
            window.location.href = 'login.html';
        } else if (action === 'logout') {
            showCustomConfirm('Konfirmasi Logout', 'Apakah Anda yakin ingin logout?', async () => {
                try {
                    const response = await fetch('/api/auth/logout', { method: 'POST' });
                    if (response.ok) {
                        document.body.classList.add('fade-out-page');
                        setTimeout(() => {
                            loggedInUser = null;
                            window.location.reload();
                        }, 500);
                    } else {
                        const errorData = await response.json();
                        showCustomMessage(`Logout gagal: ${errorData.message || 'Terjadi kesalahan.'}`, 'error');
                    }
                } catch (error) {
                    console.error("Logout error:", error);
                    showCustomMessage('Terjadi kesalahan jaringan saat logout.', 'error');
                }
            }, () => {
                showCustomMessage('Logout dibatalkan.', 'info');
            });
        }
    }

    try {
        const statusResponse = await fetch('/api/auth/status');
        if (statusResponse.ok) {
            loggedInUser = await statusResponse.json();
        } else {
            loggedInUser = null;
        }
    } catch (e) {
        console.warn("Could not check login status, assuming not logged in:", e);
        loggedInUser = null;
    }

    loadHomepageContent();
    updateAdminUI();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const navbar = document.getElementById('navbar');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', () => {
        if (scrollToTopBtn) {
            scrollToTopBtn.classList.toggle('hidden', window.pageYOffset <= 300);
            scrollToTopBtn.classList.toggle('flex', window.pageYOffset > 300);
        }
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }
    });

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu-button');
    const mobileMenuContent = document.getElementById('mobile-menu-content');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileNavLinksContainer = document.getElementById('mobile-nav-links');

    function populateMobileMenu() {
        if (!mobileNavLinksContainer) return;

        mobileNavLinksContainer.innerHTML = '';

        const generalLinksData = [
            { text: 'Beranda', href: 'index.html#beranda', icon: 'fas fa-home' },
            { text: 'Tentang Kami', href: 'index.html#tentang', icon: 'fas fa-info-circle' },
            { text: 'Berita', href: 'index.html#berita', icon: 'fas fa-newspaper' },
            { text: '📚 Digilib', href: 'digilib.html', icon: 'fas fa-book' },
            { text: 'Kegiatan', href: 'index.html#kegiatan', icon: 'fas fa-calendar-alt' },
            { text: 'Galeri', href: 'index.html#galeri', icon: 'fas fa-images' }
        ];

        generalLinksData.forEach(linkData => {
            const link = document.createElement('a');
            link.href = linkData.href;
            link.classList.add('mobile-nav-link');
            link.innerHTML = `<i class="${linkData.icon}"></i><span>${linkData.text}</span>`;
            link.addEventListener('click', toggleMobileMenu);
            mobileNavLinksContainer.appendChild(link);
        });

        if (loggedInUser && (loggedInUser.role === 'komisariat' || loggedInUser.role === 'rayon' || loggedInUser.role === 'kader')) {
            const systemInternalTitle = document.createElement('div');
            systemInternalTitle.classList.add('mobile-submenu-title');
            systemInternalTitle.textContent = loggedInUser.role === 'kader' ? 'Profil Kader' : 'Sistem Internal';
            mobileNavLinksContainer.appendChild(systemInternalTitle);

            for (const key in adminMenuLinks) {
                const desktopLink = adminMenuLinks[key].desktop;
                // Only add to mobile if the desktop counterpart is configured to be visible
                if (desktopLink && desktopLink.style.display !== 'none') {
                    const link = document.createElement('a');
                    // Adjust href for dashboard items if needed based on your PHP routing
                    link.href = desktopLink.getAttribute('href');
                    link.classList.add('mobile-submenu-item');
                    link.innerHTML = desktopLink.innerHTML;
                    link.addEventListener('click', toggleMobileMenu);
                    mobileNavLinksContainer.appendChild(link);
                }
            }
        }

        const kontakLink = document.createElement('a');
        kontakLink.href = 'index.html#kontak';
        kontakLink.classList.add('mobile-nav-link');
        kontakLink.innerHTML = `<i class="fas fa-address-book"></i><span>Kontak</span>`;
        kontakLink.addEventListener('click', toggleMobileMenu);
        mobileNavLinksContainer.appendChild(kontakLink);

        const authLink = document.createElement('a');
        authLink.href = '#';
        authLink.id = 'mobile-logout-link';
        authLink.classList.add('mobile-nav-link', 'mt-4', 'justify-center');
        authLink.addEventListener('click', handleAuthClick);

        if (loggedInUser) {
            authLink.classList.add('bg-red-500', 'hover:bg-red-600', 'logout-active');
            authLink.innerHTML = `<i class="fas fa-sign-out-alt"></i><span>Logout</span>`;
        } else {
            authLink.classList.add('logged-out-styles');
            authLink.innerHTML = `<i class="fas fa-sign-in-alt"></i><span>Login</span>`;
            authLink.dataset.action = "login";
        }
        mobileNavLinksContainer.appendChild(authLink);
    }

    function toggleMobileMenu() {
        const isOpen = mobileMenuContent.classList.contains('menu-active');
        if (!isOpen) {
            populateMobileMenu();
            mobileMenuContent.classList.add('menu-active');
            mobileMenuOverlay.classList.add('menu-active');
            document.body.classList.add('overflow-hidden');
        } else {
            mobileMenuContent.classList.remove('menu-active');
            mobileMenuOverlay.classList.remove('menu-active');
            document.body.classList.remove('overflow-hidden');
        }
    }

    if (mobileMenuButton) mobileMenuButton.addEventListener('click', toggleMobileMenu);
    if (closeMobileMenuButton) closeMobileMenuButton.addEventListener('click', toggleMobileMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', toggleMobileMenu);

    if (scrollToTopBtn) scrollToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    if (document.getElementById('tahun-footer-kader')) document.getElementById('tahun-footer-kader').textContent = new Date().getFullYear();

    function animateNumber(element, start, end, duration, appendText = '') {
        let startTime = null;
        const step = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString('id-ID');
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = end.toLocaleString('id-ID') + appendText;
                element.dataset.animated = 'true';
            }
        };
        requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                if(entry.target.id === 'news-container' || entry.target.id === 'gallery-container' || entry.target.id === 'activities-container') {
                    Array.from(entry.target.children).forEach((card, i) => {
                        if(card.classList.contains('animated-section')) {
                            card.style.transitionDelay = `${i * 0.1}s`;
                            card.classList.add('is-visible');
                        }
                    });
                }
                if (entry.target.id === 'statistik') {
                    entry.target.querySelectorAll('.animated-number').forEach(numberElement => {
                        if (!numberElement.dataset.animated || numberElement.dataset.animated === 'false') {
                            const targetNumber = parseInt(numberElement.dataset.target);
                            const appendTextFromData = numberElement.dataset.appendText || '';
                            animateNumber(numberElement, 0, targetNumber, 1500, appendTextFromData);
                        }
                    });
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animated-section').forEach(section => {
        observer.observe(section);
    });

    const formKontakPesan = document.getElementById('formKontakPesan');
    const contactFormResponseMessage = document.getElementById('contact-form-response-message');

    if (formKontakPesan) {
        formKontakPesan.addEventListener('submit', async function(e) {
            e.preventDefault();

            const nama = document.getElementById('nama_kontak').value.trim();
            const email = document.getElementById('email_kontak').value.trim();
            const pesan = document.getElementById('pesan_kontak').value.trim();

            if (nama === '' || email === '' || pesan === '') {
                displayMessage(contactFormResponseMessage, 'error', 'Harap isi semua kolom formulir.');
                return;
            }

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nama, email, pesan })
                });

                if (response.ok) {
                    displayMessage(contactFormResponseMessage, 'success', 'Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.');
                    formKontakPesan.reset();
                } else {
                    const errorData = await response.json();
                    displayMessage(contactFormResponseMessage, 'error', `Gagal mengirim pesan: ${errorData.message || 'Terjadi kesalahan.'}`);
                }
            } catch (error) {
                console.error("Contact form submission error:", error);
                displayMessage(contactFormResponseMessage, 'error', 'Terjadi kesalahan jaringan saat mengirim pesan.');
            }
        });
    }

    function displayMessage(container, type, messageText) {
        container.textContent = '';
        container.classList.remove('form-message-success', 'form-message-error', 'form-message-info');

        let iconClass = '';
        if (type === 'success') {
            container.classList.add('form-message-success');
            iconClass = 'fas fa-check-circle';
        } else if (type === 'error') {
            container.classList.add('form-message-error');
            iconClass = 'fas fa-times-circle';
        } else {
            container.classList.add('form-message-info');
            iconClass = 'fas fa-info-circle';
        }

        container.innerHTML = `<i class="${iconClass} mr-2"></i> ${messageText}`;
        container.classList.add('show');

        setTimeout(() => {
            container.classList.remove('show');
        }, 5000);
    }

    const customConfirmModal = document.getElementById('customConfirmModal');
    const confirmModalTitle = document.getElementById('confirmModalTitle');
    const confirmModalMessage = document.getElementById('confirmModalMessage');
    const confirmYesBtn = document.getElementById('confirmYesBtn');
    const confirmCancelBtn = document.getElementById('confirmCancelBtn');
    let currentConfirmCallback = null;

    function showCustomConfirm(title, message, onConfirm, onCancel = null) {
        confirmModalTitle.textContent = title;
        confirmModalMessage.textContent = message;
        customConfirmModal.classList.add('active');
        currentConfirmCallback = onConfirm;

        confirmYesBtn.onclick = () => {
            if (currentConfirmCallback) {
                currentConfirmCallback();
            }
            hideCustomConfirm();
        };
        confirmCancelBtn.onclick = () => {
            if (onCancel) {
                onCancel();
            }
            hideCustomConfirm();
        };
    }

    function hideCustomConfirm() {
        customConfirmModal.classList.remove('active');
        currentConfirmCallback = null;
    }

    customConfirmModal.addEventListener('click', function(event) {
        if (event.target === customConfirmModal) {
            hideCustomConfirm();
        }
    });

});