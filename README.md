# RomaRentals Contract Generator

A professional, multi-contract generation system that helps you create rental agreements and other contracts quickly and accurately.

## How to Use

1. **Open the application**: Simply open `index.html` in your web browser
2. **Select contract type**: Choose which type of contract you want to generate
3. **Answer questions**: The system will ask you simple questions one at a time
4. **Review your answers**: Check all your information before generating
5. **Generate contract**: Get your completed contract with all the legal text intact
6. **Print or save**: Use the print function to save as PDF

## Features

- ✅ **Multiple Contract Types** - Select from different contract templates
- ✅ **Custom Logos** - RomaRentals dome logo on first and last page
- ✅ **Simple Interface** - Beginner-friendly, no technical knowledge needed
- ✅ **Step-by-Step Process** - One question at a time with helpful examples
- ✅ **Progress Tracking** - Visual progress bar shows how far along you are
- ✅ **Review Before Generating** - Check all your answers before creating the contract
- ✅ **Exact Legal Text** - All legal language stays exactly as in the original PDF
- ✅ **Professional PDF-Style Output** - Generated contracts look identical to the original
- ✅ **DocuSign Compatible** - Signature lines ready for electronic signing
- ✅ **Print-Ready** - Perfect formatting for printing or saving as PDF
- ✅ **Fully Customizable** - Easy to modify utilities, cleaning, WiFi info per contract
- ✅ **Expandable** - Easy to add more contract types in the future

## What Information You'll Need

- Lease effective date
- Tenant information (name, address, phone, email)
- Property addresses and details
- Number of students and apartments
- Lease start and end dates
- Rental period (number of nights)
- Rent amount per night
- Security deposit amount
- Pet cleaning fee

**Note:** Signature date is NOT required - the contract shows "Date: ___" for DocuSign compatibility.

## Current Contract Types

### 1. Group Contract ✅
Complete rental contract for furnished properties in Rome, Italy - designed for group rentals.

**Features:**
- Custom RomaRentals dome logo on first and last page
- Professional 7-page layout matching original PDF exactly
- No page numbers (clean, professional look)
- Signature lines with "Date: ___" for DocuSign compatibility
- Supports up to 2 properties per contract

**Fields included:**
- Effective date
- Tenant information (name, address, phone, email)
- Property addresses and details (supports up to 2 properties)
- Number of students and apartments
- Lease start and end dates
- Rental period (number of nights)
- Rent amount per night per student
- Security deposit amount
- Pet cleaning fee

### 2. Retail Contract 🔜
Coming soon - for commercial retail space rentals.

### 3. Short Term Contract 🔜
Coming soon - for short-term vacation rentals.

## Customization

**Yes, you can easily customize!** See `HOW_TO_CUSTOMIZE.md` for detailed instructions on:
- Changing utilities information per contract type
- Modifying cleaning details
- Updating WiFi information
- Adding new contract types
- Changing any legal text or clauses

## Files Included

- `index.html` - Main application interface with contract selection
- `styles.css` - Professional styling and layout
- `app.js` - Application logic and contract generation
- `contract-data.js` - Contract questions and data structure
- `README.md` - This documentation file

## Technical Details

### Adding New Contract Types

To add a new contract type:

1. **Add a new card** in `index.html` in the contract selection screen
2. **Create questions** in `contract-data.js` for the new contract
3. **Add generation function** in `app.js` to create the contract HTML
4. **Update the selection handler** to route to the new contract

### PDF-Style Formatting

The generated contracts use:
- Times New Roman font (standard for legal documents)
- Proper page breaks
- Professional spacing and margins
- Exact text from original PDFs
- Print-optimized CSS

## Important Notes

- ✅ The system uses the **exact legal text** from your original PDF
- ✅ **No legal clauses** are modified or changed
- ✅ Only **variable fields** (names, dates, amounts) are filled in
- ✅ All **original formatting** is preserved
- ✅ **Client-side only** - All data stays in your browser, nothing is sent anywhere

## Browser Compatibility

Works best in modern browsers:
- ✅ Chrome / Edge (Recommended)
- ✅ Firefox
- ✅ Safari

## Support

The interface guides you with:
- Clear, simple questions
- Helpful examples for each field
- Easy back/next navigation
- Progress tracking
- Review screen before final generation
- Print-friendly output

---

**Privacy Note**: This is a 100% client-side application. All your data stays in your browser and is never sent to any server.

