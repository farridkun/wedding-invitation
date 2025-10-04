# 🎉 Migration Complete: SheetDB → SpreadAPI

## ✅ What Changed

Your wedding invitation now uses **SpreadAPI** instead of SheetDB.io - a **100% FREE** Google Sheets API solution!

## 💰 Cost Savings

- **Before**: SheetDB.io = $15-49/month after free tier
- **After**: SpreadAPI = **$0 FOREVER**
- **Annual Savings**: $180-588! 💸

## 📝 What You Need To Do

### Required: Configure SpreadAPI (5 minutes)

Follow the **QUICKSTART_SPREADAPI.md** guide:

1. Open your Google Sheet
2. Add Apps Script (Extensions → Apps Script)
3. Copy SpreadAPI code from https://spreadapi.roombelt.com/setup
4. Deploy as Web app
5. Update `src/services/googleSheets.ts` with your Script ID

**See**: `QUICKSTART_SPREADAPI.md` for step-by-step instructions

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `QUICKSTART_SPREADAPI.md` | ⚡ 5-minute setup guide |
| `SPREADAPI_SETUP.md` | 📖 Detailed setup instructions |
| `MIGRATION_SUMMARY.md` | 🔄 Technical migration details |
| `README.md` | 📘 Updated with SpreadAPI info |

## 🔧 Technical Changes

### Files Modified

1. **`src/services/googleSheets.ts`**
   - Complete rewrite for SpreadAPI compatibility
   - Uses POST requests with JSON body
   - Implements `_id` based row updates
   - Maintains same public API (no breaking changes to components)

2. **`README.md`**
   - Updated setup section with SpreadAPI instructions
   - Removed SheetDB references

### API Method Changes

All methods maintain the same interface - **no changes needed in components!**

```typescript
// These still work the same way from your components:
sheetsService.getGuestByName(name)
sheetsService.getAllGuests()
sheetsService.updateGuestAttendance(name, status)
sheetsService.updateGuestResponse(name, status, wishes)
```

**Internal implementation changed, but external API unchanged!**

## 🎯 Features

### What Still Works
- ✅ Guest data fetching
- ✅ RSVP submission
- ✅ Attendance tracking
- ✅ Wishes/messages
- ✅ Personalized invitations
- ✅ All existing components

### What's Better Now
- ✅ **FREE forever** (no more paid subscriptions)
- ✅ **No rate limits** (within Google's quotas)
- ✅ **More privacy** (runs on your account, not third-party)
- ✅ **Open source** (can customize if needed)
- ✅ **More reliable** (Google infrastructure)

## 🚀 Deployment Checklist

Before deploying to Netlify:

- [ ] Set up SpreadAPI in Google Sheets
- [ ] Deploy Apps Script as Web app
- [ ] Copy Script ID
- [ ] Update `SPREADAPI_SCRIPT_ID` in `src/services/googleSheets.ts`
- [ ] Test locally with `npm run dev`
- [ ] Verify RSVP form works
- [ ] Build: `npm run build`
- [ ] Deploy to Netlify
- [ ] Test production site

## 🧪 Testing Your Setup

### Local Testing
```bash
npm run dev
```

Visit: `http://localhost:5173/?guest=YourTestName`

### Direct API Testing

Open browser console and run:

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

Should return array of guests with `_id` field.

## ⚠️ Important Notes

### Google Sheet Structure

Your "Guests" sheet MUST have these columns:

| No | Nama | Kehadiran | Ucapan |
|----|------|-----------|---------|

- First row = headers
- `_id` is added automatically by SpreadAPI
- Empty rows are skipped

### Script ID Location

In `src/services/googleSheets.ts` line 6:

```typescript
const SPREADAPI_SCRIPT_ID = 'YOUR_SCRIPT_ID'; // ← Replace this!
```

Get it from your deployment URL:
```
https://script.google.com/macros/s/AKfycbxXXXXXXXXXX/exec
                                     ↑ This part
```

## 🔒 Security

- Deployment URL is public but hard to guess
- Only those with the exact URL can access
- Runs under your Google account permissions
- Can revoke access anytime via Apps Script
- Monitor your sheet for unauthorized changes

## 🆘 Troubleshooting

### "Script not found"
- Verify Script ID is correct
- Ensure deployment is active in Apps Script

### "Authorization required"
- Redeploy the Apps Script
- Authorize when prompted

### "Cannot read property '_id'"
- Check Google Sheet has header row
- Verify sheet name is "Guests"

### Changes not saving
- Check browser console for errors
- Verify Sheet name matches exactly
- Ensure deployment URL is correct

## 📖 Resources

- **Quick Start**: `QUICKSTART_SPREADAPI.md`
- **Detailed Setup**: `SPREADAPI_SETUP.md`
- **Technical Details**: `MIGRATION_SUMMARY.md`
- **SpreadAPI Docs**: https://spreadapi.roombelt.com/
- **SpreadAPI GitHub**: https://github.com/ziolko/spreadapi

## 💡 Pro Tips

1. **Test First**: Set up SpreadAPI and test locally before deploying
2. **Backup**: Keep a copy of your Google Sheet
3. **Monitor**: Check your sheet after first few RSVPs
4. **Document**: Keep your Script ID in a safe place
5. **Update**: If you change sheet structure, redeploy the Apps Script

## 🎊 Benefits Summary

| Aspect | SheetDB | SpreadAPI |
|--------|---------|-----------|
| **Cost** | $15-49/mo | FREE ✅ |
| **Limits** | 500 req/month | No limits ✅ |
| **Privacy** | Third-party | Your account ✅ |
| **Setup** | Easy | Medium |
| **Maintenance** | External | Self-hosted |
| **Open Source** | No | Yes ✅ |
| **Reliability** | Good | Google infra ✅ |

## 🎯 Next Steps

1. **Read**: `QUICKSTART_SPREADAPI.md`
2. **Setup**: Follow the 5-minute guide
3. **Test**: Run locally and verify
4. **Deploy**: Push to production
5. **Celebrate**: You're saving money! 🎉

---

## 📞 Need Help?

If you encounter issues:

1. Check the troubleshooting section above
2. Review `SPREADAPI_SETUP.md` for detailed steps
3. Visit SpreadAPI documentation
4. Check Google Apps Script logs

---

**Happy Wedding! 🎊💑**

Your invitation is now powered by free, open-source technology!
