// Form Field Template Generator
// This script creates a PDF template with form fields

let uploadedPDF = null;
let pdfDocument = null;
let extractedData = {};
let fieldMappings = [];

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Upload area handlers
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');

uploadArea.addEventListener('click', () => fileInput.click());
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
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
        handleFileUpload(file);
    }
});
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleFileUpload(file);
    }
});

// Handle file upload
async function handleFileUpload(file) {
    try {
        showStatus('info', `Uploading ${file.name}...`);

        const arrayBuffer = await file.arrayBuffer();

        // CRITICAL: Create a copy that won't be detached
        // We need to keep this for later use in generateTemplate()
        uploadedPDF = new Uint8Array(new ArrayBuffer(arrayBuffer.byteLength));
        uploadedPDF.set(new Uint8Array(arrayBuffer));

        console.log('PDF uploaded:', {
            size: uploadedPDF.length,
            name: file.name,
            bufferSize: uploadedPDF.buffer.byteLength
        });

        showStatus('success', `✅ PDF uploaded: ${file.name} (${uploadedPDF.length} bytes)`);

        // Show step 2
        document.getElementById('step2').style.display = 'block';

        // List all fields
        listFields();

    } catch (error) {
        console.error('Error uploading PDF:', error);
        showStatus('error', 'Error uploading PDF: ' + error.message);
    }
}

// List all fields from contract data
function listFields() {
    const fieldList = document.getElementById('fieldList');
    fieldList.innerHTML = '<h4>Fields to be added (55 total):</h4>';
    
    let count = 0;
    contractTabs.forEach(tab => {
        fieldList.innerHTML += `<div style="margin-top: 15px;"><strong>${tab.icon} ${tab.name}</strong></div>`;
        tab.fields.forEach(field => {
            count++;
            fieldList.innerHTML += `<div class="field-item">${count}. ${field.label} (${field.id})</div>`;
        });
    });
}

// Analyze PDF and map fields
async function analyzePDF() {
    try {
        showStatus('info', 'Analyzing PDF...');
        showProgress(0);

        // Create a separate copy for pdf-lib analysis (will be detached)
        const pdfBytesForAnalysis = new Uint8Array(uploadedPDF.buffer.slice(0));

        console.log('Analyzing PDF:', {
            originalSize: uploadedPDF.length,
            analysisSize: pdfBytesForAnalysis.length,
            sameBuffer: pdfBytesForAnalysis.buffer === uploadedPDF.buffer
        });

        // Load with pdf-lib
        const { PDFDocument } = PDFLib;
        pdfDocument = await PDFDocument.load(pdfBytesForAnalysis);

        showProgress(20);

        // Create another copy for PDF.js (uploadedPDF is still intact)
        const pdfBytesForPDFJS = new Uint8Array(uploadedPDF.buffer.slice(0));

        // Load with PDF.js for text extraction
        const loadingTask = pdfjsLib.getDocument({ data: pdfBytesForPDFJS });
        const pdfJS = await loadingTask.promise;
        
        showProgress(40);
        
        // Extract text from all pages
        extractedData.pageCount = pdfJS.numPages;
        extractedData.textData = [];
        
        for (let pageNum = 1; pageNum <= pdfJS.numPages; pageNum++) {
            const page = await pdfJS.getPage(pageNum);
            const textContent = await page.getTextContent();
            
            const pageData = {
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
            
            extractedData.textData.push(pageData);
            showProgress(40 + (pageNum / pdfJS.numPages) * 40);
        }
        
        showProgress(80);
        
        // Map fields to positions
        mapFieldsToPositions();
        
        showProgress(100);
        showStatus('success', `✅ PDF analyzed! Found ${extractedData.pageCount} pages with text data.`);
        
        // Show step 3
        document.getElementById('step3').style.display = 'block';
        
    } catch (error) {
        console.error('Error analyzing PDF:', error);
        showStatus('error', 'Error analyzing PDF: ' + error.message);
    }
}

// Map fields to PDF positions
function mapFieldsToPositions() {
    fieldMappings = [];
    
    // For each field, try to find its position in the PDF
    contractTabs.forEach(tab => {
        tab.fields.forEach(field => {
            const mapping = findFieldPosition(field);
            if (mapping) {
                fieldMappings.push(mapping);
            }
        });
    });
    
    console.log('Field mappings:', fieldMappings);
}

// Find field position in PDF (simplified - uses heuristics)
function findFieldPosition(field) {
    // Search for field label or default value in PDF text
    const searchTerms = [
        field.label,
        field.defaultValue,
        field.id.replace(/_/g, ' ')
    ].filter(Boolean);

    for (const pageData of extractedData.textData) {
        for (const item of pageData.items) {
            for (const term of searchTerms) {
                if (item.text && typeof term === 'string' &&
                    item.text.toLowerCase().includes(term.toLowerCase().substring(0, 10))) {
                    return {
                        fieldId: field.id,
                        fieldLabel: field.label,
                        page: pageData.pageNumber,
                        x: item.x,
                        y: item.y,
                        width: Math.max(item.width, 150),
                        height: Math.max(item.height, 15)
                    };
                }
            }
        }
    }

    return null;
}

// Generate template with form fields
async function generateTemplate() {
    try {
        const btn = document.getElementById('generateBtn');
        btn.disabled = true;
        btn.textContent = 'Generating...';

        showStatus('info', 'Creating form field template...');
        showProgress(0);

        // Validate uploadedPDF
        if (!uploadedPDF || uploadedPDF.length === 0 || uploadedPDF.buffer.byteLength === 0) {
            throw new Error('PDF data has been lost. Please refresh the page and upload the PDF again.');
        }

        console.log('Generating template from PDF:', {
            size: uploadedPDF.length,
            bufferSize: uploadedPDF.buffer.byteLength,
            firstBytes: Array.from(uploadedPDF.slice(0, 10))
        });

        // Validate PDF header
        const pdfHeader = String.fromCharCode(...uploadedPDF.slice(0, 5));
        if (!pdfHeader.startsWith('%PDF')) {
            throw new Error('Invalid PDF file. Header: ' + pdfHeader);
        }

        const { PDFDocument, rgb, StandardFonts } = PDFLib;

        // Create a fresh copy for pdf-lib (to avoid detachment issues)
        const pdfBytesForTemplate = new Uint8Array(uploadedPDF.buffer.slice(0));

        // Load the original PDF
        console.log('Loading PDF with pdf-lib...');
        const pdfDoc = await PDFDocument.load(pdfBytesForTemplate);
        console.log('PDF loaded successfully!');
        const form = pdfDoc.getForm();
        const pages = pdfDoc.getPages();

        showProgress(20);

        // Add form fields
        let fieldCount = 0;
        let yOffset = 50; // Start position for fields
        const xStart = 50;
        const fieldWidth = 200;
        const fieldHeight = 20;
        const spacing = 25;

        contractTabs.forEach((tab, tabIndex) => {
            tab.fields.forEach((field, fieldIndex) => {
                try {
                    // Create text field
                    const textField = form.createTextField(field.id);

                    // Set default value if exists
                    if (field.defaultValue && typeof field.defaultValue === 'string') {
                        textField.setText(field.defaultValue);
                    } else if (field.defaultValue && typeof field.defaultValue === 'function') {
                        const value = field.defaultValue();
                        textField.setText(value ? value.toString() : '');
                    }

                    // Calculate position (grid layout on last page for now)
                    const lastPage = pages[pages.length - 1];
                    const { height: pageHeight } = lastPage.getSize();

                    // Position calculation
                    const column = Math.floor(fieldCount / 25);
                    const row = fieldCount % 25;
                    const x = xStart + (column * (fieldWidth + 20));
                    const y = pageHeight - yOffset - (row * spacing);

                    // Add field to last page
                    textField.addToPage(lastPage, {
                        x: x,
                        y: y,
                        width: fieldWidth,
                        height: fieldHeight,
                        borderColor: rgb(0.7, 0.7, 0.7),
                        borderWidth: 1
                    });

                    fieldCount++;

                } catch (error) {
                    console.error(`Error adding field ${field.id}:`, error);
                }

                showProgress(20 + ((fieldCount / 55) * 60));
            });
        });

        showProgress(80);
        showStatus('info', `Added ${fieldCount} form fields. Saving PDF...`);

        // Save the PDF
        const pdfBytes = await pdfDoc.save();

        showProgress(90);

        // Download
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'contract-template-with-fields.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showProgress(100);
        showStatus('success', `✅ Template created! Downloaded: contract-template-with-fields.pdf (${fieldCount} fields)`);

        btn.disabled = false;
        btn.textContent = '✨ Generate Form Field Template';

    } catch (error) {
        console.error('Error generating template:', error);
        showStatus('error', 'Error generating template: ' + error.message);

        const btn = document.getElementById('generateBtn');
        btn.disabled = false;
        btn.textContent = '✨ Generate Form Field Template';
    }
}

// Show status message
function showStatus(type, message) {
    const status = document.getElementById('status');
    status.className = type;
    status.textContent = message;
}

// Show progress
function showProgress(percent) {
    const container = document.getElementById('progressContainer');
    const bar = document.getElementById('progressBar');
    container.style.display = 'block';
    bar.style.width = percent + '%';
    bar.textContent = Math.round(percent) + '%';
}

