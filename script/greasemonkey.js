// ==UserScript==
// @name         Network Contact Details
// @namespace    http://tampermonkey.net/
// @version      2024-11-16
// @description  Display contact details on LinkedIn users profile
// @author       You
// @match        https://www.linkedin.com/*
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    // Variables to track the current URL and dismissed state
    let currentUrl = window.location.href;
    let isDismissed = false;

    // Function to initialize the script
    const initializeScript = async () => {
        // Skip re-initialization if the container is dismissed
        if (isDismissed) return;

        // Check if the container already exists and remove it to avoid duplication
        const existingContainer = document.getElementById('api-info-container');
        if (existingContainer) {
            existingContainer.remove();
        }

        // Extract the current LinkedIn user ID from the URL
        let currentUser = window.location.href.split('/in/')[1]?.replace("/", "");

        // API URL
        const apiUrl = `http://ec2-18-216-224-206.us-east-2.compute.amazonaws.com:3000/connections/linkedin/${currentUser}`;

        // Create a container to display the API data
        const container = document.createElement('div');
        container.id = 'api-info-container';
        container.style.position = 'fixed';
        container.style.bottom = '20px';
        container.style.left = '20px';
        container.style.backgroundColor = '#242424';
        container.style.border = '1px solid rgba(227, 199, 86, 0.8)';
        container.style.padding = '15px';
        container.style.boxShadow = '0px 0px 10px 2px rgba(227, 199, 86, 0.8)';
        container.style.zIndex = '1000';
        container.style.borderRadius = '5px';
        container.style.color = 'white';
        container.style.fontSize = '18px';
        container.style.display = 'none'; // Hidden until data is loaded

        // Create a title element
        const title = document.createElement('div');
        title.textContent = 'WhoRU?';
        title.style.fontSize = '18px';
        title.style.fontWeight = 'bold';
        title.style.textAlign = 'center';
        title.style.marginBottom = '10px';
        title.style.color = '#0077B5';
        title.style.borderBottom = '2px solid #0077B5';
        container.appendChild(title);

        // Create a content area for the API data
        const contentArea = document.createElement('div');
        contentArea.id = 'api-content';
        container.appendChild(contentArea);

        // Create a dismiss button
        const dismissButton = document.createElement('button');
        dismissButton.textContent = 'Dismiss';
        dismissButton.style.border = 'none';
        dismissButton.style.backgroundColor = '#0077B5';
        dismissButton.style.color = '#fff';
        dismissButton.style.fontSize = '14px';
        dismissButton.style.fontWeight = 'bold';
        dismissButton.style.padding = '5px 10px';
        dismissButton.style.borderRadius = '5px';
        dismissButton.style.cursor = 'pointer';
        dismissButton.style.marginTop = '10px';
        dismissButton.style.display = 'block';
        dismissButton.addEventListener('mouseover', () => {
            dismissButton.style.backgroundColor = '#005785';
        });
        dismissButton.addEventListener('mouseout', () => {
            dismissButton.style.backgroundColor = '#0077B5';
        });
        dismissButton.addEventListener('click', () => {
            container.style.display = 'none'; // Hide the container
            isDismissed = true; // Mark as dismissed
        });
        container.appendChild(dismissButton);

        // Append the container to the body
        document.body.appendChild(container);

        // Fetch data from the API
        if (currentUrl.includes('in/') && currentUser) {
            await GM_xmlhttpRequest({
                method: 'GET',
                url: apiUrl,
                onload: function (response) {
                    const data = JSON.parse(response.responseText);
                    console.log('API Data:', data);
                    if (data?.error) {
                        container.style.display = 'none'; // hide the container
                    } else {
                        contentArea.innerHTML = `
                            <strong>Name:</strong> ${data.name}<br>
                            <strong>Event:</strong> ${data.event}<br>
                            <strong>Note:</strong> ${data.notes}<br>
                        `;
                        container.style.display = 'block'; // Show the container
                    }
                },
                onerror: function (error) {
                    console.error('API Error:', error);
                }
            });
        }
    };

    // Function to handle URL changes
    const handleUrlChange = () => {
        if (window.location.href !== currentUrl) {
            currentUrl = window.location.href; // Update the current URL
            isDismissed = false; // Reset dismissed state
            initializeScript(); // Re-run the script
        }
    };

    // Observe URL changes
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    // Observe SPA changes by monitoring the document's title
    const observer = new MutationObserver(handleUrlChange);
    observer.observe(document.querySelector('title'), { childList: true });

    // Initialize the script on page load
    window.onload = () => {
        initializeScript();
    };
})();
