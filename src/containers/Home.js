import React, { useEffect } from "react";
import EnhancedTable from "../components/Table";
import { useNavigate } from "react-router-dom";
import { getAllPokemons } from "../services/pokemon/pokemonService";
import { useGetAllPokemons } from "../hooks/useGetAllPokemons";
import { Grid, Paper } from "@mui/material";
import Progress from "../components/Progress";

export default function Home(props) {
  const { isLoading, pokemonData } = useGetAllPokemons();

  // useEffect(() => {
  //   console.log("HOME", pokemonData);
  //   // getAllPokemons();
  // }, [pokemonData]);

  console.log("HOME", pokemonData);

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
      )} */}
      {/* {isLoading ? (
        <Progress />
      ) : (
        <>
          {pokemonData.map((pokemon, id) => {
            return (
              <p>
                {id}: {pokemon.name}
              </p>
            );
          })}
        </>
      )} */}

      <EnhancedTable />
    </div>
  );
}
