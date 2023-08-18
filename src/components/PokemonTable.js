import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, TablePagination, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";

export default function PokemonTable({ pokemons }) {
  const [filter, setFilter] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { editedPokemons } = useContext(PokemonContext);
  const navigate = useNavigate();

  //==================================================================
  const [checkedPokemons, setCheckedPokemons] = useState({});

  const handleCheckboxChange = (pokemonId) => {
    setCheckedPokemons((prevState) => ({
      ...prevState,
      [pokemonId]: !prevState[pokemonId],
    }));
  };

  const getPokemonData = (pokemon) => {
    if (checkedPokemons[pokemon.id_pokemon]) {
      const editedPokemon = editedPokemons.find(
        (p) => p.id_pokemon === pokemon.id_pokemon
      );
      return editedPokemon || pokemon;
    }
    return pokemon;
  };
  //==================================================================

  const handleEditClick = (pokemonName) => {
    const pokemonDetail = pokemons.find(
      (pokemon) => pokemon.name === pokemonName
    );
    navigate(`/form/${pokemonName}`, { state: { pokemonDetail } });
  };

  // Filter handlers

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Pagination

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box width="90%" margin="0 auto 50px">
      <Box textAlign="center" m="50px auto 30px">
        <h1>Pokemons</h1>
      </Box>

      <TextField
        fullWidth={true}
        label="Buscar Pokémon"
        variant="outlined"
        value={filter}
        onChange={handleFilterChange}
        style={{ marginBottom: "20px" }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="pokemon table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell align="center">Editar</TableCell>
              <TableCell align="center">Foto</TableCell>
              <TableCell align="center">Número en Pokedex</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Tipos</TableCell>
              <TableCell align="center">Amigos</TableCell>
              <TableCell align="center">Altura</TableCell>
              <TableCell align="center">Altura</TableCell>
              <TableCell align="center">Descripción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPokemons
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((pokemon) => {
                const displayPokemon = getPokemonData(pokemon);

                return (
                  <TableRow key={pokemon.id_pokemon}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={!!checkedPokemons[displayPokemon.id_pokemon]}
                        onChange={() =>
                          handleCheckboxChange(displayPokemon.id_pokemon)
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={() => handleEditClick(pokemon.name)}>
                        Editar
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src={displayPokemon.image}
                        alt={displayPokemon.name}
                        width="50"
                      />
                    </TableCell>
                    <TableCell align="center">
                      {displayPokemon.id_pokemon}
                    </TableCell>
                    <TableCell align="center">{displayPokemon.name}</TableCell>
                    <TableCell align="center">{displayPokemon.types}</TableCell>
                    <TableCell align="center">
                      {displayPokemon.teammates}
                    </TableCell>
                    <TableCell align="center">
                      {displayPokemon.height}
                    </TableCell>
                    <TableCell align="center">
                      {displayPokemon.weight}
                    </TableCell>
                    <TableCell align="center">
                      {displayPokemon.description}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          width="100%"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pokemons.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}