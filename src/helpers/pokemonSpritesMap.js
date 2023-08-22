export const pokemonSpritesMap = (pokemonData) => {
    const transformedPokemonData = pokemonData.flatMap(pokemon => {
        if (!pokemon.sprites) {
            return [];
        }

        const { sprites, id, name } = pokemon;
        const other = sprites.other || {};
        const versions = sprites.versions || {};
        const gen1 = versions['generation-i'] || {};
        const gen4 = versions['generation-iv'] || {};

        const extractedSprites = [
            sprites.front_default && { image: sprites.front_default, title: "front_default" },
            sprites.front_shiny && { image: sprites.front_shiny, title: "front_shiny" },
            sprites.back_default && { image: sprites.back_default, title: "back_default" },
            sprites.back_shiny && { image: sprites.back_shiny, title: "back_shiny" },
            other.dream_world && other.dream_world.front_default && { image: other.dream_world.front_default, title: "dream_world_front_default" },
            other.home && other.home.front_default && { image: other.home.front_default, title: "home_front_default" },
            other.home && other.home.front_shiny && { image: other.home.front_shiny, title: "home_front_shiny" },
            other.official_artwork && other.official_artwork.front_default && { image: other.official_artwork.front_default, title: "official-artwork_front_default" },
            other.official_artwork && other.official_artwork.front_shiny && { image: other.official_artwork.front_shiny, title: "official-artwork_front_shiny" },
            gen1['red-blue'] && gen1['red-blue'].front_transparent && { image: gen1['red-blue'].front_transparent, title: "versions_generation-i_red-blue_front_transparent" },
            gen4['heartgold-soulsilver'] && gen4['heartgold-soulsilver'].front_default && { image: gen4['heartgold-soulsilver'].front_default, title: "versions_generation-iv_heartgold-soulsilver_front_default" },
            gen4['heartgold-soulsilver'] && gen4['heartgold-soulsilver'].front_shiny && { image: gen4['heartgold-soulsilver'].front_shiny, title: "versions_generation-iv_heartgold-soulsilver_front_shiny" }
        ].filter(Boolean);

        return {
            id,
            name,
            sprites: extractedSprites
        };
    });

    return transformedPokemonData
}
