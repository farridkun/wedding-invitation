# SpreadAPI Setup Guide

## Why SpreadAPI?

SpreadAPI is a **100% FREE** alternative to SheetDB.io with:
- ✅ No rate limits
- ✅ No monthly fees
- ✅ No data sharing with third parties
- ✅ Full control over your data
- ✅ Open source

## Step-by-Step Setup

### 1. Prepare Your Google Sheet

Make sure your Google Sheet has a sheet named **"Guests"** with these columns:

| No | Nama | Kehadiran | Ucapan |
|----|------|-----------|---------|
| 1  | Ahmad | pending  | |
| 2  | Siti  | pending  | |

**Important**: The first row must be the header row with column names.

### 2. Install SpreadAPI Script

1. **Open Your Google Sheet**
   - Go to your Google Sheet: [Your Sheet URL]

2. **Open Apps Script Editor**
   - Click `Extensions` → `Apps Script`
   - This will open the Google Apps Script editor

3. **Copy the SpreadAPI Code**
   - Go to: https://spreadapi.roombelt.com/setup
   - Copy the entire code from the setup page

4. **Paste the Code**
   - Delete any existing code in the Apps Script editor
   - Paste the SpreadAPI code
   - Click the save icon (💾) or press `Ctrl+S` / `Cmd+S`
   - Name your project (e.g., "Wedding Invitation API")

### 3. Deploy the Web App

1. **Click "Deploy"**
   - In the Apps Script editor, click `Deploy` → `New deployment`

2. **Configure Deployment**
   - Click the gear icon ⚙️ next to "Select type"
   - Choose `Web app`

3. **Set Permissions**
   - **Description**: "Wedding Invitation API"
   - **Execute as**: Select `Me (your-email@gmail.com)`
   - **Who has access**: Select `Anyone`
   
   ⚠️ **Important**: "Anyone" means anyone with the URL can access it. Since this is for your wedding invitation, this is necessary for guests to submit their RSVPs.

4. **Deploy**
   - Click `Deploy`
   - You may need to authorize the app:
     - Click `Authorize access`
     - Choose your Google account
     - Click `Advanced` → `Go to [Your Project Name] (unsafe)`
     - Click `Allow`

5. **Copy Your Deployment URL**
   - After deployment, you'll see a URL like:
     ```
     https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec
     ```
   - Copy the part between `/s/` and `/exec` - this is your **SCRIPT_ID**
   - Example: `AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

### 4. Update Your Wedding Invitation Code

1. **Open the Config File**
   - Open: `src/services/googleSheets.ts`

2. **Replace the Script ID**
   - Find this line:
     ```typescript
     const SPREADAPI_SCRIPT_ID = 'YOUR_SCRIPT_ID';
     ```
   - Replace `YOUR_SCRIPT_ID` with your actual Script ID:
     ```typescript
     const SPREADAPI_SCRIPT_ID = 'AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
     ```

3. **Save and Test**
   - Save the file
   - Run your development server: `npm run dev`
   - Test the RSVP form to ensure it works

### 5. Testing Your Setup

You can test your SpreadAPI directly using this HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <title>SpreadAPI Test</title>
</head>
<body>
    <h1>SpreadAPI Test</h1>
    <button onclick="testGet()">Test GET (Fetch Guests)</button>
    <button onclick="testUpdate()">Test UPDATE (Update Guest)</button>
    <pre id="result"></pre>

    <script>
        const API_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

        async function testGet() {
            const result = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    method: 'GET',
                    sheet: 'Guests'
                })
            });
            const data = await result.json();
            document.getElementById('result').textContent = JSON.stringify(data, null, 2);
        }

        async function testUpdate() {
            const result = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    method: 'PUT',
                    sheet: 'Guests',
                    payload: {
                        _id: 2,
                        Kehadiran: 'hadir'
                    }
                })
            });
            const data = await result.json();
            document.getElementById('result').textContent = JSON.stringify(data, null, 2);
        }
    </script>
</body>
</html>
```

Replace `YOUR_SCRIPT_ID` with your actual Script ID and open this HTML file in a browser.

## Troubleshooting

### Error: "Script has exceeded the maximum execution time"
- This usually happens with large sheets
- Solution: Reduce the number of rows or optimize your sheet structure

### Error: "Authorization required"
- Make sure you authorized the app during deployment
- Try redeploying and authorizing again

### Error: "Cannot read property '_id'"
- Make sure your Google Sheet has a header row
- SpreadAPI uses the first row as column names

### Changes Not Reflecting
- After updating your Google Sheet structure, you may need to redeploy:
  - Go to Apps Script editor
  - Click `Deploy` → `Manage deployments`
  - Click the edit icon ✏️ next to your deployment
  - Change the version to "New version"
  - Click `Deploy`

## API Reference

### Get All Guests
```javascript
{
  "method": "GET",
  "sheet": "Guests"
}
```

### Get Single Guest by ID
```javascript
{
  "method": "GET",
  "sheet": "Guests",
  "id": 2
}
```

### Update Guest
```javascript
{
  "method": "PUT",
  "sheet": "Guests",
  "payload": {
    "_id": 2,
    "Kehadiran": "hadir",
    "Ucapan": "Selamat menempuh hidup baru!"
  }
}
```

### Add New Guest
```javascript
{
  "method": "POST",
  "sheet": "Guests",
  "payload": {
    "No": 3,
    "Nama": "Budi",
    "Kehadiran": "pending"
  }
}
```

### Delete Guest
```javascript
{
  "method": "DELETE",
  "sheet": "Guests",
  "id": 3
}
```

## Important Notes

1. **Row ID (_id)**: SpreadAPI automatically adds `_id` field to each row, which is the row number in the sheet
2. **Header Row**: The first row must contain column headers
3. **Empty Rows**: Empty rows are automatically skipped
4. **Rate Limits**: Since it runs on your Google account, it uses Google's quotas (very generous for personal use)

## Need Help?

- SpreadAPI Documentation: https://spreadapi.roombelt.com/
- SpreadAPI GitHub: https://github.com/ziolko/spreadapi
- Google Apps Script Docs: https://developers.google.com/apps-script

## Security Considerations

- The deployment URL is public but requires knowing the exact URL
- Consider adding authentication in your app if needed
- Monitor your Google Sheet for any unauthorized changes
- You can revoke access anytime by disabling the deployment in Apps Script

---

**Happy Wedding! 🎉💑**
