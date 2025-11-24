// Contract fields organized by tabs
const contractFields = {
    'Lease Details': [
        { id: 'lease_start_date', label: 'Lease Start Date', type: 'date', required: true, help: 'When does the lease begin?' },
        { id: 'lease_end_date', label: 'Lease End Date', type: 'date', required: true, help: 'When does the lease end?' },
        { id: 'total_nights', label: 'Total Nights', type: 'number', calculated: true, help: 'Auto-calculated from dates' },
        { id: 'contract_date', label: 'Contract Date', type: 'date', required: true, help: 'Date this contract is created' },
    ],
    
    'Landlord Info': [
        { id: 'landlord_name', label: 'Landlord Name', type: 'text', required: true, help: 'Full legal name' },
        { id: 'landlord_address_usa', label: 'USA Office Address', type: 'textarea', required: true, help: 'Complete USA address' },
        { id: 'landlord_address_italy', label: 'Italy Office Address', type: 'textarea', required: false, help: 'Complete Italy address (if applicable)' },
        { id: 'landlord_phone', label: 'Phone Number', type: 'tel', required: true },
        { id: 'landlord_email', label: 'Email', type: 'email', required: true },
    ],
    
    'Tenant Info': [
        { id: 'tenant_name', label: 'Tenant Name', type: 'text', required: true, help: 'Full legal name' },
        { id: 'tenant_email', label: 'Email', type: 'email', required: true },
        { id: 'tenant_phone', label: 'Phone Number', type: 'tel', required: true },
        { id: 'tenant_passport', label: 'Passport Number', type: 'text', required: false },
        { id: 'tenant_address', label: 'Home Address', type: 'textarea', required: true },
    ],
    
    'Property Details': [
        { id: 'property_address', label: 'Property Address', type: 'textarea', required: true, help: 'Complete rental property address' },
        { id: 'property_type', label: 'Property Type', type: 'select', options: ['Apartment', 'House', 'Condo', 'Studio'], required: true },
        { id: 'bedrooms', label: 'Bedrooms', type: 'number', required: true },
        { id: 'bathrooms', label: 'Bathrooms', type: 'number', required: true },
        { id: 'max_occupants', label: 'Maximum Occupants', type: 'number', required: true },
    ],
    
    'Rent & Payment': [
        { id: 'rent_per_night', label: 'Rent Per Night', type: 'number', required: true, help: 'Nightly rental rate' },
        { id: 'total_rent', label: 'Total Rent', type: 'number', calculated: true, help: 'Auto-calculated: nights × rate' },
        { id: 'payment_method', label: 'Payment Method', type: 'select', options: ['Bank Transfer', 'Credit Card', 'PayPal', 'Cash', 'Check'], required: true },
        { id: 'payment_due_date', label: 'Payment Due Date', type: 'date', required: true },
    ],
    
    'Security Deposit': [
        { id: 'security_deposit', label: 'Security Deposit Amount', type: 'number', required: true },
        { id: 'deposit_due_date', label: 'Deposit Due Date', type: 'date', required: true },
        { id: 'deposit_return_days', label: 'Days to Return Deposit', type: 'number', required: true, help: 'After lease ends' },
    ],
    
    'Utilities & Services': [
        { id: 'utilities_included', label: 'Utilities Included', type: 'checkbox', help: 'Check if utilities are included in rent' },
        { id: 'wifi_included', label: 'WiFi Included', type: 'checkbox' },
        { id: 'parking_included', label: 'Parking Included', type: 'checkbox' },
        { id: 'cleaning_fee', label: 'Cleaning Fee', type: 'number', required: false },
    ],
    
    'Rules & Policies': [
        { id: 'pets_allowed', label: 'Pets Allowed', type: 'checkbox' },
        { id: 'smoking_allowed', label: 'Smoking Allowed', type: 'checkbox' },
        { id: 'quiet_hours', label: 'Quiet Hours', type: 'text', help: 'e.g., 10 PM - 8 AM' },
        { id: 'additional_rules', label: 'Additional Rules', type: 'textarea', help: 'Any other house rules' },
    ],
    
    'Emergency Contacts': [
        { id: 'emergency_contact_name', label: 'Emergency Contact Name', type: 'text', required: true },
        { id: 'emergency_contact_phone', label: 'Emergency Contact Phone', type: 'tel', required: true },
        { id: 'emergency_contact_relation', label: 'Relationship', type: 'text', required: true },
    ],
};

// Form data storage
let formData = {};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeForm();
    loadSavedData();
});

// Initialize form
function initializeForm() {
    const tabsContainer = document.getElementById('tabs');
    const contentsContainer = document.getElementById('tabContents');
    
    let isFirst = true;
    
    Object.keys(contractFields).forEach((tabName, index) => {
        // Create tab button
        const tab = document.createElement('button');
        tab.className = 'tab' + (isFirst ? ' active' : '');
        tab.textContent = tabName;
        tab.onclick = () => switchTab(index);
        tabsContainer.appendChild(tab);
        
        // Create tab content
        const content = document.createElement('div');
        content.className = 'tab-content' + (isFirst ? ' active' : '');
        content.id = `tab-${index}`;
        
        // Add fields
        contractFields[tabName].forEach(field => {
            const formGroup = createFormField(field);
            content.appendChild(formGroup);
        });
        
        contentsContainer.appendChild(content);
        isFirst = false;
    });
}

// Create form field
function createFormField(field) {
    const div = document.createElement('div');
    div.className = 'form-group';
    
    const label = document.createElement('label');
    label.textContent = field.label;
    if (field.required) {
        label.innerHTML += ' <span class="required">*</span>';
    }
    div.appendChild(label);
    
    let input;
    
    if (field.type === 'textarea') {
        input = document.createElement('textarea');
        input.rows = 3;
    } else if (field.type === 'select') {
        input = document.createElement('select');
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '-- Select --';
        input.appendChild(defaultOption);
        
        field.options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt;
            option.textContent = opt;
            input.appendChild(option);
        });
    } else if (field.type === 'checkbox') {
        input = document.createElement('input');
        input.type = 'checkbox';
    } else {
        input = document.createElement('input');
        input.type = field.type || 'text';
    }
    
    input.id = field.id;
    input.name = field.id;
    
    if (field.calculated) {
        input.disabled = true;
        input.className = 'calculated';
    }
    
    // Event listener
    input.addEventListener('change', () => {
        if (field.type === 'checkbox') {
            formData[field.id] = input.checked;
        } else {
            formData[field.id] = input.value;
        }
        calculateFields();
        saveData();
    });
    
    div.appendChild(input);
    
    if (field.help) {
        const small = document.createElement('small');
        small.textContent = field.help;
        div.appendChild(small);
    }
    
    return div;
}

// Switch tab
function switchTab(index) {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });
    
    contents.forEach((content, i) => {
        content.classList.toggle('active', i === index);
    });
}

// Calculate fields
function calculateFields() {
    // Calculate total nights
    const startDate = formData.lease_start_date;
    const endDate = formData.lease_end_date;
    
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        formData.total_nights = nights;
        document.getElementById('total_nights').value = nights;
    }
    
    // Calculate total rent
    const nights = formData.total_nights;
    const rentPerNight = formData.rent_per_night;
    
    if (nights && rentPerNight) {
        const totalRent = nights * rentPerNight;
        formData.total_rent = totalRent;
        document.getElementById('total_rent').value = totalRent.toFixed(2);
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('contractData', JSON.stringify(formData));
}

// Load saved data
function loadSavedData() {
    const saved = localStorage.getItem('contractData');
    if (saved) {
        formData = JSON.parse(saved);
        
        // Populate form
        Object.keys(formData).forEach(key => {
            const input = document.getElementById(key);
            if (input) {
                if (input.type === 'checkbox') {
                    input.checked = formData[key];
                } else {
                    input.value = formData[key];
                }
            }
        });
    }
}

// Generate contract
async function generateContract() {
    console.log('=== Generate Contract Called ===');
    console.log('PizZip available:', typeof PizZip !== 'undefined');
    console.log('Docxtemplater available:', typeof Docxtemplater !== 'undefined' || typeof docxtemplater !== 'undefined');

    // Check if libraries are loaded
    if (typeof PizZip === 'undefined') {
        alert('Error generating contract: PizZip is not defined\n\nMake sure the template file is in the same folder and has merge fields like {landlord_name}');
        return;
    }

    const DocxTemplater = typeof Docxtemplater !== 'undefined' ? Docxtemplater : docxtemplater;
    if (typeof DocxTemplater === 'undefined') {
        alert('Error generating contract: Docxtemplater is not defined\n\nPlease refresh the page and try again.');
        return;
    }

    // Validate required fields
    const missing = [];
    Object.keys(contractFields).forEach(tabName => {
        contractFields[tabName].forEach(field => {
            if (field.required && !formData[field.id]) {
                missing.push(field.label);
            }
        });
    });

    if (missing.length > 0) {
        alert('Please fill in the following required fields:\n\n' + missing.join('\n'));
        return;
    }

    const btn = document.getElementById('generateBtn');
    btn.disabled = true;
    btn.textContent = 'Generating...';

    try {
        console.log('Loading template file...');

        // Load template
        const response = await fetch('ND FALL 2026 - CONTRACT - 9 Jan 2026 - 11 May 2026 (1).docx');

        if (!response.ok) {
            throw new Error('Template file not found. Make sure "ND FALL 2026 - CONTRACT - 9 Jan 2026 - 11 May 2026 (1).docx" is in the same folder.');
        }

        const templateBuffer = await response.arrayBuffer();
        console.log('Template loaded, size:', templateBuffer.byteLength);

        // Load with PizZip
        console.log('Creating PizZip...');
        const zip = new PizZip(templateBuffer);

        console.log('Creating Docxtemplater...');
        const doc = new DocxTemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        console.log('Setting data...');
        console.log('Form data:', formData);
        doc.setData(formData);

        console.log('Rendering document...');
        doc.render();

        console.log('Generating blob...');
        const blob = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        console.log('Downloading...');
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Contract-${formData.tenant_name || 'New'}-${new Date().toISOString().split('T')[0]}.docx`;
        a.click();
        URL.revokeObjectURL(url);

        alert('✅ Contract generated successfully!');

    } catch (error) {
        console.error('Error:', error);
        alert('Error generating contract: ' + error.message + '\n\nMake sure the template file is in the same folder and has merge fields like {landlord_name}');
    }

    btn.disabled = false;
    btn.textContent = '📄 Generate Contract';
}

