// Node.js test script for SheetDB API
// Run with: node test-sheetdb.js

const SHEETDB_BASE_URL = 'https://sheetdb.io/api/v1/7vu7xwnqs1j8m';

async function testAPI() {
  console.log('🧪 Testing SheetDB API Connection...');
  console.log('Base URL:', SHEETDB_BASE_URL);

  try {
    // Test 1: Basic connectivity
    console.log('\n1️⃣ Testing basic connectivity...');
    const basicResponse = await fetch(SHEETDB_BASE_URL);
    console.log('Status:', basicResponse.status);
    console.log('Headers:', Object.fromEntries(basicResponse.headers.entries()));

    if (basicResponse.ok) {
      const data = await basicResponse.json();
      console.log('Response:', JSON.stringify(data, null, 2));
    } else {
      const text = await basicResponse.text();
      console.log('Error:', text);
    }

    // Test 2: Get sheets info
    console.log('\n2️⃣ Testing sheets endpoint...');
    const sheetsResponse = await fetch(`${SHEETDB_BASE_URL}/sheets`);
    console.log('Sheets status:', sheetsResponse.status);

    if (sheetsResponse.ok) {
      const sheetsData = await sheetsResponse.json();
      console.log('Available sheets:', JSON.stringify(sheetsData, null, 2));
    } else {
      const text = await sheetsResponse.text();
      console.log('Sheets error:', text);
    }

    // Test 3: Get Guests sheet
    console.log('\n3️⃣ Testing Guests sheet...');
    const guestResponse = await fetch(`${SHEETDB_BASE_URL}?sheet=Guests`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log('Guests sheet status:', guestResponse.status);

    if (guestResponse.ok) {
      const guestData = await guestResponse.json();
      console.log('Guests data:', JSON.stringify(guestData, null, 2));
    } else {
      const text = await guestResponse.text();
      console.log('Guests error:', text);
    }

    // Test 4: Get Ucapan sheet
    console.log('\n4️⃣ Testing Ucapan sheet...');
    const ucapanResponse = await fetch(`${SHEETDB_BASE_URL}?sheet=Ucapan`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log('Ucapan sheet status:', ucapanResponse.status);

    if (ucapanResponse.ok) {
      const ucapanData = await ucapanResponse.json();
      console.log('Ucapan data:', JSON.stringify(ucapanData, null, 2));
    } else {
      const text = await ucapanResponse.text();
      console.log('Ucapan error:', text);
    }

    // Test 5: Try to update a guest (if data exists)
    console.log('\n5️⃣ Testing guest update...');
    const updateResponse = await fetch(`${SHEETDB_BASE_URL}/Nama/Reno Barak?sheet=Guests`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Kehadiran: 'hadir' }),
    });
    console.log('Update status:', updateResponse.status);

    if (updateResponse.ok) {
      const updateData = await updateResponse.json();
      console.log('Update result:', JSON.stringify(updateData, null, 2));
    } else {
      const text = await updateResponse.text();
      console.log('Update error:', text);
    }

  } catch (error) {
    console.error('💥 Test failed:', error);
  }
}

testAPI();
