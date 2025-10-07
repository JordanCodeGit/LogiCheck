# Shared API Keys Feature

## Overview
LogiCheck sekarang menyediakan opsi **Shared API Keys** untuk memudahkan pengguna memulai tanpa perlu membuat API key sendiri.

## Fitur

### 1. Quick Start - Shared API Keys
- **4 tombol pilihan** API key yang sudah disediakan
- User dapat langsung klik tombol untuk mengaktifkan
- Otomatis tersimpan dan langsung bisa digunakan
- **Peringatan**: Shared keys mungkin lebih lambat karena dibagi dengan user lain

### 2. Optimal Performance - Your Own API Key
- User tetap bisa memasukkan API key pribadi mereka
- Memberikan performa lebih cepat dan reliable
- API key disimpan secara lokal di browser

## Shared API Keys yang Tersedia

```javascript
Key 1: AIzaSyDfRha-Fa2HcEO_iLSKv8EpTklKud6hhi8
Key 2: AIzaSyDfRha-Fa2HcEO_iLSKv8EpTklKud6hhi8
Key 3: AIzaSyBdb8YgwUjjt8Ucd20kHP0IoTKtejytsUU
Key 4: AIzaSyDV6bL_YFF6qdPHTIP37EIhV2jeUnYBaHo
```

## User Experience

### Menggunakan Shared Key:
1. Buka **Settings** page
2. Scroll ke section "Quick Start - Shared API Keys"
3. Klik salah satu dari 4 tombol (Shared Key 1, 2, 3, atau 4)
4. Key otomatis tersimpan dan siap digunakan
5. Peringatan akan muncul bahwa shared key mungkin lebih lambat

### Menggunakan API Key Sendiri:
1. Buka **Settings** page
2. Scroll ke section "Optimal Performance - Your Own API Key"
3. Klik link untuk mendapatkan API key dari Google AI Studio
4. Paste API key ke input field
5. Klik "Save API Key"
6. Klik "Test Key" untuk memverifikasi (opsional)

## Visual Indicators

- **Yellow background** untuk Shared API Keys section (dengan icon Clock ⏰)
- **Indigo/Purple background** untuk Custom API Key section (dengan icon Zap ⚡)
- **Check mark** pada tombol shared key yang sedang aktif
- **Warning message** jika user menggunakan shared key

## Security Notes

- Semua API keys (shared atau pribadi) disimpan hanya di localStorage browser
- API keys tidak pernah dikirim ke server LogiCheck
- Keys dikirim langsung ke Google's Gemini API dari browser
- User dapat clear key kapan saja

## Implementation Details

### File yang Dimodifikasi:
- `client/src/components/ApiKeySettings.jsx`

### State Management:
- `isUsingSharedKey`: Boolean untuk track apakah user menggunakan shared key
- Automatic detection saat load API key dari localStorage
- Visual feedback dengan warning message

### New Icons:
- `Clock` icon untuk Shared Keys section
- `Zap` icon untuk Custom Key section

## Performance Trade-offs

### Shared Keys:
- ✅ Instant setup - no registration needed
- ✅ Langsung bisa digunakan
- ⚠️ Mungkin lebih lambat karena rate limiting
- ⚠️ Shared dengan user lain

### Custom Keys:
- ✅ Performa optimal
- ✅ Personal rate limit
- ⏱️ Butuh waktu untuk setup (register Google AI)

## Future Improvements

1. **Rate limit monitoring** untuk shared keys
2. **Auto-rotation** jika satu shared key mencapai limit
3. **Performance metrics** untuk compare shared vs custom keys
4. **Key health indicator** untuk show availability
