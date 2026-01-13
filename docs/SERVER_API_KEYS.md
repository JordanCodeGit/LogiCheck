# Server-Managed API Keys Feature

## Overview
LogiCheck sekarang menyediakan opsi **Server-Managed API Key** untuk memudahkan pengguna memulai tanpa perlu membuat API key sendiri.

## ⚠️ Security Update (January 2026)
Sebelumnya, shared API keys di-hardcode di frontend code yang menyebabkan keys terekspos di GitHub. Sekarang, API keys disimpan secara aman di **server environment variables** dan tidak pernah dikirim ke frontend.

## Arsitektur Baru

### Bagaimana Cara Kerjanya:
1. User mengklik "Use Server Key" di Settings
2. Frontend menyimpan flag `USE_SERVER_KEY=true` di localStorage (BUKAN key sebenarnya)
3. Saat melakukan analisis, frontend mengirim request TANPA API key
4. Backend menggunakan API key dari environment variables
5. API key tidak pernah terekspos ke client/browser

### Keuntungan:
- ✅ API keys tidak terekspos di source code
- ✅ API keys tidak ada di GitHub
- ✅ Keys bisa di-rotate tanpa update frontend
- ✅ Support multiple keys dengan round-robin rotation
- ✅ Rate limiting terdistribusi antar keys

## Konfigurasi Server

### Environment Variables (.env):
```dotenv
# Single key
GEMINI_API_KEY=your_api_key_here

# Multiple keys untuk load balancing
GEMINI_API_KEY_2=second_api_key_here
GEMINI_API_KEY_3=third_api_key_here
GEMINI_API_KEY_4=fourth_api_key_here
```

### Key Rotation:
Server secara otomatis melakukan round-robin rotation antar semua keys yang tersedia untuk mendistribusikan load dan mengurangi rate limiting.

## User Experience

### Menggunakan Server Key:
1. Buka **Settings** page
2. Klik tombol hijau "Use Server Key"
3. Langsung bisa menggunakan LogiCheck!

### Menggunakan API Key Sendiri:
1. Buka **Settings** page
2. Expand section "How to Get Your API Key"
3. Ikuti instruksi untuk mendapatkan API key dari Google AI Studio
4. Paste API key ke input field
5. Klik "Save API Key"

## Visual Indicators

- **Green background** untuk Server Key section (dengan icon Server 🖥️)
- **Indigo/Purple background** untuk Custom API Key section (dengan icon Zap ⚡)
- **Check mark** pada tombol jika Server Key aktif

## Security Notes

- API keys server HANYA disimpan di environment variables
- API keys TIDAK pernah dikirim ke frontend
- User custom keys disimpan di localStorage browser (tidak di server)
- Keys dikirim langsung ke Google's Gemini API dari server

## Performance Trade-offs

### Server Key:
- ✅ Instant setup - no registration needed
- ✅ Langsung bisa digunakan
- ✅ Secure - key tidak terekspos
- ⚠️ Mungkin lebih lambat saat high traffic

### Custom Keys:
- ✅ Performa optimal
- ✅ Personal rate limit
- ⏱️ Butuh waktu untuk setup (register Google AI)

## Implementation Files

### Frontend:
- `client/src/components/ApiKeySettings.jsx` - UI Settings
- `client/src/utils/apiKeyUtils.js` - API key utility functions

### Backend:
- `server/config/gemini.js` - Gemini API configuration with key rotation
- `server/.env` - Environment variables (not committed to Git)
