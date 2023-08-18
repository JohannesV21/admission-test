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

export default function PokemonTable({ pokemons }) {
  const [selectedPokemon, setSelectedPokemon] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const handleCheckboxChange = (pokemonName) => {
    setSelectedPokemon(pokemonName);
  };

  //   const handleCheckboxClick = (event, name) => {
  //     const currentIndex = selected.indexOf(name);
  //     const newSelected = [...selected];

  //     if (currentIndex === -1) {
  //       newSelected.push(name);
  //     } else {
  //       newSelected.splice(currentIndex, 1);
  //     }

  //     setSelected(newSelected);
  //   };

  //   const handleEdit = (pokemonName) => {
  //     navigate(`/form/${pokemonName}`);
  //   };

  //   const handleEdit = () => {
  //     if (selectedPokemon) {
  //       navigate(`/form/${selectedPokemon}`);
  //     }
  //   };

  const handleEditClick = (pokemonName) => {
    // navigate(`/form/${pokemonName}`);
    console.log(`/form/${pokemonName}`);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log(selectedPokemon);

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
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Número en Pokedex</TableCell>
              <TableCell align="center">Tipos</TableCell>
              <TableCell align="center">Altura</TableCell>
              <TableCell align="center">Peso</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPokemons
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((pokemon) => (
                <TableRow key={pokemon.id}>
                  <TableCell padding="checkbox">
                    {/* <Checkbox
                    checked={selected.indexOf(pokemon.name) !== -1}
                    onChange={(event) =>
                      handleCheckboxClick(event, pokemon.name)
                    }
                  /> */}
                    <Checkbox
                      checked={selectedPokemon === pokemon.name}
                      onChange={() => handleCheckboxChange(pokemon.name)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleEditClick(pokemon.name)}>
                      Editar
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      width="50"
                    />
                  </TableCell>
                  <TableCell align="center">{pokemon.name}</TableCell>
                  <TableCell align="center">{pokemon.id}</TableCell>
                  <TableCell align="center">
                    {pokemon.types.map((t) => t.type.name).join(", ")}
                  </TableCell>
                  <TableCell align="center">{pokemon.height}</TableCell>
                  <TableCell align="center">{pokemon.weight}</TableCell>
                </TableRow>
              ))}
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
