# 🚀 Website Portofolio Pribadi Modern & Responsif

Selamat datang di proyek website portofolio pribadi yang dirancang menggunakan **HTML5 semantik**, **CSS3 modern (dengan CSS Variables & Flexbox/Grid)**, dan **JavaScript vanilla** tanpa dependensi berat eksternal.

---

## 📁 Struktur Direktori

```text
Website-Portofolio/
│
├── index.html          # Halaman Beranda (Hero, Bio, Layanan, Proyek Unggulan, Testimoni, CTA)
├── proyek.html         # Halaman Galeri Proyek (Filter kategori, Pencarian realtime, Modal detail)
├── kontak.html         # Halaman Kontak (Formulir validasi realtime, Info kontak, FAQ accordion)
│
├── css/
│   └── style.css       # Stylesheet terpadu, responsif, & tema Dark/Light Mode
│
├── js/
│   └── script.js       # Interaktivitas: toggle tema, hamburger menu, filter, modal, form & toast
│
└── README.md           # Panduan penggunaan & kustomisasi
```

---

## ✨ Fitur-Fitur Utama

1. **Desain 100% Responsif (Mobile-Friendly)**
   - Mendukung optimal pada perangkat Mobile (320px–480px), Tablet (768px), Laptop (1024px), hingga Monitor Desktop (1200px+).
   - Menu navigasi mobile berupa drawer halus dengan animasi hamburger button.

2. **Dukungan Dark Mode & Light Mode**
   - Toggle tema di navbar atas dengan ikon interaktif (Matahari / Bulan).
   - Preferensi tema disimpan otomatis ke `localStorage` browser sehingga tetap aktif saat berganti halaman.

3. **Halaman Beranda (`index.html`)**
   - **Hero Section**: Sapaan interaktif, headline gradient, status pill ketersediaan, tautan sosial media, dan ilustrasi SVG karakter developer.
   - **Counter Statistik Pengalaman**: Animasi hitung angka otomatis saat discroll ke layar.
   - **Tentang Saya & Keahlian**: Kartu bio dan pengelompokan skill (Frontend, Backend & Database, Alat/Workflow).
   - **Layanan**: Kartu layanan dengan efek hover elevasi modern.
   - **Proyek Unggulan**: Cuplikan 3 proyek terbaik dengan tombol preview langsung dan modal popup.
   - **Testimoni Klien**: Ulasan berating bintang dengan kartu modern.

4. **Halaman Galeri Proyek (`proyek.html`)**
   - **Filter Kategori Real-Time**: Menyaring proyek berdasarkan kategori (*Semua*, *Web App*, *Frontend*, *UI/UX Design*, *Mobile App*).
   - **Pencarian Cepat (Live Search)**: Mencari proyek berdasarkan judul, deskripsi, atau nama teknologi.
   - **Popup Detail Proyek (Modal Dialog)**: Menampilkan studi kasus mendalam mencakup tantangan, solusi arsitektur, daftar fitur, teknologi, serta link demo langsung.

5. **Halaman Kontak (`kontak.html`)**
   - **Informasi Kontak Langsung**: Tautan langsung ke Email, WhatsApp, Domisili, dan Waktu Operasional.
   - **Formulir Interaktif**: Dilengkapi validasi input instan (nama, email, subjek, pesan) dan penghitung karakter sisa (max 500).
   - **Toast Alert Notifikasi**: Notifikasi sukses mengambang elegan saat pesan berhasil dikirim.
   - **FAQ Accordion**: Tanya jawab interaktif yang dapat dibuka/tutup secara mulus.

6. **Aksesibilitas & Kode Bersih**
   - Tag HTML5 semantik (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   - Atribut ARIA untuk navigasi, tombol modal, dan input formulir.

---

## 🖥️ Cara Membuka Website

Anda tidak memerlukan server khusus untuk menjalankan website ini. Anda dapat membukanya langsung di browser:

1. **Cara Langsung (File Browser)**:
   - Buka folder `c:\Users\Hi\Downloads\Website-Portofolio` di File Explorer Windows.
   - Klik ganda pada file `index.html`.
   - Website akan langsung terbuka di browser default Anda (Google Chrome, Microsoft Edge, Firefox, dsb).

2. **Menggunakan Live Server (VS Code)** *(Opsional jika menggunakan VS Code)*:
   - Buka folder ini di Visual Studio Code.
   - Klik kanan pada `index.html` dan pilih **"Open with Live Server"**.

---

## 🎨 Panduan Kustomisasi

- **Mengubah Nama & Biodata**:
  Buka file `index.html`, `proyek.html`, dan `kontak.html`, lalu cari teks `Alex Pratama` dan ganti dengan nama Anda.
- **Mengubah Info Kontak**:
  Buka `kontak.html` dan sesuaikan alamat email (`alex.pratama@example.com`) serta nomor WhatsApp (`+62 812-3456-7890`).
- **Menambah / Mengubah Data Proyek di Modal**:
  Buka file `js/script.js` dan cari objek `projectsData`. Anda dapat menambahkan proyek baru atau menyesuaikan deskripsi, tautan GitHub, dan demo langsung.
- **Menyesuaikan Warna Tema**:
  Buka `css/style.css` pada bagian `:root` untuk mengganti warna aksen utama `--accent-primary` dan `--accent-secondary`.
