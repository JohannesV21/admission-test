import { createContext, useEffect, useState } from "react";
import { useGetAllPokemons } from "../hooks/useGetAllPokemons";

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const { pokemonDetails } = useGetAllPokemons();
  // const [editedPokemons, setEditedPokemons] = useState([]);
  const [editedPokemons, setEditedPokemons] = useState([]);

  useEffect(() => {
    if (pokemonDetails && pokemonDetails.length > 0) {
      setEditedPokemons(pokemonDetails);
    }
  }, [pokemonDetails]);

  return (
    <PokemonContext.Provider
      value={{
        editedPokemons,
        setEditedPokemons,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
