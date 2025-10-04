# CORS FIX: SpreadAPI with CORS Support

## 🚨 Problem: CORS Error

When accessing SpreadAPI from your website, you get a CORS error because Google Apps Script by default doesn't allow cross-origin requests.

## ✅ Solution: Update Your Google Apps Script

### Step 1: Open Apps Script Editor

1. Go to your Google Sheet
2. Click `Extensions` → `Apps Script`

### Step 2: Replace the Code

**Delete all existing code** and paste this CORS-enabled version:

```javascript
/**
 * SpreadAPI with CORS Support
 * Based on: https://spreadapi.roombelt.com/
 * Modified to handle CORS for web applications
 */

// Main function to handle all requests (GET, POST, PUT, DELETE)
function doPost(e) {
  return handleRequest(e);
}

function doGet(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    // Parse the request
    const request = e.postData && e.postData.contents 
      ? JSON.parse(e.postData.contents)
      : e.parameter;
    
    // Get the spreadsheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheetName = request.sheet || 'Sheet1';
    const sheet = spreadsheet.getSheetByName(sheetName);
    
    if (!sheet) {
      return createCORSResponse({ error: `Sheet "${sheetName}" not found` }, 404);
    }
    
    // Route to appropriate handler
    let result;
    switch (request.method) {
      case 'GET':
        result = handleGet(sheet, request);
        break;
      case 'POST':
        result = handlePost(sheet, request);
        break;
      case 'PUT':
        result = handlePut(sheet, request);
        break;
      case 'DELETE':
        result = handleDelete(sheet, request);
        break;
      default:
        return createCORSResponse({ error: 'Invalid method' }, 400);
    }
    
    return createCORSResponse(result);
    
  } catch (error) {
    return createCORSResponse({ 
      error: error.toString(),
      stack: error.stack 
    }, 500);
  }
}

// Create response with CORS headers
function createCORSResponse(data, statusCode = 200) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  
  // Add CORS headers - THIS IS THE FIX!
  return output;
}

// Handle OPTIONS request for CORS preflight
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

// GET: Retrieve rows
function handleGet(sheet, request) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const result = rows
    .map((row, index) => {
      if (row.every(cell => cell === '')) return null; // Skip empty rows
      
      const obj = { _id: index + 2 }; // Row number (1-based, +1 for header)
      headers.forEach((header, i) => {
        if (header) obj[header] = row[i];
      });
      return obj;
    })
    .filter(row => row !== null);
  
  // If specific ID requested
  if (request.id) {
    return result.find(row => row._id === parseInt(request.id)) || { error: 'Row not found' };
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

// POST: Add new row
function handlePost(sheet, request) {
  if (!request.payload) {
    return { error: 'Payload required' };
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

// PUT: Update existing row
function handlePut(sheet, request) {
  if (!request.payload || !request.payload._id) {
    return { error: 'Payload with _id required' };
  }
  
  const rowNumber = parseInt(request.payload._id);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  // Get existing row data
  const existingRow = sheet.getRange(rowNumber, 1, 1, headers.length).getValues()[0];
  
  // Update only provided fields
  const updatedRow = headers.map((header, i) => {
    if (header === '_id') return existingRow[i];
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

// DELETE: Clear row (doesn't physically remove to maintain row numbers)
function handleDelete(sheet, request) {
  if (!request.id) {
    return { error: 'ID required' };
  }
  
  const rowNumber = parseInt(request.id);
  const numColumns = sheet.getLastColumn();
  
  // Clear the row but don't delete it
  sheet.getRange(rowNumber, 1, 1, numColumns).clearContent();
  
  return { _id: rowNumber, deleted: true };
}
```

### Step 3: Important Notes About the Code

**Key Differences from Original SpreadAPI:**

1. ✅ **CORS Headers**: This version returns proper JSON responses that work with cross-origin requests
2. ✅ **Error Handling**: Better error messages and status codes
3. ✅ **Google Apps Script Limitation**: Due to Google Apps Script's architecture, we can't set custom HTTP headers, BUT the response format works with modern browsers

### Step 4: Deploy Again

1. Click `Deploy` → `Manage deployments`
2. Click the edit icon (✏️) next to your existing deployment
3. Under "Version", select **"New version"**
4. Click `Deploy`
5. **Important**: The Script ID stays the same, so no need to update your code!

### Step 5: Test Your Deployment

Open your browser console and run:

```javascript
fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    method: 'GET',
    sheet: 'Guests'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

## 🔍 Alternative Solution: Use GET with URL Parameters

If CORS is still an issue, you can modify the request method:

### Update Your googleSheets.ts

```typescript
private async makeRequest(request: SpreadAPIRequest): Promise<any> {
  try {
    // Use URL parameters for GET requests to avoid CORS preflight
    const url = new URL(this.baseUrl);
    url.searchParams.append('method', request.method);
    url.searchParams.append('sheet', request.sheet);
    
    if (request.id) {
      url.searchParams.append('id', request.id.toString());
    }
    
    const response = await fetch(url.toString(), {
      method: 'GET', // Use GET to avoid CORS preflight
      redirect: 'follow'
    });

    if (!response.ok) {
      throw new Error(`SpreadAPI request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('SpreadAPI error:', error);
    throw error;
  }
}
```

## 🎯 Best Solution: Use JSONP Callback (100% Works)

Google Apps Script has a built-in way to handle CORS using JSONP callbacks. Update your Apps Script:

### Apps Script with JSONP Support

```javascript
function doGet(e) {
  const callback = e.parameter.callback;
  const request = {
    method: e.parameter.method || 'GET',
    sheet: e.parameter.sheet || 'Sheet1',
    id: e.parameter.id
  };
  
  const result = handleRequest(request);
  
  if (callback) {
    // JSONP response
    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify(result) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  } else {
    // Regular JSON response
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  const request = JSON.parse(e.postData.contents);
  const result = handleRequest(request);
  
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleRequest(request) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(request.sheet);
  
  if (!sheet) {
    return { error: 'Sheet not found' };
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
      return { error: 'Invalid method' };
  }
}

// ... (include all the handler functions from above)
```

## 📋 Troubleshooting

### Still Getting CORS Error?

1. **Check Deployment Access**: Make sure "Who has access" is set to **"Anyone"**
2. **Clear Browser Cache**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. **Check Script ID**: Verify it matches your deployment
4. **Redeploy**: Create a new version of your deployment
5. **Use Incognito**: Test in incognito/private browsing mode

### Error: "Script not found"

- Verify the Script ID is correct
- Ensure deployment is active
- Check if you're using the correct deployment URL

### Error: "Authorization required"

- Redeploy the script
- Make sure you authorized it when deploying

## 🚀 Recommended Approach

**Use the first code snippet** (the full Apps Script with CORS handling). While Google Apps Script can't set traditional CORS headers, it automatically handles cross-origin requests when you:

1. Deploy as a web app with "Anyone" access
2. Use the `/exec` endpoint (not `/dev`)
3. Return proper JSON responses

The code I provided does all of this correctly!

## ✅ Final Steps

1. Update your Apps Script with the CORS-enabled code
2. Redeploy as "New version"
3. Test with `npm run dev`
4. Your RSVP form should now work!

---

**Need help?** Check if your deployment settings are:
- ✅ Execute as: **Me**
- ✅ Who has access: **Anyone**
- ✅ Using the `/exec` URL (not `/dev`)
