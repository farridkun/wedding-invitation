# Wedding Invitations

A beautiful, responsive wedding invitation website with scroll parallax effects, built with React, Vite, and TypeScript.

## Features

- 🎨 Beautiful scroll parallax effects
- 📱 Mobile-first responsive design
- 🎭 Smooth animations with Framer Motion
- 📋 Google Sheets integration for guest management
- 💌 RSVP system with unique invitation links
- 🙏 Wishes/UCAPAN system
- 🎯 Accessibility features
- 🎨 Customizable color palette

## Setup

### Prerequisites

- Node.js 22+
- Bun package manager
- Google Sheets account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Start development server:
   ```bash
   bun run dev
   ```

## Google Sheets Integration Setup

### 1. Create Google Sheets

Create a new Google Sheet with two tabs:
- **guests**: Guest information (columns: No, Nama, Kehadiran)
- **ucapan**: Guest wishes/messages (columns: No, Nama, Ucapan)

### 2. Sheet Structure

#### Guests Sheet:
| No | Nama | Kehadiran |
|----|------|-----------|
| 1  | Ahmad | pending  |
| 2  | Siti  | pending  |

#### Ucapan Sheet:
| No | Nama | Ucapan |
|----|------|--------|
| 1  | Ahmad | Selamat menempuh hidup baru! |

### 3. SpreadAPI Setup (FREE Alternative)

**SpreadAPI** is a completely free Google Apps Script solution - no limitations!

1. **Open Your Google Sheet**
   - Go to your Google Sheet with Guests data

2. **Install SpreadAPI Script**
   - Go to `Extensions` → `Apps Script`
   - Copy the SpreadAPI code from: https://spreadapi.roombelt.com/setup
   - Paste it into the Apps Script editor
   - Save the project

3. **Deploy the Script**
   - Click `Deploy` → `New deployment`
   - Select type: `Web app`
   - Set "Execute as": `Me`
   - Set "Who has access": `Anyone`
   - Click `Deploy`
   - Copy the deployment URL (it will look like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

4. **Update Your Config**
   - Open `src/services/googleSheets.ts`
   - Replace `YOUR_SCRIPT_ID` with the actual Script ID from your deployment URL
   - Example: If your URL is `https://script.google.com/macros/s/ABC123XYZ/exec`, use `ABC123XYZ`

**Why SpreadAPI?**
- ✅ 100% Free forever
- ✅ No rate limits
- ✅ No third-party access to your data
- ✅ Runs on your Google account
- ✅ Open source

**Documentation**: https://spreadapi.roombelt.com/

## Usage

### Generating Invitation Links

To generate unique invitation links for all guests:

```javascript
// Open browser console on your wedding invitation site
import('./utils/invitationLinks.js').then(module => module.generateInvitationLinks());
```

This will output links like:
```
Ahmad: http://localhost:5173?guest=Ahmad
Siti: http://localhost:5173?guest=Siti
```

### Sharing Invitations

Share the generated links with your guests. Each link contains the guest's name as a URL parameter.

**Example invitation link format:**
```
http://yourdomain.com?guest=GuestName
```

If a guest name is not found in your Google Sheet, they will be treated as "Guest" by default.

### Guest Experience

1. **Intro Screen**: Guests see a personalized welcome message
2. **RSVP Section**: Guests can choose "Hadir" (Attending) or "Tidak" (Not Attending)
3. **Wishes Section**: Guests can leave congratulatory messages
4. **All responses are automatically saved to your Google Sheets**

## Customization

### Color Palette

Update colors in `src/styles/global.css`:

```css
:root {
  --color-dark: #493628;
  --color-sage: #AB886D;
  --color-peach: #D6C0B3;
  --color-offwhite: #E4E0E1;
}
```

### Content

Edit the following components to customize content:
- `src/components/Hero.tsx` - Main wedding announcement
- `src/components/Bride.tsx` - Bride information
- `src/components/Groom.tsx` - Groom information
- `src/components/Quotes.tsx` - Wedding quotes
- `src/components/LoveStory.tsx` - Couple's love story

## Deployment

1. Build the project:
   ```bash
   bun run build
   ```

2. Deploy the `dist` folder to your hosting service (Netlify, Vercel, etc.)

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Framer Motion** - Animations
- **React Scroll Parallax** - Parallax effects
- **React Bootstrap** - UI components
- **SheetDB** - Google Sheets API
- **Google Fonts** - Typography
| id | String | Unique guest ID |
| name | String | Guest full name |
| email | String | Guest email (optional) |
| phone | String | Guest phone (optional) |
| status | String | pending/confirmed/declined |
| guestCount | Number | Number of guests attending |
| message | String | Additional message |

#### Wishes Sheet:
| Column | Type | Description |
|--------|------|-------------|
| id | String | Unique wish ID |
| guestId | String | Reference to guest ID |
| guestName | String | Guest name |
| message | String | Wish message |
| timestamp | String | ISO timestamp |

#### RSVP Sheet:
| Column | Type | Description |
|--------|------|-------------|
| guestId | String | Reference to guest ID |
| guestName | String | Guest name |
| status | String | hadir/tidak |
| guestCount | Number | Number of guests |
| message | String | Additional message |
| timestamp | String | ISO timestamp |

### 3. Set up SheetDB

1. Go to [SheetDB.io](https://sheetdb.io)
2. Connect your Google Sheet
3. Get your API endpoint URL
4. Update `src/services/googleSheets.ts`:
   ```typescript
   const SHEETDB_BASE_URL = 'https://sheetdb.io/api/v1/YOUR_SHEET_ID';
   ```

### 4. Generate Invitation Links

Run this in your browser console after setting up SheetDB:

```javascript
import { generateInvitationLinks } from './src/utils/generateLinks.ts';
generateInvitationLinks();
```

This will output unique invitation links for each guest like:
```
John Doe: https://yourdomain.com?guest=abc123
Jane Smith: https://yourdomain.com?guest=def456
```

### 5. Send Invitations

Send the unique links to each guest. When they open the link:
- Their name will be automatically displayed in the intro
- They can submit RSVP responses
- They can send wishes/messages
- All data syncs with your Google Sheets

## Customization

### Colors

Update the color palette in `src/styles/global.css`:

```css
:root {
  --color-dark: #493628;
  --color-sage: #AB886D;
  --color-peach: #D6C0B3;
  --color-offwhite: #E4E0E1;
}
```

### Content

Update guest information, wedding details, and content in the respective components:
- `src/components/Hero.tsx` - Main wedding title and date
- `src/components/Bride.tsx` - Bride information
- `src/components/Groom.tsx` - Groom information
- `src/components/Quotes.tsx` - Wedding quotes
- `src/components/AkadNikah.tsx` - Wedding ceremony details
- `src/components/Resepsi.tsx` - Reception details

## Deployment

1. Build the project:
   ```bash
   bun run build
   ```

2. Deploy the `dist` folder to your hosting service (Netlify, Vercel, etc.)

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Framer Motion** - Animations
- **React Scroll Parallax** - Parallax effects
- **React Bootstrap** - UI components
- **Google Fonts** - Typography
- **SheetDB** - Google Sheets API

## License

MIT License