# VCGamers QA Internship — Playwright E2E (Gercep)

## Skenario Uji
**Scenario A — Open Gercep & Check Title (per spesifikasi)**
1) Buka `https://vcgamers.com/gercep`  
2) Verifikasi URL mengandung `/gercep`  
3) Verifikasi page title mengandung `VCGamers`  

> Catatan: di situs live saat pengujian, title adalah **"Top Up Game Gercep, Termurah dan 100% Aman"**, sehingga cek `VCGamers` **FAIL** (deviasi spek vs real). Bukti tersimpan di report (attachment `actual-title.txt` + screenshot).

**Scenario B — Search Bar Interaction**  
- Ketik `mobile legends` di search bar (placeholder: *Cari Nama Brand di Gercep...*)  
- Tekan Enter  
- Verifikasi minimal 1 hasil “Mobile Legends” terlihat  

**Scenario C — Click First Item**  
- Klik hasil “Mobile Legends” pertama  
- Verifikasi halaman brand terbuka (**URL berubah** atau **judul brand terlihat**)

## Hasil Ringkas
- Scenario A: **FAIL** (sesuai spek, karena title live ≠ `VCGamers`)  
- Scenario B: **PASS**  
- Scenario C: **PASS**

## Cara Setup
```bash
npm install
npx playwright install --with-deps


## Cara Menjalankan
```bash
npx playwright test
npx playwright test --ui (UI Mode)
npx playwright show-report (Untuk Melihat Report)

