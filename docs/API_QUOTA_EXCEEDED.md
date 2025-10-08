# Solusi: API Quota Exceeded - Essay Clinic

## 🚨 Masalah
Ketika menggunakan Essay Clinic, muncul error:
```
Failed to analyze essay. Please try again.
```

Di console server terlihat error:
```
[429 Too Many Requests] You exceeded your current quota
Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 250
```

## 📋 Penyebab
Gemini API free tier memiliki batasan:
- **250 requests per hari** per project
- Limit ini dibagikan untuk semua pengguna yang menggunakan API key yang sama
- Setelah mencapai limit, harus menunggu 24 jam untuk reset

## ✅ Solusi

### Opsi 1: Gunakan API Key Pribadi (Recommended)

1. **Dapatkan Gemini API Key Gratis Anda Sendiri:**
   - Buka https://aistudio.google.com/app/apikey
   - Login dengan Google account
   - Klik "Create API Key"
   - Copy API key yang digenerate

2. **Masukkan API Key di LogiCheck:**
   - Buka aplikasi LogiCheck
   - Klik tombol **Settings** (⚙️) di navigation bar
   - Paste API key Anda di field "Gemini API Key"
   - Klik **Save**

3. **Sekarang Anda Punya Quota Sendiri:**
   - Quota: 250 requests/hari untuk akun Anda sendiri
   - Tidak berbagi dengan pengguna lain
   - Reset setiap 24 jam

### Opsi 2: Tunggu Reset Quota (Untuk Testing)

Jika Anda menggunakan shared API key dari server:
- Tunggu hingga **24 jam** dari first request di hari itu
- Quota akan reset otomatis
- Check di console server kapan "Please retry in XXs" 

### Opsi 3: Upgrade ke Paid Plan (Untuk Production)

Jika Anda developer/production:
- Buka https://console.cloud.google.com/
- Setup billing untuk project Anda
- Dapatkan quota yang lebih besar

## 🔧 Cara Mengecek Quota Anda

1. Buka https://console.cloud.google.com/
2. Pilih project Anda
3. Navigasi ke **IAM & Admin** > **Quotas**
4. Search: "generativelanguage"
5. Lihat usage vs limit

## 💡 Tips Menghemat Quota

1. **Gunakan untuk testing yang efektif:**
   - Jangan spam request
   - Test dengan essay yang benar-benar butuh feedback
   
2. **Clear cache dan state:**
   - Jangan re-analyze essay yang sama berkali-kali
   
3. **Gunakan API key pribadi:**
   - Setiap orang punya quota sendiri (250/day)
   - Tidak berbagi dengan orang lain

## 📝 Perubahan yang Sudah Dilakukan

### 1. Error Handling yang Lebih Baik
**File:** `server/config/gemini.js`
- Deteksi quota exceeded error (429)
- Berikan pesan error yang jelas dan actionable

**File:** `server/controllers/clinicController.js`
- Handle 429 status code specifically
- Return pesan yang mengarahkan user untuk menggunakan API key sendiri

### 2. User-Friendly Error Message
Sekarang ketika quota habis, user akan melihat:
```
API quota exceeded. You have reached the free tier limit (250 requests per day). 
Please wait 24 hours, use your own API key in Settings, atau kamu bisa ganti ke pilihan shared API lain.
```

## ✅ Checklist Solusi

- [ ] Dapatkan Gemini API Key pribadi dari https://aistudio.google.com/app/apikey
- [ ] Buka Settings di LogiCheck
- [ ] Paste API key
- [ ] Save settings
- [ ] Test Essay Clinic lagi
- [ ] ✨ Berhasil!

## 🔗 Links Berguna

- [Gemini API Quotas & Limits](https://ai.google.dev/gemini-api/docs/rate-limits)
- [Get Gemini API Key](https://aistudio.google.com/app/apikey)
- [Google Cloud Console](https://console.cloud.google.com/)

---

**Tanggal:** 8 Oktober 2025  
**Status:** ✅ Documented & Fixed Error Handling
