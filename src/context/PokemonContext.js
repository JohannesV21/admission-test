import { createContext, useState } from "react";

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [editedPokemons, setEditedPokemons] = useState([]);

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
