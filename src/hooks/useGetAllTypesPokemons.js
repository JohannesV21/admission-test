import { useEffect, useState } from "react";
import { getAllTypesPokemons } from "../services/pokemon/pokemonTypeService";

export const useGetAllTypesPokemons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonTypeData, setPokemonTypeData] = useState([]);

  const allTypesPokemons = () => {
    setIsLoading(true);
    getAllTypesPokemons()
      .then((res) => {
        setPokemonTypeData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setPokemonTypeData([]);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    allTypesPokemons();
  }, []);

  return { isLoading, pokemonTypeData };
};
