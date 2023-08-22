import { useNavigate } from "react-router-dom";

export const handleEditClick = (pokemonName) => {
  const navigate = useNavigate();

  const pokemonDetail = pokemons.find(
    (pokemon) => pokemon.name === pokemonName
  );
  navigate(`/form/${pokemonName}`, { state: { pokemonDetail } });
};
