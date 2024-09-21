import { useEffect, useState } from "react";
import { leagueChampions } from "../data/Champions";

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
        <div>
          {championCards.map((card, index) => (
            <div key={index}>
              <h3>{card.name}</h3>
              <img src={card.imageUrl} alt={`${card.name} card`} />
            </div>
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
    (champion) => champion.name
  );

  const randomIndices = new Set();
  while (randomIndices.size < 10) {
    const randomIndex = Math.floor(Math.random() * listOfChampionNames.length);
    randomIndices.add(randomIndex);
  }

  const championList = Array.from(randomIndices).map(
    (index) => listOfChampionNames[index]
  );

  return championList;
}
