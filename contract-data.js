// Contract template questions based on the RomaRentals PDF
const contractQuestions = [
    {
        id: 'effectiveDate',
        question: 'What is the effective date of this lease agreement?',
        help: 'Example: 18 November 2025',
        placeholder: 'Enter the date',
        type: 'text'
    },
    {
        id: 'tenantName',
        question: 'What is the tenant\'s full name or organization name?',
        help: 'Example: University of Notre Dame',
        placeholder: 'Enter tenant name',
        type: 'text'
    },
    {
        id: 'tenantAddress',
        question: 'What is the tenant\'s address?',
        help: 'Example: 11 Walsh Family Hall of Architecture',
        placeholder: 'Enter street address',
        type: 'text'
    },
    {
        id: 'tenantCity',
        question: 'What is the tenant\'s city, state, and zip code?',
        help: 'Example: Notre Dame, IN 46556 USA',
        placeholder: 'Enter city, state, zip',
        type: 'text'
    },
    {
        id: 'tenantPhone',
        question: 'What is the tenant\'s phone number?',
        help: 'Example: +1 574 631 9033',
        placeholder: 'Enter phone number',
        type: 'text'
    },
    {
        id: 'tenantEmail',
        question: 'What is the tenant\'s email address?',
        help: 'Example: jhoover1@nd.edu',
        placeholder: 'Enter email address',
        type: 'email'
    },
    {
        id: 'property1Address',
        question: 'What is the address of the first property?',
        help: 'Example: Via Roma Libera 23, Int. 9, 00153 Rome, Italy',
        placeholder: 'Enter property address',
        type: 'text'
    },
    {
        id: 'property1Details',
        question: 'How many students and bedrooms for the first property?',
        help: 'Example: 2 STUDENTS (2 Bedrooms, 1 Bathroom)',
        placeholder: 'Enter details',
        type: 'text'
    },
    {
        id: 'property2Address',
        question: 'What is the address of the second property? (Leave blank if only one property)',
        help: 'Example: Viale di Trastevere 66, Scale E, Int. 8, 00153 Rome, Italy',
        placeholder: 'Enter property address or leave blank',
        type: 'text',
        optional: true
    },
    {
        id: 'property2Details',
        question: 'How many students and bedrooms for the second property? (Leave blank if only one property)',
        help: 'Example: 3 STUDENTS (3 Bedrooms, 2 Bathrooms)',
        placeholder: 'Enter details or leave blank',
        type: 'text',
        optional: true
    },
    {
        id: 'totalStudents',
        question: 'What is the total number of students?',
        help: 'Example: 5',
        placeholder: 'Enter number',
        type: 'number'
    },
    {
        id: 'totalApartments',
        question: 'What is the total number of apartments?',
        help: 'Example: 2',
        placeholder: 'Enter number',
        type: 'number'
    },
    {
        id: 'leaseStartDate',
        question: 'When does the lease term start?',
        help: 'Example: 09 January 2026',
        placeholder: 'Enter start date',
        type: 'text'
    },
    {
        id: 'leaseEndDate',
        question: 'When does the lease term end?',
        help: 'Example: 11 May 2026',
        placeholder: 'Enter end date',
        type: 'text'
    },
    {
        id: 'numberOfNights',
        question: 'How many nights is the rental period?',
        help: 'Example: 122',
        placeholder: 'Enter number of nights',
        type: 'number'
    },
    {
        id: 'rentPerNight',
        question: 'What is the rent per student, per night (in Euros)?',
        help: 'Example: 80.00',
        placeholder: 'Enter amount',
        type: 'number'
    },
    {
        id: 'securityDeposit',
        question: 'What is the security deposit per tenant (in Euros)?',
        help: 'Example: 500.00',
        placeholder: 'Enter amount',
        type: 'number'
    },
    {
        id: 'petCleaningFee',
        question: 'What is the pet cleaning fee (in Euros)?',
        help: 'Example: 500.00',
        placeholder: 'Enter amount',
        type: 'number'
    }
];

// Store user answers
let userAnswers = {};

