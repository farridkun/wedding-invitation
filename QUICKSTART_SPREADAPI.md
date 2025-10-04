# Quick Start: SpreadAPI Configuration

## ⚡ 5-Minute Setup

### Step 1: Copy SpreadAPI Code
1. Open your Google Sheet
2. Go to `Extensions` → `Apps Script`
3. Visit: https://spreadapi.roombelt.com/setup
4. Copy all the code and paste into Apps Script
5. Save (💾)

### Step 2: Deploy
1. Click `Deploy` → `New deployment`
2. Select type: `Web app`
3. Execute as: `Me`
4. Who has access: `Anyone`
5. Click `Deploy` (authorize if asked)

### Step 3: Get Your Script ID
From your deployment URL:
```
https://script.google.com/macros/s/AKfycbxXXXXXXXXXX/exec
                                     ↑ This is your Script ID
```

### Step 4: Update Config
Edit `src/services/googleSheets.ts` line 6:
```typescript
const SPREADAPI_SCRIPT_ID = 'AKfycbxXXXXXXXXXX'; // ← Paste your Script ID here
```

### Step 5: Test
```bash
npm run dev
# Visit: http://localhost:5173/?guest=TestName
```

## ✅ Done! Your API is now FREE forever!

---

## 📊 Your Google Sheet Format

Make sure your sheet named "Guests" has these columns:

| No | Nama | Kehadiran | Ucapan |
|----|------|-----------|---------|
| 1  | Ahmad | pending  | |
| 2  | Siti  | pending  | |

**Important**: First row = headers

---

## 🔍 Quick Test

Test your SpreadAPI in browser console:

```javascript
// Test GET
fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    method: 'GET',
    sheet: 'Guests'
  })
}).then(r => r.json()).then(console.log)
```

Expected result: Array of guest objects with `_id` field

---

## 📚 Need More Help?

- **Full Setup Guide**: See `SPREADAPI_SETUP.md`
- **Migration Details**: See `MIGRATION_SUMMARY.md`
- **SpreadAPI Docs**: https://spreadapi.roombelt.com/

---

## 🎯 Why This Change?

| SheetDB | SpreadAPI |
|---------|-----------|
| 💰 $15-49/month | ✅ FREE forever |
| 📊 500 req/month free | ✅ No limits |
| 🔐 Third-party | ✅ Your account |

**You save $180-588/year!** 💰
