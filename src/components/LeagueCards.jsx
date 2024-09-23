/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { leagueChampions } from "../data/Champions";
import ReactParallaxTilt from "react-parallax-tilt";
import "../styles/CardStyle.css";
import ReactCardFlip from "react-card-flip";
import wrongSound from "../assets/sound_effects/wrongSound.mp3";
import correctSound from "../assets/sound_effects/correctSound.mp3";
import cardFlipSound from "../assets/sound_effects/cardFlipSound.mp3";
import cardBack from "../assets/images/card-back.jpg"
import beeSad from "../assets/images/bee-sad.png"
import happyPoro from "../assets/images/happy-poro.webp"

const BASE_URL =
  "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/";

export function LeagueCards({ score, setScore, highScore, setHighScore }) {
  const [championCards, setChampionCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState(new Set());
  const [restartGame, setRestartGame] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(true);

    setTimeout(() => {
      setIsFlipped(false);
    }, 1000);
  };

  useEffect(() => {
    setRestartGame(false);
    setScore(0)
    const listOfChampionNames = generateTenChampionNames();
    console.log(listOfChampionNames);

    const fetchImages = async () => {
      const cards = await Promise.all(
        listOfChampionNames.map(async (name) => {
          const imageUrl = `${BASE_URL}${name}_0.jpg`;
          const response = await fetch(imageUrl);
          if (!response.ok) throw new Error("Network response was not ok");

          const blob = await response.blob();
          const url = URL.createObjectURL(blob);

          return { name, imageUrl: url };
        })
      );
      setChampionCards(cards);
    };

    fetchImages();

    return () => {
      championCards.forEach((card) => URL.revokeObjectURL(card.imageUrl));
    };
  }, [restartGame]);

  return (
    <>
      {isGameOver && (
        <Popup
          message={score === championCards.length ? "You Win!" : "You Lose!"}
          setRestartGame={setRestartGame}
          setIsGameOver={setIsGameOver}
          imageUrl={score <= 7 ? beeSad : happyPoro}
        />
      )}

      {championCards.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2px",
          }}
        >
          {championCards.map((card, index) => (
            <ReactCardFlip key={index} isFlipped={isFlipped}>
              <ReactParallaxTilt>
                <div
                  onClick={() => {
                    checkWin(
                      championCards,
                      setChampionCards,
                      card.name,
                      selectedCards,
                      setSelectedCards,
                      setRestartGame,
                      score,
                      setScore,
                      highScore,
                      setHighScore,
                      setIsGameOver
                    );
                    handleFlip();
                  }}
                  className="card"
                  style={{
                    position: "relative",
                    textAlign: "center",
                  }}
                >
                  <img
                    className="card-image"
                    src={card.imageUrl}
                    alt={`${card.name} card`}
                    style={{
                      width: "80%",
                      maxHeight: "380px",
                    }}
                  />

                  <h3
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      margin: "0",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      padding: "5px",
                      borderRadius: "8px",
                    }}
                  >
                    {card.name}
                  </h3>
                </div>
              </ReactParallaxTilt>

              <div
                className="card"
                style={{
                  position: "relative",
                  textAlign: "center",
                }}
              >
                <img
                  className="card-image"
                  src={cardBack}
                  alt={`back of card`}
                  style={{
                    width: '90%',
                    maxHeight: "380px",
                  }}
                />
              </div>
            </ReactCardFlip>
          ))}
        </div>
      ) : (
        <p>Loading images...</p>
      )}
    </>
  );
}

function checkWin(
  championCards,
  setChampionCards,
  selectedChampion,
  selectedCards,
  setSelectedCards,
  setRestartGame,
  score,
  setScore,
  highScore,
  setHighScore,
  setIsGameOver
) {
  console.log(selectedChampion);
  if (selectedCards.has(selectedChampion)) {
    console.log("You lose");
    playSound(wrongSound);
    playSound(cardFlipSound);
    setRestartGame(true);
    const emptySet = new Set();
    setSelectedCards(emptySet);
    setIsGameOver(true);
  } else {
    console.log("Win");
    playSound(correctSound);
    playSound(cardFlipSound);
    setSelectedCards((prevState) => {
      const newSet = new Set(prevState);
      newSet.add(selectedChampion);
      return newSet;
    });

    const newScore = score + 1;
    setScore(newScore);
    setHighScore(Math.max(newScore, highScore));

    if (newScore === championCards.length) {
      setIsGameOver(true);
      const emptySet = new Set()
      setSelectedCards(emptySet);
    }

    shuffleCards(championCards, setChampionCards);
    console.log(newScore);
  }
}

export function Popup({ message, setRestartGame, setIsGameOver, imageUrl }) {
  const handleRestart = () => {
    setRestartGame(true);
    setIsGameOver(false);
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Game Over</h2>
        <img src={imageUrl} alt="Game over" />
        <p>{message}</p>
        <button onClick={handleRestart}>Restart Game</button>
      </div>
    </div>
  );
}

function generateTenChampionNames() {
  const listOfChampionNames = Object.values(leagueChampions.data).map(
    (champion) => champion.image.full.slice(0, -4)
  );

  const randomIndices = new Set();
  while (randomIndices.size < 8) {
    const randomIndex = Math.floor(Math.random() * listOfChampionNames.length);
    randomIndices.add(randomIndex);
  }

  const championList = Array.from(randomIndices).map(
    (index) => listOfChampionNames[index]
  );

  return championList;
}

// Fisher–Yates (aka Knuth) Shuffle Algorithm
function shuffleCards(championCards, setChampionCards) {
  let arr = [...championCards];
  let currentIndex = arr.length;

  const shuffle = () => {
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }
    setChampionCards(arr);
  };

  setTimeout(shuffle, 200);
}


function playSound(sound) {
  new Audio(sound).play();
}
