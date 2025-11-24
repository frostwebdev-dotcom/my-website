// Contract Questions - Based on Original PDF Template
const contractFields = [
    {
        id: 'effectiveDate',
        label: 'Effective Date of Lease Agreement',
        placeholder: 'Example: 18 November 2025',
        type: 'text',
        required: true
    },
    {
        id: 'tenantName',
        label: 'Tenant Name (Organization or Individual)',
        placeholder: 'Example: University of Notre Dame',
        type: 'text',
        required: true
    },
    {
        id: 'tenantAddress',
        label: 'Tenant Street Address',
        placeholder: 'Example: 11 Walsh Family Hall of Architecture',
        type: 'text',
        required: true
    },
    {
        id: 'tenantCity',
        label: 'Tenant City, State, ZIP',
        placeholder: 'Example: Notre Dame, IN 46556',
        type: 'text',
        required: true
    },
    {
        id: 'tenantPhone',
        label: 'Tenant Phone Number',
        placeholder: 'Example: +1 (574) 631-5000',
        type: 'tel',
        required: true
    },
    {
        id: 'tenantEmail',
        label: 'Tenant Email Address',
        placeholder: 'Example: contact@nd.edu',
        type: 'email',
        required: true
    },
    {
        id: 'property1Address',
        label: 'Property 1 Address',
        placeholder: 'Example: Via Dandolo 10, Scale A, Int. 2, 00153 Rome, Italy',
        type: 'text',
        required: true
    },
    {
        id: 'property1Details',
        label: 'Property 1 Details (Students, Bedrooms, Bathrooms)',
        placeholder: 'Example: 2 STUDENTS (2 Bedrooms, 1 Bathroom)',
        type: 'text',
        required: true
    },
    {
        id: 'property2Address',
        label: 'Property 2 Address (Optional - leave blank if only one property)',
        placeholder: 'Example: Viale di Trastevere 66, Scale E, Int. 8, 00153 Rome, Italy',
        type: 'text',
        required: false
    },
    {
        id: 'property2Details',
        label: 'Property 2 Details (Optional)',
        placeholder: 'Example: 3 STUDENTS (3 Bedrooms, 2 Bathrooms)',
        type: 'text',
        required: false
    },
    {
        id: 'totalStudents',
        label: 'Total Number of Students',
        placeholder: 'Example: 5',
        type: 'number',
        required: true
    },
    {
        id: 'totalApartments',
        label: 'Total Number of Apartments',
        placeholder: 'Example: 2',
        type: 'number',
        required: true
    },
    {
        id: 'leaseStartDate',
        label: 'Lease Start Date',
        placeholder: 'Example: 9 January 2026',
        type: 'text',
        required: true
    },
    {
        id: 'leaseEndDate',
        label: 'Lease End Date',
        placeholder: 'Example: 11 May 2026',
        type: 'text',
        required: true
    },
    {
        id: 'rentalPeriod',
        label: 'Rental Period (Number of Nights)',
        placeholder: 'Example: 123',
        type: 'number',
        required: true
    },
    {
        id: 'rentPerNight',
        label: 'Rent Per Night Per Student (in Euros)',
        placeholder: 'Example: 50.00',
        type: 'number',
        step: '0.01',
        required: true
    },
    {
        id: 'securityDeposit',
        label: 'Security Deposit Amount (in Euros)',
        placeholder: 'Example: 1000.00',
        type: 'number',
        step: '0.01',
        required: true
    },
    {
        id: 'petCleaningFee',
        label: 'Pet Cleaning Fee (in Euros)',
        placeholder: 'Example: 200.00',
        type: 'number',
        step: '0.01',
        required: true
    }
];
