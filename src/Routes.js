import Home from "./pages/Home";
import Form from "./pages/Form";
import { Route, Routes } from "react-router-dom";

export default function MyRoutes({ pokemonDetails }) {
  return (
    <Routes>
      <Route path="/" element={<Home homeData={pokemonDetails} />} />
      <Route
        path="/form/:pokemonName"
        element={<Form allPokemons={pokemonDetails} />}
      />
    </Routes>
  );
}
