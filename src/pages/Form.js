import {
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetAllTypesPokemons } from "../hooks/useGetAllTypesPokemons";
import { itemData } from "../components/ImageList";
import { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";

export default function Form({ allPokemons }) {
  const { setEditedPokemons } = useContext(PokemonContext);
  const { pokemonName } = useParams();
  const { pokemonTypeData } = useGetAllTypesPokemons();
  const [tempSelectedImage, setTempSelectedImage] = useState(null);
  const location = useLocation();
  const pokemonDetail = location.state?.pokemonDetail;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newEditedPokemons = allPokemons.map((pokemon) => {
      if (pokemon.name === pokemonName) {
        return {
          ...pokemon,
          name: data.name || pokemon.name,
          image: data.image || pokemon.image,
          types: data.types || pokemon.types,
          description: data.description || pokemon.description,
        };
      }
      return pokemon;
    });

    setEditedPokemons(newEditedPokemons);
    // console.log("edit", newEditedPokemons);
  };

  const handleImageClick = (imgUrl) => {
    setTempSelectedImage(imgUrl);
    setValue("image", imgUrl);
  };

  return (
    <Box margin="50px auto" width="80%">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <h1 style={{ textAlign: "center" }}>Form to edit pokemon</h1>
        <Link style={{ textDecoration: "none", fontWeight: "bold" }} to="/">
          Go to home
        </Link>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="New name"
          placeholder={pokemonDetail.name}
          {...register("name", { required: true })}
          fullWidth
          margin="normal"
        />
        {errors.name && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <TextField
          label="Description"
          placeholder={pokemonDetail.description}
          {...register("description", { required: true })}
          fullWidth
          margin="normal"
        />
        {errors.description && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <FormControl fullWidth style={{ marginTop: "20px" }}>
          <InputLabel id="demo-simple-select-label">Types</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="types"
            {...register("types", { required: true })}
          >
            {pokemonTypeData.map((item) => {
              return <MenuItem value={item.name}>{item.name}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginTop="20px"
        >
          <input
            {...register("selectedImage")}
            type="hidden"
            value={tempSelectedImage || ""}
          />
          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {itemData.map((item) => (
              <ImageListItem
                key={item.img}
                onClick={() => handleImageClick(item.img)}
                style={{
                  cursor: "pointer",
                  border:
                    tempSelectedImage === item.img ? "3px solid red" : "none",
                }}
              >
                <img
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>

        <Button
          style={{ margin: "20px auto", display: "block" }}
          type="submit"
          variant="contained"
          color="primary"
        >
          <Link
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "white",
            }}
            to="/"
          >
            Submit
          </Link>
        </Button>
      </form>
    </Box>
  );
}
