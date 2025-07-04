import { useEffect, useState } from "react";

const featuredPokemonIds = [1, 4, 7, 25, 39, 94, 150];

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchPokemons = async () => {
      const promises = featuredPokemonIds.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
          res.json()
        )
      );
      const data = await Promise.all(promises);
      setPokemons(data);
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featuredPokemonIds.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 via-white to-white p-6">
      <h1 className="text-5xl font-bold text-blue-600 text-center mb-4">
        ¡Bienvenido a la PokéDex!
      </h1>
      <p className="text-lg text-gray-600 text-center mb-10">
        Explora, descubre y aprende sobre tus Pokémons favoritos
      </p>

      {}
      <div className="relative w-full max-w-md h-64 bg-white rounded-xl shadow-lg overflow-hidden flex items-center justify-center">
        {pokemons.length > 0 && (
          <div className="text-center relative z-10">
            <img
              src={
                pokemons[current]?.sprites.other["official-artwork"]
                  .front_default
              }
              alt={pokemons[current]?.name}
              className="w-40 h-40 mx-auto mb-2 z-20 relative"
            />
            <h2 className="text-xl font-bold capitalize text-blue-700 z-20 relative">
              {pokemons[current]?.name}
            </h2>

            <span className="absolute text-[6rem] font-bold text-gray-300 opacity-30 z-0 top-12 left-1/2 transform -translate-x-1/2 select-none">
              #{pokemons[current]?.id}
            </span>
          </div>
        )}
      </div>

      <p className="mt-10 text-center text-sm text-gray-500">
        Desarrollado por Jackeline Rivera
      </p>
    </section>
  );
}
