import { useEffect, useState } from "react";
import { getPokemonList, getPokemonDetail } from "./PokemonService";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 30;

export default function PokemonList() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await getPokemonList();
      setAllPokemon(data.results);
      setFilteredPokemon(data.results);

      const resTypes = await fetch("https://pokeapi.co/api/v2/type");
      const dataTypes = await resTypes.json();
      setTypes(dataTypes.results);
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const loadPageData = async () => {
      setLoading(true);
      const filteredBySearch = filteredPokemon.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      const pageSlice = filteredBySearch.slice(start, start + ITEMS_PER_PAGE);

      const promises = pageSlice.map((p) => getPokemonDetail(p.url));
      const detailed = await Promise.all(promises);
      setPaginatedData(detailed);
      setLoading(false);
    };

    if (filteredPokemon.length > 0) {
      loadPageData();
    }
  }, [filteredPokemon, currentPage, searchTerm]);

  // Filtro por tipo
  const handleFilter = async (type) => {
    setSelectedType(type);
    setCurrentPage(1);

    if (type === "all") {
      setFilteredPokemon(allPokemon);
    } else {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await res.json();
      const byType = data.pokemon.map((p) => p.pokemon);
      setFilteredPokemon(byType);
    }
  };

  const filteredBySearch = filteredPokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredBySearch.length / ITEMS_PER_PAGE);

  return (
    <div className="p-4">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Input de búsqueda */}
        <input
          type="text"
          placeholder="Buscar Pokémon por nombre..."
          className="border border-gray-300 px-4 py-2 rounded w-full md:w-80 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          <button
            onClick={() => handleFilter("all")}
            className={`px-3 py-1 rounded-full border ${
              selectedType === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border-blue-600"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            Todos
          </button>
          {types.map((type) => (
            <button
              key={type.name}
              onClick={() => handleFilter(type.name)}
              className={`px-3 py-1 rounded-full border ${
                selectedType === type.name
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border-blue-600"
              } hover:bg-blue-500 hover:text-white transition`}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Cargando Pokémons...
        </div>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paginatedData.map((pokemon) => (
              <div
                key={pokemon.id}
                className="relative bg-white shadow-md rounded-xl p-4 text-center hover:scale-105 transition cursor-pointer overflow-hidden"
                onClick={() => navigate(`/pokemons/${pokemon.id}`)}
              >
                <span className="absolute text-[5rem] font-bold text-gray-200 opacity-20 top-4 left-1/2 transform -translate-x-1/2 pointer-events-none select-none z-0">
                  #{pokemon.id}
                </span>

                <div className="relative z-10">
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-20 h-20 mx-auto mb-2"
                  />
                  <h2 className="text-lg font-bold capitalize text-blue-700">
                    {pokemon.name}
                  </h2>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          <div className="flex justify-center mt-10 gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
            >
              Anterior
            </button>

            {[...Array(totalPages).keys()].slice(0, 10).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num + 1)}
                className={`px-3 py-1 rounded-full border ${
                  currentPage === num + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border-blue-600"
                } hover:bg-blue-500 hover:text-white transition`}
              >
                {num + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
}
