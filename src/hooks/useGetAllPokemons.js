import { useEffect, useState } from "react";
import { getAllPokemons } from "../services/pokemon/pokemonService";
import { pokemonDataDetails } from "../helper/pokemonDetailsMap";

export const useGetAllPokemons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);

  const allPokemons = () => {
    setIsLoading(true);
    getAllPokemons()
      .then((res) => {
        const details = pokemonDataDetails(res);

        setPokemonData(res);
        setPokemonDetails(details);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setPokemonData([]);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    allPokemons();
  }, []);

  return { isLoading, pokemonData, pokemonDetails };
};
