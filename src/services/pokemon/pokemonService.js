import { BACK_URL, http } from "../httpService";

export const getAllPokemons = () => {
  return new Promise((resolve, reject) => {
    http
      .get(`${BACK_URL}/pokemon?limit=100000&offset=0`)
      .then((res) => {
        // Getting pokemon list
        const pokemons = res.data.results;

        const pokemonUrl = pokemons.map((pokemon, id) => {
          return http.get(pokemon.url);
        });

        // Getting the detail of each pokemon
        Promise.all(pokemonUrl)
          .then((pokemonUrlResponse) => {
            const pokemonData = pokemonUrlResponse.map(
              (response) => response.data
            );
            // console.log("SERVICE:", pokemonData);
            resolve(pokemonData);
          })
          .catch((err) => {
            console.error(
              `Error getting the characteristics of the pokemon ${err}`
            );
            reject(err);
          });
      })
      .catch((err) => {
        console.error(`Error getting pokemon list ${err}`);
        reject(err);
      });
  });
};
