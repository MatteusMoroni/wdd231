document.addEventListener('DOMContentLoaded', () => {
    // 1. Logic for the visit message using localStorage
    const messageContainer = document.getElementById('visitor-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    if (!lastVisit) {
        messageContainer.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
        const lastVisitDate = parseInt(lastVisit, 10);
        const daysSinceLastVisit = Math.floor((now - lastVisitDate) / (1000 * 60 * 60 * 24));

        if (daysSinceLastVisit < 1) {
            messageContainer.textContent = 'Back so soon! Awesome!';
        } else {
            const dayText = daysSinceLastVisit === 1 ? 'day' : 'days';
            messageContainer.textContent = `You last visited ${daysSinceLastVisit} ${dayText} ago.`;
        }
    }

    // Save the current visit date to localStorage
    localStorage.setItem('lastVisit', now.toString());


    // 2. Logic to fetch and display data from JSON
    const gallery = document.getElementById('gallery');
    const jsonUrl = 'data/places.json';

    async function getPlacesData() {
        try {
            const response = await fetch(jsonUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayPlaces(data.places);
        } catch (error) {
            console.error('Could not fetch places data:', error);
            gallery.innerHTML = '<p>Sorry, we could not load the places of interest at this time.</p>';
        }
    }

    function displayPlaces(places) {
        gallery.innerHTML = ''; // Clear any existing content

        places.forEach(place => {
            const card = document.createElement('figure');
            card.className = 'card';

            const img = document.createElement('img');
            img.src = place.image;
            img.alt = `Image of ${place.name}`;
            img.loading = 'lazy'; // Attribute for lazy loading

            const figcaption = document.createElement('figcaption');
            
            const name = document.createElement('h2');
            name.textContent = place.name;
            
            const address = document.createElement('address');
            address.textContent = place.address;

            const description = document.createElement('p');
            description.textContent = place.description;

            const button = document.createElement('button');
            button.textContent = 'Learn More';

            figcaption.appendChild(name);
            figcaption.appendChild(address);
            figcaption.appendChild(description);
            figcaption.appendChild(button);

            card.appendChild(img);
            card.appendChild(figcaption);
            
            gallery.appendChild(card);
        });
    }

    getPlacesData();
});