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
    },
    {
        type: "fill_in_the_blank",
        question: "What is 8 / 2 = ___?",
        correctAnswer: "4"
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
const submitButton = document.getElementById("submit-button");
const answerInput = document.getElementById("answer-input");


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
    const resultText = document.getElementById("result");

    if (currentQuestion < questions.length) {
        const currentQ = questions[currentQuestion];
        questionText.textContent = currentQ.question;

        if (currentQ.type === "fill_in_the_blank") {
            answerInput.value = "";
            answerInput.placeholder = "Your Answer";
            submitButton.style.display = "inline-block";
            answerInput.style.display = "block";
        } else {
            answerInput.style.display = "none";
            submitButton.style.display = "none";
        }

        resultText.textContent = "";
    } else {
        showFinalScore();
    }
}

function checkAnswer(selectedAnswer) {
    const currentQ = questions[currentQuestion];
    if (currentQ.type === "multiple_choice") {
        if (selectedAnswer === currentQ.correctAnswer) {
            score++;
        }
    } else if (currentQ.type === "fill_in_the_blank") {
        const userAnswer = answerInput.value.trim().toLowerCase();
        if (userAnswer === currentQ.correctAnswer.toLowerCase()) {
            score++;
        }
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

submitButton.addEventListener("click", () => {
    const userAnswer = answerInput.value.trim();
    if (userAnswer !== "") {
        checkAnswer(userAnswer);
    }
});

loadQuestion();