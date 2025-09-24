import { getMembers } from './data-handler.js';


const membersURL = 'data/members.json';


const container = document.getElementById('cards-container'); 


/**
 * Displays member cards in the container.
 * @param {Array} members
 */
const displayMemberCards = (members) => {
    container.innerHTML = ''; 

    members.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('member-card'); 

        card.innerHTML = `
            <h2>${member.name}</h2>
            <hr>
            <div class="member-card-container">
                <img src="${member.image_file_name}" alt="Logo of ${member.name}" loading="lazy" width="150" height="100">
                <div class="member-card-details">
                    <p> ${member.email}</p>
                    <p> ${member.phone_number}</p>
                    <p style="word-break: break-all;"> <a href="${member.website_url}" target="_blank">${member.website_url}</a></p>
                </div>
            </div>

        `;
        container.appendChild(card);
    });
};


const initialize = async () => {
    const members = await getMembers(membersURL);
    
    if (members) {
        displayMemberCards(members);
    } else {
        container.innerHTML = '<p>Erro ao carregar os dados. Tente novamente mais tarde.</p>';
    }
};


initialize();