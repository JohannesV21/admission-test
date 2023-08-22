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
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetAllTypesPokemons } from "../hooks/useGetAllTypesPokemons";
import { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
import { useGetAllPokemons } from "../hooks/useGetAllPokemons";
import Progress from "../components/Progress";

export default function Form({ allPokemons }) {
  const location = useLocation();
  const navigate = useNavigate();
  const pokemonDetail = location.state?.pokemonDetail;
  const { setEditedPokemons } = useContext(PokemonContext);
  const { pokemonName } = useParams();
  const { pokemonTypeData } = useGetAllTypesPokemons();
  const { pokemonSprites } = useGetAllPokemons()
  const [tempSelectedImage, setTempSelectedImage] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // filter the sprite by the id of the selected pokemon to edit
  const validatedSprite = pokemonSprites.find(item => pokemonDetail.id_pokemon === item.id);
  // console.log(validatedSprite)

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
    navigate(`/`);
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
        {/* Input name */}
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

        {/* Input description */}

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
          {!validatedSprite ? (
            <Progress />
          ) : (
            <>
              <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                {validatedSprite.sprites.map((item, id) => (
                  <ImageListItem
                    key={id}
                    onClick={() => handleImageClick(item.image)}
                    style={{
                      cursor: "pointer",
                      border:
                        tempSelectedImage === item.image ? "3px solid red" : "none",
                    }}
                  >
                    <img
                      // src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      src={item.image}
                      // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </>
          )}
        </Box>

        <Button
          style={{ margin: "20px auto", display: "block" }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}
