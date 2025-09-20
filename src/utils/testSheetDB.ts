// Test script for SheetDB API connectivity
// Run this in the browser console to test the API

const SHEETDB_BASE_URL = 'https://sheetdb.io/api/v1/7vu7xwnqs1j8m';

export const testSheetDBConnection = async () => {
  console.log('🧪 Testing SheetDB API Connection...');
  console.log('Base URL:', SHEETDB_BASE_URL);

  try {
    // Test basic connectivity first
    console.log('🔗 Testing basic connectivity...');
    const basicResponse = await fetch(SHEETDB_BASE_URL);
    console.log('Basic response status:', basicResponse.status);

    if (basicResponse.ok) {
      const basicData = await basicResponse.json();
      console.log('✅ Basic response:', basicData);
    } else {
      console.error('❌ Basic request failed:', basicResponse.statusText);
    }

    // Test getting guests
    console.log('📋 Testing Guests sheet...');
    const guestsResponse = await fetch(`${SHEETDB_BASE_URL}?sheet=Guests`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    console.log('Guests response status:', guestsResponse.status);

    if (guestsResponse.ok) {
      const guestsData = await guestsResponse.json();
      console.log('✅ Guests data:', guestsData);

      // Test finding a specific guest
      const guestName = 'Reno Barak';
      console.log(`🔍 Looking for guest: "${guestName}"`);
      const foundGuest = guestsData.find((g: any) => g.Nama?.toLowerCase() === guestName.toLowerCase());
      console.log('🎯 Found guest:', foundGuest);

    } else {
      const errorText = await guestsResponse.text();
      console.error('❌ Failed to fetch guests:', guestsResponse.status, errorText);
    }

    // Test getting wishes
    console.log('🙏 Testing Ucapan sheet...');
    const wishesResponse = await fetch(`${SHEETDB_BASE_URL}?sheet=Ucapan`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    console.log('Wishes response status:', wishesResponse.status);

    if (wishesResponse.ok) {
      const wishesData = await wishesResponse.json();
      console.log('✅ Wishes data:', wishesData);
    } else {
      const errorText = await wishesResponse.text();
      console.error('❌ Failed to fetch wishes:', wishesResponse.status, errorText);
    }

    console.log('🎉 SheetDB API test completed!');

  } catch (error) {
    console.error('💥 Error testing SheetDB API:', error);
  }
};

// Run the test
testSheetDBConnection();
