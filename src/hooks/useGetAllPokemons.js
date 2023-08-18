import { useEffect, useState } from "react";
import { getAllPokemons } from "../services/pokemon/pokemonService";

export const useGetAllPokemons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState([]);

  const allPokemons = () => {
    setIsLoading(true);
    getAllPokemons()
      .then((res) => {
        // console.log("customHook", res);

        setPokemonData(res);
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

  return { isLoading, pokemonData };
};
