export const pokemonSpritesMap = (pokemonData) => {
    const allExtractedSprites = pokemonData.flatMap(pokemon => {
        const { sprites } = pokemon;

        return [
            { image: sprites.back_default, title: "back_default" },
            { image: sprites.back_shiny, title: "back_shiny" },
            { image: sprites.front_default, title: "front_default" },
            { image: sprites.front_shiny, title: "front_shiny" },
            { image: sprites.other.dream_world.front_default, title: "dream_world_front_default" },
            { image: sprites.other.home.front_default, title: "home_front_default" },
            { image: sprites.other.home.front_shiny, title: "home_front_shiny" },
            { image: sprites.other.official_artwork.front_default, title: "official-artwork_front_default" },
            { image: sprites.other.official_artwork.front_shiny, title: "official-artwork_front_shiny" },
            { image: sprites.versions['generation-i']['red-blue'].front_transparent, title: "versions_generation-i_red-blue_front_transparent" },
            { image: sprites.versions['generation-iv']['heartgold-soulsilver'].front_default, title: "versions_generation-iv_heartgold-soulsilver_front_default" },
            { image: sprites.versions['generation-iv']['heartgold-soulsilver'].front_shiny, title: "versions_generation-iv_heartgold-soulsilver_front_shiny" }
        ];

    });

    return allExtractedSprites
}
