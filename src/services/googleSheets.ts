// Google Sheets Integration Service
// Using SheetDB for REST API access to Google Sheets
// Updated according to SheetDB documentation: https://docs.sheetdb.io/

const SHEETDB_BASE_URL = 'https://sheetdb.io/api/v1/7vu7xwnqs1j8m'; // User's SheetDB URL

export interface Guest {
  No: number;
  Nama: string;
  Kehadiran: 'pending' | 'hadir' | 'tidak';
  Ucapan?: string;
}

// SheetDB API response interfaces
export interface SheetDBResponse<T> {
  created?: number;
  updated?: number;
  deleted?: number;
  errors?: any[];
  data?: T[];
}

// Note: SheetDB GET requests return data arrays directly,
// while PATCH/POST requests may return response metadata

class GoogleSheetsService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = SHEETDB_BASE_URL;
  }

  // Get all records from a sheet
  private async getSheetData(sheetName: string): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}?sheet=${sheetName}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${sheetName} data: ${response.status} ${response.statusText}`);
      }

      // SheetDB returns the data array directly, not wrapped in a response object
      const result: any[] = await response.json();
      return result;
    } catch (error) {
      console.error(`Error fetching ${sheetName}:`, error);
      return [];
    }
  }

  // Update a specific row in a sheet
  // @ts-ignore - unused private method
  private async updateSheetRow(sheetName: string, rowId: number, data: any): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/No/${rowId}?sheet=${sheetName}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update ${sheetName}: ${response.status} ${response.statusText} - ${errorText}`);
      }

      // SheetDB PATCH returns response with updated count or success indicator
      const result: any = await response.json();
      // Handle both response formats: {updated: number} or direct success
      return (result.updated && result.updated > 0) || response.status === 200;
    } catch (error) {
      console.error(`Error updating ${sheetName}:`, error);
      return false;
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
          No: parseInt(guest.No) || 0,
          Nama: guest.Nama,
          Kehadiran: (guest.Kehadiran === 'hadir' || guest.Kehadiran === 'tidak') ? guest.Kehadiran : 'pending'
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
      // Use the Nama column to identify the row
      const response = await fetch(`${this.baseUrl}/Nama/${encodeURIComponent(guestName)}?sheet=Guests`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Kehadiran: status }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update guest: ${response.status} ${response.statusText} - ${errorText}`);
      }

      // SheetDB PATCH returns response with updated count or success indicator
      const result: any = await response.json();
      // Handle both response formats: {updated: number} or direct success
      return (result.updated && result.updated > 0) || response.status === 200;
    } catch (error) {
      console.error('Error updating guest attendance:', error);
      return false;
    }
  }

  // Update guest response with attendance and wishes
  async updateGuestResponse(guestName: string, status: 'hadir' | 'tidak', ucapan: string): Promise<boolean> {
    try {
      // Use the Nama column to identify the row
      const response = await fetch(`${this.baseUrl}/Nama/${encodeURIComponent(guestName)}?sheet=Guests`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Kehadiran: status, Ucapan: ucapan }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update guest response: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const result: any = await response.json();
      return (result.updated && result.updated > 0) || response.status === 200;
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
