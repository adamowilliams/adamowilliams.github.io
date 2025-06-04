// DOM Elements
const frameworksContainer = document.getElementById('frameworks-container');

// Display frameworks
function displayFrameworks(frameworks) {
    frameworksContainer.innerHTML = ''; // Clear existing content

    frameworks.forEach(framework => {
        const frameworkCard = document.createElement('div');
        frameworkCard.className = 'framework-card';

        frameworkCard.innerHTML = `
            <h3>${framework.title} ${framework.abbreviation ? `(${framework.abbreviation})` : ''}</h3>
            <p><strong>Category:</strong> ${framework.category || 'N/A'}</p>
            <p><strong>Legislator:</strong> ${framework.legislator || 'N/A'}</p>
        `;

        frameworksContainer.appendChild(frameworkCard);
    });
}

// Fetch frameworks from the backend API
async function fetchFrameworks() {
    try {
        const response = await fetch('http://localhost:8000/data'); // Backend API endpoint
        if (!response.ok) {
            throw new Error('Failed to fetch frameworks');
        }
        const data = await response.json();
        print(`Fetched ${data.length} frameworks from the backend.`);
        displayFrameworks(data);
    } catch (error) {
        console.error('Error fetching frameworks:', error);
        frameworksContainer.innerHTML = '<p>Error loading frameworks. Please try again later.</p>';
    }
}

// Initialize
function init() {
    fetchFrameworks(); // Fetch and display frameworks on page load
}

document.addEventListener('DOMContentLoaded', init);