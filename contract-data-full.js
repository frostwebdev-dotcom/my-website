// Comprehensive Contract Data Structure with Tabs
// All fields organized by logical sections

const contractTabs = [
    {
        id: 'lease-details',
        name: 'Lease Details',
        icon: '📋',
        fields: [
            {
                id: 'creation_effective_date',
                label: 'Contract Effective Date',
                type: 'date',
                required: true,
                editFrequency: 'as-needed',
                defaultValue: () => new Date().toISOString().split('T')[0],
                help: 'Date when this contract becomes effective'
            },
            {
                id: 'lease_start_date',
                label: 'Lease Start Date',
                type: 'date',
                required: true,
                editFrequency: 'every-time',
                section: 'Section 1',
                help: 'First day of the lease term'
            },
            {
                id: 'lease_end_date',
                label: 'Lease End Date',
                type: 'date',
                required: true,
                editFrequency: 'every-time',
                section: 'Section 1',
                help: 'Last day of the lease term'
            },
            {
                id: 'nights_total',
                label: 'Total Nights',
                type: 'number',
                required: true,
                editFrequency: 'every-time',
                calculated: true,
                calculation: (data) => {
                    if (data.lease_start_date && data.lease_end_date) {
                        const start = new Date(data.lease_start_date);
                        const end = new Date(data.lease_end_date);
                        return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                    }
                    return 0;
                },
                help: 'Automatically calculated from start and end dates'
            }
        ]
    },
    {
        id: 'parties',
        name: 'Parties (Landlord/Owner/Tenant)',
        icon: '👥',
        fields: [
            {
                id: 'landlord_name',
                label: 'Landlord Name',
                type: 'text',
                required: true,
                editFrequency: 'rarely',
                defaultValue: 'Roma Rentals SPQR',
                help: 'Legal name of the landlord entity'
            },
            {
                id: 'landlord_office_USA_address',
                label: 'Landlord USA Office Address',
                type: 'textarea',
                required: true,
                editFrequency: 'rarely',
                defaultValue: '1252 Hornblend Street\nSan Diego, CA 92109\nUSA',
                help: 'USA office address for correspondence'
            },
            {
                id: 'landlord_office_Italy_address',
                label: 'Landlord Italy Office Address',
                type: 'textarea',
                required: true,
                editFrequency: 'rarely',
                defaultValue: 'Via Otranto, 8\n00192 Roma\nItaly',
                help: 'Italy office address for local matters'
            },
            {
                id: 'owner_RR407_name',
                label: 'Owner Name (RR#407)',
                type: 'text',
                required: false,
                editFrequency: 'when-differs',
                defaultValue: '',
                help: 'Property owner name if different from landlord'
            },
            {
                id: 'owner_RR499_name',
                label: 'Owner Name (RR#499)',
                type: 'text',
                required: false,
                editFrequency: 'when-differs',
                defaultValue: '',
                help: 'Property owner name if different from landlord'
            },
            {
                id: 'tenant_org_name',
                label: 'Tenant Organization Name',
                type: 'text',
                required: true,
                editFrequency: 'every-time',
                placeholder: 'University of Notre Dame',
                help: 'Full legal name of the tenant organization'
            },
            {
                id: 'tenant_org_address',
                label: 'Tenant Organization Address',
                type: 'textarea',
                required: true,
                editFrequency: 'every-time',
                placeholder: '123 University Drive\nNotre Dame, IN 46556\nUSA',
                help: 'Full mailing address of tenant organization'
            },
            {
                id: 'tenant_contact_name',
                label: 'Tenant Contact Name',
                type: 'text',
                required: true,
                editFrequency: 'every-time',
                placeholder: 'John Smith',
                help: 'Primary contact person for this lease'
            },
            {
                id: 'tenant_contact_email',
                label: 'Tenant Contact Email',
                type: 'email',
                required: true,
                editFrequency: 'every-time',
                placeholder: 'contact@university.edu',
                help: 'Email address for lease communications'
            },
            {
                id: 'tenant_contact_phone',
                label: 'Tenant Contact Phone',
                type: 'tel',
                required: true,
                editFrequency: 'every-time',
                placeholder: '+1-555-123-4567',
                help: 'Phone number for urgent matters'
            }
        ]
    },
    {
        id: 'premises',
        name: 'Premises (Addresses & Units)',
        icon: '🏠',
        fields: [
            {
                id: 'premises_1_address',
                label: 'Property 1 Address (RR#407)',
                type: 'text',
                required: true,
                editFrequency: 'when-booking-different',
                placeholder: 'Via Example 1, 00100 Roma',
                help: 'Full street address of first property'
            },
            {
                id: 'premises_1_unit_description',
                label: 'Property 1 Unit Description',
                type: 'text',
                required: true,
                editFrequency: 'when-booking-different',
                placeholder: '2 STUDENTS (2 Bedrooms, 1 Bathroom)',
                help: 'Capacity and layout details'
            },
            {
                id: 'premises_2_address',
                label: 'Property 2 Address (RR#499)',
                type: 'text',
                required: false,
                editFrequency: 'when-booking-different',
                placeholder: 'Via Example 2, 00100 Roma',
                help: 'Full street address of second property (if applicable)'
            },
            {
                id: 'premises_2_unit_description',
                label: 'Property 2 Unit Description',
                type: 'text',
                required: false,
                editFrequency: 'when-booking-different',
                placeholder: '3 STUDENTS (3 Bedrooms, 2 Bathrooms)',
                help: 'Capacity and layout details'
            }
        ]
    },
    {
        id: 'occupancy',
        name: 'Occupancy & Counts',
        icon: '👨‍👩‍👧‍👦',
        fields: [
            {
                id: 'total_students',
                label: 'Total Students',
                type: 'number',
                required: true,
                editFrequency: 'every-time',
                calculated: true,
                calculation: (data) => {
                    // Auto-calculate from unit descriptions if possible
                    let total = 0;
                    if (data.premises_1_unit_description) {
                        const match = data.premises_1_unit_description.match(/(\d+)\s+STUDENTS/);
                        if (match) total += parseInt(match[1]);
                    }
                    if (data.premises_2_unit_description) {
                        const match = data.premises_2_unit_description.match(/(\d+)\s+STUDENTS/);
                        if (match) total += parseInt(match[1]);
                    }
                    return total || data.total_students || 0;
                },
                help: 'Total number of students across all properties'
            },
            {
                id: 'total_apartments',
                label: 'Total Apartments',
                type: 'number',
                required: true,
                editFrequency: 'every-time',
                defaultValue: 1,
                help: 'Total number of apartment units'
            }
        ]
    },
    {
        id: 'rent',
        name: 'Rent & Payment Calculations',
        icon: '💰',
        fields: [
            {
                id: 'nightly_rate_per_student',
                label: 'Nightly Rate Per Student (EUR)',
                type: 'currency',
                required: true,
                editFrequency: 'when-rate-changes',
                defaultValue: 80.00,
                section: 'Section 2',
                help: 'Rate charged per student per night'
            },
            {
                id: 'rent_total',
                label: 'Total Rent (EUR)',
                type: 'currency',
                required: true,
                editFrequency: 'auto',
                calculated: true,
                calculation: (data) => {
                    const nights = data.nights_total || 0;
                    const rate = data.nightly_rate_per_student || 0;
                    const students = data.total_students || 0;
                    return nights * rate * students;
                },
                help: 'Automatically calculated: nights × rate × students'
            }
        ]
    },
    {
        id: 'furnishings',
        name: 'Furnishings & Inventory',
        icon: '🛋️',
        fields: [
            {
                id: 'furnishings_included',
                label: 'Furnishings Included',
                type: 'textarea',
                required: true,
                editFrequency: 'when-differs',
                defaultValue: 'Beds, linens, towels, kitchen appliances, dishes, cookware, Wi-Fi router, cleaning supplies',
                section: 'Section 3',
                help: 'List of all furnishings and items included'
            },
            {
                id: 'inventory_photo_check',
                label: 'Inventory Photo Check Link',
                type: 'url',
                required: false,
                editFrequency: 'per-stay',
                placeholder: 'https://photos.romarentals.net/checkin/...',
                help: 'Link to photo inventory for check-in/out'
            },
            {
                id: 'missing_item_fee_table',
                label: 'Missing Item Fee Schedule',
                type: 'textarea',
                required: false,
                editFrequency: 'rarely',
                defaultValue: 'Missing linens: €20 each\nMissing towels: €10 each\nMissing duvets: €50 each\nMissing kitchenware: €5-30 per item',
                help: 'Fee schedule for missing or damaged items'
            }
        ]
    },
    {
        id: 'utilities',
        name: 'Utilities & Wi-Fi',
        icon: '💡',
        fields: [
            {
                id: 'utilities_include_electricity',
                label: 'Electricity Included',
                type: 'checkbox',
                required: false,
                editFrequency: 'rarely',
                defaultValue: false,
                help: 'Check if electricity is included in rent'
            },
            {
                id: 'electricity_rate_per_kw',
                label: 'Electricity Rate (EUR per kWh)',
                type: 'currency',
                required: false,
                editFrequency: 'when-rate-changes',
                defaultValue: 0.49,
                help: 'Rate charged for electricity if not included'
            },
            {
                id: 'gas_rate_per_m2',
                label: 'Gas Rate (EUR per m³)',
                type: 'currency',
                required: false,
                editFrequency: 'when-rate-changes',
                defaultValue: 1.48,
                help: 'Rate charged for gas usage'
            }
        ]
    },
    {
        id: 'utilities-continued',
        name: 'Utilities (continued)',
        icon: '💡',
        fields: [
            {
                id: 'utilities_billing_method',
                label: 'Utilities Billing Method',
                type: 'select',
                required: true,
                editFrequency: 'rarely',
                defaultValue: 'billed-at-end',
                options: [
                    { value: 'billed-at-end', label: 'Billed at end of stay' },
                    { value: 'meter-reading', label: 'Based on meter reading' },
                    { value: 'included', label: 'Included in rent' },
                    { value: 'flat-fee', label: 'Flat monthly fee' }
                ],
                help: 'How utilities are calculated and billed'
            },
            {
                id: 'utilities_invoice_due_days',
                label: 'Utility Invoice Due (Days)',
                type: 'number',
                required: false,
                editFrequency: 'rarely',
                defaultValue: 14,
                help: 'Number of days to pay utility invoices'
            },
            {
                id: 'wifi_provided',
                label: 'Wi-Fi Provided',
                type: 'checkbox',
                required: false,
                editFrequency: 'rarely',
                defaultValue: true,
                help: 'Check if Wi-Fi is provided'
            },
            {
                id: 'wifi_password',
                label: 'Wi-Fi Password',
                type: 'text',
                required: false,
                editFrequency: 'per-stay',
                placeholder: 'Enter Wi-Fi password',
                help: 'Wi-Fi password for this property'
            }
        ]
    },
    {
        id: 'rules',
        name: 'Rules & Optional Clauses',
        icon: '📜',
        fields: [
            {
                id: 'use_of_premises_clause_editable',
                label: 'Use of Premises Clause',
                type: 'textarea',
                required: false,
                editFrequency: 'when-differs',
                defaultValue: 'The Premises shall be used and occupied by the Tenant exclusively as a private residence for the students listed. No business or commercial use is permitted.',
                help: 'Editable clause about permitted use of property'
            },
            {
                id: 'smoking_allowed',
                label: 'Smoking Allowed',
                type: 'checkbox',
                required: false,
                editFrequency: 'rarely',
                defaultValue: false,
                section: 'Section 17',
                help: 'Check if smoking is permitted'
            },
            {
                id: 'smoking_penalty_fee',
                label: 'Smoking Penalty Fee (EUR)',
                type: 'currency',
                required: false,
                editFrequency: 'when-differs',
                defaultValue: 500.00,
                help: 'Fee charged if smoking policy is violated'
            },
            {
                id: 'pets_allowed',
                label: 'Pets Allowed',
                type: 'checkbox',
                required: false,
                editFrequency: 'per-stay',
                defaultValue: false,
                section: 'Section 18',
                help: 'Check if pets are permitted'
            },
            {
                id: 'pet_fee_nonrefundable',
                label: 'Pet Cleaning Fee (EUR)',
                type: 'currency',
                required: false,
                editFrequency: 'when-differs',
                defaultValue: 500.00,
                section: 'Section 18',
                help: 'Non-refundable pet cleaning fee if violated'
            },
            {
                id: 'sublet_allowed',
                label: 'Subletting Allowed',
                type: 'checkbox',
                required: false,
                editFrequency: 'rarely',
                defaultValue: false,
                section: 'Section 19',
                help: 'Check if subletting is permitted'
            }
        ]
    },
    {
        id: 'security-deposit',
        name: 'Security Deposit & Return',
        icon: '🔒',
        fields: [
            {
                id: 'security_deposit_per_tenant',
                label: 'Security Deposit Per Tenant (EUR)',
                type: 'currency',
                required: true,
                editFrequency: 'when-differs',
                defaultValue: 500.00,
                section: 'Section 9',
                help: 'Security deposit amount per tenant'
            },
            {
                id: 'security_deposit_total',
                label: 'Total Security Deposit (EUR)',
                type: 'currency',
                required: true,
                editFrequency: 'auto',
                calculated: true,
                calculation: (data) => {
                    const perTenant = data.security_deposit_per_tenant || 0;
                    const students = data.total_students || 0;
                    return perTenant * students;
                },
                help: 'Automatically calculated: deposit per tenant × total students'
            },
            {
                id: 'deposit_return_contact_email',
                label: 'Deposit Return Contact Email',
                type: 'email',
                required: true,
                editFrequency: 'rarely',
                defaultValue: 'tina@romarentals.net',
                help: 'Email address for deposit return inquiries'
            },
            {
                id: 'deposit_return_days',
                label: 'Deposit Return Period (Days)',
                type: 'number',
                required: true,
                editFrequency: 'rarely',
                defaultValue: 60,
                help: 'Number of days to return deposit after exit'
            },
            {
                id: 'cleaning_fee_on_exit',
                label: 'Final Exit Cleaning Fee (EUR)',
                type: 'currency',
                required: false,
                editFrequency: 'when-differs',
                defaultValue: 0,
                help: 'Fee for final exit cleaning and laundry'
            }
        ]
    },
    {
        id: 'contacts',
        name: 'Contacts & Emergency Info',
        icon: '📞',
        fields: [
            {
                id: 'emergency_numbers_list',
                label: 'Emergency Numbers',
                type: 'textarea',
                required: false,
                editFrequency: 'rarely',
                defaultValue: 'Police: 112\nFire: 115\nAmbulance: 118\nEmergency (EU): 112',
                help: 'List of emergency contact numbers'
            },
            {
                id: 'maintenance_portal_url',
                label: 'Maintenance Portal URL',
                type: 'url',
                required: false,
                editFrequency: 'rarely',
                defaultValue: 'https://www.romarentals.net/connect/',
                help: 'URL for maintenance requests and support'
            },
            {
                id: 'cleaning_schedule_description',
                label: 'Cleaning Schedule',
                type: 'textarea',
                required: false,
                editFrequency: 'when-differs',
                defaultValue: 'Bi-monthly cleaning service included. Cleaning staff will visit every two weeks for general cleaning and linen change.',
                help: 'Description of cleaning service schedule'
            }
        ]
    },
    {
        id: 'legal',
        name: 'Legal Clauses',
        icon: '⚖️',
        fields: [
            {
                id: 'early_termination_penalty_text',
                label: 'Early Termination Clause',
                type: 'textarea',
                required: false,
                editFrequency: 'when-differs',
                defaultValue: 'If the Tenant terminates this Agreement prior to the expiration date, the Tenant shall be liable for the rent for the remainder of the term.',
                section: 'Section 10',
                help: 'Clause describing early termination penalties'
            },
            {
                id: 'governing_law_text',
                label: 'Governing Law',
                type: 'textarea',
                required: false,
                editFrequency: 'rarely',
                defaultValue: 'This Agreement shall be governed by and construed in accordance with the laws of Italy.',
                help: 'Jurisdiction and governing law clause'
            },
            {
                id: 'entire_agreement_clause',
                label: 'Entire Agreement Clause',
                type: 'textarea',
                required: false,
                editFrequency: 'rarely',
                defaultValue: 'This Agreement constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, or agreements, whether written or oral.',
                help: 'Standard entire agreement clause'
            }
        ]
    },
    {
        id: 'signatures',
        name: 'Signatures & Dates',
        icon: '✍️',
        fields: [
            {
                id: 'signature_landlord_name',
                label: 'Landlord Signature Name',
                type: 'text',
                required: false,
                editFrequency: 'at-signing',
                placeholder: 'Jennifer Hoover',
                help: 'Name of person signing for landlord'
            },
            {
                id: 'signature_landlord_title',
                label: 'Landlord Title',
                type: 'text',
                required: false,
                editFrequency: 'at-signing',
                placeholder: 'Director of Finance & Operations',
                help: 'Title of person signing for landlord'
            },
            {
                id: 'signature_landlord_date',
                label: 'Landlord Signature Date',
                type: 'date',
                required: false,
                editFrequency: 'at-signing',
                defaultValue: () => new Date().toISOString().split('T')[0],
                help: 'Date landlord signs the contract'
            },
            {
                id: 'signature_tenant_name',
                label: 'Tenant Signature Name',
                type: 'text',
                required: false,
                editFrequency: 'at-signing',
                placeholder: 'John Smith',
                help: 'Name of person signing for tenant'
            },
            {
                id: 'signature_tenant_title',
                label: 'Tenant Title',
                type: 'text',
                required: false,
                editFrequency: 'at-signing',
                placeholder: 'Program Director',
                help: 'Title of person signing for tenant'
            },
            {
                id: 'signature_tenant_date',
                label: 'Tenant Signature Date',
                type: 'date',
                required: false,
                editFrequency: 'at-signing',
                defaultValue: () => new Date().toISOString().split('T')[0],
                help: 'Date tenant signs the contract'
            }
        ]
    }
];

