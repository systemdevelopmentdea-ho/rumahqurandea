-- ============================================================
-- Skema Database D1 Cloudflare: Rumah Qur'an Dea Bakery
-- Database Name: rumahquran
-- Database ID: f6e4b531-ea65-4a36-8f37-0b49f3df4936
-- ============================================================

-- 1. Tabel Pendaftaran Santri Baru Online
CREATE TABLE IF NOT EXISTS pendaftaran_santri (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_lengkap TEXT NOT NULL,
    jenis_kelamin TEXT NOT NULL,
    usia INTEGER,
    nama_wali TEXT NOT NULL,
    no_wa TEXT NOT NULL,
    program TEXT NOT NULL, -- e.g., 'Tahsin Dewasa', 'Tahfidz Anak', 'TPQ & BTA', 'Bahasa Arab'
    alamat TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'terverifikasi', 'aktif'
    catatan TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabel Donasi & Infaq
CREATE TABLE IF NOT EXISTS donasi_infaq (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_donatur TEXT NOT NULL,
    no_wa TEXT,
    nominal INTEGER NOT NULL,
    program TEXT DEFAULT 'Operasional Rumah Quran', -- 'Operasional', 'Wakaf Al-Quran', 'Bantuan Santri'
    bukti_transfer_r2_key TEXT, -- Kunci file bukti transfer di R2 Storage
    status TEXT DEFAULT 'pending', -- 'pending', 'dikonfirmasi'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabel Katalog Berkas & Dokumen di R2 Storage
CREATE TABLE IF NOT EXISTS berkas_r2 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_file TEXT NOT NULL,
    r2_key TEXT NOT NULL UNIQUE,
    kategori TEXT DEFAULT 'modul', -- 'modul_pdf', 'audio_murottal', 'foto_kegiatan', 'brosur'
    tipe_mime TEXT,
    ukuran_byte INTEGER,
    deskripsi TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index untuk mempercepat pencarian data
CREATE INDEX IF NOT EXISTS idx_santri_wa ON pendaftaran_santri(no_wa);
CREATE INDEX IF NOT EXISTS idx_santri_status ON pendaftaran_santri(status);
CREATE INDEX IF NOT EXISTS idx_donasi_status ON donasi_infaq(status);
CREATE INDEX IF NOT EXISTS idx_berkas_kategori ON berkas_r2(kategori);
