import React, { useRef, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_POKEMON } from "../graphql/queries";
import { useHistory } from "react-router-dom";

const PokemonSearchBar = () => {
  const history = useHistory();
  const inputRef = useRef(null);

  const [loadPokemon, { called, loading, data, error }] =
    useLazyQuery(GET_POKEMON);

  useEffect(() => {
    if (!data) {
      return;
    }

    console.log(data);
    console.log(history);

    // Send to /pokemon/id
    history.push(`/pokemon/${data.pokemon.api_id}`);
  }, [data]);

  const searchPokemon = () => {
    loadPokemon({
      variables: {
        name: inputRef.current.value,
      },
    });
  };

  const searchInputChange = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      loadPokemon({
        variables: {
          name: inputRef.current.value,
        },
      });
    }
  };

  return (
    <div>
      <input
        placeholder={"Pokemon name"}
        ref={inputRef}
        onKeyUp={searchInputChange}
      />
      <button onClick={searchPokemon}>Catch em'!</button>
    </div>
  );
};

export default PokemonSearchBar;
