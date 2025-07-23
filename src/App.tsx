import { BrowserRouter, Route, Routes } from "react-router-dom";
import PokemonList from "./routes/PokemonList";
import PokemonDetail from "./routes/PokemonDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
