import { getMembers } from './data-handler.js';

// Define the URL for the members data file
const membersURL = 'data/members.json';

// Get references to the DOM elements
const container = document.getElementById('members-container');
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');

/**
 * Creates and displays the HTML for each member.
 * @param {Array} members - An array of member objects.
 */
const displayMembers = (members) => {
    container.innerHTML = ''; // Clear any existing content

    members.forEach(member => {
        const card = document.createElement('section');
        const imageSrc = member.image_file_name.includes('http') ? member.image_file_name : member.website_url;
        
        card.innerHTML = `
            <img src="${imageSrc}" alt="Logo of ${member.name}" loading="lazy" width="150" height="100">
            <h2>${member.name}</h2>
            <p class="address">${member.address}</p>
            <p class="phone">${member.phone_number}</p>
            <a href="${member.website_url}" target="_blank">${member.website_url}</a>
        `;
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
    const members = await getMembers(membersURL);
    
    if (members) {
        displayMembers(members);
    } else {
        container.innerHTML = '<p>Sorry, we could not load the member directory at this time. Please try again later.</p>';
    }

    setupViewToggle();
};

// Run the initialization function
initialize();