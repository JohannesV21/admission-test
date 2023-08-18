import { useState } from "react";
import "./App.css";
import MyRoutes from "./Routes";
import { useGetAllPokemons } from "./hooks/useGetAllPokemons";
import { PokemonProvider } from "./context/PokemonContext";

function App() {
  const { pokemonDetails } = useGetAllPokemons();

  return (
    <PokemonProvider>
      <MyRoutes pokemonDetails={pokemonDetails} />;
    </PokemonProvider>
  );
}
export default App;
