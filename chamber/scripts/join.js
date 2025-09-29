
document.addEventListener('DOMContentLoaded', function() {
    

    const membershipData = {
        1: {
            title: 'Non Profit Membership Level',
            content: `
                <h3>Non Profit Membership</h3>
                <div class="dialog-content">
                    <p><strong>Perfect for:</strong> Non-profit organizations and community groups</p>
                    
                    <h4>Benefits Include:</h4>
                    <ul>
                        <li>Basic directory listing</li>
                        <li>Access to networking events</li>
                        <li>Monthly newsletter subscription</li>
                        <li>Community resource sharing</li>
                        <li>Volunteer opportunity postings</li>
                    </ul>
                    
                    <div class="pricing">
                        <span class="price">FREE</span>
                        <span class="price-note">Always free for qualified organizations</span>
                    </div>
                </div>
            `
        },
        2: {
            title: 'Bronze Membership Level',
            content: `
                <h3>Bronze Membership</h3>
                <div class="dialog-content">
                    <p><strong>Perfect for:</strong> Small businesses and startups</p>
                    
                    <h4>Benefits Include:</h4>
                    <ul>
                        <li>Enhanced directory listing with logo</li>
                        <li>Access to all networking events</li>
                        <li>Business referral opportunities</li>
                        <li>Monthly newsletter and updates</li>
                        <li>Basic marketing support</li>
                        <li>1 free workshop per quarter</li>
                    </ul>
                    
                    <div class="pricing">
                        <span class="price">$50/month</span>
                        <span class="price-note">Billed annually - $500/year</span>
                    </div>
                </div>
            `
        },
        3: {
            title: 'Silver Membership Level',
            content: `
                <h3>Silver Membership</h3>
                <div class="dialog-content">
                    <p><strong>Perfect for:</strong> Growing businesses and established companies</p>
                    
                    <h4>Benefits Include:</h4>
                    <ul>
                        <li>Premium directory listing with gallery</li>
                        <li>Priority event registration</li>
                        <li>Advanced business referral network</li>
                        <li>Quarterly business spotlights</li>
                        <li>Professional development workshops</li>
                        <li>Marketing co-op opportunities</li>
                        <li>Government liaison support</li>
                    </ul>
                    
                    <div class="pricing">
                        <span class="price">$100/month</span>
                        <span class="price-note">Billed annually - $1,000/year</span>
                    </div>
                </div>
            `
        },
        4: {
            title: 'Gold Membership Level',
            content: `
                <h3>Gold Membership</h3>
                <div class="dialog-content">
                    <p><strong>Perfect for:</strong> Large corporations and industry leaders</p>
                    
                    <h4>Benefits Include:</h4>
                    <ul>
                        <li>Featured directory listing with video</li>
                        <li>Exclusive VIP events and executive networking</li>
                        <li>Leadership council participation</li>
                        <li>Monthly business features in all media</li>
                        <li>Custom marketing campaigns</li>
                        <li>Government affairs advocacy</li>
                        <li>Unlimited workshop access</li>
                        <li>1-on-1 business consulting sessions</li>
                        <li>Trade mission opportunities</li>
                    </ul>
                    
                    <div class="pricing">
                        <span class="price">$200/month</span>
                        <span class="price-note">Billed annually - $2,000/year</span>
                    </div>
                </div>
            `
        }
    };

    function openDialog(dialogId, membershipLevel) {
        const dialog = document.getElementById(dialogId);
        const data = membershipData[membershipLevel];
        
        if (dialog && data) {
            dialog.innerHTML = `
                <button class="dialog-close-btn" onclick="closeDialog('${dialogId}')">&times;</button>
                ${data.content}
            `;
            dialog.showModal();
            dialog.classList.add('dialog-open');
            document.body.style.overflow = 'hidden';
            
            const closeBtn = dialog.querySelector('.dialog-close-btn');
            if (closeBtn) {
                closeBtn.focus();
            }
        }
    }

    window.closeDialog = function(dialogId) {
        const dialog = document.getElementById(dialogId);
        if (dialog) {
            dialog.close();
            dialog.classList.remove('dialog-open');
            document.body.style.overflow = 'auto';
        }
    };

    const openButtons = [
        { id: 'openDialogBtn-1', dialog: 'infoDialog-1', level: 1 },
        { id: 'openDialogBtn-2', dialog: 'infoDialog-2', level: 2 },
        { id: 'openDialogBtn-3', dialog: 'infoDialog-3', level: 3 },
        { id: 'openDialogBtn-4', dialog: 'infoDialog-4', level: 4 }
    ];

    openButtons.forEach(button => {
        const btnElement = document.getElementById(button.id);
        if (btnElement) {
            btnElement.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openDialog(button.dialog, button.level);
            });
        }
    });

    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'DIALOG') {
            const rect = e.target.getBoundingClientRect();
            const isInDialog = (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            );
            
            if (!isInDialog) {
                e.target.close();
                e.target.classList.remove('dialog-open');
                document.body.style.overflow = 'auto';
            }
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openDialogs = document.querySelectorAll('dialog[open]');
            openDialogs.forEach(dialog => {
                dialog.close();
                dialog.classList.remove('dialog-open');
                document.body.style.overflow = 'auto';
            });
        }
    });

    // --- NEW FORM SUBMISSION LOGIC ---
    const form = document.getElementById('membership-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            // Prevent the default form submission behavior
            event.preventDefault();

            // Set the value of the hidden timestamp field to the current date and time
            const timestampInput = document.getElementById('timestamp');
            if (timestampInput) {
                timestampInput.value = new Date().toISOString();
            }

            // Create a FormData object from the form
            const formData = new FormData(form);
            
            // Create a URLSearchParams object to build the query string
            const params = new URLSearchParams(formData);

            // Redirect to the thank you page with the form data as URL parameters
            window.location.href = `thankyou.html?${params.toString()}`;
        });
    }
});