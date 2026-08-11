# Geomitigasi - Portal Manajemen Risiko Banjir

Geomitigasi adalah platform portal informasi geografis (GIS) dan dashboard manajemen risiko bencana yang difokuskan pada mitigasi bencana banjir (Flood Risk Management). Aplikasi ini dirancang untuk membantu instansi penanggulangan bencana (seperti BPBD) atau pemerintah daerah dalam memetakan zona risiko, memantau infrastruktur penahan banjir, serta mengelola laporan dari warga secara real-time.

Aplikasi ini dibangun menggunakan arsitektur **MERN Stack** (MongoDB, Express, React/Next.js, Node.js).

---

## 🚀 Fitur Utama

- **Interactive Flood Map (GIS):** Pemetaan zona banjir secara interaktif dengan indikasi tingkat risiko bahaya (low, moderate, high, critical) menggunakan Leaflet Map.
- **Real-time Early Warning System (Alerts):** Peringatan dini otomatis jika ketinggian air melebihi ambang batas aman beserta aksi tanggap darurat yang direkomendasikan.
- **Infrastructure Asset Monitoring:** Pemantauan status kesehatan infrastruktur vital (stasiun pompa, tanggul, kolam retensi, jaringan drainase).
- **Citizen Incident Reporting:** Manajemen sistem pelaporan insiden langsung dari warga mulai dari status *pending* hingga penanganan selesai (*resolved*).
- **Dynamic Stats & Analytics Dashboard:** Visualisasi metrik populasi terdampak, persentase persebaran risiko, dan diagram tren banjir.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS & Radix UI (Shadcn)
- **Maps:** Leaflet & React Leaflet
- **Charts:** Recharts
- **Iconography:** Lucide Icons

### Backend (Server) & Database
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Local / Atlas)
- **ODM:** Mongoose

---

## 📂 Struktur Project

```text
geomitigasi-fitcomp/
├── backend/                  # SERVER SIDE (Express + MongoDB)
│   ├── config/               # Konfigurasi database
│   ├── models/               # Schema Mongoose (Database blueprint)
│   ├── routes/               # API Endpoints
│   ├── .env                  # Environment backend (dihilangkan di Git)
│   ├── seeder.js             # Script suntik data dummy awal
│   └── server.js             # Entrypoint server Express
│
├── src/                      # CLIENT SIDE (Next.js Frontend)
│   ├── app/                  # Router halaman Next.js
│   ├── components/           # Komponen UI/UX
│   ├── lib/                  # Logika utilitas & API connector (api.ts)
│   └── types/                # Definisi tipe data TypeScript
│
└── .env.local                # Environment frontend (dihilangkan di Git)
```

---

## ⚙️ Setup & Instalasi Lokal

### Prerequisites
Pastikan Anda sudah menginstal:
- [Node.js](https://nodejs.org/) (versi LTS terbaru)
- [MongoDB](https://www.mongodb.com/) (pastikan service mongodb sudah berjalan secara lokal di port `27017`)

---

### 1. Jalankan Backend (Express Server)

1. Masuk ke direktori backend:
   ```bash
   cd backend
   ```
2. Instal semua dependensi:
   ```bash
   npm install
   ```
3. Buat file `.env` di dalam folder `backend/` dan isi konfigurasinya:
   ```env
   PORT=5001
   MONGODB_URI=mongodb://127.0.0.1:27017/geomitigasi
   ```
4. Jalankan seeder untuk memasukkan data awal ke MongoDB:
   ```bash
   node seeder.js
   ```
5. Jalankan server backend dalam mode development:
   ```bash
   npm run J
   ```
   *(Server akan berjalan di http://localhost:5001)*

---

### 2. Jalankan Frontend (Next.js Client)

1. Kembali ke root direktori utama project:
   ```bash
   cd ..
   ```
2. Instal semua dependensi frontend:
   ```bash
   npm install
   ```
3. Buat file `.env.local` di root direktori project dan isi konfigurasinya:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5001/api
   ```
4. Jalankan server frontend dalam mode development:
   ```bash
   npm run dev
   ```
   *(Aplikasi frontend dapat diakses melalui browser di http://localhost:3000)*
