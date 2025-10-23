// Google Sheets Integration Service
// Using SpreadAPI (Roombelt) for FREE REST API access to Google Sheets
// Documentation: https://spreadapi.roombelt.com/

// Replace YOUR_SCRIPT_ID with your actual Google Apps Script deployment ID
const SPREADAPI_SCRIPT_ID = 'AKfycbyfVlTeTVoWCwlvNjVZ_-T2PokqItHHBowcy9fLXPI2tOGhvG-D4UXBSG7p2Mg_k3iG'; // Get this from SpreadAPI setup
// const SPREADAPI_SCRIPT_ID = 'AKfycbyfLiSxjGH-axb33T-QKOw-DBBAX2okUKZEdE545rCCyTedicW0tx7E3M56wNbH8uPTow'; // Get this from SpreadAPI setup
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
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          // Using text/plain avoids CORS preflight while still letting us send JSON payloads
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(request),
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
      if (Array.isArray(result)) {
        return result;
      }

      if (result && Array.isArray(result.data)) {
        return result.data;
      }

      return [];
    } catch (error) {
      console.error(`Error fetching ${sheetName}:`, error);
      return [];
    }
  }

  // Get guest data by name (from URL parameter)
  async getGuestByName(guestName: string): Promise<Guest | null> {
    try {
      const guests = await this.getSheetData('Guests');
  const normalizedTarget = guestName.trim().toLowerCase();
  const guest = guests.find((g: any) => g.Nama?.toString().trim().toLowerCase() === normalizedTarget);

      if (guest) {
        return this.transformGuest(guest);
      }

      return null;
    } catch (error) {
      console.error('Error fetching guest:', error);
      return null;
    }
  }

  // Get all guests
  async getAllGuests(): Promise<Guest[]> {
    const rows = await this.getSheetData('Guests');
    return rows.map((row) => this.transformGuest(row));
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
          id: guest._id,
          Kehadiran: status,
        },
      });

        return this.isSuccessfulUpdate(result, guest._id);
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
          id: guest._id,
          Kehadiran: status,
          Ucapan: ucapan,
        },
      });

        return this.isSuccessfulUpdate(result, guest._id);
    } catch (error) {
      console.error('Error updating guest response:', error);
      return false;
    }
  }

    private isSuccessfulUpdate(result: any, expectedId?: number): boolean {
      if (!result) return false;

      if (Array.isArray(result)) {
        return result.some((item) => this.isSuccessfulUpdate(item, expectedId));
      }

      // Successful response can be either the updated row object or an object with success property
      if (typeof result === 'object') {
        if (typeof result.success === 'boolean') {
          return result.success;
        }

        if (typeof result._id !== 'undefined' && typeof expectedId !== 'undefined') {
          return Number(result._id) === Number(expectedId);
        }

        if (typeof result.id !== 'undefined' && typeof expectedId !== 'undefined') {
          return Number(result.id) === Number(expectedId);
        }
      }

      return true;
    }

  private transformGuest(data: any): Guest {
    const normalizedId = data?._id ? Number(data._id) : undefined;
    const attendance: Guest['Kehadiran'] = data?.Kehadiran === 'hadir'
      ? 'hadir'
      : data?.Kehadiran === 'tidak'
        ? 'tidak'
        : 'pending';

    return {
      _id: normalizedId,
      No: data?.No ? Number(data.No) : 0,
      Nama: data?.Nama ?? '',
      Kehadiran: attendance,
      Ucapan: typeof data?.Ucapan === 'string' ? data.Ucapan : undefined,
    };
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
