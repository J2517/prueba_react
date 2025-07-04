import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PokemonPage from './pages/PokemonPage'
import About from './pages/About'
import Header from './components/Header'
import Footer from './components/Footer'
import PokemonDetail from './features/pokemon/PokemonDetail'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemons" element={<PokemonPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/pokemons/:id" element={<PokemonDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
