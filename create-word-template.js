// Word Template Generator
// Creates a Microsoft Word template with merge fields

let uploadedPDF = null;
let extractedText = '';

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
        uploadedPDF = new Uint8Array(arrayBuffer);
        
        showStatus('info', 'Extracting text from PDF...');
        
        // Extract text from PDF
        const loadingTask = pdfjsLib.getDocument({ data: uploadedPDF });
        const pdf = await loadingTask.promise;
        
        let fullText = '';
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n\n';
        }
        
        extractedText = fullText;
        
        showStatus('success', `✅ PDF uploaded and analyzed! (${pdf.numPages} pages, ${fullText.length} characters)`);
        
        // Show step 2
        document.getElementById('step2').classList.remove('hidden');
        
    } catch (error) {
        console.error('Error uploading PDF:', error);
        showStatus('error', 'Error uploading PDF: ' + error.message);
    }
}

// Generate Word template - matching PDF layout exactly
async function generateWordTemplate() {
    try {
        const btn = document.getElementById('generateBtn');
        btn.disabled = true;
        btn.textContent = 'Generating...';

        showStatus('info', 'Creating Word template matching PDF layout...');

        // Check if docx library is loaded
        if (typeof window.docx === 'undefined') {
            throw new Error('DOCX library not loaded! Please refresh the page.');
        }

        if (!extractedText || extractedText.length === 0) {
            throw new Error('No text extracted from PDF. Please upload a PDF first.');
        }

        const { Document, Packer, Paragraph, AlignmentType } = window.docx;

        // Replace default values with merge field placeholders
        let templateText = extractedText;

        console.log('Original text length:', templateText.length);

        // Replace known default values with merge fields
        contractTabs.forEach(tab => {
            tab.fields.forEach(field => {
                if (field.defaultValue) {
                    let defaultVal = field.defaultValue;
                    if (typeof defaultVal === 'function') {
                        defaultVal = defaultVal();
                    }

                    if (defaultVal && typeof defaultVal === 'string' && defaultVal.length > 0) {
                        // Replace default value with merge field
                        const mergeField = `{${field.id}}`;
                        const regex = new RegExp(escapeRegex(defaultVal), 'gi');
                        const matches = templateText.match(regex);
                        if (matches) {
                            console.log(`Replacing "${defaultVal}" with "${mergeField}" (${matches.length} occurrences)`);
                            templateText = templateText.replace(regex, mergeField);
                        }
                    }
                }
            });
        });

        console.log('Template text length after replacements:', templateText.length);

        // Split text into paragraphs
        const paragraphs = templateText.split('\n').map(line => {
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

        console.log('Created', paragraphs.length, 'paragraphs');

        // Create document matching PDF layout
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

        showStatus('info', 'Saving Word template...');

        // Generate and download
        const blob = await Packer.toBlob(doc);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'RomaRentals-Contract-Template.docx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showStatus('success', '✅ Word template created! Downloaded: RomaRentals-Contract-Template.docx\n\nThe template matches your PDF layout with merge fields like {landlord_name}');

        btn.disabled = false;
        btn.textContent = '✨ Generate Word Template';

    } catch (error) {
        console.error('Error generating template:', error);
        showStatus('error', 'Error generating template: ' + error.message);

        const btn = document.getElementById('generateBtn');
        btn.disabled = false;
        btn.textContent = '✨ Generate Word Template';
    }
}

// Escape special regex characters
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Show status message
function showStatus(type, message) {
    const status = document.getElementById('status');
    status.className = type;
    status.textContent = message;
}

