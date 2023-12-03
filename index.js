// having trouble getting the buttons to actually function for adding or deleting parties. 
const events = [];
const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-GHP-ET-WEB-FT-SF/events';
const state = { parties: [] };
const partyListItems = document.getElementById('party-list-items');
const addPartyForm = document.getElementById('add-party-form');
const deleteButtons = document.querySelectorAll('.delete-button');

// Function to fetch events from API
async function fetchEvents() {
    const response = await fetch('API_URL');
    const data = await response.json();
    events.push(data);
}

// Function to render events
function renderEvents() {
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = '';

    for (const event of events) {
        const eventItem = document.createElement('li');
        eventItem.innerHTML = `
            <h2>${event.name}</h2>
            <p>
                <strong>Date:</strong> ${event.date}<br>
                <strong>Time:</strong> ${event.time}<br>
                <strong>Location:</strong> ${event.location}<br>
                <strong>Description:</strong> ${event.description || ''}
            </p>
            <button class="delete-button" data-id="${event.id}">Delete</button>
        `;

        const button = eventItem.querySelector('.delete-button');
        button.addEventListener('click', async () => {
            const eventId = button.dataset.id;

            // Send delete request to API
            await fetch(`${API_URL}/${eventId}`, { method: 'DELETE' });

            // Remove event from local storage
            events.splice(events.findIndex(event => event.id === eventId), 1);

            // Render events again
            renderEvents();
        });

        eventsList.appendChild(eventItem);
    }
}

// Function to handle add event form submission: not sure why or how to get the add buttton to function 
addPartyForm.addEventListener('submit', async (event) => {
   
    event.preventDefault();

    const formData = new FormData(event.target);

    // Send create request to API
    await fetch('API_URL', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData))
    });

    // Clear form
    event.target.reset();

    // Fetch and render events again
    await fetchEvents();
    renderEvents();
});

// Initial fetch and render
fetchEvents().then(renderEvents);