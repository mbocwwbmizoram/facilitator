// Select DOM elements
const downloadForm = document.getElementById('downloadForm');
const rollNumberInput = document.getElementById('rollNumber');
const phoneNumberInput = document.getElementById('phoneNumber');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

// Function to display messages
function showMessage(element, message) {
    element.textContent = message;
    element.style.display = 'block';
    // Hide message after 5 seconds
    setTimeout(() => {
        element.style.display = 'none';
        element.textContent = '';
    }, 5000);
}

// Function to validate inputs
function validateInputs(rollNumber, phoneNumber) {
    const rollNumberPattern = /^[A-Za-z0-9]+$/;
    const phoneNumberPattern = /^[0-9]{10}$/;
    
    if (!rollNumberPattern.test(rollNumber)) {
        showMessage(errorMessage, 'Invalid roll number. Use only letters and numbers.');
        return false;
    }
    if (!phoneNumberPattern.test(phoneNumber)) {
        showMessage(errorMessage, 'Invalid phone number. Must be 10 digits.');
        return false;
    }
    return true;
}

// Function to initiate PDF download
function downloadPDF(rollNumber) {
    // Simulate server-side file path (replace with actual server endpoint)
    const fileUrl = `/pdfs/${rollNumber}.pdf`;
    
    // Create a temporary link element for download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `${rollNumber}.pdf`;
    
    // Attempt to trigger download
    try {
        link.click();
        showMessage(successMessage, `Downloading ${rollNumber}.pdf...`);
    } catch (error) {
        showMessage(errorMessage, 'Error downloading file. Please try again.');
    }
    
    // Clean up
    link.remove();
}

// Form submission handler
downloadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const rollNumber = rollNumberInput.value.trim().toUpperCase();
    const phoneNumber = phoneNumberInput.value.trim();
    
    // Validate inputs
    if (!validateInputs(rollNumber, phoneNumber)) {
        return;
    }
    
    // Simulate phone number storage (e.g., log to console or send to server)
    console.log(`Captured phone number: ${phoneNumber} for roll number: ${rollNumber}`);
    
    // Attempt to download the PDF
    downloadPDF(rollNumber);
    
    // Clear form
    downloadForm.reset();
});

// Enable keyboard navigation for accessibility
rollNumberInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && rollNumberInput.value.trim()) {
        phoneNumberInput.focus();
    }
});

phoneNumberInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && phoneNumberInput.value.trim()) {
        downloadForm.dispatchEvent(new Event('submit'));
    }
});