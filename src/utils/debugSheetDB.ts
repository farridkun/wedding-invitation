// Debug script for SheetDB API
// Run this in browser console to debug API issues

const SHEETDB_BASE_URL = 'https://sheetdb.io/api/v1/7vu7xwnqs1j8m';

export const debugSheetDB = async () => {
  console.log('🔍 Debugging SheetDB API...');

  // Test 1: Basic connectivity
  console.log('\n1️⃣ Testing basic connectivity...');
  try {
    const response = await fetch(SHEETDB_BASE_URL);
    console.log('Status:', response.status);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));

    if (response.ok) {
      const data = await response.json();
      console.log('Response:', data);
    } else {
      const text = await response.text();
      console.log('Error response:', text);
    }
  } catch (error) {
    console.error('Basic connectivity error:', error);
  }

  // Test 2: Get all sheets info
  console.log('\n2️⃣ Testing sheets endpoint...');
  try {
    const response = await fetch(`${SHEETDB_BASE_URL}/sheets`);
    console.log('Sheets status:', response.status);

    if (response.ok) {
      const data = await response.json();
      console.log('Available sheets:', data);
    } else {
      const text = await response.text();
      console.log('Sheets error:', text);
    }
  } catch (error) {
    console.error('Sheets endpoint error:', error);
  }

  // Test 3: Try different sheet names
  const sheetNames = ['Guest', 'Ucapan', 'guests', 'ucapan'];

  for (const sheetName of sheetNames) {
    console.log(`\n3️⃣ Testing sheet: ${sheetName}`);
    try {
      const response = await fetch(`${SHEETDB_BASE_URL}?sheet=${sheetName}`);
      console.log(`Sheet "${sheetName}" status:`, response.status);

      if (response.ok) {
        const data = await response.json();
        console.log(`Sheet "${sheetName}" data:`, data);
      } else {
        const text = await response.text();
        console.log(`Sheet "${sheetName}" error:`, text);
      }
    } catch (error) {
      console.error(`Sheet "${sheetName}" error:`, error);
    }
  }

  console.log('\n🎯 Debug complete!');
};

// Run debug
debugSheetDB();
