var welcomePage = document.getElementById('welcomePage');
var proceedToIntroButton = document.getElementById('proceedToIntro');

var introPage = document.getElementById('introPage');
var proceedToLoginButton = document.getElementById('proceedToLogin');

var loginPage = document.getElementById('loginPage');
var loginForm = document.getElementById('loginForm');

var galleryPage = document.getElementById('galleryPage');
var bidButtons = document.querySelectorAll('.bidButton');
var instructionsContainer = document.getElementById('instructionsContainer');
var instructionsLink = document.getElementById('instructionsLink');

var restartTimerButton = document.getElementById('restartTimer');
var warningMessage = document.getElementById('warningMessage');
var timerDisplay = document.getElementById('timer');
var remainingTime = 180;

bidButtons.forEach(function(button) {
    button.addEventListener('click', handleBidButtonClick);
});

function handleBidButtonClick(event) {
    if (remainingTime > 0) {
        var artworkElement = event.target.closest('.artwork');

        var currentBidElement = artworkElement.querySelector('.currentBid span');
        var currentBid = Number(currentBidElement.textContent);
        var newBid = Number(artworkElement.querySelector('.bidInput').value);

        if (newBid > currentBid) {
            currentBidElement.textContent = newBid;
            console.log('Bid placed!');
        } else {
            alert('Your bid must be greater than the current bid.');
        }
    } else {
        warningMessage.textContent = 'No more time!';
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

restartTimerButton.addEventListener('click', restartTimer);

function restartTimer() {
    remainingTime = 180;
    updateTimerDisplay();
    warningMessage.textContent = '';
}

proceedToIntroButton.addEventListener('click', goToIntro);

function goToIntro() {
    welcomePage.style.display = 'none';
    introPage.style.display = 'block';
}

proceedToLoginButton.addEventListener('click', goToLogin);

function goToLogin() {
    introPage.style.display = 'none';
    loginPage.style.display = 'block';
}

loginForm.addEventListener('submit', submitLogin);

function submitLogin(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === 'user' && password === 'pass') {
        loginPage.style.display = 'none';
        galleryPage.style.display = 'block';

        initializeTimer();
    } else {
        alert('Invalid username or password.');
    }
}

function initializeTimer() {
    remainingTime = 180;

    setInterval(function() {
        if (remainingTime > 0) {
            remainingTime--;
            updateTimerDisplay();
        }
    }, 1000);
}

instructionsLink.addEventListener('click', function() {
    const message = `Your job is to go through this art gallery website and bid on these specific artworks with the following prices:\n
    1. Artwork 1 - $20000000\n
    2. Artwork 3 - $42000000\n
    3. Artwork 5 - $68000000\n
    4. Artwork 6 - $59000000\n
    5. Artwork 8 - $92000000\n
    6. Artwork 9 - $26000000\n
    7. Artwork 10 - $38000000\n
    8. Artwork 14 - $27000000\n
    If the current bid for a certain art piece is higher than the specified amount above, please bid with $999999999, because no bid amount will be higher than that price!\n
    Okay, thanks!`;

    instructionsContainer.textContent = message;

    instructionsContainer.style.display = 'block';
});

var finishButton = document.getElementById('finishButton');
var thankYouMessage = document.getElementById('thankYouMessage');

finishButton.addEventListener('click', function() {
    thankYouMessage.style.display = 'block';
    document.getElementById('galleryPage').style.display = 'none';
});
