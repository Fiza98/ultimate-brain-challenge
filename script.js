const quizImage = document.getElementById("quiz-image");

const questions = [
    { question: "Which planet is the hottest?", options: ["Mars", "Venus", "Mercury", "Jupiter"], answer: "Venus", image: "src/assets/2.jpg" },

    { question: "What comes next in this pattern: 2, 4, 8, __?", options: ["12", "14", "16", "18"], answer: "16", image: "src/assets/3.jpg"  },

    { question: "If A is taller than B, and B is taller than C, who is the shortest?", options: ["A", "B", "C", "None"], answer: "C", image: "src/assets/4.jpg"  },

    { question: "Lightning never strikes the same place twice – Science or Myth?", options: ["Science", "Myth"], answer: "Myth", image: "src/assets/5.jpg"  },

    { question: "What is the square root of 144?", options: ["10", "11", "12", "14"], answer: "12", image: "src/assets/6.jpg"  },

    { question: "Which of these is a renewable energy source?", options: ["Coal", "Oil", "Solar", "Gas"], answer: "Solar", image: "src/assets/7.jpg"  },

    { question: "What is the past tense of 'run'?", options: ["Runned", "Ran", "Running", "Runs"], answer: "Ran", image: "src/assets/8.jpg"  },

    { question: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2", "NaCl"], answer: "H2O", image: "src/assets/9.jpg"  },

    { question: "Solve: 15 ÷ 3 + 2 × 4 = ?", options: ["11", "12", "14", "18"], answer: "14", image: "src/assets/10.jpg"  },

    { question: "Which part of the plant absorbs water?", options: ["Stem", "Leaf", "Flower", "Root"], answer: "Root", image: "src/assets/11.jpg"  }

];

let currentQuestionIndex = 0;
let score = 0;
let playerName = "";
let answered = false;

// 🎵 Load Sounds
const bgMusic = new Audio("src/assets/bg-music.mp3");
const correctSound = new Audio("src/assets/correct.mp3");
const wrongSound = new Audio("src/assets/wrong.mp3");
const clickSound = new Audio("src/assets/click.mp3");
const winSound = new Audio("src/assets/win.mp3");

// Set Background Music to Loop
bgMusic.loop = true;
bgMusic.volume = 0.5;

const nameInput = document.getElementById("player-name");
const startButton = document.getElementById("start-quiz");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const leaderboardList = document.getElementById("leaderboard-list");

startButton.addEventListener("click", () => {
    if (nameInput.value.trim() === "") {
        alert("Please enter your name!");
        return;
    }
    clickSound.play();
    playerName = nameInput.value.trim();
    nameInput.style.display = "none";
    startButton.style.display = "none";
    
    bgMusic.play();
    loadQuestion();
});

function loadQuestion() {
    answered = false; // Reset answered flag

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    
    optionsElement.innerHTML = "";
    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.onclick = () => checkAnswer(button, option);
        optionsElement.appendChild(button);
    });

    // Reset button colors
    document.querySelectorAll(".option-btn").forEach(btn => {
        btn.style.backgroundColor = "";
    });

    // Smooth Fade Effect for Image Transition
    if (currentQuestion.image) {
        quizImage.style.opacity = "0"; // Start fade-out
        setTimeout(() => {
            quizImage.src = currentQuestion.image;
            quizImage.style.opacity = "1"; // Fade back in
        }, 500);
    }
}


function checkAnswer(button, selectedAnswer) {
    if (answered) return;

    const correctAnswer = questions[currentQuestionIndex].answer;
    answered = true;

    if (selectedAnswer === correctAnswer) {
        button.style.backgroundColor = "#2ecc71";
        correctSound.play();
        score++;
    } else {
        button.style.backgroundColor = "#e74c3c";
        wrongSound.play();
    }

    setTimeout(() => {
        nextQuestion();
    }, 1000);
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        answered = false;
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    winSound.play();
    alert(`${playerName}, you completed the quiz! Your Score: ${score}`);
    updateLeaderboard(playerName, score);
    
// Set Final Image
    quizImage.src = "src/assets/final.jpg"; // Change to your final image
    quizImage.style.opacity = "1"; // Make sure it appears

    bgMusic.pause();
    bgMusic.currentTime = 0;

    restartGame();
}

function updateLeaderboard(name, score) {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    
    // Add new entry
    leaderboard.push({ name, score });

    // Sort by highest score
    leaderboard.sort((a, b) => b.score - a.score);

    // Save to localStorage
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    // Update leaderboard display
    displayLeaderboard();
}

function displayLeaderboard() {
    leaderboardList.innerHTML = ""; // Clear existing list
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    leaderboard.forEach(entry => {
        const listItem = document.createElement("li");
        listItem.textContent = `${entry.name}: ${entry.score} points`;
        leaderboardList.appendChild(listItem);
    });
}

// Load leaderboard when the page starts
window.onload = function() {
    displayLeaderboard();
};

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    playerName = "";

    nameInput.value = "";
    nameInput.style.display = "block";
    startButton.style.display = "block";
    questionElement.textContent = "";
    optionsElement.innerHTML = "";
    
    // Reload leaderboard after restart
    displayLeaderboard();
}

