# How to Add New Contract Types

This guide explains how to add additional contract types to your contract generator system.

## Overview

The system is designed to be easily expandable. You can add as many contract types as you need by following these simple steps.

## Step-by-Step Guide

### Step 1: Add a Contract Selection Card

Open `index.html` and find the contract selection section. Add a new card:

```html
<div class="contract-card" onclick="selectContract('your-contract-name')">
    <div class="card-icon">📋</div>
    <h3>Your Contract Name</h3>
    <p>Brief description of this contract</p>
</div>
```

Replace:
- `'your-contract-name'` with a unique identifier (lowercase, use dashes)
- `📋` with any emoji icon you like
- `Your Contract Name` with the display name
- `Brief description` with what this contract is for

### Step 2: Create Questions for Your Contract

Open `contract-data.js` and add a new array of questions:

```javascript
const yourContractQuestions = [
    {
        id: 'fieldName',
        question: 'What is the question you want to ask?',
        help: 'Example: Sample answer here',
        placeholder: 'Enter the information',
        type: 'text'  // or 'email', 'number', 'date'
    },
    // Add more questions...
];
```

**Field types available:**
- `text` - For names, addresses, general text
- `email` - For email addresses
- `number` - For amounts, quantities
- `date` - For dates

**Optional fields:**
Add `optional: true` to make a field optional:
```javascript
{
    id: 'optionalField',
    question: 'Optional question?',
    help: 'Leave blank if not applicable',
    placeholder: 'Enter or leave blank',
    type: 'text',
    optional: true
}
```

### Step 3: Update the App Logic

Open `app.js` and find the `selectContract()` function. Update it to handle your new contract:

```javascript
function selectContract(contractType) {
    selectedContractType = contractType;
    
    // Set the appropriate questions based on contract type
    if (contractType === 'rental-agreement') {
        currentQuestions = contractQuestions;
    } else if (contractType === 'your-contract-name') {
        currentQuestions = yourContractQuestions;
    }
    
    showScreen('welcome-screen');
}
```

### Step 4: Create the Contract Generation Function

In `app.js`, add a new function to generate your contract HTML:

```javascript
function generateYourContractHTML() {
    const a = userAnswers;
    
    return `
        <div class="pdf-contract">
            <h1>YOUR CONTRACT TITLE</h1>
            
            <p>This contract made on ${a.date}</p>
            
            <p>Between ${a.partyOne} and ${a.partyTwo}</p>
            
            <!-- Add all your contract text here -->
            <!-- Use ${a.fieldName} to insert answers -->
            
            <div class="signature-section">
                <div class="signature-line">
                    ${a.signerName}
                    <span class="signature-date">Date: ${a.signatureDate}</span>
                </div>
            </div>
        </div>
    `;
}
```

### Step 5: Update the Main Generation Function

Find the `generateContractHTML()` function and update it:

```javascript
function generateContractHTML() {
    if (selectedContractType === 'rental-agreement') {
        return generateRentalAgreementHTML();
    } else if (selectedContractType === 'your-contract-name') {
        return generateYourContractHTML();
    }
}
```

## Tips for Creating Professional Contracts

### Formatting

Use the built-in CSS classes:
- `<h1>` - Main title
- `<h2>` - Section titles
- `<h3>` - Subsection titles
- `<p class="center">` - Centered paragraphs
- `<ol>` and `<li>` - Numbered lists
- `<div class="signature-line">` - Signature lines
- `<div class="page-number">` - Page numbers

### Page Breaks

Add page breaks where needed:
```html
<div style="page-break-after: always;"></div>
```

### Styling

The `.pdf-contract` class automatically applies:
- Times New Roman font
- Professional spacing
- Print-optimized layout
- Proper margins

## Example: Simple Agreement

Here's a complete minimal example:

**In contract-data.js:**
```javascript
const simpleAgreementQuestions = [
    {
        id: 'date',
        question: 'What is the agreement date?',
        help: 'Example: November 20, 2025',
        placeholder: 'Enter date',
        type: 'text'
    },
    {
        id: 'partyA',
        question: 'Who is Party A?',
        help: 'Full name or company name',
        placeholder: 'Enter name',
        type: 'text'
    },
    {
        id: 'partyB',
        question: 'Who is Party B?',
        help: 'Full name or company name',
        placeholder: 'Enter name',
        type: 'text'
    }
];
```

**In app.js:**
```javascript
function generateSimpleAgreementHTML() {
    const a = userAnswers;
    return `
        <div class="pdf-contract">
            <h1>SIMPLE AGREEMENT</h1>
            <p class="center">Made on ${a.date}</p>
            <p>This agreement is between ${a.partyA} and ${a.partyB}.</p>
            <div class="signature-section">
                <div class="signature-line">
                    ${a.partyA}
                    <span class="signature-date">Date: ${a.date}</span>
                </div>
                <div class="signature-line">
                    ${a.partyB}
                    <span class="signature-date">Date: ${a.date}</span>
                </div>
            </div>
        </div>
    `;
}
```

## Need Help?

If you need assistance adding a new contract type, you can:
1. Use the existing Rental Agreement as a template
2. Copy the structure and modify the questions and text
3. Test thoroughly before using for real contracts

Remember: Always have a legal professional review your contracts!

