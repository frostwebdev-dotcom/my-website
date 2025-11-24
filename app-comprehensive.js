// Comprehensive PDF Contract Editor
// Analyzes PDF, extracts fields, allows editing, generates perfect output

// Global state
let uploadedPDF = null;          // Uint8Array of uploaded PDF
let uploadedPDFArrayBuffer = null; // ArrayBuffer of uploaded PDF
let pdfDocument = null;
let extractedData = {};
let formData = {};
let pdfPages = [];

// Initialize
document.addEventListener('DOMContentLoaded', init);

function init() {
    setupUploadHandlers();
    setupPDFjs();
}

// Setup PDF.js worker
function setupPDFjs() {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

// Setup upload handlers
function setupUploadHandlers() {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('pdf-upload');

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');

        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type === 'application/pdf') {
            handlePDFUpload(files[0]);
        } else {
            showStatus('error', 'Please upload a valid PDF file');
        }
    });

    // File input
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handlePDFUpload(e.target.files[0]);
        }
    });

    // Click to upload
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
}

// Handle PDF upload
async function handlePDFUpload(file) {
    try {
        showStatus('info', `Uploading ${file.name}...`);

        // Read file
        const originalArrayBuffer = await file.arrayBuffer();

        // CRITICAL: Create completely independent copies with separate ArrayBuffers
        // If we create two Uint8Arrays from the same ArrayBuffer, when one gets detached, both die!
        // Solution: Copy the bytes to create a new independent ArrayBuffer

        // Copy 1: For analysis (will be detached by pdf-lib)
        const pdfBytesForAnalysis = new Uint8Array(originalArrayBuffer);

        // Copy 2: For later use - create a REAL copy with its own ArrayBuffer
        uploadedPDF = new Uint8Array(new ArrayBuffer(originalArrayBuffer.byteLength));
        uploadedPDF.set(new Uint8Array(originalArrayBuffer));

        // Also keep the original ArrayBuffer reference
        uploadedPDFArrayBuffer = uploadedPDF.buffer;

        console.log('PDF uploaded:', {
            size: uploadedPDF.length,
            type: file.type,
            name: file.name,
            analysisBufferSize: pdfBytesForAnalysis.length,
            uploadedPDFBufferSize: uploadedPDF.length,
            sameBuffer: pdfBytesForAnalysis.buffer === uploadedPDF.buffer
        });

        // Show analyzing screen
        showScreen('analyzing-screen');

        // Analyze PDF (this will detach pdfBytesForAnalysis, but uploadedPDF has its own buffer!)
        await analyzePDF(pdfBytesForAnalysis);

    } catch (error) {
        console.error('Error uploading PDF:', error);
        showStatus('error', 'Error uploading PDF: ' + error.message);
    }
}

// Analyze PDF
async function analyzePDF(pdfBytes) {
    try {
        updateAnalysisStatus('Loading PDF document...', 10);

        // Load with pdf-lib (this will detach pdfBytes buffer, but uploadedPDF is safe)
        const { PDFDocument } = PDFLib;
        pdfDocument = await PDFDocument.load(pdfBytes);

        updateAnalysisStatus('Extracting pages...', 20);
        const pages = pdfDocument.getPages();

        updateAnalysisStatus('Rendering PDF preview...', 30);
        // Load with PDF.js for rendering
        const pdfJS = await pdfjsLib.getDocument({ data: pdfBytes }).promise;

        updateAnalysisStatus('Analyzing text content...', 50);
        // Extract text from all pages
        const textData = await extractTextFromPDF(pdfJS);

        updateAnalysisStatus('Detecting editable fields...', 70);
        // Detect fields
        const detectedFields = detectEditableFields(textData);

        updateAnalysisStatus('Organizing fields into tabs...', 85);
        // Organize into tabs
        extractedData = {
            pageCount: pages.length,
            textData: textData,
            fields: detectedFields,
            pdfJS: pdfJS
        };

        updateAnalysisStatus('Generating edit form...', 95);
        // Generate form
        await generateEditForm();

        updateAnalysisStatus('Complete!', 100);

        // Show edit screen after short delay
        setTimeout(() => {
            showScreen('edit-screen');
            renderPDFPreview();
        }, 500);

    } catch (error) {
        console.error('Error analyzing PDF:', error);
        showStatus('error', 'Error analyzing PDF: ' + error.message);
        showScreen('upload-screen');
    }
}

// Extract text from PDF using PDF.js
async function extractTextFromPDF(pdf) {
    const textData = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();

        const pageText = {
            pageNumber: pageNum,
            items: textContent.items.map(item => ({
                text: item.str,
                x: item.transform[4],
                y: item.transform[5],
                width: item.width,
                height: item.height,
                fontName: item.fontName
            }))
        };

        textData.push(pageText);
    }

    return textData;
}

// Detect editable fields from text
function detectEditableFields(textData) {
    const fields = [];

    // Patterns to detect
    const patterns = {
        date: /\b\d{1,2}[\s\-\/]\w+[\s\-\/]\d{2,4}\b|\b\d{4}-\d{2}-\d{2}\b/g,
        email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
        phone: /\b[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}\b/g,
        currency: /\b€?\s?\d+[,.]?\d*\s?(?:EUR|EURO)?\b/g,
        number: /\b\d+\b/g
    };

    // Search through all text items
    textData.forEach((page, pageIndex) => {
        page.items.forEach((item, itemIndex) => {
            const text = item.text.trim();

            if (!text) return;

            // Check each pattern
            for (const [type, pattern] of Object.entries(patterns)) {
                if (pattern.test(text)) {
                    fields.push({
                        id: `field_p${pageIndex}_i${itemIndex}`,
                        type: type,
                        value: text,
                        page: pageIndex + 1,
                        position: { x: item.x, y: item.y },
                        originalText: text
                    });
                }
            }
        });
    });

    return fields;
}


// Generate edit form with tabs
async function generateEditForm() {
    // Load contract data structure
    const tabs = window.contractTabs || getDefaultTabs();

    // Generate tab navigation
    const tabNav = document.getElementById('tab-navigation');
    tabNav.innerHTML = '';

    tabs.forEach((tab, index) => {
        const tabBtn = document.createElement('button');
        tabBtn.className = 'tab-btn' + (index === 0 ? ' active' : '');
        tabBtn.setAttribute('data-tab', tab.id);
        tabBtn.innerHTML = `<span class="tab-icon">${tab.icon}</span>${tab.name}`;
        tabBtn.onclick = () => switchTab(tab.id);
        tabNav.appendChild(tabBtn);
    });

    // Generate tab content
    const tabContent = document.getElementById('tab-content');
    tabContent.innerHTML = '';

    tabs.forEach((tab, index) => {
        const tabPane = document.createElement('div');
        tabPane.className = 'tab-pane' + (index === 0 ? ' active' : '');
        tabPane.id = `tab-${tab.id}`;

        tab.fields.forEach(field => {
            const formGroup = createFormField(field);
            tabPane.appendChild(formGroup);
        });

        tabContent.appendChild(tabPane);
    });

    // Initialize form data with defaults
    initializeFormData(tabs);
}

// Create form field HTML
function createFormField(field) {
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';

    // Label
    const label = document.createElement('label');
    label.setAttribute('for', field.id);
    label.innerHTML = field.label;

    if (field.required) {
        label.innerHTML += '<span class="required">*</span>';
    }

    if (field.editFrequency) {
        label.innerHTML += `<span class="edit-frequency">${field.editFrequency}</span>`;
    }

    formGroup.appendChild(label);

    // Input field
    let input;

    switch (field.type) {
        case 'textarea':
            input = document.createElement('textarea');
            input.rows = 4;
            break;

        case 'select':
            input = document.createElement('select');
            if (field.options) {
                field.options.forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt.value;
                    option.textContent = opt.label;
                    input.appendChild(option);
                });
            }
            break;

        case 'checkbox':
            input = document.createElement('input');
            input.type = 'checkbox';
            break;

        default:
            input = document.createElement('input');
            input.type = field.type || 'text';
    }

    input.id = field.id;
    input.name = field.id;

    if (field.placeholder) {
        input.placeholder = field.placeholder;
    }

    if (field.calculated) {
        input.classList.add('calculated-field');
        input.readOnly = true;
    }

    // Set default value
    if (field.defaultValue !== undefined) {
        if (typeof field.defaultValue === 'function') {
            input.value = field.defaultValue();
        } else if (field.type === 'checkbox') {
            input.checked = field.defaultValue;
        } else {
            input.value = field.defaultValue;
        }
    }

    // Add change listener
    input.addEventListener('change', () => handleFieldChange(field.id));
    input.addEventListener('input', () => handleFieldChange(field.id));

    formGroup.appendChild(input);

    // Help text
    if (field.help) {
        const helpText = document.createElement('div');
        helpText.className = 'help-text';
        helpText.textContent = field.help;
        formGroup.appendChild(helpText);
    }

    return formGroup;
}

// Initialize form data
function initializeFormData(tabs) {
    formData = {};

    tabs.forEach(tab => {
        tab.fields.forEach(field => {
            if (field.defaultValue !== undefined) {
                if (typeof field.defaultValue === 'function') {
                    formData[field.id] = field.defaultValue();
                } else {
                    formData[field.id] = field.defaultValue;
                }
            }
        });
    });

    // Update calculated fields
    updateCalculatedFields();
}

// Handle field change
function handleFieldChange(fieldId) {
    const input = document.getElementById(fieldId);

    if (input.type === 'checkbox') {
        formData[fieldId] = input.checked;
    } else {
        formData[fieldId] = input.value;
    }

    // Update calculated fields
    updateCalculatedFields();
}

// Update calculated fields
function updateCalculatedFields() {
    const tabs = window.contractTabs || getDefaultTabs();

    tabs.forEach(tab => {
        tab.fields.forEach(field => {
            if (field.calculated && field.calculation) {
                const value = field.calculation(formData);
                formData[field.id] = value;

                const input = document.getElementById(field.id);
                if (input) {
                    input.value = value;
                }
            }
        });
    });
}

// Switch tab
function switchTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

    // Update tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    document.getElementById(`tab-${tabId}`).classList.add('active');
}


// Render PDF preview
async function renderPDFPreview() {
    const container = document.getElementById('pdf-preview-container');
    container.innerHTML = '<p style="text-align: center; color: #666;">Rendering PDF preview...</p>';

    try {
        const pdf = extractedData.pdfJS;

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1.5 });

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;

            container.appendChild(canvas);
        }
    } catch (error) {
        console.error('Error rendering PDF preview:', error);
        container.innerHTML = '<p style="text-align: center; color: #dc3545;">Error rendering preview</p>';
    }
}

// Generate draft DOCX document - matching PDF layout
async function generateDraftDocument() {
    console.log('generateDraftDocument called');
    console.log('uploadedPDF:', uploadedPDF ? 'exists' : 'null');
    console.log('formData:', formData);
    console.log('extractedData:', extractedData);

    try {
        // Check if PDF has been uploaded
        if (!uploadedPDF || !formData) {
            alert('Please upload a PDF first!');
            return;
        }

        // Check if docx library is loaded
        if (typeof window.docx === 'undefined') {
            alert('ERROR: DOCX library not loaded! Please refresh the page.\n\nTry: Ctrl+F5 to hard refresh.');
            return;
        }

        // Find the button
        const btn = document.querySelector('.btn-success');
        if (btn) {
            btn.disabled = true;
            btn.textContent = 'Generating Contract...';
        }

        // Extract full text from PDF
        console.log('Extracting full text from PDF...');
        let fullText = '';

        if (extractedData && extractedData.textData) {
            // Use already extracted text data
            extractedData.textData.forEach(pageData => {
                const pageText = pageData.items
                    .sort((a, b) => {
                        // Sort by Y position (top to bottom), then X position (left to right)
                        const yDiff = Math.abs(a.y - b.y);
                        if (yDiff > 5) { // Different lines
                            return b.y - a.y; // Higher Y first (PDF coordinates)
                        }
                        return a.x - b.x; // Same line, left to right
                    })
                    .map(item => item.text)
                    .join(' ');
                fullText += pageText + '\n\n';
            });
        } else {
            // Extract text from PDF using PDF.js
            const loadingTask = pdfjsLib.getDocument({ data: uploadedPDF });
            const pdf = await loadingTask.promise;

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const textContent = await page.getTextContent();

                // Sort items by position
                const sortedItems = textContent.items.sort((a, b) => {
                    const yDiff = Math.abs(a.transform[5] - b.transform[5]);
                    if (yDiff > 5) {
                        return b.transform[5] - a.transform[5];
                    }
                    return a.transform[4] - b.transform[4];
                });

                const pageText = sortedItems.map(item => item.str).join(' ');
                fullText += pageText + '\n\n';
            }
        }

        console.log('Extracted text length:', fullText.length);
        console.log('First 500 chars:', fullText.substring(0, 500));

        // Replace field values in the text
        let contractText = fullText;

        // Build replacement map
        const replacements = buildReplacementMapForText(contractText);

        console.log('Replacements to apply:', replacements.length);

        // Apply replacements
        replacements.forEach(replacement => {
            const regex = new RegExp(escapeRegex(replacement.oldValue), 'gi');
            contractText = contractText.replace(regex, replacement.newValue);
            console.log(`Replaced: "${replacement.oldValue}" → "${replacement.newValue}"`);
        });

        // Create Word document with the contract text
        const { Document, Packer, Paragraph, TextRun, AlignmentType } = window.docx;

        // Split text into paragraphs
        const paragraphs = contractText.split('\n').map(line => {
            const trimmed = line.trim();
            if (trimmed === '') {
                return new Paragraph({ text: '' });
            }

            // Detect if line is a heading (all caps, short)
            const isHeading = trimmed === trimmed.toUpperCase() && trimmed.length < 100 && trimmed.length > 3;

            return new Paragraph({
                text: trimmed,
                alignment: isHeading ? AlignmentType.CENTER : AlignmentType.LEFT,
                spacing: { after: isHeading ? 200 : 100 }
            });
        });

        // Create document
        const doc = new Document({
            sections: [{
                properties: {
                    page: {
                        margin: {
                            top: 1440,    // 1 inch
                            right: 1440,
                            bottom: 1440,
                            left: 1440
                        }
                    }
                },
                children: paragraphs
            }]
        });

        console.log('Saving Word document...');

        // Generate and download
        const blob = await Packer.toBlob(doc);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `contract-${new Date().toISOString().split('T')[0]}.docx`;
        a.click();
        URL.revokeObjectURL(url);

        if (btn) {
            btn.disabled = false;
            btn.textContent = '📝 Generate Contract (DOCX)';
        }

        alert('✅ Contract generated successfully!\n\nOpen the Word document and save as PDF when ready.');

    } catch (error) {
        console.error('Error generating contract:', error);
        alert('Error generating contract: ' + error.message);

        const btn = document.querySelector('.btn-success');
        if (btn) {
            btn.disabled = false;
            btn.textContent = '📝 Generate Contract (DOCX)';
        }
    }
}

// Build replacement map for text-based replacement
function buildReplacementMapForText(text) {
    const replacements = [];
    const tabs = window.contractTabs || [];

    tabs.forEach(tab => {
        tab.fields.forEach(field => {
            let newValue = formData[field.id];

            // Handle calculated fields
            if (field.calculated && field.calculation) {
                newValue = field.calculation(formData);
            }

            // Skip if no value
            if (!newValue || newValue === '') {
                return;
            }

            // Convert to string
            newValue = newValue.toString();

            // Try to find what to replace
            // Look for default value or common patterns
            let oldValue = null;

            if (field.defaultValue) {
                if (typeof field.defaultValue === 'function') {
                    oldValue = field.defaultValue();
                } else {
                    oldValue = field.defaultValue;
                }
            }

            // Common patterns to search for
            const searchPatterns = [
                oldValue,
                field.label,
                `[${field.id}]`,
                `{${field.id}}`,
                `__${field.id}__`
            ].filter(Boolean);

            // Find which pattern exists in the text
            for (const pattern of searchPatterns) {
                if (text.includes(pattern)) {
                    replacements.push({
                        fieldId: field.id,
                        oldValue: pattern,
                        newValue: newValue
                    });
                    break;
                }
            }
        });
    });

    return replacements;
}

// Escape special regex characters
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Generate final PDF
async function generateFinalPDF() {
    console.log('generateFinalPDF called - REDIRECTING TO WORD TEMPLATE');

    alert('📝 WORD TEMPLATE WORKFLOW\n\n' +
          'For the best professional results, please use the Word template workflow:\n\n' +
          '1. Click "Generate Draft (DOCX)" button instead\n' +
          '2. Open the downloaded Word document\n' +
          '3. Review and edit as needed\n' +
          '4. Save as PDF in Microsoft Word (File → Save As → PDF)\n\n' +
          'This gives you:\n' +
          '✅ Perfect formatting\n' +
          '✅ No overlapping text\n' +
          '✅ Professional appearance\n' +
          '✅ Easy to edit and reuse\n' +
          '✅ Widely accepted in legal workflows');
}

// Build replacement map from form data
function buildReplacementMap() {
    const replacements = [];

    console.log('Building replacement map...');
    console.log('formData:', formData);
    console.log('extractedData:', extractedData);

    // For now, return empty array to generate PDF without modifications
    // This avoids the overlapping text issue
    // TODO: Implement proper field mapping based on PDF analysis

    console.log('Returning empty replacements to avoid overlapping text');
    return replacements;

    /* DISABLED - Causes overlapping text
    const tabs = window.contractTabs || getDefaultTabs();

    // Map form data to PDF positions
    tabs.forEach(tab => {
        tab.fields.forEach(field => {
            const value = formData[field.id];
            if (value && extractedData.textData) {
                // Find matching text in PDF
                extractedData.textData.forEach(pageData => {
                    pageData.items.forEach(item => {
                        // Simple matching - in production, use more sophisticated matching
                        if (item.text && field.defaultValue &&
                            item.text.includes(field.defaultValue.toString().substring(0, 10))) {
                            replacements.push({
                                page: pageData.pageNumber,
                                x: item.x,
                                y: item.y,
                                width: item.width,
                                height: item.height,
                                newText: value.toString(),
                                fontSize: item.height || 11,
                                bold: false
                            });
                        }
                    });
                });
            }
        });
    });

    return replacements;
    */
}


// Utility Functions

// Show screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Update analysis status
function updateAnalysisStatus(message, progress) {
    const statusEl = document.getElementById('analysis-status');
    const progressEl = document.getElementById('progress-fill');
    const detailsEl = document.getElementById('analysis-details');

    if (statusEl) statusEl.textContent = message;
    if (progressEl) {
        progressEl.style.width = progress + '%';
        progressEl.textContent = progress + '%';
    }

    // Add to details
    if (detailsEl) {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${progress}%</strong> - ${message}`;
        detailsEl.appendChild(p);
    }
}

// Show status message
function showStatus(type, message) {
    const statusDiv = document.getElementById('upload-status');
    if (!statusDiv) return;

    statusDiv.className = 'status-message ' + type;
    statusDiv.textContent = message;
    statusDiv.style.display = 'block';

    // Auto-hide after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 5000);
    }
}

// Get default tabs (fallback if contract-data-full.js not loaded)
function getDefaultTabs() {
    return [
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
                    defaultValue: '',
                    help: 'First day of the lease period'
                },
                {
                    id: 'lease_end_date',
                    label: 'Lease End Date',
                    type: 'date',
                    required: true,
                    editFrequency: 'every-time',
                    defaultValue: '',
                    help: 'Last day of the lease period'
                },
                {
                    id: 'nights_total',
                    label: 'Total Nights',
                    type: 'number',
                    required: true,
                    editFrequency: 'auto',
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
            name: 'Parties',
            icon: '👥',
            fields: [
                {
                    id: 'landlord_name',
                    label: 'Landlord Name',
                    type: 'text',
                    required: true,
                    editFrequency: 'rarely',
                    defaultValue: 'RomaRentals',
                    help: 'Legal name of the landlord'
                },
                {
                    id: 'tenant_organization',
                    label: 'Tenant Organization',
                    type: 'text',
                    required: true,
                    editFrequency: 'every-time',
                    defaultValue: '',
                    help: 'Name of the tenant organization (e.g., university)'
                },
                {
                    id: 'tenant_contact_name',
                    label: 'Tenant Contact Name',
                    type: 'text',
                    required: true,
                    editFrequency: 'every-time',
                    defaultValue: '',
                    help: 'Primary contact person for the tenant'
                },
                {
                    id: 'tenant_email',
                    label: 'Tenant Email',
                    type: 'email',
                    required: true,
                    editFrequency: 'every-time',
                    defaultValue: '',
                    help: 'Email address for contract correspondence'
                },
                {
                    id: 'tenant_phone',
                    label: 'Tenant Phone',
                    type: 'tel',
                    required: false,
                    editFrequency: 'every-time',
                    defaultValue: '',
                    help: 'Contact phone number'
                }
            ]
        },
        {
            id: 'rent',
            name: 'Rent & Payments',
            icon: '💰',
            fields: [
                {
                    id: 'nightly_rate_per_student',
                    label: 'Nightly Rate per Student (EUR)',
                    type: 'number',
                    required: true,
                    editFrequency: 'every-time',
                    defaultValue: 0,
                    help: 'Rate charged per student per night'
                },
                {
                    id: 'total_students',
                    label: 'Total Students',
                    type: 'number',
                    required: true,
                    editFrequency: 'every-time',
                    defaultValue: 0,
                    help: 'Total number of students'
                },
                {
                    id: 'rent_total',
                    label: 'Total Rent (EUR)',
                    type: 'number',
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
            id: 'deposit',
            name: 'Security Deposit',
            icon: '🔒',
            fields: [
                {
                    id: 'security_deposit_per_tenant',
                    label: 'Security Deposit per Tenant (EUR)',
                    type: 'number',
                    required: true,
                    editFrequency: 'rarely',
                    defaultValue: 500,
                    help: 'Deposit amount per tenant'
                },
                {
                    id: 'security_deposit_total',
                    label: 'Total Security Deposit (EUR)',
                    type: 'number',
                    required: true,
                    editFrequency: 'auto',
                    calculated: true,
                    calculation: (data) => {
                        const perTenant = data.security_deposit_per_tenant || 0;
                        const students = data.total_students || 0;
                        return perTenant * students;
                    },
                    help: 'Automatically calculated: deposit per tenant × total students'
                }
            ]
        }
    ];
}




