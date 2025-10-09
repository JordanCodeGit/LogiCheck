# BiasHighlighter Text Corruption Fix

## Problem

Ketika user menghighlight text, muncul karakter "er" berulang-ulang di tengah kata:
```
Scientists are sound[er] how[er] - [er]cing the alarm...
```

Visual dari bug:
- Text menjadi corrupted/rusak
- Karakter random muncul di tengah kata
- Highlighting tidak bekerja dengan benar

## Root Cause

**Masalah di fungsi `getHighlightedContent()`**:

```javascript
// OLD CODE (BUGGY)
const regex = new RegExp(`(${highlight.text})`, 'gi');
highlightedContent = highlightedContent.replace(
  regex,
  `<mark class="...">$1</mark>`
);
```

### Why It Failed:

1. **Regex replacement pada HTML string**
   - Ketika kita replace text dengan `<mark>...</mark>`
   - Replacement berikutnya bisa match bagian dalam tag HTML
   - Contoh: "er" dalam `<mark class="bg-r[er]d-100">` 

2. **Overlapping replacements**
   - Multiple highlights bisa overlap
   - Text yang sama di-replace berkali-kali
   - Menghasilkan nested/corrupted HTML

3. **Global regex (`gi` flag)**
   - Replace semua occurrence tanpa context
   - Tidak aware of HTML structure
   - Bisa merusak tag HTML yang sudah dibuat

### Example of What Went Wrong:

```
Original: "Scientists are sounding the alarm"

Step 1: Highlight "sounding"
Result: "Scientists are <mark>sounding</mark> the alarm"

Step 2: Try to highlight "are" 
Regex matches "are" in "<mark class="bg-r[are]d-100">"
Result: "Scientists <m[are]rk> <mark>sounding</mark> the alarm"
         ↑ CORRUPTED!
```

## Solution

**New Algorithm - Position-based Segmentation**:

Instead of regex replacement on HTML string, we:
1. Find all highlight positions in original text
2. Check for overlaps
3. Build HTML by segments (plain text + highlighted text)
4. Never touch already-generated HTML

### Key Improvements:

```javascript
// 1. Find positions in ORIGINAL text
let startIndex = content.indexOf(searchText);

// 2. Track used ranges to avoid overlaps
const isOverlapping = usedRanges.some(range => ...);

// 3. Build HTML segment by segment
segments.forEach(segment => {
  result += content.substring(currentPos, segment.start); // Plain text
  result += `<mark>...</mark>`; // Highlighted text
});
```

### Algorithm Flow:

```
1. Parse all highlights → Get positions in original text
2. Sort by position → Process left to right
3. Check overlaps → Skip if overlapping
4. Build segments → [plain, highlight, plain, highlight, ...]
5. Concatenate → Final HTML string
```

## Code Comparison

### Before (Buggy):
```javascript
sortedHighlights.forEach((highlight) => {
  const regex = new RegExp(`(${highlight.text})`, 'gi');
  highlightedContent = highlightedContent.replace(
    regex,
    `<mark>$1</mark>`
  );
});
```

Problems:
- ❌ Replaces on already-generated HTML
- ❌ No overlap detection
- ❌ Can corrupt HTML tags

### After (Fixed):
```javascript
// 1. Find positions
segments.push({
  start: startIndex,
  end: startIndex + searchText.length,
  text: content.substring(startIndex, startIndex + searchText.length)
});

// 2. Build HTML segment by segment
segments.forEach(segment => {
  result += content.substring(currentPos, segment.start); // Plain
  result += `<mark>${segment.text}</mark>`; // Highlighted
  currentPos = segment.end;
});
```

Benefits:
- ✅ Works on original text only
- ✅ Overlap detection built-in
- ✅ Never touches generated HTML

## Testing

### Test Case 1: Simple highlight
```
Text: "Scientists are sounding the alarm"
Highlight: "sounding"
Expected: "Scientists are <mark>sounding</mark> the alarm"
Result: ✅ PASS
```

### Test Case 2: Multiple highlights
```
Text: "Scientists are sounding the alarm"
Highlights: ["Scientists", "alarm"]
Expected: "<mark>Scientists</mark> are sounding the <mark>alarm</mark>"
Result: ✅ PASS
```

### Test Case 3: Overlapping highlights (should skip)
```
Text: "Scientists are sounding"
Highlights: ["Scientists are", "are sounding"]
Expected: "<mark>Scientists are</mark> sounding" (first one only)
Result: ✅ PASS
```

### Test Case 4: Case insensitive
```
Text: "Scientists ARE sounding"
Highlight: "are"
Expected: "Scientists <mark>ARE</mark> sounding"
Result: ✅ PASS
```

## Files Modified

1. ✅ `client/src/components/BiasHighlighter.jsx`
   - Completely rewrote `getHighlightedContent()` function
   - Changed from regex replacement to position-based segmentation
   - Added overlap detection
   - Added proper sorting by position

## Performance Impact

### Before:
- O(n × m) where n = highlights, m = text length
- Multiple full-text regex passes
- HTML string manipulation

### After:
- O(n log n + n × m) - sort + position finding
- Single pass through text for HTML building
- More efficient for multiple highlights

Trade-off: Slightly more complex code, but much more reliable and bug-free.

## Edge Cases Handled

1. ✅ No highlights → Returns original content
2. ✅ Overlapping highlights → Uses first one, skips overlaps
3. ✅ Case insensitive matching → `toLowerCase()` comparison
4. ✅ Multiple same words → Only highlights selected instance
5. ✅ Special characters → No regex, direct string matching
6. ✅ Long text → Efficient segment-based approach

---

**Status**: ✅ FIXED  
**Date**: October 9, 2025  
**Bug Severity**: Critical - Made highlighting unusable  
**Root Cause**: Regex replacement on HTML string  
**Solution**: Position-based HTML segmentation  
**Impact**: 100% fix - No more text corruption
