// Utility script to generate unique invitation links
// Run this in browser console or as a Node.js script

import { sheetsService } from '../services/googleSheets';
import type { Guest } from '../services/googleSheets';

export const generateInvitationLinks = async () => {
  try {
    const guests = await sheetsService.getAllGuests();

    console.log('=== UNIQUE INVITATION LINKS ===\n');

    guests.forEach((guest: Guest) => {
      const link = sheetsService.generateInvitationLink(guest.Nama);
      console.log(`${guest.Nama}: ${link}`);
    });

    console.log('\n=== COPY THESE LINKS TO SEND TO GUESTS ===');

    return guests.map((guest: Guest) => ({
      name: guest.Nama,
      link: sheetsService.generateInvitationLink(guest.Nama)
    }));
  } catch (error) {
    console.error('Error generating links:', error);
    return [];
  }
};

// Example usage:
// generateInvitationLinks().then(links => console.log(links));

// For Google Sheets setup:
// 1. Create a Google Sheet with sheets named: guests, wishes, rsvp
// 2. Set up SheetDB (https://sheetdb.io) or similar service
// 3. Update SHEETDB_BASE_URL in googleSheets.ts
// 4. Guest sheet columns: id, name, email, phone, status, guestCount, message
// 5. Wishes sheet columns: id, guestId, guestName, message, timestamp
// 6. RSVP sheet columns: guestId, guestName, status, guestCount, message, timestamp
