// Application State
let currentFieldIndex = 0;
let formData = {};

// Initialize Application
function init() {
    showScreen('welcome-screen');
}

// Screen Management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Start Contract Process
function startContract() {
    console.log('startContract called');
    console.log('contractFields:', contractFields);
    currentFieldIndex = 0;
    formData = {};
    renderForm();
    showScreen('form-screen');
}

// Render Form Fields
function renderForm() {
    const formFields = document.getElementById('form-fields');
    formFields.innerHTML = '';

    contractFields.forEach((field, index) => {
        const fieldDiv = document.createElement('div');
        fieldDiv.className = 'form-field';
        fieldDiv.style.display = index === currentFieldIndex ? 'block' : 'none';
        fieldDiv.dataset.index = index;

        const label = document.createElement('label');
        label.textContent = field.label + (field.required ? ' *' : ' (Optional)');
        label.htmlFor = field.id;

        const input = document.createElement('input');
        input.type = field.type;
        input.id = field.id;
        input.name = field.id;
        input.placeholder = field.placeholder;
        input.required = field.required;
        if (field.step) input.step = field.step;
        if (formData[field.id]) input.value = formData[field.id];

        // Handle Enter key
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                nextField();
            }
        });

        fieldDiv.appendChild(label);
        fieldDiv.appendChild(input);
        formFields.appendChild(fieldDiv);
    });

    updateProgress();
    updateButtons();

    // Focus on current field
    setTimeout(() => {
        const currentInput = document.querySelector(`.form-field[data-index="${currentFieldIndex}"] input`);
        if (currentInput) currentInput.focus();
    }, 100);
}

// Update Progress Bar
function updateProgress() {
    const progress = ((currentFieldIndex + 1) / contractFields.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('current-step').textContent = currentFieldIndex + 1;
    document.getElementById('total-steps').textContent = contractFields.length;
}

// Update Button Visibility
function updateButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const reviewBtn = document.getElementById('review-btn');

    prevBtn.style.display = currentFieldIndex > 0 ? 'inline-block' : 'none';

    if (currentFieldIndex === contractFields.length - 1) {
        nextBtn.style.display = 'none';
        reviewBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        reviewBtn.style.display = 'none';
    }
}

// Navigate to Next Field
function nextField() {
    const currentField = contractFields[currentFieldIndex];
    const input = document.getElementById(currentField.id);

    // Validate required fields
    if (currentField.required && !input.value.trim()) {
        alert(`Please fill in: ${currentField.label}`);
        input.focus();
        return;
    }

    // Save data
    formData[currentField.id] = input.value;

    // Move to next field
    if (currentFieldIndex < contractFields.length - 1) {
        document.querySelector(`.form-field[data-index="${currentFieldIndex}"]`).style.display = 'none';
        currentFieldIndex++;
        document.querySelector(`.form-field[data-index="${currentFieldIndex}"]`).style.display = 'block';
        updateProgress();
        updateButtons();

        // Focus on new field
        setTimeout(() => {
            const newInput = document.querySelector(`.form-field[data-index="${currentFieldIndex}"] input`);
            if (newInput) newInput.focus();
        }, 100);
    }
}

// Navigate to Previous Field
function previousField() {
    if (currentFieldIndex > 0) {
        // Save current data
        const currentField = contractFields[currentFieldIndex];
        const input = document.getElementById(currentField.id);
        formData[currentField.id] = input.value;

        // Move to previous field
        document.querySelector(`.form-field[data-index="${currentFieldIndex}"]`).style.display = 'none';
        currentFieldIndex--;
        document.querySelector(`.form-field[data-index="${currentFieldIndex}"]`).style.display = 'block';
        updateProgress();
        updateButtons();

        // Focus on previous field
        setTimeout(() => {
            const prevInput = document.querySelector(`.form-field[data-index="${currentFieldIndex}"] input`);
            if (prevInput) prevInput.focus();
        }, 100);
    }
}

// Show Review Screen
function showReview() {
    const currentField = contractFields[currentFieldIndex];
    const input = document.getElementById(currentField.id);

    // Validate last field
    if (currentField.required && !input.value.trim()) {
        alert(`Please fill in: ${currentField.label}`);
        input.focus();
        return;
    }

    // Save last field data
    formData[currentField.id] = input.value;

    // Render review content
    const reviewContent = document.getElementById('review-content');
    reviewContent.innerHTML = '';

    contractFields.forEach(field => {
        if (formData[field.id]) {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            reviewItem.innerHTML = `
                <strong>${field.label}:</strong>
                <span>${formData[field.id]}</span>
            `;
            reviewContent.appendChild(reviewItem);
        }
    });

    showScreen('review-screen');
}

// Back to Form
function backToForm() {
    showScreen('form-screen');
}

// Start Over
function startOver() {
    if (confirm('Are you sure you want to start over? All entered data will be lost.')) {
        init();
    }
}

// Generate PDF Contract
async function generateContract() {
    try {
        // Show loading message
        const reviewBtn = document.querySelector('#review-screen .btn-primary');
        reviewBtn.textContent = 'Generating PDF...';
        reviewBtn.disabled = true;

        // Load the PDF template with form fields
        const { PDFDocument } = PDFLib;

        // Fetch the PDF template with form fields
        const existingPdfBytes = await fetch('contract-template-with-fields.pdf')
            .then(res => {
                if (!res.ok) throw new Error('Could not load PDF template. Please run add-form-fields.html first!');
                return res.arrayBuffer();
            });

        // Load the PDF
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const form = pdfDoc.getForm();

        // ========== FILL FORM FIELDS ==========

        // PAGE 1 - Tenant Information
        form.getTextField('effectiveDate').setText(formData.effectiveDate);
        form.getTextField('tenantName').setText(formData.tenantName);
        form.getTextField('tenantAddress').setText(formData.tenantAddress);
        form.getTextField('tenantCity').setText(formData.tenantCity);
        form.getTextField('tenantPhone').setText(formData.tenantPhone);
        form.getTextField('tenantEmail').setText(formData.tenantEmail);

        // PAGE 2 - Property and Lease Information

        // Property 1
        const property1Text = `(RR#407) ${formData.property1Address} – ${formData.property1Details}`;
        form.getTextField('property1').setText(property1Text);

        // Property 2 (if exists, otherwise use placeholder)
        const property2Text = formData.property2Address
            ? `(RR#499) ${formData.property2Address} – ${formData.property2Details}`
            : '(RR#499) ew – wr';
        form.getTextField('property2').setText(property2Text);

        // Total students and apartments
        const totalText = `TOTAL: ${formData.totalStudents} STUDENTS, ${formData.totalApartments} APARTMENTS`;
        form.getTextField('totalLine').setText(totalText);

        // Calculate nights
        const startDate = new Date(formData.leaseStartDate);
        const endDate = new Date(formData.leaseEndDate);
        const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

        // Clause 1 - Transitory Term
        const clause1Text = `1. Transitory Term. The lease term shall commence on ${formData.leaseStartDate} and shall terminate on ${formData.leaseEndDate} without any notice of cancellation.`;
        form.getTextField('clause1').setText(clause1Text);

        // Clause 2 - Rent
        const clause2Text = `2. Rent. The rent and related series as outlined in this rental agreement shall be the following: ${nights} nights at ${formData.rentPerNight} Euro per student, per night.`;
        form.getTextField('clause2').setText(clause2Text);

        // PAGE 4 - Security Deposit
        const clause9Text = `9. Security Deposit. The Tenant shall deposit with the Landlord Five Hundred EURO (€${formData.securityDeposit}) PER TENANT, receipt of which is hereby acknowledged by the Landlord, as security for any damage caused to the Premises, the furnishings, painting, household goods or other personal property of the Landlord during the term hereof. The deposit shall be returned to the Tenant within 60 days of the exit date from our San Diego office (tina@romarentals.net) without interest thereon, less any set-off for final exit bill balances, unpaid utilities, any damages and final exit cleaning and laundry fee upon termination of this Agreement.`;
        form.getTextField('clause9').setText(clause9Text);

        // PAGE 6 - Pet Cleaning Fee
        const clause18Text = `18. Animals/Pets. No animals or pets for possession in apartment during transitory stay without prior written consent from the Landlord. A non-refundable pet cleaning of €${formData.petCleaningFee} fee will be charged if violated.`;
        form.getTextField('clause18').setText(clause18Text);

        // Flatten the form (make fields non-editable)
        form.flatten();

        // Save the modified PDF
        const pdfBytes = await pdfDoc.save();

        // Download the PDF
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const fileName = `RomaRentals_Contract_${new Date().toISOString().split('T')[0]}.pdf`;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);

        // Show success screen
        document.getElementById('contract-date').textContent = new Date().toISOString().split('T')[0];
        showScreen('success-screen');

    } catch (error) {
        console.error('Error generating PDF:', error);

        let errorMessage = 'Error generating PDF:\n\n';

        if (error.message.includes('Could not load PDF template')) {
            errorMessage += '❌ Template file not found!\n\n';
            errorMessage += 'SOLUTION:\n';
            errorMessage += '1. Open: http://localhost:8000/add-form-fields.html\n';
            errorMessage += '2. Click "Add Form Fields to PDF"\n';
            errorMessage += '3. Save the downloaded file as:\n';
            errorMessage += '   contract-template-with-fields.pdf\n';
            errorMessage += '4. Put it in the same folder as index.html\n';
            errorMessage += '5. Try again!\n\n';
            errorMessage += 'See SETUP_INSTRUCTIONS.md for details.';
        } else {
            errorMessage += error.message + '\n\n';
            errorMessage += 'Check browser console (F12) for details.';
        }

        alert(errorMessage);

        const reviewBtn = document.querySelector('#review-screen .btn-primary');
        reviewBtn.textContent = 'Generate PDF Contract';
        reviewBtn.disabled = false;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
