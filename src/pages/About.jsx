export default function About() {
  return (
    <section className="container mx-auto px-4 py-10 max-w-2xl">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Acerca de esta PokéDex</h1>
      
      <p className="text-gray-700 leading-relaxed mb-4">
        Esta aplicación fue creada como parte de un proyecto usando 
        <strong className="text-blue-500"> React</strong> y <strong className="text-blue-500">Tailwind CSS</strong>, consumiendo datos de la 
        <a href="https://pokeapi.co/" target="_blank" rel="noreferrer" className="text-blue-500 underline ml-1">PokéAPI</a>.
      </p>

      <p className="text-gray-700 leading-relaxed mb-4">
        Permite visualizar una lista de Pokémons y acceder a su información detallada.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Desarrollado con por <strong>Jackeline Rivera</strong>
      </p>
    </section>
  )
}
