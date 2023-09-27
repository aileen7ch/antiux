const questions = [
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        correctAnswer: 1
    },
    {
        question: "What is 5 - 3?",
        choices: ["1", "2", "3", "4"],
        correctAnswer: 1
    },
    {
        question: "What is 4 * 6?",
        choices: ["18", "24", "30", "36"],
        correctAnswer: 1
    }
];

let currentQuestion = 0;
let score = 0;

const homePage = document.getElementById("home-page");
const quizPage = document.getElementById("quiz-page");
const scorePage = document.getElementById("score-page");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const finalScoreElement = document.getElementById("final-score");
const totalQuestionsElement = document.getElementById("total-questions");

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    homePage.style.display = "none";
    quizPage.style.display = "block";
    loadQuestion();
}

function restartQuiz() {
    scorePage.style.display = "none";
    quizPage.style.display = "none";
    homePage.style.display = "block";
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices");
    const resultText = document.getElementById("result");

    if (currentQuestion < questions.length) {
        questionText.textContent = questions[currentQuestion].question;

        choicesList.innerHTML = "";
        for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
            const choice = questions[currentQuestion].choices[i];
            const choiceButton = document.createElement("button");
            choiceButton.textContent = choice;
            choiceButton.onclick = function() {
                checkAnswer(i);
            };
            choicesList.appendChild(document.createElement("li")).appendChild(choiceButton);
        }

        resultText.textContent = "";
    } else {
        showFinalScore();
    }
}

function checkAnswer(selectedIndex) {
    if (selectedIndex === questions[currentQuestion].correctAnswer) {
        score++;
    }
    currentQuestion++;
    loadQuestion();
}

function showFinalScore() {
    quizPage.style.display = "none";
    scorePage.style.display = "block";
    finalScoreElement.textContent = score;
    totalQuestionsElement.textContent = questions.length;
}
