/**
 * ==========================================================================
 * PORTFOLIO WEBSITE - JAVASCRIPT
 * Interaktivitas, Tema Dark/Light, Filter Proyek, Modal, Form & Notifikasi
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initHeaderScroll();
  initBackToTop();
  initActiveNavLink();
  initProjectFiltering();
  initProjectModal();
  initContactForm();
  initFaqAccordion();
  initStatsCounter();
});

/* --------------------------------------------------------------------------
   1. THEME TOGGLE (DARK / LIGHT MODE)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(toggleBtn, currentTheme);

  toggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(toggleBtn, newTheme);
  });
}

function updateThemeIcon(btn, theme) {
  const icon = btn.querySelector('i');
  if (!icon) return;
  if (theme === 'light') {
    icon.className = 'fa-solid fa-moon';
    btn.setAttribute('aria-label', 'Beralih ke Mode Gelap');
    btn.setAttribute('title', 'Beralih ke Mode Gelap');
  } else {
    icon.className = 'fa-solid fa-sun';
    btn.setAttribute('aria-label', 'Beralih ke Mode Terang');
    btn.setAttribute('title', 'Beralih ke Mode Terang');
  }
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger-btn');
  const navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  });

  // Close when clicking nav link
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --------------------------------------------------------------------------
   3. HEADER SCROLL EFFECT
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 25) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   4. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backBtn = document.getElementById('back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  }, { passive: true });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   5. ACTIVE NAVIGATION LINK
   -------------------------------------------------------------------------- */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* --------------------------------------------------------------------------
   6. PROJECT FILTERING & LIVE SEARCH (proyek.html & index.html)
   -------------------------------------------------------------------------- */
function initProjectFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('project-search');
  const projectCards = document.querySelectorAll('.project-card');
  const noProjectsMsg = document.getElementById('no-projects-msg');

  if (!filterButtons.length && !searchInput) return;

  let currentCategory = 'all';
  let searchQuery = '';

  const applyFilters = () => {
    let visibleCount = 0;

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const title = (card.querySelector('.project-title')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.project-desc')?.textContent || '').toLowerCase();
      const tech = (card.querySelector('.project-tech')?.textContent || '').toLowerCase();

      const matchesCategory = currentCategory === 'all' || category.toLowerCase() === currentCategory.toLowerCase();
      const matchesSearch = !searchQuery || title.includes(searchQuery) || desc.includes(searchQuery) || tech.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noProjectsMsg) {
      noProjectsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  };

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }
}

/* --------------------------------------------------------------------------
   7. PROJECT DETAILS MODAL
   -------------------------------------------------------------------------- */
// Data Proyek Detail untuk Modal
const projectsData = {
  1: {
    title: "E-Commerce Gadget Store",
    category: "Web Application",
    badge: "Fullstack",
    imageType: "ecommerce",
    desc: "Platform toko daring modern untuk perangkat gadget & elektronik dengan fitur keranjang belanja real-time, integrasi gateway pembayaran simulasi, filter katalog bertingkat, dan dashboard manajemen pesanan interaktif.",
    challenges: "Mengoptimalkan performa rendering ratusan produk dan manajemen state keranjang belanja tanpa dependensi berat.",
    solution: "Implementasi virtual scrolling, caching state di localStorage, dan modular component pattern untuk performa secepat kilat.",
    features: [
      "Katalog responsif dengan filter harga, kategori, dan rating",
      "Sistem keranjang belanja dinamis dengan perhitungan pajak & ongkir otomatis",
      "Checkout wizard multi-langkah dengan validasi realtime",
      "Dashboard status riwayat pesanan bagi pengguna"
    ],
    tech: ["HTML5", "CSS3 / Sass", "JavaScript ES6+", "LocalStorage API", "Chart.js"],
    liveUrl: "#",
    githubUrl: "https://github.com/iqbalee-creator/Portofolio"
  },
  2: {
    title: "SaaS Analytics & Financial Dashboard",
    category: "Frontend Web App",
    badge: "Dashboard",
    imageType: "dashboard",
    desc: "Dashboard analitik keuangan bisnis berbasis cloud yang menyajikan metrik pendapatan, konversi pengguna, laporan arus kas visual, dan perbandingan target bulanan dengan visualisasi data interaktif.",
    challenges: "Menampilkan dataset keuangan yang kompleks secara rapi di berbagai ukuran layar mulai dari ponsel pintar hingga layar monitor ultra-wide.",
    solution: "Mengadopsi layout CSS Grid & Flexbox adaptif, serta diagram responsif yang menyesuaikan ukuran viewport secara otomatis.",
    features: [
      "Visualisasi chart interaktif (Line, Bar, Doughnut charts)",
      "Ekspor laporan keuangan ke format CSV dan PDF",
      "Toggle tema Dark / Light mode yang terintegrasi",
      "Tabel data dinamis dengan fungsi sortir dan pencarian"
    ],
    tech: ["JavaScript Modern", "CSS Custom Properties", "SVG Charting", "REST API Simulation"],
    liveUrl: "#",
    githubUrl: "https://github.com/iqbalee-creator/Portofolio"
  },
  3: {
    title: "Aplikasi Manajemen Tugas (TaskMaster)",
    category: "Productivity Tool",
    badge: "Web App",
    imageType: "task",
    desc: "Aplikasi manajemen produktivitas tim dengan papan Kanban interaktif, fitur drag-and-drop tugas, label prioritas, pengingat deadline, dan pelacakan progres proyek.",
    challenges: "Menciptakan animasi drag-and-drop kartu tugas yang mulus dan bebas lag pada perangkat layar sentuh mobile.",
    solution: "Pemanfaatan HTML5 Drag and Drop API yang dipadukan dengan Touch Events API untuk pengalaman pengguna yang intuitif di perangkat mobile.",
    features: [
      "Papan Kanban dengan status: To-Do, In Progress, Review, dan Done",
      "Fitur drag and drop kartu tugas yang mulus",
      "Filter tugas berdasarkan prioritas (Tinggi, Sedang, Rendah)",
      "Penyimpanan data lokal persisten agar data tetap tersimpan saat reload"
    ],
    tech: ["HTML5 Drag & Drop", "Modern CSS", "Vanilla JavaScript", "Web Storage"],
    liveUrl: "#",
    githubUrl: "https://github.com/iqbalee-creator/Portofolio"
  },
  4: {
    title: "Healthcare Clinic Portal & Booking",
    category: "Web Application",
    badge: "Fullstack",
    imageType: "health",
    desc: "Portal layanan kesehatan terpadu yang memudahkan pasien membuat janji temu dokter spesialis secara online, melihat ketersediaan jadwal dokter, dan mengakses rekam medis digital.",
    challenges: "Menyusun alur reservasi jadwal dokter yang akurat tanpa risiko jadwal bentrok (double booking).",
    solution: "Validasi jadwal real-time berbasis slot waktu dan sistem konfirmasi instan.",
    features: [
      "Pencarian dokter berdasarkan spesialisasi & rumah sakit",
      "Kalender interaktif pemilihan tanggal dan jam konsultasi",
      "Notifikasi konfirmasi janji temu via email/WhatsApp simulasi",
      "Desain antarmuka bersih dan ramah untuk segala usia"
    ],
    tech: ["JavaScript", "CSS Grid", "Responsive Design", "Form Validation API"],
    liveUrl: "#",
    githubUrl: "https://github.com/iqbalee-creator/Portofolio"
  },
  5: {
    title: "Design System & UI Component Library",
    category: "UI/UX & Design",
    badge: "UI/UX",
    imageType: "design",
    desc: "Koleksi komponen antarmuka terstandarisasi untuk mempercepat pembuatan produk digital. Mencakup tombol, modal, input, dropdown, kartu, tooltip, hingga panduan tipografi dan warna.",
    challenges: "Menjaga konsistensi token warna, ukuran jarak (spacing), dan aksesibilitas (WCAG 2.1 AA) di seluruh komponen.",
    solution: "Penggunaan arsitektur CSS Variables terstruktur dengan semantic naming dan pengujian kontras warna otomatis.",
    features: [
      "Dokumentasi komponen interaktif dengan live code preview",
      "Dukungan aksesibilitas lengkap (ARIA roles, keyboard nav)",
      "Skema warna fleksibel untuk berbagai tema brand",
      "Ukuran file ultra-ringan tanpa framework berat eksternal"
    ],
    tech: ["Figma", "CSS3 Variables", "Modular HTML", "Accessibility (a11y)"],
    liveUrl: "#",
    githubUrl: "https://github.com/iqbalee-creator/Portofolio"
  },
  6: {
    title: "Aplikasi Mobile Edukasi & Quiz Interaktif",
    category: "Mobile Web App",
    badge: "Mobile",
    imageType: "mobile",
    desc: "Aplikasi pembelajaran mandiri berbasis kuis interaktif dengan sistem skor, animasi timer seru, leaderboard peringkat, dan pembahasan jawaban yang mendalam.",
    challenges: "Menciptakan animasi transisi kartu kuis yang menyenangkan dengan performa 60 FPS pada smartphone kelas pemula.",
    solution: "Optimalisasi animasi CSS Hardware-Accelerated (transform & opacity) dan audio efek sintetis ringan.",
    features: [
      "Mode kuis berwaktu dengan countdown timer interaktif",
      "Statistik skor akhir, akurasi, dan ringkasan pembahasan",
      "Pilihan kategori topik pemrograman, desain, dan sains",
      "PWA ready untuk di-install ke layar utama smartphone"
    ],
    tech: ["Mobile-First CSS", "JavaScript ES6", "Web Audio API", "PWA Architecture"],
    liveUrl: "#",
    githubUrl: "https://github.com/iqbalee-creator/Portofolio"
  }
};

function getProjectSvgImage(type, title) {
  const colorMap = {
    ecommerce: { c1: '#4f46e5', c2: '#06b6d4', icon: 'M4 4h16v3H4zm1 5h14l-2 11H7L5 9zm4 3v5m6-5v5' },
    dashboard: { c1: '#2563eb', c2: '#10b981', icon: 'M3 3v18h18M7 16l4-6 4 3 5-8' },
    task: { c1: '#7c3aed', c2: '#ec4899', icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' },
    health: { c1: '#059669', c2: '#0284c7', icon: 'M12 4v16m8-8H4' },
    design: { c1: '#d946ef', c2: '#8b5cf6', icon: 'M12 2l8 8-8 8-8-8 8-8zm0 5v6m-3-3h6' },
    mobile: { c1: '#ea580c', c2: '#f59e0b', icon: 'M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm5 16h.01' }
  };

  const c = colorMap[type] || colorMap.ecommerce;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="grad-${type}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${c.c1}" />
          <stop offset="100%" stop-color="${c.c2}" />
        </linearGradient>
        <pattern id="grid-${type}" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad-${type})" />
      <rect width="100%" height="100%" fill="url(#grid-${type})" />
      
      <!-- Mockup Window Card -->
      <g transform="translate(100, 55)">
        <rect width="600" height="340" rx="14" fill="#0f172a" opacity="0.88" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />
        <!-- Window dots -->
        <circle cx="28" cy="24" r="5" fill="#ef4444" />
        <circle cx="46" cy="24" r="5" fill="#f59e0b" />
        <circle cx="64" cy="24" r="5" fill="#10b981" />
        <line x1="0" y1="46" x2="600" y2="46" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
        
        <!-- Inner Mockup Elements -->
        <rect x="25" y="70" width="160" height="235" rx="8" fill="#1e293b" opacity="0.6"/>
        <rect x="210" y="70" width="365" height="40" rx="8" fill="#1e293b" opacity="0.6"/>
        <rect x="210" y="125" width="175" height="105" rx="8" fill="#1e293b" opacity="0.7"/>
        <rect x="400" y="125" width="175" height="105" rx="8" fill="#1e293b" opacity="0.7"/>
        <rect x="210" y="245" width="365" height="60" rx="8" fill="#1e293b" opacity="0.6"/>
        
        <!-- Center Emblem -->
        <circle cx="400" cy="190" r="42" fill="url(#grad-${type})" opacity="0.25" />
        <path d="${c.icon}" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" transform="translate(388, 178) scale(1.1)"/>
      </g>
    </svg>
  `;
}

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const closeBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-img-container');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalChallenges = document.getElementById('modal-challenges');
  const modalSolution = document.getElementById('modal-solution');
  const modalFeatures = document.getElementById('modal-features');
  const modalTech = document.getElementById('modal-tech');
  const modalLive = document.getElementById('modal-live-btn');
  const modalGithub = document.getElementById('modal-github-btn');

  const openModal = (id) => {
    const data = projectsData[id];
    if (!data) return;

    if (modalImg) modalImg.innerHTML = getProjectSvgImage(data.imageType, data.title);
    if (modalCategory) modalCategory.textContent = data.category;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.desc;
    if (modalChallenges) modalChallenges.textContent = data.challenges;
    if (modalSolution) modalSolution.textContent = data.solution;

    if (modalFeatures) {
      modalFeatures.innerHTML = data.features.map(f => `
        <div class="modal-feature-item">
          <i class="fa-solid fa-circle-check"></i>
          <span>${f}</span>
        </div>
      `).join('');
    }

    if (modalTech) {
      modalTech.innerHTML = data.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');
    }

    if (modalLive) modalLive.setAttribute('href', data.liveUrl);
    if (modalGithub) modalGithub.setAttribute('href', data.githubUrl);

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      openModal(id);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   8. CONTACT FORM & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const charCounter = document.getElementById('char-count');
  const messageInput = document.getElementById('pesan');

  // Character counter for message textarea
  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const currentLength = messageInput.value.length;
      charCounter.textContent = `${currentLength}/500`;
      if (currentLength > 500) {
        charCounter.style.color = 'var(--danger)';
      } else {
        charCounter.style.color = 'var(--text-muted)';
      }
    });
  }

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('nama');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subjek');
    const submitBtn = form.querySelector('button[type="submit"]');

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
      setError(nameInput, 'Mohon masukkan nama lengkap Anda (minimal 3 karakter).');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
      setError(emailInput, 'Mohon masukkan alamat email yang valid.');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      setError(subjectInput, 'Mohon pilih atau masukkan subjek pesan.');
      isValid = false;
    } else {
      clearError(subjectInput);
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      setError(messageInput, 'Pesan Anda terlalu singkat (minimal 10 karakter).');
      isValid = false;
    } else if (messageInput.value.trim().length > 500) {
      setError(messageInput, 'Pesan melebihi batas maksimal 500 karakter.');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (!isValid) {
      showToast('Harap periksa kembali isian formulir Anda.', 'error');
      return;
    }

    // Loading State
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim Pesan...';

    // Simulate Server Request Delay
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;

      form.reset();
      if (charCounter) charCounter.textContent = '0/500';

      showToast('Terima kasih! Pesan Anda telah berhasil dikirim. Saya akan segera membalas email Anda.', 'success');
    }, 1200);
  });
}

function setError(inputElement, message) {
  const parent = inputElement.closest('.form-group');
  if (!parent) return;
  parent.classList.add('has-error');
  const errorSpan = parent.querySelector('.form-error');
  if (errorSpan) errorSpan.textContent = message;
}

function clearError(inputElement) {
  const parent = inputElement.closest('.form-group');
  if (!parent) return;
  parent.classList.remove('has-error');
  const errorSpan = parent.querySelector('.form-error');
  if (errorSpan) errorSpan.textContent = '';
}

function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconClass = type === 'success' ? 'fa-check' : 'fa-exclamation-triangle';
  const titleText = type === 'success' ? 'Sukses!' : 'Peringatan!';

  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fa-solid ${iconClass}"></i>
    </div>
    <div class="toast-message">
      <div class="toast-title">${titleText}</div>
      <div>${message}</div>
    </div>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove after 4.5s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4500);
}

/* --------------------------------------------------------------------------
   9. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items (accordion mode)
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   10. STATS COUNTER ANIMATION
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-num[data-target]');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const runCounter = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = current + suffix;
      }, 35);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        runCounter();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-strip');
  if (statsSection) {
    observer.observe(statsSection);
  }
}
