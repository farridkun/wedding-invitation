# Quick CORS Testing Guide

## 🧪 Test Your SpreadAPI Setup

### Method 1: Browser Console Test (Fastest)

Open your browser console (F12) and paste this:

```javascript
// Replace with your actual Script ID
const SCRIPT_ID = 'AKfycbwSXWVTplzOdCqeDUc7JMGNj-GRdaBQR5Cx8ZnH8dWLMnUth4Tm9Bi_mh2E3WmZDtYPkg';

fetch(`https://script.google.com/macros/s/${SCRIPT_ID}/exec`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    method: 'GET',
    sheet: 'Guests'
  }),
  redirect: 'follow',
  mode: 'cors'
})
.then(response => {
  console.log('Response status:', response.status);
  return response.json();
})
.then(data => {
  console.log('✅ Success! Data:', data);
})
.catch(error => {
  console.error('❌ Error:', error);
});
```

### Method 2: Test with CURL (Command Line)

```bash
curl -X POST \
  'https://script.google.com/macros/s/AKfycbwSXWVTplzOdCqeDUc7JMGNj-GRdaBQR5Cx8ZnH8dWLMnUth4Tm9Bi_mh2E3WmZDtYPkg/exec' \
  -H 'Content-Type: application/json' \
  -d '{"method":"GET","sheet":"Guests"}' \
  -L
```

The `-L` flag follows redirects, which is important for Google Apps Script.

### Method 3: Test with Postman

1. Open Postman
2. Set method to **POST**
3. URL: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`
4. Headers:
   - `Content-Type`: `application/json`
5. Body (raw JSON):
   ```json
   {
     "method": "GET",
     "sheet": "Guests"
   }
   ```
6. Click **Send**

## 🔍 Expected Results

### ✅ Success Response

```json
[
  {
    "_id": 2,
    "No": "1",
    "Nama": "Ahmad",
    "Kehadiran": "pending",
    "Ucapan": ""
  },
  {
    "_id": 3,
    "No": "2",
    "Nama": "Siti",
    "Kehadiran": "pending",
    "Ucapan": ""
  }
]
```

### ❌ CORS Error (Browser Console)

```
Access to fetch at 'https://script.google.com/macros/s/.../exec' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution**: Update your Apps Script with the code from `CORS_FIX.md`

### ❌ 404 Error

```json
{
  "error": "Script not found"
}
```

**Solutions**:
- Check Script ID is correct
- Verify deployment is active
- Make sure you're using `/exec` not `/dev`

### ❌ 401/403 Authorization Error

```json
{
  "error": "Authorization required"
}
```

**Solutions**:
- Redeploy with "Anyone" access
- Make sure "Execute as: Me" is selected

## 🔧 Deployment Checklist

When deploying your Google Apps Script:

- [ ] **Deploy as**: Web app
- [ ] **Execute as**: Me (your-email@gmail.com)
- [ ] **Who has access**: Anyone
- [ ] **Version**: New version (after making changes)
- [ ] **URL format**: Uses `/exec` not `/dev`

## 🎯 Common Issues & Solutions

### Issue 1: Redirect Loop

**Symptom**: Request keeps redirecting
**Solution**: Make sure you're using POST method and have `redirect: 'follow'` in fetch options

### Issue 2: Empty Response

**Symptom**: Status 200 but empty data
**Solution**: 
- Check sheet name matches exactly (case-sensitive)
- Verify Google Sheet has data
- Ensure first row contains headers

### Issue 3: CORS Preflight Failed

**Symptom**: OPTIONS request fails before POST
**Solution**:
- Update Apps Script to handle `doOptions()`
- Use the CORS-enabled code from `CORS_FIX.md`

### Issue 4: "Cannot read property '_id'"

**Symptom**: Error when trying to update
**Solution**:
- Make sure GET request returns data with `_id` field
- Verify Apps Script includes `_id` in response

## 📝 Quick Verification Steps

1. **Test Direct URL** (should redirect):
   ```
   https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

2. **Check Deployment**:
   - Apps Script editor → Deploy → Manage deployments
   - Verify "Active" status
   - Confirm access is "Anyone"

3. **Verify Sheet Structure**:
   - First row has headers: No, Nama, Kehadiran, Ucapan
   - Sheet name is exactly "Guests" (case-sensitive)
   - At least one data row exists

4. **Test in Your App**:
   ```bash
   npm run dev
   # Visit: http://localhost:5173/?guest=Ahmad
   ```

## 🚀 If Everything Works

You should see:
- ✅ No CORS errors in console
- ✅ Guest data loads on page
- ✅ RSVP form can submit
- ✅ Data appears in Google Sheet

## 🆘 Still Not Working?

1. **Check `CORS_FIX.md`** for the complete Apps Script code
2. **Redeploy** as a new version
3. **Clear cache** (Ctrl+Shift+R / Cmd+Shift+R)
4. **Try incognito mode** to rule out browser extensions
5. **Check browser console** for specific error messages

---

## 📞 Debug Info to Share

If you need help, provide:

1. Error message from browser console
2. Network tab details (Headers, Response)
3. Your deployment settings (Execute as, Who has access)
4. Whether CURL test works but browser doesn't
