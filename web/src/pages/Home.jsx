import React from "react";
import PokemonCardFromId from "../components/PokemonCardFromId";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <PokemonCardFromId id={8} />
    </div>
  );
};

export default Home;
