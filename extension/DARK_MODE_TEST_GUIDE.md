# 🌓 Quick Test Guide - Dark Mode Feature

## Langkah Testing Dark Mode Extension

### 1️⃣ **Reload Extension**
```
1. Buka Chrome/Edge
2. Ketik di address bar: chrome://extensions/
3. Cari "LogiCheck Lens"
4. Klik tombol reload (⟳) atau toggle off/on
```

### 2️⃣ **Test Popup Dark Mode**
```
1. Klik icon LogiCheck Extension di toolbar
2. Lihat popup yang muncul
3. Perhatikan button dengan icon moon (🌙) di pojok kanan atas header
4. Klik button tersebut
5. ✅ Popup berubah ke dark mode
6. Klik lagi
7. ✅ Popup kembali ke light mode
```

**Yang Harus Terlihat:**
- ✅ Background berubah dari putih ke dark gray
- ✅ Text berubah dari dark ke light
- ✅ Icon berubah dari moon ke sun (dan sebaliknya)
- ✅ Smooth transition (tidak flickering)

### 3️⃣ **Test Sidebar Dark Mode**
```
1. Buka website apapun (contoh: news.ycombinator.com)
2. Select/highlight text di halaman
3. Right-click → "Analyze with LogiCheck"
4. ✅ Sidebar muncul dengan theme yang sama dengan popup
5. Buka popup extension lagi
6. Toggle dark mode
7. ✅ Sidebar langsung ikut berubah tema
```

**Yang Harus Terlihat:**
- ✅ Sidebar background matching dengan popup theme
- ✅ Text colors mudah dibaca di kedua mode
- ✅ Fallacy cards terlihat jelas dengan kontras yang baik
- ✅ Header sidebar ikut berubah warna

### 4️⃣ **Test Theme Persistence**
```
1. Set theme ke dark mode
2. Tutup popup
3. Buka popup lagi
4. ✅ Theme masih dark mode (tersimpan)
5. Restart browser
6. Buka popup
7. ✅ Theme masih dark mode (persistent)
```

### 5️⃣ **Test Multi-Tab Sync**
```
1. Buka 2-3 tab berbeda
2. Pada setiap tab, open sidebar dengan analyze text
3. Pada salah satu tab, buka popup dan toggle theme
4. ✅ Semua sidebar di semua tab ikut berubah tema secara real-time
```

## 🎨 Visual Checklist

### Light Mode (Default)
- [ ] Background: Putih bersih
- [ ] Text: Hitam/dark gray, mudah dibaca
- [ ] Gradient header: Ungu-biru cerah
- [ ] Instruction box: Light gray background
- [ ] Theme icon: Moon (🌙) - indikasi bisa switch ke dark

### Dark Mode
- [ ] Background: Dark gray (#1f2937)
- [ ] Text: Light gray/white, mudah dibaca
- [ ] Gradient header: Ungu-biru lebih gelap
- [ ] Instruction box: Medium gray background
- [ ] Theme icon: Sun (☀️) - indikasi bisa switch ke light

### Sidebar Light Mode
- [ ] Background: White content area
- [ ] Header: Blue-gray
- [ ] Fallacy cards: Light red background
- [ ] Socratic question: Light blue background

### Sidebar Dark Mode
- [ ] Background: Dark gray content area
- [ ] Header: Medium gray
- [ ] Fallacy cards: Dark red background with light text
- [ ] Socratic question: Dark blue background

## 🐛 Common Issues & Solutions

### Issue: Theme tidak berubah
**Solution:**
1. Open DevTools (F12) di popup
2. Check console untuk error
3. Verify chrome.storage permission
4. Reload extension

### Issue: Sidebar tidak ikut berubah
**Solution:**
1. Refresh webpage yang berisi sidebar
2. Close sidebar dan analyze text lagi
3. Check console di webpage (F12)

### Issue: Theme tidak tersimpan
**Solution:**
1. Check manifest.json - pastikan ada permission "storage"
2. Clear extension data: chrome://settings/clearBrowserData
3. Reinstall extension

## 📸 Screenshot Checklist

Ambil screenshot untuk dokumentasi:
- [ ] Popup light mode
- [ ] Popup dark mode
- [ ] Sidebar light mode
- [ ] Sidebar dark mode
- [ ] Theme toggle button (close-up)
- [ ] Multi-tab dengan theme yang sama

## ✅ Final Verification

Sebelum declare selesai, pastikan:
- [x] No console errors di popup
- [x] No console errors di content script
- [x] Theme transitions smooth (0.3s)
- [x] All colors have good contrast ratio
- [x] Text readable di kedua mode
- [x] Icons clear dan terlihat
- [x] Storage sync working
- [x] Multi-tab sync working
- [x] Persistence working after browser restart

## 🎯 Success Criteria

✅ **PASS** jika:
1. Theme toggle button berfungsi
2. Popup berubah warna sesuai theme
3. Sidebar ikut berubah tema
4. Theme tersimpan dan persistent
5. Multi-tab tersinkronisasi
6. Smooth transitions tanpa glitch
7. Semua text readable di kedua mode

❌ **FAIL** jika:
- Theme tidak berubah saat toggle
- Sidebar tidak ikut berubah
- Theme tidak tersimpan
- Ada flickering/glitching
- Text tidak readable
- Console ada error

---

**Testing Time**: ~10 menit  
**Difficulty**: Easy  
**Priority**: High ⭐⭐⭐

Good luck testing! 🚀
