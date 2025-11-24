# 🚀 Quick Start Guide

## For the Client

### 1. Open the Application
- Double-click `index.html`
- It opens in your web browser

### 2. Create a Contract
- Click "Start New Contract"
- Answer 18 simple questions
- Click "Review"
- Click "Generate PDF Contract"
- PDF downloads automatically!

### 3. Done!
- Find your PDF in the Downloads folder
- File name: `RomaRentals_Contract_YYYY-MM-DD.pdf`

**Time Required:** 5 minutes

---

## For the Developer

### Testing the System

1. **Open in Browser:**
   ```
   Double-click index.html
   OR
   Open in browser: file:///d:/Working/WWW/CCCC/index.html
   ```

2. **Test Data (Use this for testing):**
   - Effective Date: `18 November 2025`
   - Tenant Name: `University of Notre Dame`
   - Tenant Address: `11 Walsh Family Hall of Architecture`
   - Tenant City: `Notre Dame, IN 46556`
   - Tenant Phone: `+1 (574) 631-5000`
   - Tenant Email: `contact@nd.edu`
   - Property 1 Address: `Via Dandolo 10, Scale A, Int. 2, 00153 Rome, Italy`
   - Property 1 Details: `2 STUDENTS (2 Bedrooms, 1 Bathroom)`
   - Property 2 Address: `Viale di Trastevere 66, Scale E, Int. 8, 00153 Rome, Italy`
   - Property 2 Details: `3 STUDENTS (3 Bedrooms, 2 Bathrooms)`
   - Total Students: `5`
   - Total Apartments: `2`
   - Lease Start Date: `9 January 2026`
   - Lease End Date: `11 May 2026`
   - Rental Period: `123`
   - Rent Per Night: `50.00`
   - Security Deposit: `1000.00`
   - Pet Cleaning Fee: `200.00`

3. **Verify PDF Output:**
   - Check fonts (Times New Roman)
   - Check sizes (11pt body, 18pt headers)
   - Check margins (1 inch)
   - Check all 7 pages
   - Check calculations (total rent should be €30,750.00)
   - Check signature lines
   - Check additional documentation space

### File Structure
```
CCCC/
├── index.html              # Main application
├── styles.css              # Styling
├── app.js                  # Logic + PDF generation
├── contract-data.js        # Form fields
├── README.md               # Technical docs
├── USER_GUIDE.md           # User instructions
├── DELIVERY_SUMMARY.md     # Project summary
└── QUICK_START.md          # This file
```

### Key Technologies
- **jsPDF 2.5.1** - PDF generation (loaded from CDN)
- **Vanilla JavaScript** - No frameworks needed
- **CSS3** - Modern styling
- **HTML5** - Semantic markup

### Browser Requirements
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+
- JavaScript enabled
- Internet connection (first load only, for jsPDF CDN)

---

## Troubleshooting

### PDF Not Generating
1. Check browser console for errors (F12)
2. Verify jsPDF loaded (check Network tab)
3. Try different browser
4. Clear cache and reload

### Styling Issues
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Check styles.css loaded

### Form Not Working
1. Check JavaScript enabled
2. Check browser console for errors
3. Verify contract-data.js loaded

---

## Customization Quick Reference

### Change Form Fields
Edit `contract-data.js`:
```javascript
{
    id: 'fieldName',
    label: 'Field Label',
    placeholder: 'Example: value',
    type: 'text',
    required: true
}
```

### Change Contract Text
Edit `generateContract()` function in `app.js`

### Change Colors/Styling
Edit `styles.css`:
- Primary color: `#667eea`
- Secondary color: `#764ba2`

### Change PDF Formatting
Edit `generateContract()` function in `app.js`:
- Font size: `doc.setFontSize(11)`
- Margins: `const margin = 72` (72pt = 1 inch)
- Font: `doc.setFont('times', 'normal')`

---

## Production Checklist

✅ All files present
✅ No console errors
✅ PDF generates correctly
✅ All fields validate
✅ Review screen works
✅ Mobile responsive
✅ Cross-browser tested
✅ Documentation complete

---

## Support

**For Users:** See `USER_GUIDE.md`  
**For Developers:** See `README.md`  
**For Overview:** See `DELIVERY_SUMMARY.md`

---

**Status:** ✅ Production Ready  
**Version:** 1.0.0  
**Last Updated:** November 2025

