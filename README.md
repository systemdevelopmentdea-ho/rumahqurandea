# 📖 Rumah Qur'an Dea Bakery (rumahqurandea.id)

Official Repository Website **Rumah Qur'an Dea Bakery**  
Domain Resmi: **[https://rumahqurandea.id](https://rumahqurandea.id)**

Portal kegiatan keagamaan, kurikulum pembelajaran tartil bersanad, dan jadwal rutin interaktif Rumah Qur'an Dea Bakery.

---

## ✨ Fitur Utama Website

1. **Dynamic Focus Real-Time (Hari Ini & Besok)**
   - Mendeteksi hari dan jam secara real-time (WIB).
   - Menampilkan status sesi secara live:
     - 🟢 *Sedang Berlangsung*
     - 🟡 *Akan Datang*
     - ⚪ *Selesai*
2. **Dual Mode Tampilan (Kartu & Tabel Lengkap)**
   - **Mode Kartu**: Tampilan modern, rapi, dan mudah dibaca di layar smartphone maupun desktop.
   - **Mode Tabel Master**: Menampilkan matriks jadwal mingguan lengkap (Senin s.d Sabtu, 07.30 - 17.30 WIB).
3. **Filter & Pencarian Cerdas**
   - Filter cepat berdasarkan Hari (Senin, Selasa, Rabu, Kamis, Jum'at, Sabtu).
   - Filter Kategori Program (Tahsin UMMI, Qira'at Bersanad, Tahfidz Amma, Tasmi' 1 Juz, Tafsir, Maqamat 7 Irama, TPQ Santri).
   - Kotak pencarian instan (nama kelas, ustadz/ustadzah, materi, atau sasaran peserta).
4. **Simulator Hari (Day Inspector)**
   - Memudahkan pengurus dan santri mengecek jadwal hari lain tanpa harus menunggu hari tersebut tiba.
5. **Daftar Asatidz & Pengajar Terverifikasi**
   - Profil para pembina, ustadz, dan ustadzah pengampu kelas.
6. **Integrasi WhatsApp Otomatis**
   - Tombol mengambang (*Floating Bar*) dan tombol pada setiap kartu jadwal langsung membuka WhatsApp ke Admin (**0857-3669-9198**) dengan format pesan otomatis sesuai sesi yang dipilih.
7. **Print-Friendly (Siap Cetak)**
   - Dilengkapi tombol cetak dan CSS khusus print agar jadwal dapat dicetak langsung ke kertas (A4) tanpa elemen navigasi yang mengganggu.

---

## 📂 Struktur File

```text
rumahqurandea/
├── index.html       # Halaman utama (HTML5, Modern CSS & Vanilla JS terintegrasi)
├── favicon.svg      # Favicon bernuansa hijau zamrud & ornamen emas
├── CNAME            # Konfigurasi domain kustom (rumahqurandea.id)
├── robots.txt       # Pengaturan indeks mesin pencari
├── sitemap.xml      # Peta situs XML untuk SEO
└── README.md        # Dokumentasi repositori
```

---

## 🚀 Panduan Hosting / Deployment

### Opsi 1: GitHub Pages
1. Masuk ke tab **Settings** di repositori GitHub ini.
2. Pilih menu **Pages** di bilah kiri.
3. Pada bagian **Build and deployment**:
   - Source: `Deploy from a branch`
   - Branch: `main` / `root`
4. Bagian **Custom domain**:
   - Pastikan tertera `rumahqurandea.id` (otomatis terbaca dari file `CNAME`).
   - Centang **Enforce HTTPS**.

### Opsi 2: Cloudflare Pages
1. Hubungkan repository `systemdevelopmentdea-ho/rumahqurandea` ke Cloudflare Pages.
2. Build command: *(kosongkan)*
3. Build output directory: `.` atau `/`
4. Tambahkan custom domain `rumahqurandea.id`.

---

## 📞 Kontak & Informasi

- **WhatsApp Admin**: [0857-3669-9198](https://wa.me/6285736699198)
- **Website**: [https://rumahqurandea.id](https://rumahqurandea.id)
- **Pengembang**: Dea Bakery System Development
