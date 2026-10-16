# Workspace Rules - Website Projects

## Git & Repository Infrastructure
- Seluruh proyek di dalam workspace ini dikelola via Git & GitHub lokal (`git` & `gh` CLI sudah terpasang).
- **Prosedur Update Kode**:
  1. Langsung edit file di direktori kerja lokal menggunakan tools editing.
  2. Commit perubahan dengan format pesan yang rapi (misal: `feat:`, `fix:`, `style:`).
  3. Lakukan `git push origin main` agar auto-deploy (Cloudflare Pages) langsung terpicu.
  4. Hindari meminta user meng-copy-paste kode manual ke file atau mendownload file manual.

## Rumah Qur'an Dea Bakery (`rumahqurandea`)
- **Domain**: https://rumahqurandea.id
- **Remote Repo (Dual-Push Aktif)**:
  - Repo 1 (Cloudflare Paid / dea.management): `https://github.com/dcb-development/RQdea-yamur.git`
  - Repo 2 (Original / RQ Team): `https://github.com/systemdevelopmentdea-ho/rumahqurandea.git`
- **Akun Terkait**: `System Development Dea Bakery` (`dev@deabakery.id`), `dcb-development`, & `rumahqurandea` (`rumahqurandeabakery@gmail.com` / `rumahqurandea@gmail.com`)
- **Cloudflare Infrastructure (dea.management Paid Account)**:
  - Worker Project: `rqdea-yamur` (Full-Stack Worker dengan `_worker.js` + static assets)
  - D1 SQLite Database: `rumahquran` (ID: `f6e4b531-ea65-4a36-8f37-0b49f3df4936`, binding: `DB`)
  - R2 Object Storage: `rumahquran` (binding: `BUCKET`)
  - API Endpoints: `/api/pendaftaran` (D1 SQLite), `/api/files/:key` (R2 Storage)
- **Demo Sync**: File di `rumahqurandea/index.html` dan `bahasa-arab.html` juga disinkronkan ke `rakyat.space/demo/rumah-quran-dea-bakery/`.

