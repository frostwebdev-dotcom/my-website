# Complete Word Template Update Guide - All Pages

## 🎯 Overview

This guide shows you EXACTLY what to change in your Word template based on client feedback for Pages 1, 2, and 3.

---

## 📋 SUMMARY OF ALL CHANGES:

### **❌ REMOVE These Merge Fields (Revert to Static Text):**
- `{landlord_name}` → `Roma Rentals SPQR`
- `{landlord_address_usa}` → `310 S. Twin Oaks Valley Road # 107-217, San Marcos, CA 92078`
- `{landlord_address_italy}` → `Via dei Prefetti 9 A 00 153 Roma Italy`
- `{landlord_phone}` → `+39.340.868.1.386 (Italy) +1.760.201.9251 (USA)`
- `{landlord_email}` → (remove or put back original)

### **✅ ADD These NEW Merge Fields:**

**Page 1:**
- `{contract_date}` - Contract effective date
- `{owner_apt_number}` - Owner apartment #
- `{owner_name}` - Owner name
- `{owner_apt_number_2}` - Second owner apartment # (optional)
- `{owner_name_2}` - Second owner name (optional)
- `{tenant_organization}` - Tenant organization
- `{tenant_address_line1}` - Tenant address line 1
- `{tenant_address_line2}` - Tenant address line 2
- `{tenant_phone}` - Tenant phone
- `{tenant_email}` - Tenant email

**Page 2:**
- `{apt1_number}`, `{apt1_address}`, `{apt1_students}`, `{apt1_bedrooms}`, `{apt1_bathrooms}`
- `{apt2_number}`, `{apt2_address}`, `{apt2_students}`, `{apt2_bedrooms}`, `{apt2_bathrooms}`
- `{apt3_number}`, `{apt3_address}`, `{apt3_students}`, `{apt3_bedrooms}`, `{apt3_bathrooms}`
- `{total_students}` - Auto-calculated
- `{total_apartments}` - Auto-calculated
- `{lease_start_date}` - Lease start date
- `{lease_end_date}` - Lease end date
- `{rent_per_student_per_night}` - Rent per student per night
- `{rent_series}` - Rent series amount

**Page 3:**
- `{electricity_rate_per_m2}` - Electricity rate per m²
- `{gas_rate_per_m2}` - Gas rate per m²
- `{utility_payment_days}` - Payment period in days
- `{wifi_info}` - Auto-generated WiFi information
- `{cleaning_info}` - Auto-generated cleaning information

**Page 4:**
- `{security_deposit_text}` - Auto-generated deposit text with amount in words
- `{security_deposit_per_tenant}` - Deposit amount per tenant
- `{security_deposit_total}` - Total deposit (auto-calculated)
- `{deposit_return_days}` - Days to return deposit

---

## 📝 STEP-BY-STEP INSTRUCTIONS:

### **PAGE 1 UPDATES:**

#### **1. Remove Landlord Fields (Revert to Static Text)**

Press `Ctrl + H` for each:

```
Find: {landlord_name}
Replace: Roma Rentals SPQR

Find: {landlord_address_usa}
Replace: 310 S. Twin Oaks Valley Road # 107-217, San Marcos, CA 92078

Find: {landlord_address_italy}
Replace: Via dei Prefetti 9 A 00 153 Roma Italy

Find: {landlord_phone}
Replace: +39.340.868.1.386 (Italy) +1.760.201.9251 (USA)

Find: {landlord_email}
Replace: (remove or put back original email)
```

#### **2. Add Contract Date**

```
Find: 18 November 2025 (or whatever date is there)
Replace: {contract_date}
```

#### **3. Add Owner Info**

```
Find: RR#407 (in "For Owner" section)
Replace: {owner_apt_number}

Find: M. Rifrigeri (in "For Owner" section)
Replace: {owner_name}

Find: RR#499 (second owner)
Replace: {owner_apt_number_2}

Find: S. Ivarone (second owner)
Replace: {owner_name_2}
```

#### **4. Add Tenant Info**

```
Find: University of Notre Dame
Replace: {tenant_organization}

Find: 1 Walsh Family Hall of Architecture
Replace: {tenant_address_line1}

Find: Notre Dame, IN 46556 USA
Replace: {tenant_address_line2}

Find: +1 574 631 9033 (in tenant section)
Replace: {tenant_phone}

Find: jhoover1@nd.edu
Replace: {tenant_email}
```

---

### **PAGE 2 UPDATES:**

#### **5. Update WHEREAS Section (Apartment Info)**

**Find this:**
```
(RR#407) Via Roma Libera 23, Int. 9, 00153 Rome, Italy - 2 STUDENTS (2 Bedrooms, 1 Bathroom)

(RR#499) Viale di Trastevere 66, Scala E, Int. 8, 00153 Rome, Italy - 6 STUDENTS (3 Bedrooms, 2 Bathrooms)

TOTAL: 5 STUDENTS 2 APARTMENTS
```

**Replace with:**
```
({apt1_number}) {apt1_address} - {apt1_students} STUDENTS ({apt1_bedrooms} Bedrooms, {apt1_bathrooms} Bathrooms)

({apt2_number}) {apt2_address} - {apt2_students} STUDENTS ({apt2_bedrooms} Bedrooms, {apt2_bathrooms} Bathrooms)

({apt3_number}) {apt3_address} - {apt3_students} STUDENTS ({apt3_bedrooms} Bedrooms, {apt3_bathrooms} Bathrooms)

TOTAL: {total_students} STUDENTS {total_apartments} APARTMENTS
```

#### **6. Update Transitory Term Section**

```
Find: Transitory Term. The lease term shall commence on 09 January 2026 and shall terminate on 11 May 2026

Replace: Transitory Term. The lease term shall commence on {lease_start_date} and shall terminate on {lease_end_date}
```

#### **7. Update Rent Section**

```
Find: 122 Euros at 80.00 Euro per student, per night

Replace: {rent_series} Euros at {rent_per_student_per_night} Euro per student, per night
```

---

### **PAGE 3 UPDATES:**

#### **8. Update Utilities Section (Section 5)**

**Find this:**
```
€0.50 m² for electricity will be used and a €1.48 m² for gas will be used. The amount will be invoiced and payable within 44 days
```

**Replace with:**
```
€{electricity_rate_per_m2} m² for electricity will be used and a €{gas_rate_per_m2} m² for gas will be used. The amount will be invoiced and payable within {utility_payment_days} days
```

#### **9. Update WiFi Section**

**Find this:**
```
The Landlord will be providing Wi-Fi connectivity in each apartment. The Tenant will be given a password to access the network at check-in.
```

**Replace with:**
```
{wifi_info}
```

#### **10. Add Cleaning Info**

**After the WiFi section, add:**
```
{cleaning_info}
```

---

### **PAGE 4 UPDATES:**

#### **11. Update Security Deposit Section (Section 9)**

**Find this:**
```
The Tenant shall deposit with the Landlord Five Hundred EURO (€500.00) PER TENANT receipt of which is hereby acknowledged by the Landlord, as security for any damage caused to the Premises, the furnishings, painting, household goods or other personal property of the Landlord during the term hereof. The deposit shall be returned to the Tenant within 60 days of the exit date from our San Diego office
```

**Replace with:**
```
The Tenant shall deposit with the Landlord {security_deposit_text} receipt of which is hereby acknowledged by the Landlord, as security for any damage caused to the Premises, the furnishings, painting, household goods or other personal property of the Landlord during the term hereof. The deposit shall be returned to the Tenant within {deposit_return_days} days of the exit date from our San Diego office
```

**Specific replacements:**
```
Find: Five Hundred EURO (€500.00) PER TENANT
Replace: {security_deposit_text}

Find: within 60 days
Replace: within {deposit_return_days} days
```

---

## ✅ VERIFICATION CHECKLIST:

After making all changes, use `Ctrl + F` to search for each field:

### **Should FIND (✅):**
- [ ] `{contract_date}`
- [ ] `{owner_apt_number}` and `{owner_name}`
- [ ] `{tenant_organization}`, `{tenant_address_line1}`, `{tenant_address_line2}`
- [ ] `{apt1_number}`, `{apt1_address}`, `{apt1_students}`, `{apt1_bedrooms}`, `{apt1_bathrooms}`
- [ ] `{apt2_number}`, `{apt2_address}`, `{apt2_students}`, `{apt2_bedrooms}`, `{apt2_bathrooms}`
- [ ] `{apt3_number}`, `{apt3_address}`, `{apt3_students}`, `{apt3_bedrooms}`, `{apt3_bathrooms}`
- [ ] `{total_students}` and `{total_apartments}`
- [ ] `{lease_start_date}` and `{lease_end_date}`
- [ ] `{rent_per_student_per_night}` and `{rent_series}`
- [ ] `{electricity_rate_per_m2}`, `{gas_rate_per_m2}`, `{utility_payment_days}`
- [ ] `{wifi_info}` and `{cleaning_info}`
- [ ] `{security_deposit_text}` and `{deposit_return_days}`

### **Should NOT Find (❌):**
- [ ] `{landlord_name}` - Should be "Roma Rentals SPQR"
- [ ] `{landlord_address_usa}` - Should be static address
- [ ] `{landlord_address_italy}` - Should be static address
- [ ] `{landlord_phone}` - Should be static phone
- [ ] `{landlord_email}` - Should be removed or static

---

## 💾 SAVE AND TEST:

1. **Save:** Press `Ctrl + S`
2. **Close Word completely**
3. **Test:** Go to `http://localhost:8000/contract-generator.html`
4. **Refresh:** Press `Ctrl + Shift + R` (hard refresh)
5. **Fill form** with test data
6. **Generate contract**
7. **Verify** all fields are replaced correctly

---

## 🧪 TEST DATA:

Use this data to test your template:

**Contract Date:** 18 November 2025
**Owner 1:** RR#407, M. Rifrigeri
**Owner 2:** RR#499, S. Ivarone
**Tenant:** University of Notre Dame, 1 Walsh Family Hall of Architecture, Notre Dame, IN 46556 USA
**Apartment 1:** RR#407, Via Roma Libera 23, Int. 9, 00153 Rome, Italy, 2 students, 2 bedrooms, 1 bathroom
**Apartment 2:** RR#499, Viale di Trastevere 66, Scala E, Int. 8, 00153 Rome, Italy, 6 students, 3 bedrooms, 2 bathrooms
**Lease:** 09 January 2026 to 11 May 2026
**Rent:** 80.00 Euro per student per night, 122 Euros series
**Utilities:** 0.50 € electricity, 1.48 € gas, 44 days payment
**WiFi:** Yes - Included
**Cleaning:** Yes - Additional Cost, 50 €
**Security Deposit:** 500.00 € per tenant, 60 days return period

---

**Good luck! Let me know if you need help with any step!** 🚀

