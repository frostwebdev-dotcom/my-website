# Client Requirements - Contract Generator

## ✅ What Client Said:

> "The office addresses both USA and Rome never are changed so you do not need a tab there"

> "Here is what needs to be fixed:
> - Page 1: the office addresses are not to be changed.
> - Date of contract - TAB yes need
> - For owner - TAB need to add owner apt # and name
> - Tenant - TAB need to change this info name, address, phone, email and leave extra lines for other info."

---

## 📋 CORRECT Fields Based on Client Requirements

### **❌ DO NOT CHANGE (Keep as static text in template):**
- RomaRentals logo and header
- USA Office: "310 S. Twin Oaks Valley Road # 107-217, San Marcos, CA 92078"
- Italy Meeting Place: "Via dei Prefetti 9 A 00 153 Roma Italy"
- Phone numbers: "+39.340.868.1.386 (Italy) +1.760.201.9251 (USA)"
- Website: www.romarentals.net
- "Roma Rentals SPQR" (The "Landlord")

### **✅ FIELDS THAT NEED TABS (marked in red by client):**

#### **Tab 1: Contract Date**
- `{contract_date}` - Date contract is made effective
  - Example: "18 November 2025"

#### **Tab 2: Owner Info**
- `{owner_apt_number}` - Apartment number (e.g., RR#407)
- `{owner_name}` - Owner name (e.g., M. Rifrigeri)
- `{owner_apt_number_2}` - Second apartment number (optional, e.g., RR#499)
- `{owner_name_2}` - Second owner name (optional, e.g., S. Ivarone)

**Format in template:**
```
For Owner ({owner_apt_number}): {owner_name}
For Owner ({owner_apt_number_2}): {owner_name_2}
```

#### **Tab 3: Tenant Info**
- `{tenant_organization}` - Organization (optional, e.g., "University of Notre Dame")
- `{tenant_address_line1}` - Address line 1 (e.g., "1 Walsh Family Hall of Architecture")
- `{tenant_address_line2}` - Address line 2 (e.g., "Notre Dame, IN 46556 USA")
- `{tenant_phone}` - Phone number (e.g., "+1 574 631 9033")
- `{tenant_email}` - Email (e.g., "jhoover1@nd.edu")
- `{tenant_additional_info}` - Extra lines for additional info (optional)

**Format in template:**
```
(The "Tenant")
{tenant_organization}
{tenant_address_line1}
{tenant_address_line2}
{tenant_phone}
{tenant_email}
{tenant_additional_info}
```

#### **Tab 4: Lease Details**
- `{lease_start_date}` - Start date
- `{lease_end_date}` - End date
- `{total_nights}` - Auto-calculated

#### **Tab 5: Property Details**
- `{property_address}` - Property address
- Other property fields as needed

#### **Tab 6: Rent & Payment**
- `{rent_per_night}` - Nightly rate
- `{total_rent}` - Total rent (calculated)
- Payment details

---

## 🔧 Changes Made to System:

### **Removed:**
- ❌ `{landlord_name}` - Not needed (always "Roma Rentals SPQR")
- ❌ `{landlord_address_usa}` - Static, never changes
- ❌ `{landlord_address_italy}` - Static, never changes
- ❌ `{landlord_phone}` - Static, never changes
- ❌ `{landlord_email}` - Static, never changes

### **Added:**
- ✅ `{contract_date}` - Contract effective date
- ✅ `{owner_apt_number}` - Owner apartment #
- ✅ `{owner_name}` - Owner name
- ✅ `{owner_apt_number_2}` - Second owner apartment # (optional)
- ✅ `{owner_name_2}` - Second owner name (optional)
- ✅ `{tenant_organization}` - Tenant organization (optional)
- ✅ `{tenant_address_line1}` - Tenant address line 1
- ✅ `{tenant_address_line2}` - Tenant address line 2
- ✅ `{tenant_additional_info}` - Extra tenant info (optional)

### **Kept (from existing):**
- ✅ `{tenant_phone}`
- ✅ `{tenant_email}`
- ✅ `{lease_start_date}`
- ✅ `{lease_end_date}`
- ✅ `{total_nights}`
- ✅ `{property_address}`
- ✅ `{rent_per_night}`
- ✅ `{total_rent}`

---

## 📝 What User Needs to Do in Word Template:

### **1. Remove these merge fields (revert to static text):**
```
Find: {landlord_name}
Replace with: Roma Rentals SPQR

Find: {landlord_address_usa}
Replace with: (the actual USA address)

Find: {landlord_address_italy}
Replace with: (the actual Italy address)

Find: {landlord_phone}
Replace with: (the actual phone numbers)

Find: {landlord_email}
Replace with: (the actual email or remove)
```

### **2. Add these NEW merge fields:**
```
Find: 18 November 2025 (or whatever date is there)
Replace with: {contract_date}

Find: For Owner (RR#407): M. Rifrigeri
Replace with: For Owner ({owner_apt_number}): {owner_name}

Find: For Owner (RR#499): S. Ivarone
Replace with: For Owner ({owner_apt_number_2}): {owner_name_2}

Find: University of Notre Dame
Replace with: {tenant_organization}

Find: 1 Walsh Family Hall of Architecture
Replace with: {tenant_address_line1}

Find: Notre Dame, IN 46556 USA
Replace with: {tenant_address_line2}

Find: +1 574 631 9033 (in tenant section)
Replace with: {tenant_phone}

Find: jhoover1@nd.edu
Replace with: {tenant_email}
```

---

## 🎯 Summary:

**Total tabs:** 6 (reduced from 9)
1. Contract Date
2. Owner Info
3. Tenant Info
4. Lease Details
5. Property Details
6. Rent & Payment

**Total fields:** ~20 (reduced from 40+)

**Focus:** Only change what varies per contract, keep static info as-is.

