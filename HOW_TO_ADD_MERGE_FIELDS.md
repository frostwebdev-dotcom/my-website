# 📝 How to Add Merge Fields to Your Word Template

## 🎯 What Are Merge Fields?

**Merge fields** are placeholders in your Word document that get replaced with actual data.

**Example:**
- You write: `{landlord_name}` in the template
- System replaces it with: `RomaRentals SPQR`
- Final contract shows: `RomaRentals SPQR`

---

## 📋 Step-by-Step Guide

### **STEP 1: Open Your Word Template**

1. **Find the file:** `ND FALL 2026 - CONTRACT - 9 Jan 2026 - 11 May 2026 (1).docx`
2. **Right-click** on it
3. **Select:** "Open with Microsoft Word"

---

### **STEP 2: Identify What to Replace**

**First, analyze your template to see what's in it:**

1. **Go to:** `http://localhost:8000/analyze-template.html`
2. **Upload** your Word file
3. **Click** "Analyze Template"
4. **Read** the text content

**You'll see things like:**
- Dates: "9 Jan 2026", "11 May 2026"
- Names: "Roma Rentals SPQR", "[Tenant Name]"
- Addresses: Property addresses, landlord addresses
- Numbers: "122" (nights), "$3,050" (rent)
- Etc.

**These are the values you need to replace with merge fields!**

---

### **STEP 3: Use Find & Replace in Word**

**This is the EASIEST way to add merge fields!**

#### **Example 1: Replace Landlord Name**

1. **Press:** `Ctrl + H` (opens Find & Replace dialog)

2. **In "Find what" box, type:**
   ```
   Roma Rentals SPQR
   ```
   (or whatever your landlord name is in the template)

3. **In "Replace with" box, type:**
   ```
   {landlord_name}
   ```

4. **Click:** "Replace All"

5. **Result:** All instances of "Roma Rentals SPQR" are now `{landlord_name}`

---

#### **Example 2: Replace Start Date**

1. **Press:** `Ctrl + H`

2. **In "Find what" box, type:**
   ```
   9 Jan 2026
   ```
   (the start date in your template)

3. **In "Replace with" box, type:**
   ```
   {lease_start_date}
   ```

4. **Click:** "Replace All"

---

#### **Example 3: Replace End Date**

1. **Press:** `Ctrl + H`

2. **In "Find what" box, type:**
   ```
   11 May 2026
   ```

3. **In "Replace with" box, type:**
   ```
   {lease_end_date}
   ```

4. **Click:** "Replace All"

---

#### **Example 4: Replace Tenant Name**

1. **Press:** `Ctrl + H`

2. **In "Find what" box, type:**
   ```
   [Tenant Name]
   ```
   (or whatever placeholder you have)

3. **In "Replace with" box, type:**
   ```
   {tenant_name}
   ```

4. **Click:** "Replace All"

---

### **STEP 4: Replace All Important Fields**

**Here's a complete list of what to replace:**

#### **📅 Dates:**
```
Find: "9 Jan 2026"          Replace with: {lease_start_date}
Find: "11 May 2026"         Replace with: {lease_end_date}
Find: "2025-11-21"          Replace with: {contract_date}
```

#### **👤 Landlord Information:**
```
Find: "Roma Rentals SPQR"   Replace with: {landlord_name}
Find: [Landlord USA Address] Replace with: {landlord_address_usa}
Find: [Landlord Italy Address] Replace with: {landlord_address_italy}
Find: [Landlord Phone]      Replace with: {landlord_phone}
Find: [Landlord Email]      Replace with: {landlord_email}
```

#### **👥 Tenant Information:**
```
Find: "[Tenant Name]"       Replace with: {tenant_name}
Find: [Tenant Email]        Replace with: {tenant_email}
Find: [Tenant Phone]        Replace with: {tenant_phone}
Find: [Tenant Passport]     Replace with: {tenant_passport}
Find: [Tenant Address]      Replace with: {tenant_address}
```

#### **🏠 Property Details:**
```
Find: [Property Address]    Replace with: {property_address}
Find: [Property Type]       Replace with: {property_type}
Find: "3" (bedrooms)        Replace with: {bedrooms}
Find: "2" (bathrooms)       Replace with: {bathrooms}
Find: "6" (max occupants)   Replace with: {max_occupants}
```

#### **💰 Rent & Payment:**
```
Find: "122" (nights)        Replace with: {total_nights}
Find: "$25" (per night)     Replace with: {rent_per_night}
Find: "$3,050" (total)      Replace with: {total_rent}
Find: [Payment Method]      Replace with: {payment_method}
Find: [Payment Due Date]    Replace with: {payment_due_date}
```

#### **🔒 Security Deposit:**
```
Find: [Deposit Amount]      Replace with: {security_deposit}
Find: [Deposit Due Date]    Replace with: {deposit_due_date}
Find: "30" (return days)    Replace with: {deposit_return_days}
```

#### **📞 Emergency Contact:**
```
Find: [Emergency Name]      Replace with: {emergency_contact_name}
Find: [Emergency Phone]     Replace with: {emergency_contact_phone}
Find: [Emergency Relation]  Replace with: {emergency_contact_relation}
```

---

### **STEP 5: Make Merge Fields Visible (Optional but Recommended)**

**This helps you see what will be replaced:**

1. **Select** the merge field text (e.g., `{landlord_name}`)
2. **Make it a different color** (e.g., blue)
3. **Make it italic** or **bold**
4. This way you can easily see all merge fields in your template

**Example:**
- Normal text: "This agreement is made between"
- Merge field: **`{landlord_name}`** (blue, italic)
- Normal text: "and"
- Merge field: **`{tenant_name}`** (blue, italic)

---

### **STEP 6: Save Your Template**

1. **Press:** `Ctrl + S` (Save)
2. **Or:** File → Save
3. **Keep the same filename** or rename to `contract-template.docx`

---

## 🎯 Complete Example

### **Before (Original Template):**
```
RENTAL AGREEMENT

This agreement is made on 2025-11-21 between Roma Rentals SPQR
(Landlord) and [Tenant Name] (Tenant).

Property Address: 123 Main Street, Rome, Italy

Lease Period: From 9 Jan 2026 to 11 May 2026 (122 nights)

Rent: $25 per night
Total Rent: $3,050

Payment Method: Bank Transfer
Payment Due: 1 Jan 2026

Security Deposit: $500
Deposit Due: 1 Jan 2026
```

### **After (With Merge Fields):**
```
RENTAL AGREEMENT

This agreement is made on {contract_date} between {landlord_name}
(Landlord) and {tenant_name} (Tenant).

Property Address: {property_address}

Lease Period: From {lease_start_date} to {lease_end_date} ({total_nights} nights)

Rent: ${rent_per_night} per night
Total Rent: ${total_rent}

Payment Method: {payment_method}
Payment Due: {payment_due_date}

Security Deposit: ${security_deposit}
Deposit Due: {deposit_due_date}
```

---

## ✅ How to Verify It Worked

### **Method 1: Visual Check**
- Open your Word template
- Look for `{field_name}` placeholders
- Make sure all important values are replaced

### **Method 2: Use the Contract Generator**
1. Go to: `http://localhost:8000/contract-generator.html`
2. Fill in the form with test data
3. Click "Generate Contract"
4. Open the generated contract
5. Check if all `{field_name}` are replaced with actual data

---

## 💡 Pro Tips

### **Tip 1: Don't Replace Everything**
- **DO replace:** Variable data (names, dates, amounts)
- **DON'T replace:** Fixed text (headings, clauses, legal text)

### **Tip 2: Use Exact Field Names**
- Must match exactly: `{landlord_name}` ✅
- Won't work: `{Landlord_Name}` ❌
- Won't work: `{landlordname}` ❌
- Won't work: `{ landlord_name }` ❌ (extra spaces)

### **Tip 3: Keep Formatting**
- Merge fields inherit the formatting of the text
- If `{landlord_name}` is bold, the replaced text will be bold
- If `{total_rent}` is in a table cell, it stays in the table

### **Tip 4: Test with Sample Data**
- After adding merge fields, test immediately
- Use the contract generator with fake data
- Make sure everything looks correct

### **Tip 5: Keep a Backup**
- Before editing, make a copy of your original template
- Name it: `ND FALL 2026 - CONTRACT - ORIGINAL.docx`
- This way you can always go back if needed

---

## 🚨 Common Mistakes to Avoid

### ❌ **Mistake 1: Wrong Brackets**
```
Wrong: [landlord_name]
Wrong: {{landlord_name}}
Wrong: <landlord_name>
Right: {landlord_name}
```

### ❌ **Mistake 2: Typos in Field Names**
```
Wrong: {landlord_nam}
Wrong: {landlordname}
Right: {landlord_name}
```

### ❌ **Mistake 3: Extra Spaces**
```
Wrong: { landlord_name }
Wrong: {landlord_name }
Right: {landlord_name}
```

### ❌ **Mistake 4: Wrong Case**
```
Wrong: {Landlord_Name}
Wrong: {LANDLORD_NAME}
Right: {landlord_name}
```

---

## 📋 Quick Reference - All Field Names

Copy this list for easy reference:

```
{contract_date}
{lease_start_date}
{lease_end_date}
{total_nights}
{landlord_name}
{landlord_address_usa}
{landlord_address_italy}
{landlord_phone}
{landlord_email}
{tenant_name}
{tenant_email}
{tenant_phone}
{tenant_passport}
{tenant_address}
{property_address}
{property_type}
{bedrooms}
{bathrooms}
{max_occupants}
{rent_per_night}
{total_rent}
{payment_method}
{payment_due_date}
{security_deposit}
{deposit_due_date}
{deposit_return_days}
{utilities_included}
{wifi_included}
{parking_included}
{cleaning_fee}
{pets_allowed}
{smoking_allowed}
{quiet_hours}
{additional_rules}
{emergency_contact_name}
{emergency_contact_phone}
{emergency_contact_relation}
```

---

## 🎯 Summary

1. **Open** your Word template
2. **Press** `Ctrl + H` to open Find & Replace
3. **Find** the value you want to replace (e.g., "Roma Rentals SPQR")
4. **Replace** with merge field (e.g., `{landlord_name}`)
5. **Click** "Replace All"
6. **Repeat** for all fields
7. **Save** the template
8. **Test** with the contract generator

**That's it!** 🎉

---

**Need help? Run the analyzer first to see what's in your template:**
`http://localhost:8000/analyze-template.html`

