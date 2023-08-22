import { useEffect, useState } from "react";
import { getAllPokemons } from "../services/pokemon/pokemonService";
import { pokemonDataDetails } from "../helpers/pokemonDetailsMap";
import { pokemonSpritesMap } from "../helpers/pokemonSpritesMap";

export const useGetAllPokemons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [pokemonSprites, setPokemonSprites] = useState([]);

  const allPokemons = () => {
    setIsLoading(true);
    getAllPokemons()
      .then((res) => {
        const details = pokemonDataDetails(res);
        const sprites = pokemonSpritesMap(res)

        setPokemonData(res);
        setPokemonDetails(details);
        setPokemonSprites(sprites);
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

  return { isLoading, pokemonData, pokemonDetails, pokemonSprites };
};
