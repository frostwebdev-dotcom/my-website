# Page 3 Requirements - Client Feedback

## 📋 Client Said:

> "Page 3:
> TAB - utilities gas, electricity, WiFi, cleaning (costs)"

---

## 🔴 Fields Marked in Red (Section 5 - Utilities):

### **Current Text in Template:**

```
5. Utilities. The monthly rental fee does not include the cost of electricity or 
the cost of gas/heating services. Those costs based on usage will be due in 
addition to the monthly rental fee. Bills will be presented for reimbursement 
by the Landlords at the end of the rental period. If bills are not available, as 
a back-up, a meter reading will be taken at the beginning and at the end of 
the rental period and €0.50 m² for electricity will be used and a €1.48 m² for 
gas will be used. The amount will be invoiced and payable within 44 days 
of receipt at the end of rental or can be taken from the security deposit. The 
Landlord reserves the right to recalculate the cost for utilities based on the 
Italian government or utilities company mandates for the new pricing during 
the lease period. The Landlord will be providing Wi-Fi connectivity in each 
apartment. The Tenant will be given a password to access the network at 
check-in.
```

---

## 🔴 Specific Values That Need to Be Variable:

### **1. Electricity Rate:**
```
Current: €0.50 m² for electricity
Replace with: €{electricity_rate_per_m2} m² for electricity
```

### **2. Gas Rate:**
```
Current: €1.48 m² for gas
Replace with: €{gas_rate_per_m2} m² for gas
```

### **3. Payment Period:**
```
Current: within 44 days
Replace with: within {utility_payment_days} days
```

### **4. WiFi Information:**
```
Current: The Landlord will be providing Wi-Fi connectivity in each apartment. The Tenant will be given a password to access the network at check-in.
Replace with: {wifi_info}
```

**Where `{wifi_info}` could be:**
- "The Landlord will be providing Wi-Fi connectivity in each apartment at no additional cost. The Tenant will be given a password to access the network at check-in."
- "Wi-Fi is available for an additional cost of €{wifi_cost} per month."
- "Wi-Fi is not provided."

### **5. Cleaning Information:**
```
Add: {cleaning_info}
```

**Where `{cleaning_info}` could be:**
- "Cleaning services are included in the rental fee."
- "Cleaning services are available for an additional cost of €{cleaning_cost}."
- "Cleaning is the responsibility of the tenant."

---

## ✅ NEW MERGE FIELDS FOR PAGE 3:

### **Utilities & Costs Tab:**
- `{electricity_rate_per_m2}` - Electricity rate per m² (e.g., 0.50)
- `{gas_rate_per_m2}` - Gas rate per m² (e.g., 1.48)
- `{utility_payment_days}` - Payment period in days (e.g., 44)
- `{wifi_provided}` - WiFi status (Yes - Included / Yes - Additional Cost / No)
- `{wifi_cost}` - WiFi cost if applicable (optional)
- `{cleaning_included}` - Cleaning status (Yes - Included / Yes - Additional Cost / No)
- `{cleaning_cost}` - Cleaning cost if applicable (optional)

---

## 📝 WORD TEMPLATE UPDATES NEEDED:

### **Section 5 - Utilities:**

**Find this text:**
```
If bills are not available, as a back-up, a meter reading will be taken at the beginning and at the end of the rental period and €0.50 m² for electricity will be used and a €1.48 m² for gas will be used. The amount will be invoiced and payable within 44 days of receipt at the end of rental or can be taken from the security deposit.
```

**Replace with:**
```
If bills are not available, as a back-up, a meter reading will be taken at the beginning and at the end of the rental period and €{electricity_rate_per_m2} m² for electricity will be used and a €{gas_rate_per_m2} m² for gas will be used. The amount will be invoiced and payable within {utility_payment_days} days of receipt at the end of rental or can be taken from the security deposit.
```

---

### **WiFi Section:**

**Find this text:**
```
The Landlord will be providing Wi-Fi connectivity in each apartment. The Tenant will be given a password to access the network at check-in.
```

**Replace with:**
```
{wifi_info}
```

**Note:** The system will auto-generate `{wifi_info}` based on the "WiFi Provided" selection:
- If "Yes - Included": "The Landlord will be providing Wi-Fi connectivity in each apartment at no additional cost. The Tenant will be given a password to access the network at check-in."
- If "Yes - Additional Cost": "Wi-Fi is available for an additional cost of €{wifi_cost} per month."
- If "No": "Wi-Fi is not provided by the Landlord."

---

### **Cleaning Section (Add after WiFi):**

**Add this text:**
```
{cleaning_info}
```

**Note:** The system will auto-generate `{cleaning_info}` based on the "Cleaning Included" selection:
- If "Yes - Included": "Cleaning services are included in the rental fee."
- If "Yes - Additional Cost": "Cleaning services are available for an additional cost of €{cleaning_cost}."
- If "No": "Cleaning is the responsibility of the tenant."

---

## 🎯 COMPLETE UPDATED SECTION 5:

```
5. Utilities. The monthly rental fee does not include the cost of electricity or 
the cost of gas/heating services. Those costs based on usage will be due in 
addition to the monthly rental fee. Bills will be presented for reimbursement 
by the Landlords at the end of the rental period. If bills are not available, as 
a back-up, a meter reading will be taken at the beginning and at the end of 
the rental period and €{electricity_rate_per_m2} m² for electricity will be used 
and a €{gas_rate_per_m2} m² for gas will be used. The amount will be invoiced 
and payable within {utility_payment_days} days of receipt at the end of rental 
or can be taken from the security deposit. The Landlord reserves the right to 
recalculate the cost for utilities based on the Italian government or utilities 
company mandates for the new pricing during the lease period. {wifi_info} 
{cleaning_info}
```

---

## 🧪 TEST DATA:

**Utilities:**
- Electricity Rate: 0.50 € per m²
- Gas Rate: 1.48 € per m²
- Payment Period: 44 days

**WiFi:**
- Provided: Yes - Included
- Cost: N/A

**Cleaning:**
- Included: Yes - Additional Cost
- Cost: 50 €

---

## 📊 UPDATED TAB STRUCTURE (8 tabs total):

1. **Contract Date** - Date contract is made effective
2. **Owner Info** - Owner apartment # and name (for Page 1)
3. **Tenant Info** - Tenant organization, address, phone, email
4. **Lease Details** - Start date, end date, total nights
5. **Apartment Details** - Up to 3 apartments with address, students, bedrooms, bathrooms
6. **Rent & Payment** - Rent per student per night, rent series, payment info
7. **Utilities & Costs** - Electricity, gas, WiFi, cleaning costs
8. **Security Deposit** - Deposit amount and terms

---

## ✅ SUMMARY OF CHANGES:

### **Added to Contract Generator:**
- ✅ Electricity rate per m² field
- ✅ Gas rate per m² field
- ✅ Utility payment period field
- ✅ WiFi provided dropdown (Yes - Included / Yes - Additional Cost / No)
- ✅ WiFi cost field (optional)
- ✅ Cleaning included dropdown (Yes - Included / Yes - Additional Cost / No)
- ✅ Cleaning cost field (optional)

### **Need to Add to Word Template:**
- ⏳ Replace `€0.50` with `{electricity_rate_per_m2}`
- ⏳ Replace `€1.48` with `{gas_rate_per_m2}`
- ⏳ Replace `44 days` with `{utility_payment_days} days`
- ⏳ Replace WiFi text with `{wifi_info}`
- ⏳ Add `{cleaning_info}` after WiFi section

---

## 🚀 NEXT STEPS:

1. ✅ Contract generator updated with utility fields
2. ⏳ Update Word template Section 5 (Utilities)
3. ⏳ Test contract generation with utility costs
4. ⏳ Verify all utility fields populate correctly

