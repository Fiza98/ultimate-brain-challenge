import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import correctSound from "@/assets/correct.mp3";
import wrongSound from "@/assets/wrong.mp3";
import bgMusic from "@/assets/bg-music.mp3";
import quizImage from "@/assets/quiz-image.jpg";
import { motion } from "framer-motion";

const questions = [
  {
    question: "Which planet is the hottest?",
    options: ["Mars", "Venus", "Mercury", "Jupiter"],
    answer: "Venus",
  },
  {
    question: "What comes next in this pattern: 2, 4, 8, __?",
    options: ["12", "14", "16", "18"],
    answer: "16",
  },
  {
    question: "If A is taller than B, and B is taller than C, who is the shortest?",
    options: ["A", "B", "C", "None"],
    answer: "C",
  },
  {
    question: "Lightning never strikes the same place twice – Science or Myth?",
    options: ["Science", "Myth"],
    answer: "Myth",
  },
  {
    question: "How do you prefer to learn?",
    options: ["Reading", "Watching Videos", "Doing Hands-On Activities"],
    answer: "",
  },
];

const leaderboardData = [];

export default function UltimateBrainChallenge() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [buttonEffect, setButtonEffect] = useState("");
  const bgAudio = new Audio(bgMusic);

  useEffect(() => {
    bgAudio.loop = true;
    bgAudio.play();
    return () => bgAudio.pause();
  }, []);

  const handleAnswerClick = (option) => {
    const newAnswers = [...selectedAnswers, option];
    setSelectedAnswers(newAnswers);
    
    const isCorrect = option === questions[currentQuestion].answer;
    const sound = new Audio(isCorrect ? correctSound : wrongSound);
    sound.play();
    
    setButtonEffect(isCorrect ? "bg-green-500" : "bg-red-500");
    setTimeout(() => setButtonEffect(""), 500);
    
    if (questions[currentQuestion].answer && isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      leaderboardData.push({ name: "Player", score: score + 1 });
      setShowLeaderboard(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {!showLeaderboard ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md p-6 text-center shadow-lg">
            <CardContent>
              <img src={quizImage} alt="Quiz" className="w-full h-40 object-cover rounded mb-4" />
              <h2 className="text-xl font-bold mb-4">{questions[currentQuestion].question}</h2>
              <div className="space-y-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    className={`w-full transition-all duration-300 hover:bg-blue-600 text-white ${buttonEffect}`}
                    onClick={() => handleAnswerClick(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md p-6 text-center shadow-lg">
            <CardContent>
              <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
              <ul>
                {leaderboardData.map((entry, index) => (
                  <li key={index} className="text-lg">{entry.name}: {entry.score} points</li>
                ))}
              </ul>
              <Button
                className="mt-4 bg-green-500 hover:bg-green-600 text-white"
                onClick={() => window.location.reload()}
              >
                Play Again
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
