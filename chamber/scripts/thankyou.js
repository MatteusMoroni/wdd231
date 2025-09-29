document.addEventListener('DOMContentLoaded', () => {
    // Create a new URLSearchParams object from the current window's URL search parameters
    const params = new URLSearchParams(window.location.search);

    // Get the data from the URL parameters
    const firstName = params.get('firstName');
    const lastName = params.get('lastName');
    const email = params.get('email');
    const phone = params.get('phone-number');
    const businessName = params.get('business-name');
    const timestamp = params.get('timestamp');

    // Select the span elements where the data will be displayed
    document.getElementById('summary-firstName').textContent = firstName || 'N/A';
    document.getElementById('summary-lastName').textContent = lastName || 'N/A';
    document.getElementById('summary-email').textContent = email || 'N/A';
    document.getElementById('summary-phone').textContent = phone || 'N/A';
    document.getElementById('summary-businessName').textContent = businessName || 'N/A';

    // Format and display the timestamp
    if (timestamp) {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        document.getElementById('summary-timestamp').textContent = date.toLocaleDateString('en-US', options);
    } else {
        document.getElementById('summary-timestamp').textContent = 'N/A';
    }
});