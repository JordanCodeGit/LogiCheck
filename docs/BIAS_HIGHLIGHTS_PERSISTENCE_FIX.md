# Fix: Bias Blindspot Highlights Not Persisting

## Problem
Ketika di halaman Dojo - Bias Blindspot:
- User highlight teks di artikel A dan B
- Pindah ke halaman lain (atau switch ke Fallacy Sparring)
- Kembali ke Bias Blindspot
- **Highlights hilang semua** ❌

## Root Cause
`BiasHighlighter` component menggunakan **uncontrolled state** (`useState` internal) untuk menyimpan highlights:

```jsx
// BEFORE (Bermasalah)
const BiasHighlighter = ({ onHighlightsChange, ... }) => {
  const [highlights, setHighlights] = useState([]); // ❌ Local state, hilang saat unmount
  
  const handleAddHighlight = () => {
    const updatedHighlights = [...highlights, newHighlight];
    setHighlights(updatedHighlights);
    onHighlightsChange(updatedHighlights); // Kirim ke parent
  };
  
  // Ketika component unmount dan mount lagi, highlights = [] lagi
};
```

**Alur masalahnya:**
1. User highlight text → `highlights` state di BiasHighlighter diupdate
2. `onHighlightsChange` dipanggil → parent (DojoPage) update state → save ke localStorage ✅
3. User pindah halaman → BiasHighlighter **unmount** → local state hilang ❌
4. User kembali → BiasHighlighter **mount lagi** → `highlights = []` (default) ❌
5. Meskipun DojoContext punya data di localStorage, BiasHighlighter tidak tahu! ❌

## Solution

### 1. Ubah BiasHighlighter menjadi Controlled Component

**File:** `client/src/components/BiasHighlighter.jsx`

```jsx
// AFTER (Fixed)
const BiasHighlighter = ({ 
  onHighlightsChange, 
  initialHighlights = [],  // ✅ Terima highlights dari parent
  ... 
}) => {
  const [highlights, setHighlights] = useState(initialHighlights);
  
  // ✅ Sync dengan initialHighlights ketika berubah
  useEffect(() => {
    setHighlights(initialHighlights);
  }, [initialHighlights]);
  
  const handleAddHighlight = () => {
    const updatedHighlights = [...highlights, newHighlight];
    setHighlights(updatedHighlights);
    onHighlightsChange(updatedHighlights);
  };
  
  // Sekarang ketika mount lagi, highlights akan diisi dari parent!
};
```

### 2. Pass Highlights dari DojoPage ke BiasHighlighter

**File:** `client/src/pages/DojoPage.jsx`

```jsx
// BEFORE (Bermasalah)
<BiasHighlighter
  content={biasChallenge.articleA.content}
  side="A"
  onHighlightsChange={setArticleAHighlights}
  // ❌ Tidak pass highlights yang sudah ada
/>

// AFTER (Fixed)
<BiasHighlighter
  content={biasChallenge.articleA.content}
  side="A"
  initialHighlights={articleAHighlights}  // ✅ Pass highlights dari context/localStorage
  onHighlightsChange={setArticleAHighlights}
/>
```

## Flow Sekarang (Fixed)

### Saat Highlight Text:
1. User highlight text di artikel
2. `handleAddHighlight()` dipanggil
3. Local state `highlights` diupdate
4. `onHighlightsChange()` dipanggil → update DojoContext
5. DojoContext save ke localStorage ✅

### Saat Pindah Halaman:
1. BiasHighlighter unmount
2. Local state hilang (normal behavior)
3. **DojoContext tetap menyimpan di localStorage** ✅

### Saat Kembali ke Bias Blindspot:
1. DojoContext load highlights dari localStorage
2. `articleAHighlights` dan `articleBHighlights` terisi dengan data ✅
3. BiasHighlighter mount dengan `initialHighlights={articleAHighlights}` ✅
4. `useEffect` set local state `highlights` dari `initialHighlights` ✅
5. **Highlights muncul kembali!** 🎉

## Pattern: Controlled vs Uncontrolled Components

### ❌ Uncontrolled Component (Sebelumnya)
```jsx
// Component manages its own state
const Component = ({ onChange }) => {
  const [value, setValue] = useState('');
  // State hilang saat unmount
};
```

### ✅ Controlled Component (Sekarang)
```jsx
// Parent controls the state
const Component = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(value);
  
  useEffect(() => {
    setLocalValue(value); // Sync with parent
  }, [value]);
};
```

## Files Changed
- `client/src/components/BiasHighlighter.jsx` - Added `initialHighlights` prop and sync effect
- `client/src/pages/DojoPage.jsx` - Pass `initialHighlights` to BiasHighlighter components

## Testing

### Test Case 1: Highlight Persistence
1. ✅ Buka Dojo → Bias Blindspot
2. ✅ Highlight beberapa text di Article A (e.g., "3 highlights")
3. ✅ Highlight beberapa text di Article B (e.g., "2 highlights")
4. ✅ Pindah ke halaman Analyzer
5. ✅ Kembali ke Dojo → Bias Blindspot
6. **Expected:** 
   - Article A masih ada 3 highlights ✅
   - Article B masih ada 2 highlights ✅
   - Semua highlights muncul dengan warna yang benar ✅

### Test Case 2: Switch Dojo Modules
1. ✅ Di Bias Blindspot, highlight beberapa text
2. ✅ Switch ke Fallacy Sparring
3. ✅ Jawab beberapa soal
4. ✅ Switch kembali ke Bias Blindspot
5. **Expected:** Highlights masih ada ✅

### Test Case 3: Page Refresh
1. ✅ Di Bias Blindspot, highlight beberapa text
2. ✅ Refresh browser (F5)
3. ✅ Buka Dojo → Bias Blindspot
4. **Expected:** Highlights masih ada (dari localStorage) ✅

### Test Case 4: New Topic
1. ✅ Highlight beberapa text
2. ✅ Klik "New Topic"
3. **Expected:** 
   - Artikel baru muncul ✅
   - Highlights direset (empty) ✅
   - localStorage cleared untuk highlights ✅

## Benefits
✅ Highlights persisten ketika pindah halaman
✅ State sinkron antara component dan context
✅ Data tersimpan di localStorage
✅ Component reusable dengan pattern yang benar
✅ Consistent dengan React best practices (controlled components)

## Lessons Learned
1. **Controlled components** lebih baik untuk state yang perlu persisten
2. Gunakan `useEffect` untuk sync local state dengan props
3. Parent component should be the single source of truth
4. localStorage + Context API = Perfect for persistence
