const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-GHP-ET-WEB-FT-SF/events';
const state = { parties: [] };

const partyListItems = document.getElementById('party-list-items');
const addPartyForm = document.getElementById('add-party-form');

// Fetch parties on page load
fetchParties();

// Add party form submit event listener
addPartyForm.addEventListener('submit', addParty);

// Function to fetch parties from the API
function fetchParties() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const parties = data.parties;
      state.parties = data;
      renderParties();
    })
    
}

// Function to add a new party
function addParty(event) {
  event.preventDefault();

  const partyData = {
    name: document.getElementById('party-name').value,
    date: document.getElementById('party-date').value,
    time: document.getElementById('party-time').value,
    location: document.getElementById('party-location').value,
    description: document.getElementById('party-description').value
  };

  // Send a POST request to the API to create a new party
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(partyData)
  })
    .then(response => response.json())
    .then(() => {
      fetchParties(); // Refresh the party list
      clearForm(); // Clear the form fields
    })
    .catch(error => console.error('Error adding party:', error));
}

// Function to delete a party
function deleteParty(eventId) {
  // Send a DELETE request to the API to remove the specified party
  fetch(`<span class="math-inline">\{API\_URL\}/</span>{eventId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(() => fetchParties()) // Refresh the party list
    .catch(error => console.error('Error deleting party:', error));
}

// Function to render the list of parties
function renderParties() {
  fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    const parties = data.parties; // Extract the array of parties from the response data
    state.parties = parties;
    renderParties();
  })
  .catch(error => console.error('Error fetching parties:', error));
}

function renderParties() {
  partyListItems.textContent = ''; // Clear existing content
}
  if (state.parties.length === 0) {
    // Display a message if no parties are found
    const noPartiesMessage = document.createElement('p');
    noPartiesMessage.textContent = 'No parties found.';
    partyListItems.appendChild(noPartiesMessage);
  } else {
    // Create and append a DOM element for each party
    for (const party of state.parties) {
      const partyElement = createPartyElement(party); // Pass the party object to createPartyElement
      partyListItems.appendChild(partyElement);
    }
  }
 if (state.parties && Array.isArray(state.parties)) {
    // If state.parties is an array, iterate over it
    for (const party of state.parties) {
      const partyElement = createPartyElement(party);
      partyListItems.appendChild(partyElement);
    }
  } else {
    // If state.parties is not an array, handle the error
    console.error('Error: state.parties is not an iterable object');
  }
