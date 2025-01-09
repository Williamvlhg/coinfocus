import React from "react";

function liste({ games }) {
  return (
    <ul>
      {games.filter((game) => game.disponible) 
      .map((game, index) => (
        <li key={index}>{game.name}</li>
      ))}
    </ul>
  );
}

export default liste;
