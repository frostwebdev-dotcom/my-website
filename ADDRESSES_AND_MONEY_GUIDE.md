# 💰🏠 Detailed Guide: Addresses and Money Amounts

## 🎯 How to Find and Replace Addresses and Money in YOUR Template

---

## 🏠 PART 1: ADDRESSES

### **Why Addresses Are Tricky:**
- Addresses can be on multiple lines
- They might have different formats
- You need to see the EXACT text in your Word document

---

### **📍 Step 1: Find the Property Address**

**What to look for in your Word document:**

Based on your analysis, the property address includes:
- Twin Oaks
- Valley Road
- San Marcos

**How to find it:**

1. **Open your Word template**
2. **Press Ctrl + F** (Find)
3. **Search for:** `Twin Oaks`
4. **Look at how the address appears**

**It might look like:**

**Option A - Single Line:**
```
Twin Oaks, 1234 Valley Road, San Marcos, CA 92078
```

**Option B - Multiple Lines:**
```
Twin Oaks
1234 Valley Road
San Marcos, CA 92078
```

**Option C - In a sentence:**
```
The property located at Twin Oaks on Valley Road in San Marcos...
```

---

### **📍 Step 2: Replace the Property Address**

**Method 1: If it's a complete address block (RECOMMENDED)**

1. **In your Word document, SELECT the entire address** (click and drag)
2. **Copy it** (Ctrl + C)
3. **Press Ctrl + H** (Find & Replace)
4. **Paste into "Find what"** (Ctrl + V)
5. **In "Replace with" type:** `{property_address}`
6. **Click:** "Replace All"

**Example:**
```
Find what:     Twin Oaks
               1234 Valley Road
               San Marcos, CA 92078

Replace with:  {property_address}
```

---

**Method 2: If it's in a sentence**

1. **Find the sentence** with the address
2. **Replace just the address part**

**Example:**
```
Find what:     Twin Oaks on Valley Road in San Marcos
Replace with:  {property_address}
```

---

**Method 3: Replace parts separately (if address is scattered)**

```
Find what:     Twin Oaks
Replace with:  {property_name}

Find what:     1234 Valley Road
Replace with:  {property_street}

Find what:     San Marcos, CA 92078
Replace with:  {property_city_state_zip}
```

**Then in the contract generator, you'll fill:**
- Property Address: "Twin Oaks, 1234 Valley Road, San Marcos, CA 92078"

---

### **📍 Step 3: Find the Landlord USA Address (San Diego)**

**What to look for:**

Based on your analysis, there's a San Diego address.

**How to find it:**

1. **Press Ctrl + F**
2. **Search for:** `San Diego`
3. **Look at the complete address**

**It might look like:**
```
Roma Rentals
5678 Business Blvd, Suite 100
San Diego, CA 92101
```

**Or:**
```
USA Office: 5678 Business Blvd, San Diego, CA 92101
```

---

### **📍 Step 4: Replace the Landlord USA Address**

**Method: Select and Replace**

1. **In Word, SELECT the entire USA address**
2. **Copy it** (Ctrl + C)
3. **Press Ctrl + H**
4. **Paste into "Find what"**
5. **In "Replace with" type:** `{landlord_address_usa}`
6. **Click:** "Replace All"

**Example:**
```
Find what:     5678 Business Blvd, Suite 100
               San Diego, CA 92101

Replace with:  {landlord_address_usa}
```

---

### **📍 Step 5: Find the Landlord Italy Address (Via Roma)**

**What to look for:**

Based on your analysis:
- Via Roma
- Roma Italy

**How to find it:**

1. **Press Ctrl + F**
2. **Search for:** `Via Roma`
3. **Look at the complete address**

**It might look like:**
```
Via Roma 123
00100 Roma, Italy
```

**Or:**
```
Italy Office: Via Roma 123, Roma, Italy
```

---

### **📍 Step 6: Replace the Landlord Italy Address**

**Method: Select and Replace**

1. **In Word, SELECT the entire Italy address**
2. **Copy it** (Ctrl + C)
3. **Press Ctrl + H**
4. **Paste into "Find what"**
5. **In "Replace with" type:** `{landlord_address_italy}`
6. **Click:** "Replace All"

**Example:**
```
Find what:     Via Roma 123
               00100 Roma, Italy

Replace with:  {landlord_address_italy}
```

---

## 💰 PART 2: MONEY AMOUNTS

### **Why Money Amounts Are Tricky:**
- They might have different formats: $25, $25.00, $25.00 USD
- They might include commas: $3,050.00
- You need to find the EXACT format in your document

---

### **💵 Step 1: Find the Rent Per Night**

**What to look for:**

Your contract is for 122 nights, so there should be a nightly rate.

**How to find it:**

1. **Open your Word template**
2. **Look for phrases like:**
   - "Rent per night"
   - "Nightly rate"
   - "Daily rent"
   - "Per diem"

3. **Look for the dollar amount near that phrase**

**It might look like:**
```
Rent: $25.00 per night
```

**Or:**
```
Nightly Rate: $25
```

**Or:**
```
The Tenant agrees to pay $25.00 per night
```

---

### **💵 Step 2: Replace the Rent Per Night**

**Important: Look at the EXACT format!**

**If it says "$25.00":**
```
Find what:     $25.00
Replace with:  ${rent_per_night}
```

**If it says "$25":**
```
Find what:     $25
Replace with:  ${rent_per_night}
```

**If it says "25.00":**
```
Find what:     25.00
Replace with:  {rent_per_night}
```

**⚠️ Note:** Keep the `$` symbol if it's in your original text!

---

### **💵 Step 3: Find the Total Rent**

**How to calculate:**
- 122 nights × rent per night = total rent
- If rent is $25/night: 122 × $25 = $3,050

**What to look for:**

1. **Look for phrases like:**
   - "Total rent"
   - "Total amount"
   - "Total payment"
   - "Amount due"

2. **Look for the dollar amount**

**It might look like:**
```
Total Rent: $3,050.00
```

**Or:**
```
Total Amount Due: $3,050
```

**Or:**
```
The total rent for 122 nights is $3,050.00
```

---

### **💵 Step 4: Replace the Total Rent**

**Look at the EXACT format in your document!**

**If it says "$3,050.00":**
```
Find what:     $3,050.00
Replace with:  ${total_rent}
```

**If it says "$3,050":**
```
Find what:     $3,050
Replace with:  ${total_rent}
```

**If it says "3,050.00":**
```
Find what:     3,050.00
Replace with:  {total_rent}
```

**⚠️ Important:** Include the comma if it's in your original text!

---

### **💵 Step 5: Find the Security Deposit**

**What to look for:**

1. **Look for phrases like:**
   - "Security deposit"
   - "Damage deposit"
   - "Refundable deposit"

2. **Look for the dollar amount**

**It might look like:**
```
Security Deposit: $500.00
```

**Or:**
```
A security deposit of $500 is required
```

**Or:**
```
Deposit Amount: $500.00
```

---

### **💵 Step 6: Replace the Security Deposit**

**Look at the EXACT format!**

**If it says "$500.00":**
```
Find what:     $500.00
Replace with:  ${security_deposit}
```

**If it says "$500":**
```
Find what:     $500
Replace with:  ${security_deposit}
```

**If it says "500.00":**
```
Find what:     500.00
Replace with:  {security_deposit}
```

---

### **💵 Step 7: Find Other Money Amounts**

**Look for these in your document:**

**Cleaning Fee:**
```
Look for: "Cleaning fee: $XXX"
Replace:  ${cleaning_fee}
```

**Payment amounts:**
```
Look for: "First payment: $XXX"
Replace:  ${payment_amount}
```

---

## 🎯 COMPLETE WALKTHROUGH EXAMPLE

### **Let's say your Word document has this:**

```
RENTAL AGREEMENT

Property: Twin Oaks
          1234 Valley Road
          San Marcos, CA 92078

Landlord: Roma Rentals
          USA Office: 5678 Business Blvd, San Diego, CA 92101
          Italy Office: Via Roma 123, 00100 Roma, Italy

Rent: $25.00 per night
Total Nights: 122 nights
Total Rent: $3,050.00

Security Deposit: $500.00
Cleaning Fee: $100.00
```

---

### **Here's how to replace it:**

**Step 1: Property Address**
```
1. SELECT in Word:
   Twin Oaks
   1234 Valley Road
   San Marcos, CA 92078

2. Copy it (Ctrl + C)

3. Press Ctrl + H

4. Paste into "Find what" (Ctrl + V)

5. In "Replace with" type: {property_address}

6. Click "Replace All"
```

---

**Step 2: Landlord USA Address**
```
1. SELECT in Word:
   5678 Business Blvd, San Diego, CA 92101

2. Copy it

3. Press Ctrl + H

4. Paste into "Find what"

5. In "Replace with" type: {landlord_address_usa}

6. Click "Replace All"
```

---

**Step 3: Landlord Italy Address**
```
1. SELECT in Word:
   Via Roma 123, 00100 Roma, Italy

2. Copy it

3. Press Ctrl + H

4. Paste into "Find what"

5. In "Replace with" type: {landlord_address_italy}

6. Click "Replace All"
```

---

**Step 4: Rent Per Night**
```
Find what:     $25.00
Replace with:  ${rent_per_night}
Click:         Replace All
```

---

**Step 5: Total Rent**
```
Find what:     $3,050.00
Replace with:  ${total_rent}
Click:         Replace All
```

---

**Step 6: Security Deposit**
```
Find what:     $500.00
Replace with:  ${security_deposit}
Click:         Replace All
```

---

**Step 7: Cleaning Fee**
```
Find what:     $100.00
Replace with:  ${cleaning_fee}
Click:         Replace All
```

---

### **After all replacements, it will look like:**

```
RENTAL AGREEMENT

Property: {property_address}

Landlord: {landlord_name}
          USA Office: {landlord_address_usa}
          Italy Office: {landlord_address_italy}

Rent: ${rent_per_night} per night
Total Nights: {total_nights} nights
Total Rent: ${total_rent}

Security Deposit: ${security_deposit}
Cleaning Fee: ${cleaning_fee}
```

---

## 💡 PRO TIPS

### **Tip 1: Use the "Find" feature first**
- Press Ctrl + F
- Search for keywords like "rent", "deposit", "address"
- This helps you locate all the places where money/addresses appear

### **Tip 2: Replace one at a time**
- Don't try to replace all money amounts at once
- Do them one by one to avoid mistakes

### **Tip 3: Check the format**
- Does it have a $ sign? Keep it!
- Does it have commas? Include them!
- Does it have decimals? Include them!

### **Tip 4: For multi-line addresses**
- SELECT the entire address block
- Copy and paste into "Find what"
- This preserves the line breaks

### **Tip 5: Test after each replacement**
- After replacing, scroll through your document
- Make sure it looks correct
- Use Ctrl + Z to undo if something went wrong

---

## 🚨 COMMON MISTAKES

### ❌ **Mistake 1: Wrong dollar format**
```
Your doc has: $25.00
You replace:  $25
Result:       Won't find it! ❌
```

### ❌ **Mistake 2: Missing commas**
```
Your doc has: $3,050.00
You replace:  $3050.00
Result:       Won't find it! ❌
```

### ❌ **Mistake 3: Partial address**
```
Your doc has: Twin Oaks
              1234 Valley Road
              San Marcos, CA
              
You replace:  Twin Oaks
Result:       Only replaces first line! ❌
```

### ✅ **Solution: Copy the EXACT text from your Word document!**

---

## 📋 CHECKLIST

**Before you start:**
- [ ] Open your Word template
- [ ] Make a backup copy
- [ ] Have this guide open

**For each address:**
- [ ] Find it using Ctrl + F
- [ ] SELECT the entire address
- [ ] Copy it (Ctrl + C)
- [ ] Open Find & Replace (Ctrl + H)
- [ ] Paste into "Find what"
- [ ] Type merge field in "Replace with"
- [ ] Click "Replace All"

**For each money amount:**
- [ ] Find it using Ctrl + F
- [ ] Note the EXACT format ($25.00 vs $25 vs 25.00)
- [ ] Open Find & Replace (Ctrl + H)
- [ ] Type exact amount in "Find what"
- [ ] Type merge field in "Replace with"
- [ ] Click "Replace All"

**After all replacements:**
- [ ] Save (Ctrl + S)
- [ ] Scroll through document to verify
- [ ] Test with contract generator

---

## 🎯 NEXT STEP

**After you finish replacing addresses and money:**

1. **Save your Word template** (Ctrl + S)
2. **Go to:** http://localhost:8000/contract-generator.html
3. **Fill in the form** with test data
4. **Click:** "Generate Contract"
5. **Open the generated contract**
6. **Verify:** All merge fields are replaced correctly

---

**Need help finding a specific address or amount? Let me know!**

