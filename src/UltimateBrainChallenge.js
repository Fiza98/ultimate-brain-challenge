import { useState, useEffect } from "react";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import correctSound from "./assets/correct.mp3";
import wrongSound from "./assets/wrong.mp3";
import bgMusic from "./assets/bg-music.mp3";
import quizImage from "./assets/quiz-image.jpg";

const questions = [
  { question: "Which planet is the hottest?", options: ["Mars", "Venus", "Mercury", "Jupiter"], answer: "Venus" },
  { question: "What comes next: 2, 4, 8, __?", options: ["12", "14", "16", "18"], answer: "16" },
  { question: "If A > B and B > C, who is the shortest?", options: ["A", "B", "C", "None"], answer: "C" },
  { question: "Lightning never strikes the same place twice – Science or Myth?", options: ["Science", "Myth"], answer: "Myth" }
];

export default function UltimateBrainChallenge() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const bgAudio = new Audio(bgMusic);

  useEffect(() => {
    bgAudio.loop = true;
    bgAudio.play();
    return () => bgAudio.pause();
  }, []);

  const handleAnswerClick = (option) => {
    const isCorrect = option === questions[currentQuestion].answer;
    new Audio(isCorrect ? correctSound : wrongSound).play();
    
    if (isCorrect) setScore(score + 1);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowLeaderboard(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {!showLeaderboard ? (
        <Card>
          <img src={quizImage} alt="Quiz" className="w-full h-40 object-cover mb-4" />
          <h2 className="text-xl font-bold">{questions[currentQuestion].question}</h2>
          <div className="mt-4 space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <Button key={index} onClick={() => handleAnswerClick(option)}>{option}</Button>
            ))}
          </div>
        </Card>
      ) : (
        <Card>
          <h2 className="text-xl font-bold">Leaderboard</h2>
          <p className="text-lg">Score: {score} points</p>
          <Button onClick={() => window.location.reload()} className="mt-4 bg-green-500">
            Play Again
          </Button>
        </Card>
      )}
    </div>
  );
}
