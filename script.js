// Get the login form and the login, intro, gallery pages, timer, and warning message
var loginForm = document.getElementById('loginForm');
var introPage = document.getElementById('introPage');
var loginPage = document.getElementById('loginPage');
var galleryPage = document.getElementById('galleryPage');
var timerDisplay = document.getElementById('timer');
var warningMessage = document.getElementById('warningMessage');
var restartTimerButton = document.getElementById('restartTimer');

var remainingTime = 30; // Set initial timer state (30 seconds)
var bidButtons = document.querySelectorAll('.bidButton');   // Add event listeners to bid buttons
var proceedToLoginButton = document.getElementById('proceedToLogin');   // Get the proceed to login button

bidButtons.forEach(function(button) {
    button.addEventListener('click', handleBidButtonClick);
});

// Function to handle bid button click
function handleBidButtonClick(event) {
    if (remainingTime > 0) {
        // Get the parent artwork element
        var artworkElement = event.target.closest('.artwork');

        // Get the current bid and the new bid amount
        var currentBidElement = artworkElement.querySelector('.currentBid span');
        var currentBid = Number(currentBidElement.textContent);
        var newBid = Number(artworkElement.querySelector('.bidInput').value);

        // Check if the new bid is greater than the current bid
        if (newBid > currentBid) {
            // If it is, update the current bid
            currentBidElement.textContent = newBid;
            console.log('Bid placed!');
        } else {
            // Alert only if the bid is not valid
            alert('Your bid must be greater than the current bid.');
        }
    } else {
        warningMessage.textContent = 'No more time!';
        bidButtons.forEach(function(button) {
            button.disabled = true;
        });
    }
}

restartTimerButton.addEventListener('click', restartTimer);

// Function to restart the timer
function restartTimer() {
    remainingTime = 30; // Reset the timer to 3 minutes
    updateTimerDisplay();
    warningMessage.textContent = ''; // Clear the warning message
}

proceedToLoginButton.addEventListener('click', goToLogin);

// Function to proceed to login button click
function goToLogin() {
    // Hide the intro page and show the login page
    introPage.style.display = 'none';
    loginPage.style.display = 'block';
}

loginForm.addEventListener('submit', submitLogin);

// Function to handle login button click
function submitLogin(event) {
    // Prevent the page from reloading
    event.preventDefault();

    // Get the username and password
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Check the user's credentials (placeholder)
    if (username === 'user' && password === 'pass') {
        // If the credentials are valid, hide the login page and show the gallery page
        loginPage.style.display = 'none';
        galleryPage.style.display = 'block';

        // Initialize the timer
        initializeTimer();
    } else {
        alert('Invalid username or password.');
    }
}

// Function to initialize the timer
function initializeTimer() {
    // Set initial timer state (30 seconds)
    var remainingTime = 30;

    // Function to update the timer display
    function updateTimerDisplay() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // Function to update the timer every second
    setInterval(function() {
        if (remainingTime > 0) {
            remainingTime--; // Decrease remaining time by 1 second
            updateTimerDisplay(); // Update the timer display
        }
    }, 1000);
}
