const BASE_URL = 'https://pokeapi.co/api/v2'

export const getPokemonList = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1300')
  return res.json()
}


export const getPokemonDetail = async (url) => {
  const res = await fetch(url)
  return res.json()
}
