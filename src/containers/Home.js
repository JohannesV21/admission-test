import React, { useEffect } from "react";
import EnhancedTable from "../components/Table";
import { useNavigate } from "react-router-dom";
import { getAllPokemons } from "../services/pokemon/pokemonService";
import { useGetAllPokemons } from "../hooks/useGetAllPokemons";
import { Grid, Paper } from "@mui/material";
import Progress from "../components/Progress";
import { DataGrid } from "@mui/x-data-grid";
import PokemonTable from "../components/CustomTable";

export default function Home(props) {
  const { isLoading, pokemonData } = useGetAllPokemons();

  // useEffect(() => {
  //   console.log("HOME", pokemonData);
  //   // getAllPokemons();
  // }, [pokemonData]);

  console.log("HOME", pokemonData);

  const transformedData = pokemonData.map((pokemon) => {
    return {
      name: pokemon.name,
      id_pokemon: pokemon.id,
      html_image: pokemon.sprites.front_default,
      html_types: pokemon.types.map((typeObj) => typeObj.type.name).join(", "),
      // Amigos y Descripción podrían necesitar otro llamado API, aquí hay placeholders
      teammates: "TODO",
      description: "TODO",
      height: pokemon.height,
      weight: pokemon.weight,
      // Otros campos que necesites
    };
  });

  // console.log(transformedData);

  const { tableRows } = props;

  const navigate = useNavigate();

  const handleEditButton = (row) => (e) => {
    e.stopPropagation();
    const {
      html_image,
      html_types,
      html_my_sprite,
      html_my_types,
      html_my_teammates,
      ...params
    } = row;
    // ! NAVIGATE NOT ACCEPT HTML PARAMS
    navigate(`form/${row.name}`, {
      state: { ...params },
    });
  };

  return (
    <div>
      {/* {tableRows.length > 0 ? (
        <EnhancedTable
          rowsProp={tableRows}
          handleEditButton={handleEditButton}
        />
      ) : (
        "Loading..."
      )} 
      */}

      {isLoading ? (
        <Progress />
      ) : (
        <>
          {/* <EnhancedTable rowsProp={pokemonData} /> */}
          <PokemonTable pokemons={pokemonData} />
        </>
      )}
      {/* <EnhancedTable
        rowsProp={pokemonData}
        handleEditButton={handleEditButton}
      /> */}

      {/* <EnhancedTable rowsProp={pokemonData} /> */}
    </div>
  );
}
