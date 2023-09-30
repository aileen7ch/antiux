var welcomePage = document.getElementById('welcomePage');
var proceedToIntroButton = document.getElementById('proceedToIntro');

var introPage = document.getElementById('introPage');
var proceedToLoginButton = document.getElementById('proceedToLogin');

var loginPage = document.getElementById('loginPage');
var loginForm = document.getElementById('loginForm');

var galleryPage = document.getElementById('galleryPage');
var bidButtons = document.querySelectorAll('.bidButton');
var instructionsLink = document.getElementById('instructionsLink');

var restartTimerButton = document.getElementById('restartTimer');
var warningMessage = document.getElementById('warningMessage');
var timerDisplay = document.getElementById('timer');

var remainingTime = 30;

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
    }
}

// Function to update the timer display
function updateTimerDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

restartTimerButton.addEventListener('click', restartTimer);

// Function to restart the timer
function restartTimer() {
    remainingTime = 30; // Reset the timer to 3 minutes
    updateTimerDisplay();
    warningMessage.textContent = ''; // Clear the warning message
}

proceedToIntroButton.addEventListener('click', goToIntro);

// Function to proceed to intro button click
function goToIntro() {
    // Hide the welcome page and show the intro page
    welcomePage.style.display = 'none';
    introPage.style.display = 'block';
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
    remainingTime = 30;

    // Function to update the timer every second
    setInterval(function() {
        if (remainingTime > 0) {
            remainingTime--; // Decrease remaining time by 1 second
            updateTimerDisplay(); // Update the timer display
        }
    }, 1000);
}

// Function to handle instructions link click
instructionsLink.addEventListener('click', function() {
    window.alert("Your job is to go through this art gallery website and bid on these specific artpieces with the following prices:\n
        1. Artwork 1 - $20000000\n
        2. Artwork 3 - $42000000\n
        3. Artwork 5 - $68270830\n
        4. Artwork 6 - $59000000\n
        5. Artwork 8 - $92700000\n
        6. Artwork 9 - $26039999\n
        7. Artwork 10 - $38000000\n
        8. Artwork 14 - $27900000\n
        If a certain piece of artwork's current bid is higher than the specified amount above, please bid with $999000000, because Mrs. Doe knows no piece of artwork's bid price will be higher than that amount!\n
        Okay, thanks!");
});
