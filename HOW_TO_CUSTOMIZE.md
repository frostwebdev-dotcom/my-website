# How to Customize Your Contracts

Great news! You can easily customize and add new contract types. Here's how:

## What You Can Change

### ✅ Easy Changes (No Coding Required)

1. **Contract Text** - Change any legal text, clauses, or wording
2. **Questions** - Add, remove, or modify questions
3. **Utilities Information** - Different for each contract type
4. **Cleaning Details** - Customize per contract
5. **WiFi Information** - Different for each property
6. **Fees and Amounts** - Change default values
7. **Property Details** - Add more properties or change format

### 🔧 Medium Changes (Simple Editing)

1. **Add New Contract Types** - Retail Contract, Short Term Contract, etc.
2. **Change Contract Layout** - Adjust spacing, fonts, margins
3. **Add New Fields** - Additional information to collect
4. **Modify Logos** - Change size, position, or design

---

## How to Make Changes

### Option 1: Contact Your Developer

The easiest way is to send your developer:
- What you want to change
- The new text or information
- Which contract type it applies to

**Example:**
> "For the Group Contract, I want to change the utilities clause to say that WiFi is included and electricity is paid by tenant. For the Retail Contract, I want utilities to be different - tenant pays all utilities."

### Option 2: Edit Files Yourself (If You're Comfortable)

All the contract content is in easy-to-find files:

#### File: `contract-data.js`
This contains all the **questions** asked to fill in the contract.

**To add a question:**
```javascript
{
    id: 'wifiPassword',
    question: 'What is the WiFi password?',
    help: 'Example: MyWiFi2024',
    placeholder: 'Enter WiFi password',
    type: 'text'
}
```

**To remove a question:**
Just delete the entire `{ ... }` block for that question.

#### File: `app.js`
This contains the **contract text** (around line 250-460).

**To change contract text:**
1. Find the section you want to change (search for the text)
2. Edit the text between the quotes
3. Save the file

**Example - Changing Utilities:**
Find this line (around line 350):
```javascript
<strong>Utilities.</strong> The Landlord shall provide and pay for...
```

Change it to:
```javascript
<strong>Utilities.</strong> WiFi is included. Tenant pays electricity...
```

---

## Adding a New Contract Type

### Step 1: Add the Contract Card

**File:** `index.html` (around line 16-32)

Change this:
```html
<div class="contract-card coming-soon">
    <div class="card-icon">🏪</div>
    <h3>Retail Contract</h3>
    <p>Coming soon...</p>
</div>
```

To this:
```html
<div class="contract-card" onclick="selectContract('retail-contract')">
    <div class="card-icon">🏪</div>
    <h3>Retail Contract</h3>
    <p>Commercial retail space rental</p>
</div>
```

### Step 2: Create Questions for New Contract

**File:** `contract-data.js`

You can either:
- **Option A:** Use the same questions for all contracts (easiest)
- **Option B:** Create different questions for each contract type

**Option B Example:**
```javascript
const contractQuestions = {
    'group-contract': [
        // Current questions here
    ],
    'retail-contract': [
        {
            id: 'businessName',
            question: 'What is the business name?',
            help: 'Example: Roma Pizza Shop',
            placeholder: 'Enter business name',
            type: 'text'
        },
        // More questions...
    ]
};
```

### Step 3: Create the Contract Template

**File:** `app.js`

Add a new function for your contract type:
```javascript
function generateRetailContractHTML() {
    const a = userAnswers;
    
    return `
        <style>
            /* Same styling as group contract */
        </style>
        
        <div class="pdf-contract">
            <!-- Your retail contract content here -->
            <h1>ROMARENTALS</h1>
            <h2>RETAIL LEASE AGREEMENT</h2>
            
            <p>Business Name: ${a.businessName}</p>
            <!-- More content... -->
        </div>
    `;
}
```

### Step 4: Update the Generate Function

**File:** `app.js` (around line 120-130)

Find the `generateContract()` function and update it:
```javascript
function generateContract() {
    let contractHTML;
    
    if (selectedContractType === 'group-contract') {
        contractHTML = generateGroupContractHTML();
    } else if (selectedContractType === 'retail-contract') {
        contractHTML = generateRetailContractHTML();
    } else if (selectedContractType === 'short-term-contract') {
        contractHTML = generateShortTermContractHTML();
    }
    
    document.getElementById('contract-content').innerHTML = contractHTML;
    showScreen('contract-screen');
}
```

---

## Common Customizations

### Change WiFi Information Per Contract

In `app.js`, find the utilities section and change it:

**Group Contract:**
```javascript
<strong>Utilities.</strong> WiFi included (password provided at check-in). Tenant pays electricity.
```

**Retail Contract:**
```javascript
<strong>Utilities.</strong> Tenant responsible for all utilities including WiFi, electricity, water.
```

### Change Cleaning Details

Find the cleaning section in `app.js`:
```javascript
Roma Rentals will provide a light cleaning scheduled bi-monthly of the common spaces.
```

Change to:
```javascript
Roma Rentals will provide weekly cleaning for retail spaces.
```

### Add More Properties

In `contract-data.js`, you can add more property questions:
```javascript
{
    id: 'property3Address',
    question: 'What is the address of the third property?',
    help: 'Example: Via Roma 123',
    placeholder: 'Enter property address or leave blank',
    type: 'text',
    optional: true
}
```

---

## Tips

1. **Always make a backup** before editing files
2. **Test after each change** - generate a contract to see if it works
3. **Keep formatting consistent** - copy existing patterns
4. **Ask for help** if something doesn't work

---

## Need Help?

Contact your developer with:
- What you want to change
- Which contract type
- The exact text you want

They can make the changes quickly and ensure everything works perfectly!

