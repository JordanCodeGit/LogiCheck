// Debug script for Dojo page issue
// Run this in browser console to diagnose the blank page

console.log('=== DOJO PAGE DEBUG ===');

// Check if DojoContext is available
console.log('1. Checking React DevTools...');
console.log('   Open React DevTools and look for DojoProvider in component tree');

// Check localStorage
console.log('\n2. Checking localStorage for Dojo data:');
const dojoKeys = [
  'dojo_activeModule',
  'dojo_challenge',
  'dojo_biasChallenge',
  'dojo_selectedAnswer',
  'dojo_feedback',
  'dojo_stats',
  'dojo_articleAHighlights',
  'dojo_articleBHighlights'
];

dojoKeys.forEach(key => {
  const value = localStorage.getItem(key);
  if (value) {
    try {
      console.log(`   ${key}:`, JSON.parse(value));
    } catch (e) {
      console.log(`   ${key}:`, value);
    }
  } else {
    console.log(`   ${key}: null`);
  }
});

// Check for errors
console.log('\n3. Checking for JavaScript errors:');
console.log('   Look above in console for any RED error messages');

// Suggest fixes
console.log('\n4. SUGGESTED FIXES:');
console.log('   a) Clear localStorage: localStorage.clear()');
console.log('   b) Hard refresh: Ctrl+Shift+R or Cmd+Shift+R');
console.log('   c) Check Network tab for failed API calls');
console.log('   d) Check if /dojo route is correct in URL');

// Clear localStorage if needed
console.log('\n5. To clear Dojo localStorage, run:');
console.log('   dojoKeys.forEach(k => localStorage.removeItem(k)); location.reload();');

console.log('\n=== END DEBUG ===');
