// Google Sheets Integration Service
// Using SpreadAPI (Roombelt) for FREE REST API access to Google Sheets
// Documentation: https://spreadapi.roombelt.com/

// Replace YOUR_SCRIPT_ID with your actual Google Apps Script deployment ID
const SPREADAPI_SCRIPT_ID = 'AKfycbyfLiSxjGH-axb33T-QKOw-DBBAX2okUKZEdE545rCCyTedicW0tx7E3M56wNbH8uPTow'; // Get this from SpreadAPI setup
const SPREADAPI_BASE_URL = `https://script.google.com/macros/s/${SPREADAPI_SCRIPT_ID}/exec`;

export interface Guest {
  _id?: number; // SpreadAPI uses _id as the row number
  No: number;
  Nama: string;
  Kehadiran: 'pending' | 'hadir' | 'tidak';
  Ucapan?: string;
}

// SpreadAPI request/response interfaces
export interface SpreadAPIRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  sheet: string;
  id?: number;
  query?: Record<string, any>;
  payload?: Record<string, any>;
}

class GoogleSheetsService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = SPREADAPI_BASE_URL;
  }

  // SpreadAPI: Use GET with query parameters to avoid CORS preflight
  // POST with Content-Type: application/json triggers OPTIONS preflight which Google Apps Script can't handle
  private async makeRequest(request: SpreadAPIRequest): Promise<any> {
    try {
      // Build URL with query parameters to avoid CORS preflight
      const url = new URL(this.baseUrl);
      url.searchParams.append('method', request.method);
      url.searchParams.append('sheet', request.sheet);
      
      if (request.id) {
        url.searchParams.append('id', request.id.toString());
      }
      
      // For PUT/POST methods, send payload as JSON string in query param
      if (request.payload) {
        url.searchParams.append('payload', JSON.stringify(request.payload));
      }
      
      if (request.query) {
        url.searchParams.append('query', JSON.stringify(request.query));
      }

      const response = await fetch(url.toString(), {
        method: 'GET', // Use GET to avoid CORS preflight!
        redirect: 'follow',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`SpreadAPI request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('SpreadAPI error:', error);
      console.error('Request was:', request);
      throw error;
    }
  }

  // Get all records from a sheet
  private async getSheetData(sheetName: string): Promise<any[]> {
    try {
      const result = await this.makeRequest({
        method: 'GET',
        sheet: sheetName,
      });

      // SpreadAPI returns array of objects with _id field
      return Array.isArray(result) ? result : [];
    } catch (error) {
      console.error(`Error fetching ${sheetName}:`, error);
      return [];
    }
  }

  // Get guest data by name (from URL parameter)
  async getGuestByName(guestName: string): Promise<Guest | null> {
    try {
      const guests = await this.getSheetData('Guests');
      const guest = guests.find((g: any) => g.Nama?.toLowerCase() === guestName.toLowerCase());

      if (guest) {
        // Transform the data to match our interface
        return {
          _id: guest._id, // SpreadAPI row ID
          No: parseInt(guest.No) || 0,
          Nama: guest.Nama,
          Kehadiran: (guest.Kehadiran === 'hadir' || guest.Kehadiran === 'tidak') ? guest.Kehadiran : 'pending',
          Ucapan: guest.Ucapan
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching guest:', error);
      return null;
    }
  }

  // Get all guests
  async getAllGuests(): Promise<Guest[]> {
    return await this.getSheetData('Guests'); // Correct sheet name
  }

  // Update guest attendance status
  async updateGuestAttendance(guestName: string, status: 'hadir' | 'tidak'): Promise<boolean> {
    try {
      // First, get the guest to find their _id (row number)
      const guest = await this.getGuestByName(guestName);
      
      if (!guest || !guest._id) {
        console.error('Guest not found or missing _id');
        return false;
      }

      // Update using SpreadAPI's PUT method with _id
      const result = await this.makeRequest({
        method: 'PUT',
        sheet: 'Guests',
        payload: {
          _id: guest._id,
          Kehadiran: status,
        },
      });

      return result && result._id === guest._id;
    } catch (error) {
      console.error('Error updating guest attendance:', error);
      return false;
    }
  }

  // Update guest response with attendance and wishes
  async updateGuestResponse(guestName: string, status: 'hadir' | 'tidak', ucapan: string): Promise<boolean> {
    try {
      // First, get the guest to find their _id (row number)
      const guest = await this.getGuestByName(guestName);
      
      if (!guest || !guest._id) {
        console.error('Guest not found or missing _id');
        return false;
      }

      // Update using SpreadAPI's PUT method with _id
      const result = await this.makeRequest({
        method: 'PUT',
        sheet: 'Guests',
        payload: {
          _id: guest._id,
          Kehadiran: status,
          Ucapan: ucapan,
        },
      });

      return result && result._id === guest._id;
    } catch (error) {
      console.error('Error updating guest response:', error);
      return false;
    }
  }

  // Generate unique invitation link for a guest
  generateInvitationLink(guestName: string): string {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}?guest=${encodeURIComponent(guestName)}`;
  }

  // Get all invitation links for all guests
  async generateAllInvitationLinks(): Promise<{ name: string; link: string }[]> {
    const guests = await this.getAllGuests();
    return guests.map(guest => ({
      name: guest.Nama,
      link: this.generateInvitationLink(guest.Nama)
    }));
  }
}

export const sheetsService = new GoogleSheetsService();
