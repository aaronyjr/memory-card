import { useEffect, useState } from "react";
import { leagueChampions } from "../data/Champions";
import ReactParallaxTilt from "react-parallax-tilt";
import "../styles/CardStyle.css";

const BASE_URL =
  "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/";

export function LeagueCards() {
  const [championCards, setChampionCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState(new Set());

  useEffect(() => {
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
  }, []);

  return (
    <>
      {championCards.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2px",
          }}
        >
          {championCards.map((card, index) => (
            <ReactParallaxTilt key={index}>
              <div
                onClick={() => checkWin(card.name, selectedCards, setSelectedCards)}
                className="card"
                style={{
                  position: "relative",
                  textAlign: "center",
                }}
              >
                <img
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
          ))}
        </div>
      ) : (
        <p>Loading images...</p>
      )}
    </>
  );
}

function checkWin(selectedChampion, selectedCards, setSelectedCards) {
  if (selectedCards.has(selectedChampion)) {
    console.log('You lose');
  } else {
    console.log('Win');

    setSelectedCards(prevState => {
      const newSet = new Set(prevState);
      newSet.add(selectedChampion);
      return newSet;
    });
  }
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
