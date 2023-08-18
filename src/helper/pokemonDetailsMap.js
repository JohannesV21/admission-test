export const pokemonDataDetails = (pokemonDetails) => {
  const transformedPokemonData = pokemonDetails.map((pokemon) => {
    return {
      name: pokemon.name,
      id_pokemon: pokemon.id,
      image: pokemon.sprites.front_default,
      types: pokemon.types.map((typeObj) => typeObj.type.name).join(", "),
      teammates: "-",
      description: "-",
      height: pokemon.height,
      weight: pokemon.weight,
    };
  });

  return transformedPokemonData;
};
