# How to Update Your Word Template - Client Requirements

## 🎯 Goal:
Update your Word template based on client feedback to only change what varies per contract.

---

## ⚠️ IMPORTANT: Two Types of Changes

### **Type 1: REMOVE Merge Fields (Revert to Static Text)**
These should NOT change per contract, so remove the `{merge_field}` and put back the original text.

### **Type 2: ADD New Merge Fields**
These SHOULD change per contract, so replace the current text with `{merge_field}`.

---

## 🔧 STEP 1: REMOVE These Merge Fields

**You previously added these, but client says they should NOT change:**

### **1.1: Landlord Name**
```
Current: {landlord_name}
Change to: Roma Rentals SPQR
```

**How:**
- Press `Ctrl + H`
- Find what: `{landlord_name}`
- Replace with: `Roma Rentals SPQR`
- Click "Replace All"

---

### **1.2: Landlord USA Address**
```
Current: {landlord_address_usa}
Change to: 310 S. Twin Oaks Valley Road # 107-217, San Marcos, CA 92078
```

**How:**
- Press `Ctrl + H`
- Find what: `{landlord_address_usa}`
- Replace with: `310 S. Twin Oaks Valley Road # 107-217, San Marcos, CA 92078`
- Click "Replace All"

---

### **1.3: Landlord Italy Address**
```
Current: {landlord_address_italy}
Change to: Via dei Prefetti 9 A 00 153 Roma Italy
```

**How:**
- Press `Ctrl + H`
- Find what: `{landlord_address_italy}`
- Replace with: `Via dei Prefetti 9 A 00 153 Roma Italy`
- Click "Replace All"

---

### **1.4: Landlord Phone**
```
Current: {landlord_phone}
Change to: +39.340.868.1.386 (Italy) +1.760.201.9251 (USA)
```

**How:**
- Press `Ctrl + H`
- Find what: `{landlord_phone}`
- Replace with: `+39.340.868.1.386 (Italy) +1.760.201.9251 (USA)`
- Click "Replace All"

---

### **1.5: Landlord Email**
```
Current: {landlord_email}
Change to: (remove or put back original email)
```

**How:**
- Press `Ctrl + H`
- Find what: `{landlord_email}`
- Replace with: (whatever was there originally, or delete it)
- Click "Replace All"

---

## ✅ STEP 2: ADD These NEW Merge Fields

**Client wants these to change per contract:**

### **2.1: Contract Date**
```
Find: 18 November 2025 (or whatever date is in your template)
Replace with: {contract_date}
```

**How:**
- Press `Ctrl + F` to find the contract date
- Note the exact text (e.g., "18 November 2025")
- Press `Ctrl + H`
- Find what: `18 November 2025` (exact text!)
- Replace with: `{contract_date}`
- Click "Replace All"

---

### **2.2: Owner Apartment Number and Name**

**Look for text like:**
```
For Owner (RR#407): M. Rifrigeri
For Owner (RR#499): S. Ivarone
```

**Replace with:**
```
For Owner ({owner_apt_number}): {owner_name}
For Owner ({owner_apt_number_2}): {owner_name_2}
```

**How:**
- Press `Ctrl + H`
- Find what: `RR#407` (or whatever apartment # is there)
- Replace with: `{owner_apt_number}`
- Click "Replace All"

- Find what: `M. Rifrigeri` (or whatever owner name is there)
- Replace with: `{owner_name}`
- Click "Replace All"

- Find what: `RR#499` (second apartment #)
- Replace with: `{owner_apt_number_2}`
- Click "Replace All"

- Find what: `S. Ivarone` (second owner name)
- Replace with: `{owner_name_2}`
- Click "Replace All"

---

### **2.3: Tenant Organization (Optional)**

**Look for text like:**
```
University of Notre Dame
```

**Replace with:**
```
{tenant_organization}
```

**How:**
- Press `Ctrl + H`
- Find what: `University of Notre Dame`
- Replace with: `{tenant_organization}`
- Click "Replace All"

---

### **2.4: Tenant Address Line 1**

**Look for text like:**
```
1 Walsh Family Hall of Architecture
```

**Replace with:**
```
{tenant_address_line1}
```

**How:**
- Press `Ctrl + H`
- Find what: `1 Walsh Family Hall of Architecture`
- Replace with: `{tenant_address_line1}`
- Click "Replace All"

---

### **2.5: Tenant Address Line 2**

**Look for text like:**
```
Notre Dame, IN 46556 USA
```

**Replace with:**
```
{tenant_address_line2}
```

**How:**
- Press `Ctrl + H`
- Find what: `Notre Dame, IN 46556 USA`
- Replace with: `{tenant_address_line2}`
- Click "Replace All"

---

### **2.6: Tenant Phone** (Already done, but verify)

**Should already be:**
```
{tenant_phone}
```

**If not:**
- Find: `+1 574 631 9033` (in tenant section)
- Replace with: `{tenant_phone}`

---

### **2.7: Tenant Email** (Already done, but verify)

**Should already be:**
```
{tenant_email}
```

**If not:**
- Find: `jhoover1@nd.edu`
- Replace with: `{tenant_email}`

---

## 📋 STEP 3: Verify Your Changes

**After making all changes, search for these to verify:**

### **Should FIND (merge fields that should be there):**
- `{contract_date}` ✅
- `{owner_apt_number}` ✅
- `{owner_name}` ✅
- `{owner_apt_number_2}` ✅
- `{owner_name_2}` ✅
- `{tenant_organization}` ✅
- `{tenant_address_line1}` ✅
- `{tenant_address_line2}` ✅
- `{tenant_phone}` ✅
- `{tenant_email}` ✅
- `{lease_start_date}` ✅
- `{lease_end_date}` ✅ (if you added it)
- `{total_nights}` ✅
- `{property_address}` ✅
- `{rent_per_night}` ✅

### **Should NOT find (removed merge fields):**
- `{landlord_name}` ❌
- `{landlord_address_usa}` ❌
- `{landlord_address_italy}` ❌
- `{landlord_phone}` ❌
- `{landlord_email}` ❌

---

## 💾 STEP 4: Save Your Template

- Press `Ctrl + S`
- Make sure it's saved as: `ND FALL 2026 - CONTRACT - 9 Jan 2026 - 11 May 2026 (1).docx`
- In the same folder as your HTML files

---

## 🧪 STEP 5: Test

1. Go to: `http://localhost:8000/contract-generator.html`
2. Fill in the form (now with updated tabs)
3. Generate contract
4. Verify:
   - ✅ RomaRentals header is static (not changed)
   - ✅ Office addresses are static (not changed)
   - ✅ Contract date is replaced
   - ✅ Owner info is replaced
   - ✅ Tenant info is replaced

---

## 📝 Summary Checklist:

- [ ] Remove `{landlord_name}` → Replace with "Roma Rentals SPQR"
- [ ] Remove `{landlord_address_usa}` → Replace with actual address
- [ ] Remove `{landlord_address_italy}` → Replace with actual address
- [ ] Remove `{landlord_phone}` → Replace with actual phone
- [ ] Remove `{landlord_email}` → Replace with actual email or remove
- [ ] Add `{contract_date}` → Replace contract date
- [ ] Add `{owner_apt_number}` → Replace first apartment #
- [ ] Add `{owner_name}` → Replace first owner name
- [ ] Add `{owner_apt_number_2}` → Replace second apartment #
- [ ] Add `{owner_name_2}` → Replace second owner name
- [ ] Add `{tenant_organization}` → Replace organization
- [ ] Add `{tenant_address_line1}` → Replace address line 1
- [ ] Add `{tenant_address_line2}` → Replace address line 2
- [ ] Verify `{tenant_phone}` is there
- [ ] Verify `{tenant_email}` is there
- [ ] Save template
- [ ] Test contract generation

---

**Need help with any step? Let me know!**

