const questions = [
    { 
        question: "Which planet is the hottest?", 
        options: ["Mars", "Venus", "Mercury", "Jupiter"], 
        answer: "Venus"
    },
    { 
        question: "What comes next in this pattern: 2, 4, 8, __?", 
        options: ["12", "14", "16", "18"], 
        answer: "16"
    },
    { 
        question: "If A is taller than B, and B is taller than C, who is the shortest?", 
        options: ["A", "B", "C", "None"], 
        answer: "C"
    },
    { 
        question: "Lightning never strikes the same place twice – Science or Myth?", 
        options: ["Science", "Myth"], 
        answer: "Myth"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const bgMusic = document.getElementById("bg-music");

bgMusic.play();

function loadQuestion() {
    // Reset next button
    nextButton.style.display = "none";

    // Load question and options
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (selectedAnswer === correctAnswer) {
        correctSound.play();
        score++;
    } else {
        wrongSound.play();
    }

    nextButton.style.display = "block"; // Show next button
    scoreElement.textContent = "Score: " + score;
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        alert("Quiz Completed! Your Score: " + score);
        currentQuestionIndex = 0;
        score = 0;
    }

    loadQuestion();
});

// Load the first question
loadQuestion();
