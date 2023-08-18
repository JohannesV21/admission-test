import React from "react";
import { useGetAllPokemons } from "../hooks/useGetAllPokemons";
import Progress from "../components/Progress";
import PokemonTable from "../components/PokemonTable";

export default function Home(props) {
  const { isLoading, pokemonDetails } = useGetAllPokemons();

  return (
    <div>
      {isLoading ? (
        <Progress />
      ) : (
        <>
          <PokemonTable pokemons={pokemonDetails} />
        </>
      )}
    </div>
  );
}
