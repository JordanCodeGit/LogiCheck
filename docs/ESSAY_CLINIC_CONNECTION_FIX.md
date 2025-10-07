# Panduan Memperbaiki Error "Unable to connect to server" di Essay Clinic

## Masalah
Ketika mencoba menggunakan fitur Essay Clinic, muncul error:
```
Unable to connect to server. Please check your connection.
```

## Penyebab
1. **Client tidak terkonfigurasi dengan benar**: Aplikasi client mencoba terhubung ke server production Railway (`https://logicheck-production.up.railway.app/api`) padahal seharusnya menggunakan server lokal saat development.
2. **File .env tidak ada**: Tidak ada file `.env.local` di folder client yang mengatur URL API.
3. **Server .env mungkin belum dikonfigurasi**: File `.env` di server belum dibuat atau GEMINI_API_KEY belum diisi.

## Solusi

### Langkah 1: Setup Environment Variables untuk Client

1. Buka folder `client/` di project LogiCheck
2. File `.env.local` sudah dibuat dengan isi:
   ```env
   # API URL - use /api to use Vite proxy
   VITE_API_URL=/api
   ```
3. File ini akan membuat client menggunakan proxy Vite yang mengarah ke `http://localhost:5000`

### Langkah 2: Setup Environment Variables untuk Server

1. Buka folder `server/` di project LogiCheck
2. Copy file `.env.example` menjadi `.env`:
   ```powershell
   cd e:\Projects\LogiCheck\server
   Copy-Item .env.example .env
   ```
3. Buka file `.env` dan edit dengan API key Anda:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/logicheck
   GEMINI_API_KEY=MASUKKAN_API_KEY_ANDA_DI_SINI
   FRONTEND_URL=http://localhost:5173
   ```

### Langkah 3: Dapatkan Gemini API Key

1. Buka https://makersuite.google.com/app/apikey atau https://aistudio.google.com/
2. Login dengan akun Google
3. Buat API key baru
4. Copy API key tersebut
5. Paste ke file `.env` di bagian `GEMINI_API_KEY`

### Langkah 4: Restart Development Server

**Untuk Server (Backend):**
```powershell
# Stop server yang sedang berjalan (Ctrl+C di terminal server)
# Lalu jalankan lagi:
cd e:\Projects\LogiCheck\server
npm run dev
```

**Untuk Client (Frontend):**
```powershell
# Stop client yang sedang berjalan (Ctrl+C di terminal client)
# Lalu jalankan lagi:
cd e:\Projects\LogiCheck\client
npm run dev
```

**PENTING**: Restart diperlukan agar perubahan file `.env` diterapkan!

### Langkah 5: Test Kembali Essay Clinic

1. Buka browser ke `http://localhost:5173`
2. Navigasi ke halaman Essay Clinic
3. Paste essay text
4. Klik tombol "Analyze Essay"
5. Seharusnya sekarang bisa terhubung ke server!

## Verifikasi

Untuk memastikan setup benar, jalankan test berikut:

```powershell
# Test server backend berjalan
curl http://localhost:5000/api/health

# Test proxy Vite berfungsi
curl http://localhost:5173/api/health
```

Kedua perintah harus mengembalikan response:
```json
{
  "status": "ok",
  "message": "LogiCheck API is running",
  "timestamp": "..."
}
```

## Catatan Tambahan

### Konfigurasi API Key di LocalStorage (Alternatif)

Aplikasi juga mendukung penyimpanan API key di browser localStorage. Jika server tidak memiliki GEMINI_API_KEY di .env, aplikasi akan:
1. Mengambil API key dari localStorage (key: `GEMINI_API_KEY`)
2. Mengirim API key tersebut bersama request ke server
3. Server akan menggunakan API key dari request

Untuk mengatur API key di localStorage:
1. Buka DevTools browser (F12)
2. Buka Console
3. Jalankan: `localStorage.setItem('GEMINI_API_KEY', 'YOUR_API_KEY_HERE')`

### Struktur Konfigurasi API

File `client/src/api/api.js` menentukan base URL:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://logicheck-production.up.railway.app/api';
```

Dengan `.env.local` yang berisi `VITE_API_URL=/api`, maka:
- Development: Menggunakan `/api` (proxy Vite → `http://localhost:5000/api`)
- Production: Menggunakan Railway URL

### Vite Proxy Configuration

File `client/vite.config.js` sudah dikonfigurasi dengan proxy:
```javascript
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    }
  }
}
```

Ini berarti semua request ke `/api/*` akan di-forward ke `http://localhost:5000/api/*`.

## Troubleshooting

### Error masih muncul setelah restart?

1. **Periksa server backend berjalan**:
   ```powershell
   Get-Process -Name node
   ```

2. **Periksa log server** di terminal untuk error message

3. **Periksa browser DevTools**:
   - Buka Network tab
   - Lihat request ke `/api/clinic/analyze-essay`
   - Periksa URL yang dipanggil (harus `/api/...` bukan `https://logicheck-production...`)

4. **Clear browser cache**:
   - Hard refresh: Ctrl+Shift+R
   - Clear localStorage: `localStorage.clear()` di Console

5. **Pastikan API key valid**:
   - Test dengan curl:
   ```powershell
   curl -X POST http://localhost:5000/api/clinic/analyze-essay `
     -H "Content-Type: application/json" `
     -d '{"essayText":"Test essay","apiKey":"YOUR_API_KEY"}'
   ```

### Port sudah digunakan?

Jika port 5000 atau 5173 sudah digunakan:
```powershell
# Cek port 5000
Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue

# Cek port 5173
Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
```

Ubah port di:
- Server: `server/.env` → `PORT=5001`
- Client: `client/vite.config.js` → `server.port: 5174`

## File yang Dibuat/Dimodifikasi

1. ✅ `client/.env.local` - Konfigurasi API URL untuk development
2. ℹ️ `server/.env` - Perlu dibuat manual dari `.env.example`

---

**Dibuat**: 7 Oktober 2025
**Masalah**: Essay Clinic error koneksi
**Status**: Solved ✅
