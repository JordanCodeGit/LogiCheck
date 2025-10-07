# Fix: Dojo Module Switching Issue

## Problem
Ketika di halaman Dojo:
- User sudah menjawab di Fallacy Sparring
- Pindah ke Bias Blindspot
- Kembali ke Fallacy Sparring
- **Soal berubah dan jawaban hilang** ❌

Sama untuk Bias Blindspot:
- User sudah highlight artikel
- Pindah ke Fallacy Sparring
- Kembali ke Bias Blindspot  
- **Artikel berubah dan highlight hilang** ❌

## Root Cause
`useEffect` di DojoPage akan auto-load challenge baru setiap kali `activeModule` berubah, tanpa memeriksa apakah sudah ada challenge yang tersimpan.

```jsx
// BEFORE (Bermasalah)
useEffect(() => {
  if (activeModule === 'sparring') {
    loadNewChallenge(); // ❌ Selalu load baru!
  } else if (activeModule === 'bias') {
    loadBiasChallenge(); // ❌ Selalu load baru!
  }
}, [activeModule]);
```

## Solution
Modifikasi `useEffect` agar hanya load challenge baru jika **belum ada challenge untuk module tersebut**:

```jsx
// AFTER (Fixed)
useEffect(() => {
  // Load sparring challenge if on sparring module and no challenge exists
  if (activeModule === 'sparring' && !challenge) {
    loadNewChallenge(); // ✅ Hanya load jika belum ada
  }
  // Load bias challenge if on bias module and no challenge exists
  if (activeModule === 'bias' && !biasChallenge) {
    loadBiasChallenge(); // ✅ Hanya load jika belum ada
  }
}, [activeModule, challenge, biasChallenge]);
```

## Behavior Sekarang

### ✅ Switch Module (Sparring ↔ Bias)
- Challenge **TIDAK berubah**
- Jawaban/highlight **TETAP ada**
- Feedback **TETAP ada**
- Data preserved di localStorage

### ✅ Load Challenge Baru (Manual)
User bisa load challenge baru dengan:
- **Fallacy Sparring:** Klik tombol "Next Challenge"
- **Bias Blindspot:** Klik tombol "New Topic"

Ketika load manual:
- Challenge baru akan di-fetch
- State lama akan di-reset (selectedAnswer, feedback, highlights)
- Data baru akan di-save ke localStorage

## Files Changed
- `client/src/pages/DojoPage.jsx` - Fixed useEffect logic

## Testing

### Test Case 1: Fallacy Sparring
1. ✅ Buka Dojo → Fallacy Sparring
2. ✅ Pilih jawaban
3. ✅ Switch ke Bias Blindspot
4. ✅ Switch kembali ke Fallacy Sparring
5. **Expected:** Soal sama, jawaban masih ada ✅

### Test Case 2: Bias Blindspot
1. ✅ Buka Dojo → Bias Blindspot
2. ✅ Highlight beberapa teks di artikel
3. ✅ Switch ke Fallacy Sparring
4. ✅ Switch kembali ke Bias Blindspot
5. **Expected:** Artikel sama, highlight masih ada ✅

### Test Case 3: Load New Challenge
1. ✅ Buka Dojo → Fallacy Sparring
2. ✅ Pilih jawaban
3. ✅ Klik "Next Challenge"
4. **Expected:** Soal baru muncul, state direset ✅

### Test Case 4: Load New Topic
1. ✅ Buka Dojo → Bias Blindspot
2. ✅ Highlight teks
3. ✅ Klik "New Topic"
4. **Expected:** Artikel baru muncul, highlights direset ✅

## Benefits
✅ User experience lebih baik - progress tidak hilang
✅ Data persisten ketika switch module
✅ Tombol manual untuk load challenge baru tetap berfungsi
✅ localStorage menyimpan semua state dengan benar
