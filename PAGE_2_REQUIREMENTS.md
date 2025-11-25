# Page 2 Requirements - Client Feedback

## 📋 Client Said:

> "Page 2:
> TAB - apartment # and address for apartment.
> Leave spaces to add other apartment addresses if needed
> TAB - number of Students, number of apartments
> TAB- dates for lease (transitory term)
> TAB- amount for rent"

---

## 🔴 Fields Marked in Red (Need Tabs):

### **1. APARTMENT INFO (Multiple Apartments)**

**Apartment 1:**
```
Current: (RR#407) Via Roma Libera 23, Int. 9, 00153 Rome, Italy - 2 STUDENTS (2 Bedrooms, 1 Bathroom)
Replace with: ({apt1_number}) {apt1_address} - {apt1_students} STUDENTS ({apt1_bedrooms} Bedrooms, {apt1_bathrooms} Bathrooms)
```

**Apartment 2:**
```
Current: (RR#499) Viale di Trastevere 66, Scala E, Int. 8, 00153 Rome, Italy - 6 STUDENTS (3 Bedrooms, 2 Bathrooms)
Replace with: ({apt2_number}) {apt2_address} - {apt2_students} STUDENTS ({apt2_bedrooms} Bedrooms, {apt2_bathrooms} Bathrooms)
```

**Apartment 3 (Optional):**
```
Add space for: ({apt3_number}) {apt3_address} - {apt3_students} STUDENTS ({apt3_bedrooms} Bedrooms, {apt3_bathrooms} Bathrooms)
```

---

### **2. TOTAL SUMMARY**

```
Current: TOTAL: 5 STUDENTS 2 APARTMENTS
Replace with: TOTAL: {total_students} STUDENTS {total_apartments} APARTMENTS
```

---

### **3. LEASE DATES (Transitory Term)**

```
Current: Transitory Term. The lease term shall commence on 09 January 2026 and shall terminate on 11 May 2026
Replace with: Transitory Term. The lease term shall commence on {lease_start_date} and shall terminate on {lease_end_date}
```

---

### **4. RENT AMOUNT**

```
Current: Rent. The rent per related series as outlined in this rental agreement shall be the following: 122 Euros at 80.00 Euro per student, per night.
Replace with: Rent. The rent per related series as outlined in this rental agreement shall be the following: {rent_series} Euros at {rent_per_student_per_night} Euro per student, per night.
```

---

## ✅ NEW MERGE FIELDS FOR PAGE 2:

### **Apartment Details Tab:**
- `{apt1_number}` - Apartment 1 number (e.g., RR#407)
- `{apt1_address}` - Apartment 1 full address
- `{apt1_students}` - Number of students in apartment 1
- `{apt1_bedrooms}` - Number of bedrooms in apartment 1
- `{apt1_bathrooms}` - Number of bathrooms in apartment 1

- `{apt2_number}` - Apartment 2 number (optional)
- `{apt2_address}` - Apartment 2 full address (optional)
- `{apt2_students}` - Number of students in apartment 2 (optional)
- `{apt2_bedrooms}` - Number of bedrooms in apartment 2 (optional)
- `{apt2_bathrooms}` - Number of bathrooms in apartment 2 (optional)

- `{apt3_number}` - Apartment 3 number (optional)
- `{apt3_address}` - Apartment 3 full address (optional)
- `{apt3_students}` - Number of students in apartment 3 (optional)
- `{apt3_bedrooms}` - Number of bedrooms in apartment 3 (optional)
- `{apt3_bathrooms}` - Number of bathrooms in apartment 3 (optional)

### **Summary Fields (Auto-calculated):**
- `{total_students}` - Total number of students (sum of all apartments)
- `{total_apartments}` - Total number of apartments (count of apartments with students)

### **Lease Dates (Already exists from Page 1):**
- `{lease_start_date}` - Lease start date
- `{lease_end_date}` - Lease end date

### **Rent Fields:**
- `{rent_per_student_per_night}` - Rent per student per night (e.g., 80.00)
- `{rent_series}` - Rent series amount (e.g., 122)

---

## 📝 WORD TEMPLATE UPDATES NEEDED:

### **Step 1: Update WHEREAS Section (Apartment Info)**

**Find this section in your Word template:**
```
WHEREAS:

The Landlord is the fee owner of the certain real property being, lying and situated in
Rome at the following addresses (The "Premises"):

(RR#407) Via Roma Libera 23, Int. 9, 00153 Rome, Italy - 2 STUDENTS (2 Bedrooms, 1 Bathroom)

(RR#499) Viale di Trastevere 66, Scala E, Int. 8, 00153 Rome, Italy - 6 STUDENTS (3 Bedrooms, 2 Bathrooms)

TOTAL: 5 STUDENTS 2 APARTMENTS
```

**Replace with:**
```
WHEREAS:

The Landlord is the fee owner of the certain real property being, lying and situated in
Rome at the following addresses (The "Premises"):

({apt1_number}) {apt1_address} - {apt1_students} STUDENTS ({apt1_bedrooms} Bedrooms, {apt1_bathrooms} Bathrooms)

({apt2_number}) {apt2_address} - {apt2_students} STUDENTS ({apt2_bedrooms} Bedrooms, {apt2_bathrooms} Bathrooms)

({apt3_number}) {apt3_address} - {apt3_students} STUDENTS ({apt3_bedrooms} Bedrooms, {apt3_bathrooms} Bathrooms)

TOTAL: {total_students} STUDENTS {total_apartments} APARTMENTS
```

---

### **Step 2: Update Transitory Term Section**

**Find:**
```
1. Transitory Term. The lease term shall commence on 09 January 2026 and shall terminate on 11 May 2026
```

**Replace with:**
```
1. Transitory Term. The lease term shall commence on {lease_start_date} and shall terminate on {lease_end_date}
```

---

### **Step 3: Update Rent Section**

**Find:**
```
2. Rent. The rent per related series as outlined in this rental agreement shall be the following: 122 Euros at 80.00 Euro per student, per night.
```

**Replace with:**
```
2. Rent. The rent per related series as outlined in this rental agreement shall be the following: {rent_series} Euros at {rent_per_student_per_night} Euro per student, per night.
```

---

## 🎯 SUMMARY OF ALL TABS:

### **Updated Tab Structure (7 tabs total):**

1. **Contract Date** - Date contract is made effective
2. **Owner Info** - Owner apartment # and name (for Page 1)
3. **Tenant Info** - Tenant organization, address, phone, email
4. **Lease Details** - Start date, end date, total nights
5. **Apartment Details** - Up to 3 apartments with address, students, bedrooms, bathrooms
6. **Rent & Payment** - Rent per student per night, rent series, payment info
7. **Security Deposit** - Deposit amount and terms

---

## 🧪 TEST DATA:

**Apartment 1:**
- Number: RR#407
- Address: Via Roma Libera 23, Int. 9, 00153 Rome, Italy
- Students: 2
- Bedrooms: 2
- Bathrooms: 1

**Apartment 2:**
- Number: RR#499
- Address: Viale di Trastevere 66, Scala E, Int. 8, 00153 Rome, Italy
- Students: 6
- Bedrooms: 3
- Bathrooms: 2

**Totals:**
- Total Students: 8 (auto-calculated)
- Total Apartments: 2 (auto-calculated)

**Lease:**
- Start: 09 January 2026
- End: 11 May 2026

**Rent:**
- Per Student Per Night: 80.00 Euro
- Series: 122 Euros

---

## ✅ NEXT STEPS:

1. ✅ Contract generator updated with new fields
2. ⏳ Update Word template with new merge fields (Page 2)
3. ⏳ Test contract generation
4. ⏳ Verify all fields populate correctly

