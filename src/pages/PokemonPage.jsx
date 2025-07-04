import PokemonList from '../features/pokemon/PokemonList'

export default function PokemonPage() {
  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Listado de Pokémons</h1>
      <PokemonList />
    </section>
  )
}
