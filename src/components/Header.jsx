import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">PokéDex</h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Inicio</Link>
          <Link to="/pokemons" className="hover:underline">Pokémons</Link>
          <Link to="/about" className="hover:underline">Acerca</Link>
        </nav>
      </div>
    </header>
  )
}
