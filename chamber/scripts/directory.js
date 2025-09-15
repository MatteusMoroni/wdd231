// Define the URL for the members data file
const membersURL = 'data/members.json';

// Get references to the DOM elements to working with
const container = document.getElementById('members-container');
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');

/**
 * Fetches member data from the specified URL using async/await.
 * @returns {Promise<Array>} A promise that resolves to an array of member objects.
 */
const getMembers = async () => {
    try {
        const response = await fetch(membersURL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data; // The array of members
    } catch (error) {
        console.error('Error fetching member data:', error);
        // Display an error message to the user on the page
        container.innerHTML = '<p>Sorry, we could not load the member directory at this time. Please try again later.</p>';
    }
};

/**
 * Creates and displays the HTML for each member.
 * @param {Array} members - An array of member objects.
 */
const displayMembers = (members) => {
    // Clear any existing content
    container.innerHTML = ''; 

    members.forEach(member => {
        // Create the main section element for the card
        const card = document.createElement('section');

        const imageSrc = member.image_file_name.includes('http') ? member.image_file_name : member.website_url;


        // Populate the card with member data
        card.innerHTML = `
            <img src="${imageSrc}" alt="Logo of ${member.name}" loading="lazy" width="150" height="100">
            <h2>${member.name}</h2>
            <p class="address">${member.address}</p>
            <p class="phone">${member.phone_number}</p>
            <a href="${member.website_url}" target="_blank">${member.website_url}</a>

        `;

        // Append the new card to the container
        container.appendChild(card);
    });
};

/**
 * Sets up the event listeners for the view toggle buttons.
 */
const setupViewToggle = () => {
    gridBtn.addEventListener('click', () => {
        container.classList.remove('list-view');
        container.classList.add('grid-view');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    });

    listBtn.addEventListener('click', () => {
        container.classList.remove('grid-view');
        container.classList.add('list-view');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    });
};

/**
 * Main initialization function.
 */
const initialize = async () => {
    // Fetch the member data and wait for it to complete
    const members = await getMembers();
    
    // If members were successfully fetched, display them
    if (members) {
        displayMembers(members);
    }

    // Set up the button functionality
    setupViewToggle();
};

// Run the initialization function when the script loads
initialize();