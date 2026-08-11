# Rencana Pengembangan Backend: Geomitigasi

## 1. Tentang Website Ini
Berdasarkan struktur frontend yang ada, **Geomitigasi** adalah sebuah platform/sistem informasi geografis (GIS) dan dashboard manajemen risiko bencana, yang secara spesifik berfokus pada **mitigasi risiko banjir (Flood Risk Management)**. 

Aplikasi ini ditujukan untuk digunakan oleh pemerintah daerah, badan penanggulangan bencana (seperti BPBD), atau pengambil kebijakan untuk memantau, merespons, dan mengelola infrastruktur terkait pencegahan dan penanganan banjir.

## 2. Fitur & Halaman Utama (Frontend)
Dari folder `src/app`, website ini memiliki beberapa halaman utama:
- **/dashboard**: Halaman utama (overview) untuk melihat metrik statistik, ringkasan zona risiko, dan status secara umum.
- **/flood-risk**: Halaman khusus untuk melihat pemetaan zona risiko banjir (menggunakan peta interaktif `leaflet`), informasi ketinggian air (water level), dan populasi penduduk di area terdampak.
- **/infrastructure**: Halaman manajemen aset infrastruktur (seperti pompa air, tanggul, drainase), memantau kondisi fisik (excellent hingga critical) dan riwayat inspeksinya.
- **/reporting**: Halaman untuk mengelola laporan dari warga (Citizen Reports) terkait insiden di lapangan, mencakup status penanganan (`pending`, `verified`, `in-progress`, `resolved`).
- **/alerts**: Halaman sistem peringatan dini (Early Warning System) yang menampilkan notifikasi gawat darurat beserta aksi yang diperlukan (`evacuate`, `deploy`, dll).
- **/login**: Halaman autentikasi untuk admin atau petugas.

## 3. Entitas Data Utama (Berdasarkan Frontend)
Frontend telah mendefinisikan struktur data di `src/types/index.ts` yang artinya Backend harus menyediakan data dengan bentuk seperti berikut:
1. **FloodZone (Zona Banjir)**: Data wilayah dengan titik koordinat (lat, lng), tingkat risiko, ketinggian air, dan jumlah penduduk.
2. **CitizenReport (Laporan Warga)**: Laporan yang memiliki detail lokasi, waktu, kategori, prioritas, serta status penyelesaian.
3. **InfrastructureAsset (Aset Infrastruktur)**: Data infrastruktur dengan skor risiko, kondisi, tipe, dan riwayat terakhir diinspeksi.
4. **AlertItem (Peringatan)**: Data notifikasi atau peringatan yang mencakup tingkat keparahan, zona, dan tindakan (actionKey).
5. **RiskLevel**: Enum yang digunakan secara luas dengan nilai (`low`, `moderate`, `high`, `critical`).

## 4. Gambaran Kebutuhan Backend (Langkah Selanjutnya)
Berdasarkan analisis di atas, backend yang akan kita rancang perlu meliputi:
1. **Database Schema**: Membuat skema database (misal MySQL, PostgreSQL, atau MongoDB) untuk entitas-entitas di atas.
2. **REST API Endpoint**: Membuat rute API untuk melayani operasi CRUD dari Dashboard.
   - `GET /api/flood-zones`
   - `GET, POST, PUT /api/reports`
   - `GET, PUT /api/infrastructure`
   - `GET /api/alerts`
3. **Auth System**: Membuat sistem Login (JWT/Session).
4. **Mock Data / Seeder**: Karena website ini baru frontend, backend perlu menyuntikkan data palsu (dummy data) awal agar dashboard bisa langsung menampilkan informasi (tidak kosong).

(kalo gua ngeprompt jangan langsung eksekusi, biar aku aja yg bikin tapi ttp jelasin)