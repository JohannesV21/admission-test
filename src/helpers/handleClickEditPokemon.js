export const handleClickEditPokemon = (
  pokemonName,
  pokemons,
  editedPokemons,
  navigate
) => {
  let pokemonDetail = pokemons.find((pokemon) => pokemon.name === pokemonName);

  const editedVersion = editedPokemons.find(
    (pokemon) => pokemon.name === pokemonName
  );

  if (editedVersion) {
    pokemonDetail = editedVersion;
  }

  navigate(`/form/${pokemonName}`, { state: { pokemonDetail } });
};
