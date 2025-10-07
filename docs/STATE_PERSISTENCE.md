# Fitur State Persistence - Dokumentasi

## Deskripsi
Fitur ini memungkinkan aplikasi untuk menyimpan state/data dari setiap halaman sehingga ketika pengguna berpindah tab atau halaman, data yang sudah diinput atau hasil analisis tetap tersimpan dan tidak hilang.

## Implementasi

### 1. AnalyzerContext
**File:** `client/src/contexts/AnalyzerContext.jsx`

Context ini menyimpan state untuk halaman Analyzer:
- `inputText`: Teks yang diinput pengguna
- `analysis`: Hasil analisis dari AI
- `loading`: Status loading
- `error`: Pesan error
- `abortController`: Controller untuk membatalkan analisis

**Storage:** Menggunakan `localStorage` dengan keys:
- `analyzer_inputText`
- `analyzer_analysis`

**Method:**
- `clearAnalyzer()`: Menghapus semua data analyzer

### 2. DojoContext
**File:** `client/src/contexts/DojoContext.jsx`

Context ini menyimpan state untuk halaman Dojo:
- `activeModule`: Module yang aktif (sparring/bias)
- `challenge`: Data challenge sparring
- `biasChallenge`: Data challenge bias
- `selectedAnswer`: Jawaban yang dipilih
- `feedback`: Feedback dari jawaban
- `stats`: Statistik (total, correct)
- `articleAHighlights`: Highlight artikel A
- `articleBHighlights`: Highlight artikel B
- `biasFeedback`: Feedback analisis bias

**Storage:** Menggunakan `localStorage` dengan keys:
- `dojo_activeModule`
- `dojo_challenge`
- `dojo_biasChallenge`
- `dojo_selectedAnswer`
- `dojo_feedback`
- `dojo_stats`
- `dojo_articleAHighlights`
- `dojo_articleBHighlights`
- `dojo_biasFeedback`

**Method:**
- `clearDojo()`: Menghapus semua data dojo

### 3. EssayClinicContext
**File:** `client/src/contexts/EssayClinicContext.jsx`

Context ini menyimpan state untuk halaman Essay Clinic:
- `essayText`: Teks essay yang diinput pengguna
- `annotations`: Array hasil analisis feedback
- `selectedAnnotation`: Annotation yang sedang dipilih
- `loading`: Status loading
- `error`: Pesan error
- `abortController`: Controller untuk membatalkan analisis

**Storage:** Menggunakan `localStorage` dengan keys:
- `essayClinic_essayText`
- `essayClinic_annotations`
- `essayClinic_selectedAnnotation`

**Method:**
- `clearEssayClinic()`: Menghapus semua data essay clinic

### 3. Modifikasi Pages

#### AnalyzerPage
- Mengganti `useState` dengan `useAnalyzer()` hook
- State sekarang dikelola oleh AnalyzerContext
- Data persisten ketika pindah halaman

#### DojoPage
- Mengganti `useState` dengan `useDojo()` hook
- State sekarang dikelola oleh DojoContext
- Progress challenge tetap tersimpan

#### EssayClinicPage
- Mengganti `useState` dengan `useEssayClinic()` hook
- State sekarang dikelola oleh EssayClinicContext
- Teks essay dan hasil analisis tetap tersimpan

### 4. App.jsx
Menambahkan providers untuk wrap seluruh aplikasi:
```jsx
<ThemeProvider>
  <AnalyzerProvider>
    <DojoProvider>
      <EssayClinicProvider>
        <Router>
          ...
        </Router>
      </EssayClinicProvider>
    </DojoProvider>
  </AnalyzerProvider>
</ThemeProvider>
```

## Cara Kerja

1. **Saat Input/Analisis:**
   - User memasukkan teks atau melakukan analisis
   - State tersimpan di Context dan localStorage
   
2. **Saat Pindah Halaman:**
   - User pindah dari Analyzer ke Dojo (atau halaman lain)
   - State tersimpan di localStorage
   
3. **Saat Kembali ke Halaman:**
   - User kembali ke halaman Analyzer
   - Context membaca data dari localStorage
   - Teks dan hasil analisis muncul kembali seperti sebelumnya

## Keuntungan

✅ **Persistent:** Data tidak hilang saat pindah halaman
✅ **User-Friendly:** Pengguna tidak perlu input ulang
✅ **Performance:** Menggunakan localStorage, tidak perlu fetch ulang
✅ **Flexible:** Bisa di-clear kapan saja dengan method `clear*()`

## Catatan

- Data tersimpan di browser localStorage
- Data akan hilang jika user clear browser data
- Untuk clear manual, bisa panggil method:
  - `clearAnalyzer()` - Clear data Analyzer
  - `clearDojo()` - Clear data Dojo
  - `clearEssayClinic()` - Clear data Essay Clinic
- Data persisten bahkan setelah refresh browser (F5)

## Testing

### Analyzer Page
1. Buka halaman Analyzer
2. Masukkan teks dan lakukan analisis
3. Pindah ke halaman Dojo atau Essay Clinic
4. Kembali ke halaman Analyzer
5. ✅ Teks dan hasil analisis masih ada

### Dojo Page
1. Buka halaman Dojo
2. Mulai challenge (sparring atau bias)
3. Highlight teks atau pilih jawaban
4. Pindah ke halaman lain
5. Kembali ke halaman Dojo
6. ✅ Challenge dan progress masih ada

**Catatan Dojo:**
- Ketika switch antara Fallacy Sparring dan Bias Blindspot, challenge yang sudah ada **TIDAK akan berubah**
- Challenge hanya berubah jika:
  - Klik tombol "Next Challenge" (di Fallacy Sparring)
  - Klik tombol "New Topic" (di Bias Blindspot)
- Jawaban, feedback, dan highlights tetap tersimpan ketika switch module
- Highlights di Bias Blindspot akan muncul kembali ketika kembali ke halaman (controlled component pattern)
- Data persisten di localStorage

### Essay Clinic Page
1. Buka halaman Essay Clinic
2. Masukkan essay dan lakukan analisis
3. Pindah ke halaman Analyzer atau Dojo
4. Kembali ke halaman Essay Clinic
5. ✅ Teks essay dan hasil feedback masih ada

## Future Improvements

- [ ] Tambahkan timeout untuk auto-clear old data
- [ ] Tambahkan compression untuk data besar
- [ ] Tambahkan sync dengan server (optional)
- [ ] Tambahkan export/import state feature
