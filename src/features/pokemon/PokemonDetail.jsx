import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPokemonDetail } from './PokemonService'

export default function PokemonDetail() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    const fetchDetail = async () => {
      const data = await getPokemonDetail(`https://pokeapi.co/api/v2/pokemon/${id}`)
      setPokemon(data)
    }
    fetchDetail()
  }, [id])

  if (!pokemon) return <div className="text-center py-10">Cargando...</div>

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-8">
      <div className="text-center">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mx-auto w-32 h-32" />
        <h1 className="text-3xl font-bold capitalize text-blue-700 mt-4">{pokemon.name}</h1>
        <p className="text-gray-500">#{pokemon.id}</p>
      </div>

      <div className="mt-6 space-y-2">
        <p><strong>Altura:</strong> {pokemon.height}</p>
        <p><strong>Peso:</strong> {pokemon.weight}</p>
        <p>
          <strong>Tipos:</strong>{" "}
          {pokemon.types.map(t => (
            <span key={t.slot} className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
              {t.type.name}
            </span>
          ))}
        </p>
        <p>
          <strong>Habilidades:</strong>{" "}
          {pokemon.abilities.map(a => (
            <span key={a.slot} className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded mr-2">
              {a.ability.name}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
