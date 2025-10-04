# Migration Summary: SheetDB.io → SpreadAPI

## ✅ Changes Completed

### 1. Service Layer Updated (`src/services/googleSheets.ts`)

**Before (SheetDB):**
- Used REST API with URL parameters: `GET /api/v1/ID?sheet=Guests`
- Required paid subscription after limits
- PATCH method for updates

**After (SpreadAPI):**
- Uses Google Apps Script with POST requests containing JSON body
- Completely free forever
- PUT method for updates with `_id` field
- Runs on your own Google account

### 2. Key Changes in API Structure

| Operation | SheetDB | SpreadAPI |
|-----------|---------|-----------|
| Get All | `GET /api/v1/ID?sheet=Guests` | `POST {method: "GET", sheet: "Guests"}` |
| Update | `PATCH /api/v1/ID/Nama/value?sheet=Guests` | `POST {method: "PUT", sheet: "Guests", payload: {_id: 2, ...}}` |
| Row ID | Custom column (e.g., `No`, `Nama`) | Automatic `_id` field (row number) |
| Response | Array or {updated: count} | Array or updated object |

### 3. New Files Created

1. **`SPREADAPI_SETUP.md`** - Complete setup guide for SpreadAPI
2. **`MIGRATION_SUMMARY.md`** - This file

### 4. Configuration Required

**IMPORTANT**: You need to complete these steps:

1. **Install SpreadAPI in Google Sheets**
   - Follow the guide in `SPREADAPI_SETUP.md`
   - Deploy the web app and get your Script ID

2. **Update Configuration**
   - Open `src/services/googleSheets.ts`
   - Replace `YOUR_SCRIPT_ID` with your actual Script ID

   ```typescript
   // Line 6 in googleSheets.ts
   const SPREADAPI_SCRIPT_ID = 'YOUR_ACTUAL_SCRIPT_ID_HERE';
   ```

## 🔄 How It Works Now

### Data Flow

```
Wedding Invitation App
        ↓
   googleSheets.ts
        ↓
  SpreadAPI (POST request with JSON)
        ↓
  Google Apps Script (on your account)
        ↓
  Google Sheets
```

### Example: Updating Guest RSVP

**Old SheetDB Way:**
```typescript
fetch(`https://sheetdb.io/api/v1/ID/Nama/Ahmad?sheet=Guests`, {
  method: 'PATCH',
  body: JSON.stringify({ Kehadiran: 'hadir' })
})
```

**New SpreadAPI Way:**
```typescript
// 1. Get guest to find _id
const guest = await getGuestByName('Ahmad'); // Returns {_id: 2, ...}

// 2. Update using _id
fetch(`https://script.google.com/macros/s/SCRIPT_ID/exec`, {
  method: 'POST',
  body: JSON.stringify({
    method: 'PUT',
    sheet: 'Guests',
    payload: {
      _id: guest._id,
      Kehadiran: 'hadir'
    }
  })
})
```

## 📋 Updated Methods

### `getGuestByName(guestName: string)`
- Fetches all guests from 'Guests' sheet
- Finds guest by name (case-insensitive)
- Returns Guest object with `_id` field

### `getAllGuests()`
- Fetches all guests from 'Guests' sheet
- Returns array of Guest objects

### `updateGuestAttendance(guestName: string, status: 'hadir' | 'tidak')`
1. Gets guest by name to retrieve `_id`
2. Uses PUT method with `_id` and new attendance status
3. Returns success boolean

### `updateGuestResponse(guestName: string, status: 'hadir' | 'tidak', ucapan: string)`
1. Gets guest by name to retrieve `_id`
2. Uses PUT method with `_id`, attendance status, and wishes
3. Returns success boolean

## 🎯 Benefits of SpreadAPI

| Feature | SheetDB | SpreadAPI |
|---------|---------|-----------|
| Cost | Free tier limited, then paid | 100% Free forever |
| Rate Limits | Yes (500 requests/month free) | Google Apps Script quotas |
| Data Privacy | Third-party service | Runs on your account |
| Setup Complexity | Easy (just API key) | Medium (Apps Script deploy) |
| Maintenance | Depends on service | Self-hosted on Google |
| Open Source | No | Yes |

## 🚀 Next Steps

1. **Read the setup guide**: Open `SPREADAPI_SETUP.md`
2. **Deploy SpreadAPI**: Follow the step-by-step instructions
3. **Update config**: Replace `YOUR_SCRIPT_ID` in `googleSheets.ts`
4. **Test locally**: Run `npm run dev` and test RSVP form
5. **Deploy**: Build and deploy to Netlify

## 🧪 Testing

After setup, test these scenarios:

1. **View invitation with guest name**
   - URL: `http://localhost:5173/?guest=Ahmad`
   - Should show personalized greeting

2. **Submit RSVP**
   - Select attendance status
   - Write wishes
   - Submit form
   - Check Google Sheet for updates

3. **View all guests**
   - Open browser console
   - Run: `import('./services/googleSheets.js').then(m => m.sheetsService.getAllGuests()).then(console.log)`

## 📚 Resources

- SpreadAPI Documentation: https://spreadapi.roombelt.com/
- SpreadAPI GitHub: https://github.com/ziolko/spreadapi
- Setup Guide: See `SPREADAPI_SETUP.md`

## ⚠️ Important Notes

1. **_id Field**: SpreadAPI uses `_id` as the row number (1-based index including header)
2. **Header Row Required**: First row must contain column names
3. **Empty Rows**: Automatically skipped by SpreadAPI
4. **Authorization**: You'll need to authorize the Apps Script on first deployment

## 🔒 Security

- SpreadAPI URL is public but obscure (hard to guess)
- Consider rate limiting in your app if needed
- Monitor your Google Sheet for suspicious activity
- Can revoke access anytime via Apps Script deployments

---

**Questions or Issues?**
- Check `SPREADAPI_SETUP.md` for detailed setup instructions
- See SpreadAPI documentation for API details
- Google Apps Script docs for deployment help
