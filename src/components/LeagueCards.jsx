import { useEffect, useState } from "react";
import { leagueChampions } from "../data/Champions";
import ReactParallaxTilt from "react-parallax-tilt";

const BASE_URL =
  "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/";

export function LeagueCards() {
  const [championCards, setChampionCards] = useState([]);

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
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
          }}
        >
          {championCards.map((card, index) => (
            <ReactParallaxTilt key={index}>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{margin:'6px'}}>{card.name}</h3>
                <img
                  src={card.imageUrl}
                  alt={`${card.name} card`}
                  style={{
                    width: '80%', // Adjust width to make images smaller
                    height: 'auto', // Maintain aspect ratio
                    maxHeight: '380px', // Limit height to avoid excessive gaps
                    objectFit: 'contain', // Ensure image fits well in its container
                  }}
                />
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
