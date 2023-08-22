import React from "react";
import { useGetAllPokemons } from "../hooks/useGetAllPokemons";
import Progress from "../components/Progress";
import PokemonTable from "../components/PokemonTable";

export default function Home(props) {
  const { isLoading, pokemonDetails } = useGetAllPokemons();

  // console.log("SPRITES: ", pokemonSprites)

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
