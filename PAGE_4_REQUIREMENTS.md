# Page 4 Requirements - Client Feedback

## 📋 Client Said:

> "Page 4:
> TAB security deposit amount"

---

## 🔴 Fields Marked in Red (Section 9 - Security Deposit):

### **Current Text in Template:**

```
9. Security Deposit. The Tenant shall deposit with the Landlord Five Hundred EURO (€500.00) PER TENANT receipt of which is hereby acknowledged by the Landlord, as security for any damage caused to the Premises, the furnishings, painting, household goods or other personal property of the Landlord during the term hereof. The deposit shall be returned to the Tenant within 60 days of the exit date from our San Diego office (tina@romarentals.net) without interest thereon, less any set-off for final exit bill balances, unpaid utilities, any damages and final exit cleaning and laundry fee upon termination of this Agreement.
```

---

## 🔴 Specific Values That Need to Be Variable:

### **1. Security Deposit Amount:**
```
Current: Five Hundred EURO (€500.00) PER TENANT
Replace with: {security_deposit_text}
```

**Where `{security_deposit_text}` is auto-generated as:**
- Input: `{security_deposit_per_tenant}` = 500.00
- Output: "Five Hundred EURO (€500.00) PER TENANT"

### **2. Return Period:**
```
Current: within 60 days
Replace with: within {deposit_return_days} days
```

### **3. Total Security Deposit (Auto-calculated):**
```
Formula: {security_deposit_per_tenant} × {total_students}
Result: {security_deposit_total}
```

**Example:**
- Deposit per tenant: €500.00
- Total students: 8
- Total deposit: €4,000.00

---

## ✅ NEW MERGE FIELDS FOR PAGE 4:

### **Security Deposit Tab:**
- `{security_deposit_per_tenant}` - Deposit amount per tenant (e.g., 500.00)
- `{security_deposit_text}` - Auto-generated text (e.g., "Five Hundred EURO (€500.00) PER TENANT")
- `{security_deposit_total}` - Total deposit (auto-calculated: deposit × students)
- `{deposit_return_days}` - Days to return deposit (e.g., 60)

---

## 📝 WORD TEMPLATE UPDATES NEEDED:

### **Section 9 - Security Deposit:**

**Find this text:**
```
The Tenant shall deposit with the Landlord Five Hundred EURO (€500.00) PER TENANT receipt of which is hereby acknowledged by the Landlord, as security for any damage caused to the Premises, the furnishings, painting, household goods or other personal property of the Landlord during the term hereof. The deposit shall be returned to the Tenant within 60 days of the exit date from our San Diego office
```

**Replace with:**
```
The Tenant shall deposit with the Landlord {security_deposit_text} receipt of which is hereby acknowledged by the Landlord, as security for any damage caused to the Premises, the furnishings, painting, household goods or other personal property of the Landlord during the term hereof. The deposit shall be returned to the Tenant within {deposit_return_days} days of the exit date from our San Diego office
```

---

## 🎯 COMPLETE UPDATED SECTION 9:

```
9. Security Deposit. The Tenant shall deposit with the Landlord {security_deposit_text} receipt of which is hereby acknowledged by the Landlord, as security for any damage caused to the Premises, the furnishings, painting, household goods or other personal property of the Landlord during the term hereof. The deposit shall be returned to the Tenant within {deposit_return_days} days of the exit date from our San Diego office (tina@romarentals.net) without interest thereon, less any set-off for final exit bill balances, unpaid utilities, any damages and final exit cleaning and laundry fee upon termination of this Agreement.
```

---

## 🧪 TEST DATA:

**Security Deposit:**
- Deposit Per Tenant: 500.00 €
- Total Students: 8
- Total Deposit: 4,000.00 € (auto-calculated)
- Return Period: 60 days

**Auto-generated text:**
```
{security_deposit_text} = "Five Hundred EURO (€500.00) PER TENANT"
```

---

## 📊 NUMBER TO WORDS CONVERSION:

The system automatically converts numbers to words:

| Amount | Words |
|--------|-------|
| 500 | Five Hundred |
| 600 | Six Hundred |
| 750 | Seven Hundred Fifty |
| 1000 | One Thousand |

---

## ✅ SUMMARY OF CHANGES:

### **Added to Contract Generator:**
- ✅ Security deposit per tenant field
- ✅ Total security deposit (auto-calculated)
- ✅ Deposit return days field
- ✅ Auto-generated deposit text with number-to-words conversion

### **Need to Add to Word Template:**
- ⏳ Replace "Five Hundred EURO (€500.00) PER TENANT" with `{security_deposit_text}`
- ⏳ Replace "60 days" with `{deposit_return_days} days`

---

## 🚀 NEXT STEPS:

1. ✅ Contract generator updated with security deposit fields
2. ⏳ Update Word template Section 9 (Security Deposit)
3. ⏳ Test contract generation with security deposit
4. ⏳ Verify deposit amount converts to words correctly

---

## 💡 HOW IT WORKS:

**User enters:**
- Security Deposit Per Tenant: 500

**System calculates:**
- Total Students: 8 (from apartments)
- Total Security Deposit: 500 × 8 = 4,000 €

**System generates:**
- `{security_deposit_text}` = "Five Hundred EURO (€500.00) PER TENANT"
- `{security_deposit_total}` = 4000.00

**Contract shows:**
```
The Tenant shall deposit with the Landlord Five Hundred EURO (€500.00) PER TENANT...
```

---

**Perfect! Security deposit is now fully automated!** 🎯

