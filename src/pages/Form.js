import { TextField, Button, Box } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useGetAllTypesPokemons } from "../hooks/useGetAllTypesPokemons";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
import { useGetAllPokemons } from "../hooks/useGetAllPokemons";
import Progress from "../components/Progress";
import { MultiSelect } from "react-multi-select-component";

export default function Form({ allPokemons }) {
  const location = useLocation();
  const navigate = useNavigate();
  const pokemonDetail = location.state?.pokemonDetail;
  const { editedPokemons, setEditedPokemons } = useContext(PokemonContext);
  const { pokemonName } = useParams();
  const { pokemonTypeData } = useGetAllTypesPokemons();
  const [tempSelectedImage, setTempSelectedImage] = useState(null);
  const { pokemonSprites } = useGetAllPokemons();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const watchedTypes = watch("types", []);

  // filter the sprite by the id of the selected pokemon to edit
  const validatedSprite = pokemonSprites.find(
    (item) => pokemonDetail.id_pokemon === item.id
  );

  const onSubmit = (data) => {
    data.types = data.types.join(", ");
    data.friends = data.friends.map((friend) => friend.label).join(", ");

    const newEditedPokemons = editedPokemons.map((pokemon) => {
      if (pokemon.name === pokemonName) {
        return {
          ...pokemon,
          name: data.name || pokemon.name,
          image: data.image || pokemon.image,
          types: data.types || pokemon.types,
          teammates: data.friends || pokemon.teammates,
          description: data.description || pokemon.description,
        };
      }
      return pokemon;
    });

    setEditedPokemons(newEditedPokemons);
    navigate(`/`);
  };

  const handleImageClick = (imgUrl) => {
    setTempSelectedImage(imgUrl);
    setValue("image", imgUrl);
  };

  const options = pokemonTypeData.map((item) => {
    return { label: item.name, value: item.name };
  });

  const filteredPokemonForFriends = allPokemons.filter((pokemon) =>
    watchedTypes.some((type) => pokemon.types.includes(type))
  );

  const friendsOptions = filteredPokemonForFriends.map((pokemon) => ({
    label: pokemon.name,
    value: pokemon.id_pokemon,
  }));

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

        {/* Input Multiselect */}
        <Controller
          name="types"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <MultiSelect
              className="multiselect-form"
              options={options}
              value={field.value.map((type) => ({ label: type, value: type }))}
              onChange={(selected) => {
                const newValues = selected.map((s) => s.value);
                field.onChange(newValues);
              }}
              labelledBy="Select Types"
              overrideStrings={{
                selectSomeItems: "Select types",
              }}
            />
          )}
        />

        <Controller
          name="friends"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <MultiSelect
              className="multiselect-form"
              options={friendsOptions}
              value={field.value}
              onChange={(selected) => {
                const newValues = selected.map((pokemonSelected) => ({
                  label: pokemonSelected.label,
                  value: pokemonSelected.value,
                }));
                field.onChange(newValues);
              }}
              labelledBy="Select Friends"
              overrideStrings={{
                selectSomeItems: "Select friends",
              }}
            />
          )}
        />

        {/* Select Image */}
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
              <ImageList
                sx={{ width: 500, height: 680 }}
                cols={3}
                rowHeight={164}
              >
                {validatedSprite.sprites.map((item, id) => (
                  <ImageListItem
                    key={id}
                    onClick={() => handleImageClick(item.image)}
                    style={{
                      cursor: "pointer",
                      border:
                        tempSelectedImage === item.image
                          ? "3px solid red"
                          : "none",
                    }}
                  >
                    <img src={item.image} alt={item.title} loading="lazy" />
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
