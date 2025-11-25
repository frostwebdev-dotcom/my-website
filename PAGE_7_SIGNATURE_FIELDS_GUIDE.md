# 📝 Page 7 - Signature Fields Update Guide

## 🎯 Client Requirements

Based on the marked Page 7 image, the client wants **TAB fields** for:
1. ✅ **Tenant Representative Name** (e.g., "Jennifer Hoover, Director of Finance & Operations")
2. ✅ **Tenant Organization/School** (e.g., "University of Notre Dame")
3. ✅ **Additional signature spaces** (in case more signatures are needed)

**Landlord signature stays STATIC** (no changes):
- `Carolina M. Murillo, Roma Rentals SPQR LLC CEO`

---

## 📋 Step-by-Step Instructions

### **STEP 1: Open Your Word Template**

1. Open: `ND FALL 2026 - CONTRACT - 9 Jan 2026 - 11 May 2026 (1).docx`
2. Navigate to **Page 7** (the signature page)
3. Find the section that says:
   ```
   IN WITNESS WHERE OF, the Landlord and the Tenant have executed this Lease
   Agreement as of the date first set forth above.
   ```

---

### **STEP 2: Find Current Signature Section**

Look for this text on Page 7:

```
_____________________________________________     Date
Jennifer Hoover, Director of Finance & Operations
University of Notre Dame


_____________________________________________     Date
Carolina M. Murillo, Roma Rentals SPQR LLC CEO
```

---

### **STEP 3: Replace with Merge Fields**

#### **Replace Tenant Representative Name:**

**Find:**
```
Jennifer Hoover, Director of Finance & Operations
```

**Replace with:**
```
{tenant_rep_name}
```

---

#### **Replace Tenant Organization:**

**Find:**
```
University of Notre Dame
```

**Replace with:**
```
{tenant_rep_organization}
```

---

### **STEP 4: Add Optional Additional Signature Lines**

After the first tenant signature block, add these optional signature lines:

```
_____________________________________________     Date
{additional_signature_1_name}
{additional_signature_1_org}


_____________________________________________     Date
{additional_signature_2_name}
{additional_signature_2_org}
```

---

## ✅ Final Result

Your Page 7 signature section should look like this:

```
IN WITNESS WHERE OF, the Landlord and the Tenant have executed this Lease
Agreement as of the date first set forth above.


_____________________________________________     Date
{tenant_rep_name}
{tenant_rep_organization}


_____________________________________________     Date
{additional_signature_1_name}
{additional_signature_1_org}


_____________________________________________     Date
{additional_signature_2_name}
{additional_signature_2_org}


_____________________________________________     Date
Carolina M. Murillo, Roma Rentals SPQR LLC CEO
```

---

## 📝 Merge Field Reference

| Merge Field | Example Value | Required? |
|------------|---------------|-----------|
| `{tenant_rep_name}` | Jennifer Hoover, Director of Finance & Operations | ✅ Yes |
| `{tenant_rep_organization}` | University of Notre Dame | ✅ Yes |
| `{additional_signature_1_name}` | (Optional - leave blank if not needed) | ❌ No |
| `{additional_signature_1_org}` | (Optional - leave blank if not needed) | ❌ No |
| `{additional_signature_2_name}` | (Optional - leave blank if not needed) | ❌ No |
| `{additional_signature_2_org}` | (Optional - leave blank if not needed) | ❌ No |

---

## 🎯 How It Works

### **When filling the web form:**

1. **Required fields:**
   - Enter: "Jennifer Hoover, Director of Finance & Operations"
   - Enter: "University of Notre Dame"

2. **Optional fields:**
   - If you need more signatures, fill in Additional Signature 1 and/or 2
   - If you don't need them, leave them blank
   - Blank fields will show as empty lines in the contract

### **Generated contract will show:**

**Example with all signatures:**
```
_____________________________________________     Date
Jennifer Hoover, Director of Finance & Operations
University of Notre Dame


_____________________________________________     Date
John Smith, Assistant Director
University of Notre Dame


_____________________________________________     Date
Mary Johnson, Legal Counsel
University of Notre Dame


_____________________________________________     Date
Carolina M. Murillo, Roma Rentals SPQR LLC CEO
```

**Example with only required signatures:**
```
_____________________________________________     Date
Jennifer Hoover, Director of Finance & Operations
University of Notre Dame




_____________________________________________     Date
Carolina M. Murillo, Roma Rentals SPQR LLC CEO
```

---

## ✅ Summary

1. ✅ **JavaScript form updated** - New "Signature Information" tab added
2. ✅ **6 new fields added:**
   - `tenant_rep_name` (required)
   - `tenant_organization` (required)
   - `additional_signature_1_name` (optional)
   - `additional_signature_1_org` (optional)
   - `additional_signature_2_name` (optional)
   - `additional_signature_2_org` (optional)

3. ⏳ **YOU NEED TO DO:** Update the Word template with merge fields as shown above

---

## 🚀 Next Steps

1. **Open Word template**
2. **Go to Page 7**
3. **Replace the text as shown in STEP 3**
4. **Add optional signature lines as shown in STEP 4**
5. **Save the template**
6. **Test by generating a contract!**

---

## 💡 Pro Tip

If you want the optional signature lines to only appear when filled, you can use Word's conditional fields. But for simplicity, just leave them as regular merge fields - they'll show as blank lines if not filled.

