import { useState } from "react";
import "./App.css";
import { LeagueCards } from "./components/LeagueCards";
import "./styles/HomePageStyle.css"

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  if (score > highScore) {
    setHighScore(score);
  }

  return (
    <div className="container">
      <h1>Memory Game</h1>
      <p>
        Get points by clicking on an image, but don&apos;t click on an image more
        than once!
      </p>
      <div className="score-container">
        <div className="score">Score: {score}</div>
        <div className="score">High Score: {highScore}</div>
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
