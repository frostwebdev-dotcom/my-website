// Global variables
let templateFile = null;
let templateArrayBuffer = null;
let formData = {};
let currentTab = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupTemplateUpload();
    initializeFormData();
});

// Setup template upload
function setupTemplateUpload() {
    const uploadZone = document.getElementById('templateUploadZone');
    const fileInput = document.getElementById('templateInput');
    
    uploadZone.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleTemplateUpload(e.target.files[0]);
        }
    });
    
    // Drag and drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });
    
    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('dragover');
    });
    
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleTemplateUpload(e.dataTransfer.files[0]);
        }
    });
}

// Handle template upload
async function handleTemplateUpload(file) {
    if (!file.name.endsWith('.docx')) {
        alert('Please upload a .docx file');
        return;
    }
    
    try {
        templateFile = file;
        templateArrayBuffer = await file.arrayBuffer();
        
        document.getElementById('templateName').textContent = file.name;
        
        // Generate form
        generateForm();
        
        // Show form screen
        showScreen('form-screen');
        
    } catch (error) {
        console.error('Error loading template:', error);
        alert('Error loading template: ' + error.message);
    }
}

// Initialize form data
function initializeFormData() {
    contractTabs.forEach(tab => {
        tab.fields.forEach(field => {
            if (field.defaultValue) {
                if (typeof field.defaultValue === 'function') {
                    formData[field.id] = field.defaultValue();
                } else {
                    formData[field.id] = field.defaultValue;
                }
            } else {
                formData[field.id] = '';
            }
        });
    });
}

// Generate form
function generateForm() {
    const tabNav = document.getElementById('tabNavigation');
    const tabContent = document.getElementById('tabContent');
    
    // Clear existing
    tabNav.innerHTML = '';
    tabContent.innerHTML = '';
    
    // Generate tabs
    contractTabs.forEach((tab, index) => {
        // Tab button
        const tabBtn = document.createElement('button');
        tabBtn.className = 'tab-btn' + (index === 0 ? ' active' : '');
        tabBtn.innerHTML = `${tab.icon} ${tab.name}`;
        tabBtn.onclick = () => switchTab(index);
        tabNav.appendChild(tabBtn);
        
        // Tab panel
        const tabPanel = document.createElement('div');
        tabPanel.className = 'tab-panel' + (index === 0 ? ' active' : '');
        tabPanel.id = `tab-${tab.id}`;
        
        // Generate fields
        tab.fields.forEach(field => {
            const fieldGroup = createFieldElement(field);
            tabPanel.appendChild(fieldGroup);
        });
        
        tabContent.appendChild(tabPanel);
    });
}

// Create field element
function createFieldElement(field) {
    const div = document.createElement('div');
    div.className = 'form-group';
    
    const label = document.createElement('label');
    label.textContent = field.label;
    if (field.required) {
        label.innerHTML += ' <span style="color: red;">*</span>';
    }
    div.appendChild(label);
    
    let input;
    if (field.type === 'textarea') {
        input = document.createElement('textarea');
        input.rows = 3;
    } else if (field.type === 'select') {
        input = document.createElement('select');
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
    input.value = formData[field.id] || '';
    input.disabled = field.calculated || false;
    
    input.addEventListener('change', (e) => {
        formData[field.id] = field.type === 'checkbox' ? e.target.checked : e.target.value;
        updateCalculatedFields();
    });
    
    div.appendChild(input);
    
    if (field.help) {
        const help = document.createElement('small');
        help.textContent = field.help;
        help.style.color = '#666';
        div.appendChild(help);
    }
    
    return div;
}

// Switch tab
function switchTab(index) {
    currentTab = index;
    
    document.querySelectorAll('.tab-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });
    
    document.querySelectorAll('.tab-panel').forEach((panel, i) => {
        panel.classList.toggle('active', i === index);
    });
}

// Update calculated fields
function updateCalculatedFields() {
    contractTabs.forEach(tab => {
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

// Show screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Generate contract using template
async function generateContract() {
    if (!templateArrayBuffer) {
        alert('Please upload a template first');
        return;
    }
    
    try {
        const btn = event.target;
        btn.disabled = true;
        btn.textContent = 'Generating...';
        
        console.log('Loading template...');
        console.log('Form data:', formData);
        
        // Load template with PizZip
        const zip = new PizZip(templateArrayBuffer);
        const doc = new window.docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
        
        // Set data
        doc.setData(formData);
        
        // Render
        doc.render();
        
        // Generate blob
        const blob = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
        
        // Download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `contract-${new Date().toISOString().split('T')[0]}.docx`;
        a.click();
        URL.revokeObjectURL(url);
        
        btn.disabled = false;
        btn.textContent = '📝 Generate Contract';
        
        // Show success screen
        showScreen('success-screen');
        
    } catch (error) {
        console.error('Error generating contract:', error);
        alert('Error generating contract: ' + error.message + '\n\nMake sure your template has merge fields like {landlord_name}');
        
        const btn = event.target;
        btn.disabled = false;
        btn.textContent = '📝 Generate Contract';
    }
}

