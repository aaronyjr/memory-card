import { useState } from "react";
import "./App.css";
import { LeagueCards } from "./components/LeagueCards";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  if (score > highScore) {
    setHighScore(highScore + 1);
  }

  return (
    <div>
      <h1>Memory Game</h1>
      <p>
        Get points by clicking on an image, but don't click on an image more
        than once!
      </p>
      <div>
        <p>Score: {score}</p>
        <p>High score: {highScore}</p>
      </div>
      <LeagueCards
        score={score}
        setScore={setScore}
        highScore={highScore}
        setHighScore={setHighScore}
      />
    </div>
  );
}

export default App;
