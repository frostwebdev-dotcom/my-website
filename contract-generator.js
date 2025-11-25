// Helper function to convert numbers to words
function numberToWords(num) {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

    if (num === 0) return 'Zero';
    if (num < 10) return ones[num];
    if (num >= 10 && num < 20) return teens[num - 10];
    if (num >= 20 && num < 100) {
        return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + ones[num % 10] : '');
    }
    if (num >= 100 && num < 1000) {
        return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' ' + numberToWords(num % 100) : '');
    }
    if (num >= 1000) {
        return ones[Math.floor(num / 1000)] + ' Thousand' + (num % 1000 !== 0 ? ' ' + numberToWords(num % 1000) : '');
    }
    return num.toString();
}

// Contract fields organized by tabs
const contractFields = {
    'Contract Date': [
        { id: 'contract_date', label: 'Contract Date', type: 'date', required: true, help: 'Date this contract is made effective (e.g., 18 November 2025)' },
    ],

    'Owner Info': [
        { id: 'owner_apt_number', label: 'Apartment Number', type: 'text', required: true, help: 'e.g., RR#407' },
        { id: 'owner_name', label: 'Owner Name', type: 'text', required: true, help: 'e.g., M. Rifrigeri' },
        { id: 'owner_apt_number_2', label: 'Apartment Number 2 (Optional)', type: 'text', required: false, help: 'For second owner, e.g., RR#499' },
        { id: 'owner_name_2', label: 'Owner Name 2 (Optional)', type: 'text', required: false, help: 'For second owner, e.g., S. Ivarone' },
    ],

    'Tenant Info': [
        { id: 'tenant_organization', label: 'Organization (Optional)', type: 'text', required: false, help: 'e.g., University of Notre Dame' },
        { id: 'tenant_address_line1', label: 'Address Line 1', type: 'text', required: true, help: 'e.g., 1 Walsh Family Hall of Architecture' },
        { id: 'tenant_address_line2', label: 'Address Line 2', type: 'text', required: true, help: 'e.g., Notre Dame, IN 46556 USA' },
        { id: 'tenant_phone', label: 'Phone Number', type: 'tel', required: true, help: 'e.g., +1 574 631 9033' },
        { id: 'tenant_email', label: 'Email', type: 'email', required: true, help: 'e.g., jhoover1@nd.edu' },
        { id: 'tenant_additional_info', label: 'Additional Info (Optional)', type: 'textarea', required: false, help: 'Any extra tenant information' },
    ],

    'Lease Details': [
        { id: 'lease_start_date', label: 'Lease Start Date', type: 'date', required: true, help: 'When does the lease begin?' },
        { id: 'lease_end_date', label: 'Lease End Date', type: 'date', required: true, help: 'When does the lease end?' },
        { id: 'total_nights', label: 'Total Nights', type: 'number', calculated: true, help: 'Auto-calculated from dates' },
    ],
    
    'Apartment Details': [
        { id: 'apt1_number', label: 'Apartment 1 Number', type: 'text', required: true, help: 'e.g., RR#407' },
        { id: 'apt1_address', label: 'Apartment 1 Address', type: 'textarea', required: true, help: 'e.g., Via Roma Libera 23, Int. 9, 00153 Rome, Italy' },
        { id: 'apt1_bedrooms', label: 'Apartment 1 Bedrooms', type: 'number', required: true },
        { id: 'apt1_bathrooms', label: 'Apartment 1 Bathrooms', type: 'number', required: true },
        { id: 'apt1_students', label: 'Apartment 1 Students', type: 'number', required: true },

        { id: 'apt2_number', label: 'Apartment 2 Number (Optional)', type: 'text', required: false, help: 'e.g., RR#499' },
        { id: 'apt2_address', label: 'Apartment 2 Address (Optional)', type: 'textarea', required: false, help: 'e.g., Viale di Trastevere 66, Scala E, Int. 8, 00153 Rome, Italy' },
        { id: 'apt2_bedrooms', label: 'Apartment 2 Bedrooms', type: 'number', required: false },
        { id: 'apt2_bathrooms', label: 'Apartment 2 Bathrooms', type: 'number', required: false },
        { id: 'apt2_students', label: 'Apartment 2 Students', type: 'number', required: false },

        { id: 'apt3_number', label: 'Apartment 3 Number (Optional)', type: 'text', required: false },
        { id: 'apt3_address', label: 'Apartment 3 Address (Optional)', type: 'textarea', required: false },
        { id: 'apt3_bedrooms', label: 'Apartment 3 Bedrooms', type: 'number', required: false },
        { id: 'apt3_bathrooms', label: 'Apartment 3 Bathrooms', type: 'number', required: false },
        { id: 'apt3_students', label: 'Apartment 3 Students', type: 'number', required: false },

        { id: 'total_students', label: 'Total Students', type: 'number', calculated: true, help: 'Auto-calculated from apartments' },
        { id: 'total_apartments', label: 'Total Apartments', type: 'number', calculated: true, help: 'Auto-calculated' },
    ],
    
    'Rent & Payment': [
        { id: 'rent_per_student_per_night', label: 'Rent Per Student Per Night (Euro)', type: 'number', required: true, help: 'e.g., 80.00' },
        { id: 'rent_series', label: 'Rent Series (Euro)', type: 'number', required: true, help: 'e.g., 122' },
        { id: 'total_rent', label: 'Total Rent', type: 'number', calculated: true, help: 'Auto-calculated' },
        { id: 'payment_method', label: 'Payment Method', type: 'select', options: ['Bank Transfer', 'Credit Card', 'PayPal', 'Cash', 'Check'], required: true },
        { id: 'payment_due_date', label: 'Payment Due Date', type: 'date', required: true },
    ],
    
    'Security Deposit': [
        { id: 'security_deposit_per_tenant', label: 'Security Deposit Per Tenant (€)', type: 'number', required: true, help: 'e.g., 500.00' },
        { id: 'security_deposit_total', label: 'Total Security Deposit (€)', type: 'number', calculated: true, help: 'Auto-calculated: deposit × total students' },
        { id: 'deposit_return_days', label: 'Days to Return Deposit', type: 'number', required: true, help: 'e.g., 60 days after lease ends' },
    ],
    
    'Utilities & Costs': [
        { id: 'electricity_rate_per_m2', label: 'Electricity Rate (€ per m²)', type: 'number', required: true, help: 'e.g., 0.50' },
        { id: 'gas_rate_per_m2', label: 'Gas Rate (€ per m²)', type: 'number', required: true, help: 'e.g., 1.48' },
        { id: 'utility_payment_days', label: 'Utility Payment Period (days)', type: 'number', required: true, help: 'e.g., 44 days' },
        { id: 'wifi_provided', label: 'WiFi Provided', type: 'select', options: ['Yes - Included', 'Yes - Additional Cost', 'No'], required: true },
        { id: 'wifi_cost', label: 'WiFi Cost (if applicable)', type: 'number', required: false, help: 'Monthly WiFi cost' },
        { id: 'cleaning_included', label: 'Cleaning Included', type: 'select', options: ['Yes - Included', 'Yes - Additional Cost', 'No'], required: true },
        { id: 'cleaning_cost', label: 'Cleaning Cost (if applicable)', type: 'number', required: false, help: 'Cleaning fee amount' },
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

    'Signature Information': [
        { id: 'tenant_rep_name', label: 'Tenant Representative Name', type: 'text', required: true, help: 'e.g., Jennifer Hoover, Director of Finance & Operations' },
        { id: 'tenant_rep_organization', label: 'Tenant Organization/School', type: 'text', required: true, help: 'e.g., University of Notre Dame' },
        { id: 'additional_signature_1_name', label: 'Additional Signature 1 (Optional)', type: 'text', required: false, help: 'Leave blank if not needed' },
        { id: 'additional_signature_1_org', label: 'Additional Signature 1 Organization', type: 'text', required: false },
        { id: 'additional_signature_2_name', label: 'Additional Signature 2 (Optional)', type: 'text', required: false, help: 'Leave blank if not needed' },
        { id: 'additional_signature_2_org', label: 'Additional Signature 2 Organization', type: 'text', required: false },
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
        const nightsField = document.getElementById('total_nights');
        if (nightsField) nightsField.value = nights;
    }

    // Calculate total students and apartments
    let totalStudents = 0;
    let totalApartments = 0;

    if (formData.apt1_students) {
        totalStudents += parseInt(formData.apt1_students) || 0;
        totalApartments++;
    }
    if (formData.apt2_students) {
        totalStudents += parseInt(formData.apt2_students) || 0;
        totalApartments++;
    }
    if (formData.apt3_students) {
        totalStudents += parseInt(formData.apt3_students) || 0;
        totalApartments++;
    }

    formData.total_students = totalStudents;
    formData.total_apartments = totalApartments;

    const studentsField = document.getElementById('total_students');
    const apartmentsField = document.getElementById('total_apartments');
    if (studentsField) studentsField.value = totalStudents;
    if (apartmentsField) apartmentsField.value = totalApartments;

    // Calculate total rent
    const nights = formData.total_nights;
    const rentPerStudentPerNight = formData.rent_per_student_per_night;

    if (nights && rentPerStudentPerNight && totalStudents) {
        const totalRent = nights * rentPerStudentPerNight * totalStudents;
        formData.total_rent = totalRent;
        const totalRentField = document.getElementById('total_rent');
        if (totalRentField) totalRentField.value = totalRent.toFixed(2);
    }

    // Calculate total security deposit
    const depositPerTenant = formData.security_deposit_per_tenant;

    if (depositPerTenant && totalStudents) {
        const totalDeposit = depositPerTenant * totalStudents;
        formData.security_deposit_total = totalDeposit;
        const totalDepositField = document.getElementById('security_deposit_total');
        if (totalDepositField) totalDepositField.value = totalDeposit.toFixed(2);
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

        // Prepare data with auto-generated fields
        const contractData = { ...formData };

        // Generate WiFi info based on selection
        if (contractData.wifi_provided === 'Yes - Included') {
            contractData.wifi_info = 'The Landlord will be providing Wi-Fi connectivity in each apartment at no additional cost. The Tenant will be given a password to access the network at check-in.';
        } else if (contractData.wifi_provided === 'Yes - Additional Cost') {
            contractData.wifi_info = `Wi-Fi is available for an additional cost of €${contractData.wifi_cost || '0'} per month.`;
        } else {
            contractData.wifi_info = 'Wi-Fi is not provided by the Landlord.';
        }

        // Generate Cleaning info based on selection
        if (contractData.cleaning_included === 'Yes - Included') {
            contractData.cleaning_info = 'Cleaning services are included in the rental fee.';
        } else if (contractData.cleaning_included === 'Yes - Additional Cost') {
            contractData.cleaning_info = `Cleaning services are available for an additional cost of €${contractData.cleaning_cost || '0'}.`;
        } else {
            contractData.cleaning_info = 'Cleaning is the responsibility of the tenant.';
        }

        // Generate Security Deposit text
        const depositAmount = parseFloat(contractData.security_deposit_per_tenant) || 0;
        const depositAmountInt = Math.floor(depositAmount);
        const depositAmountWords = numberToWords(depositAmountInt);
        contractData.security_deposit_text = `${depositAmountWords} EURO (€${depositAmount.toFixed(2)}) PER TENANT`;

        // Ensure ALL optional fields have default values (empty string instead of undefined)
        // This prevents "Multi error" from Docxtemplater when fields are missing

        // Owner Info - Optional second owner
        contractData.owner_apt_number_2 = contractData.owner_apt_number_2 || '';
        contractData.owner_name_2 = contractData.owner_name_2 || '';

        // Tenant Info - Optional fields
        contractData.tenant_organization = contractData.tenant_organization || '';
        contractData.tenant_additional_info = contractData.tenant_additional_info || '';

        // Apartment Details - Optional apartments 2 and 3
        contractData.apt2_number = contractData.apt2_number || '';
        contractData.apt2_address = contractData.apt2_address || '';
        contractData.apt2_bedrooms = contractData.apt2_bedrooms || '';
        contractData.apt2_bathrooms = contractData.apt2_bathrooms || '';
        contractData.apt2_students = contractData.apt2_students || '';

        contractData.apt3_number = contractData.apt3_number || '';
        contractData.apt3_address = contractData.apt3_address || '';
        contractData.apt3_bedrooms = contractData.apt3_bedrooms || '';
        contractData.apt3_bathrooms = contractData.apt3_bathrooms || '';
        contractData.apt3_students = contractData.apt3_students || '';

        // Utilities - Optional costs
        contractData.wifi_cost = contractData.wifi_cost || '';
        contractData.cleaning_cost = contractData.cleaning_cost || '';

        // Rules - Optional fields
        contractData.quiet_hours = contractData.quiet_hours || '';
        contractData.additional_rules = contractData.additional_rules || '';

        // Signature - Optional additional signatures
        contractData.additional_signature_1_name = contractData.additional_signature_1_name || '';
        contractData.additional_signature_1_org = contractData.additional_signature_1_org || '';
        contractData.additional_signature_2_name = contractData.additional_signature_2_name || '';
        contractData.additional_signature_2_org = contractData.additional_signature_2_org || '';

        console.log('Setting data to template...');
        console.log('Contract data keys:', Object.keys(contractData));
        console.log('Contract data:', contractData);

        doc.setData(contractData);

        console.log('Rendering document...');
        try {
            doc.render();
        } catch (renderError) {
            console.error('Render error details:', renderError);
            if (renderError.properties && renderError.properties.errors) {
                console.error('Specific errors:', renderError.properties.errors);
                const errorMessages = renderError.properties.errors.map(e =>
                    `Field: ${e.properties.id || 'unknown'}\nReason: ${e.message}`
                ).join('\n\n');
                throw new Error(`Template rendering failed:\n\n${errorMessages}`);
            }
            throw renderError;
        }

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
        console.error('Error stack:', error.stack);

        let errorMsg = 'Error generating contract: ' + error.message;

        // Check if it's a template error
        if (error.properties && error.properties.errors) {
            errorMsg += '\n\nTemplate errors found:\n';
            error.properties.errors.forEach((err, index) => {
                errorMsg += `\n${index + 1}. ${err.message}`;
                if (err.properties && err.properties.id) {
                    errorMsg += ` (Field: ${err.properties.id})`;
                }
            });
        }

        errorMsg += '\n\nPlease check the browser console (F12) for more details.';
        alert(errorMsg);
    }

    btn.disabled = false;
    btn.textContent = '📄 Generate Contract';
}

