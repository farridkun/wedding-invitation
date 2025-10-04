# FINAL SOLUTION: No-CORS SpreadAPI

## 🎯 The Problem

Postman works, but browser doesn't because:
- **POST with `Content-Type: application/json`** triggers CORS preflight (OPTIONS request)
- Google Apps Script can't properly handle OPTIONS preflight
- Result: CORS error in browser

## ✅ The Solution

Use **GET requests with query parameters** instead of POST with JSON body. GET requests don't trigger CORS preflight!

---

## Step 1: Update Your Google Apps Script

Replace ALL code in your Apps Script editor with this:

```javascript
/**
 * SpreadAPI - No CORS Issues Version
 * Uses GET requests with query parameters to avoid CORS preflight
 */

function doGet(e) {
  try {
    // Parse request from query parameters
    const request = {
      method: e.parameter.method || 'GET',
      sheet: e.parameter.sheet || 'Guests',
      id: e.parameter.id ? parseInt(e.parameter.id) : null,
      payload: e.parameter.payload ? JSON.parse(e.parameter.payload) : null,
      query: e.parameter.query ? JSON.parse(e.parameter.query) : null
    };
    
    const result = handleRequest(request);
    
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        error: error.toString(),
        message: error.message,
        stack: error.stack
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleRequest(request) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(request.sheet);
  
  if (!sheet) {
    return { error: 'Sheet not found: ' + request.sheet };
  }
  
  switch (request.method) {
    case 'GET':
      return handleGet(sheet, request);
    case 'POST':
      return handlePost(sheet, request);
    case 'PUT':
      return handlePut(sheet, request);
    case 'DELETE':
      return handleDelete(sheet, request);
    default:
      return { error: 'Invalid method: ' + request.method };
  }
}

function handleGet(sheet, request) {
  const data = sheet.getDataRange().getValues();
  
  if (data.length === 0) {
    return [];
  }
  
  const headers = data[0];
  const rows = data.slice(1);
  
  const result = rows
    .map((row, index) => {
      // Skip completely empty rows
      if (row.every(cell => cell === '' || cell === null || cell === undefined)) {
        return null;
      }
      
      const obj = { _id: index + 2 }; // Row number (1-based, +1 for header row)
      headers.forEach((header, i) => {
        if (header) {
          obj[header] = row[i] !== undefined && row[i] !== null ? row[i] : '';
        }
      });
      return obj;
    })
    .filter(row => row !== null);
  
  // If specific ID requested
  if (request.id) {
    const found = result.find(row => row._id === request.id);
    return found || { error: 'Row not found', id: request.id };
  }
  
  // Apply query filters if provided
  if (request.query) {
    return result.filter(row => {
      return Object.keys(request.query).every(key => {
        return row[key] === request.query[key];
      });
    });
  }
  
  return result;
}

function handlePost(sheet, request) {
  if (!request.payload) {
    return { error: 'Payload required for POST' };
  }
  
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const newRow = headers.map(header => request.payload[header] || '');
  
  sheet.appendRow(newRow);
  
  const lastRow = sheet.getLastRow();
  const result = { _id: lastRow };
  headers.forEach((header, i) => {
    result[header] = newRow[i];
  });
  
  return result;
}

function handlePut(sheet, request) {
  if (!request.payload || !request.payload._id) {
    return { error: 'Payload with _id required for PUT' };
  }
  
  const rowNumber = parseInt(request.payload._id);
  
  if (rowNumber < 2) {
    return { error: 'Invalid row number. Must be >= 2 (row 1 is headers)' };
  }
  
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  // Get existing row data
  const existingRow = sheet.getRange(rowNumber, 1, 1, headers.length).getValues()[0];
  
  // Update only provided fields (merge with existing)
  const updatedRow = headers.map((header, i) => {
    if (header === '_id') return existingRow[i]; // Don't update _id column if it exists
    return request.payload.hasOwnProperty(header) ? request.payload[header] : existingRow[i];
  });
  
  // Write back to sheet
  sheet.getRange(rowNumber, 1, 1, headers.length).setValues([updatedRow]);
  
  // Return updated row
  const result = { _id: rowNumber };
  headers.forEach((header, i) => {
    result[header] = updatedRow[i];
  });
  
  return result;
}

function handleDelete(sheet, request) {
  if (!request.id) {
    return { error: 'ID required for DELETE' };
  }
  
  const rowNumber = parseInt(request.id);
  
  if (rowNumber < 2) {
    return { error: 'Invalid row number. Must be >= 2 (row 1 is headers)' };
  }
  
  const numColumns = sheet.getLastColumn();
  
  // Clear the row but don't physically delete it (to maintain row numbers/_id)
  sheet.getRange(rowNumber, 1, 1, numColumns).clearContent();
  
  return { _id: rowNumber, deleted: true };
}
```

## Step 2: Save and Redeploy

1. **Save** the script (💾 icon)
2. **Redeploy**:
   - Click `Deploy` → `Manage deployments`
   - Click the edit icon (✏️)
   - Version: **"New version"**
   - Click `Deploy`
3. **Script ID stays the same** - no need to update your React code!

## Step 3: Test

Your React code is already updated to use GET requests!

```bash
npm run dev
# Visit: http://localhost:5173/?guest=Reno%20Barak
```

## 🔍 Why This Works

| Method | CORS Preflight? | Works in Browser? |
|--------|-----------------|-------------------|
| POST with JSON body | ✅ YES (OPTIONS request) | ❌ NO (Google Apps Script can't handle) |
| GET with query params | ❌ NO | ✅ YES (No preflight needed!) |

**GET requests** with simple content types don't trigger CORS preflight, so they work perfectly with Google Apps Script!

## 📊 Request Format Change

**Before (POST - caused CORS error):**
```javascript
POST https://script.google.com/.../exec
Content-Type: application/json
Body: {"method":"GET","sheet":"Guests"}
```

**After (GET - no CORS error):**
```
GET https://script.google.com/.../exec?method=GET&sheet=Guests
```

## ✅ Verification

Test in browser console:

```javascript
const SCRIPT_ID = 'AKfycbyfLiSxjGH-axb33T-QKOw-DBBAX2okUKZEdE545rCCyTedicW0tx7E3M56wNbH8uPTow';

fetch(`https://script.google.com/macros/s/${SCRIPT_ID}/exec?method=GET&sheet=Guests`, {
  method: 'GET',
  redirect: 'follow'
})
.then(r => r.json())
.then(data => console.log('✅ Success:', data))
.catch(err => console.error('❌ Error:', err));
```

Should return your guest list with no CORS errors!

## 🎯 What's Changed

### In Your React App (`googleSheets.ts`):
- ✅ Changed from POST to GET
- ✅ Passes data via URL query parameters
- ✅ No `Content-Type: application/json` header
- ✅ No CORS preflight triggered

### In Google Apps Script:
- ✅ Only `doGet()` function needed
- ✅ Parses query parameters instead of POST body
- ✅ Returns JSON response
- ✅ Handles all CRUD operations via GET

## 🚀 Ready to Go!

1. ✅ Updated `googleSheets.ts` (already done)
2. ✅ Updated Google Apps Script (copy code above)
3. ✅ Redeploy as new version
4. ✅ Test your app

**No more CORS errors!** 🎉

---

## 📝 Notes

- **Security**: GET with query params is fine for your use case (wedding invitation)
- **URL Length**: Google supports URLs up to ~2000 characters (plenty for your data)
- **Caching**: GET requests might be cached, but that's okay for read operations
- **Updates**: PUT/POST operations still work via GET with payload parameter

---

## 🆘 Still Having Issues?

Make sure:
- ✅ Deployment "Who has access" = **Anyone**
- ✅ Using `/exec` URL (not `/dev`)
- ✅ Cleared browser cache (Ctrl+Shift+R)
- ✅ Google Sheet has "Guests" sheet with proper headers

Test the URL directly in browser:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?method=GET&sheet=Guests
```

Should display JSON data!
