
import { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import './App.css'


// searchBar con boton de busqueda
// devolver primeros 10 resultados(los que da la API)
// mostrar de cada pelicula, una pequeña tarjeta con titulo, año, y poster
// animaciones mientras carga el fetch del api o si este falla 
// opcional(que el usuario haga click en cada resultado para mas info) muyyyyy opcional (Título, año, director, actores, plot, género, calificación de IMDb.)

function MovieCard({title, year, poster}){
  return(
    <div className='movieCard'>
      <h4>{title}</h4>
      <h4>{year.length > 4 ? year.split("–")[0] : year}</h4> {/* unicode U+2013 */}
      <img src={poster} alt={title} />
    </div>
  )
}

function App() {

  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState("Busca una pelicula!");

  async function handleSearchQuery(){
    try{
      setLoading("Cargando...")
      let f = (await fetch(`https://www.omdbapi.com/?apikey=bb807053&s=${search}`));
      let data = await f.json();
      if (data.Response === "True") {
        console.log(data)
        setMovies(data.Search);
        setLoading("Resultados Encontrados: ")
      } else {
        setMovies([]);
        setLoading("No se encontraron peliculas, porfavor intenta de nuevo!")
      }
    } catch (e) {
      console.error("Error al buscar películas", e);
      setMovies([]); 
    }
  }

  return (
    <div>
      <div className='searchDiv'>
        <div>
          <input placeholder='Nombre' onChange={(e) => setSearch(e.target.value)} type='search'/>
          <button onClick={handleSearchQuery} type='submit'><FaSearch/></button>
        </div>
        <h1 className='loadingText'>{loading}</h1>
      </div>
      <div className='movieContainer'>
        {movies.map(movie =>
          <MovieCard key={movie.imdbID}
            title = {movie.Title}
            year = {movie.Year}
            poster = {movie.Poster}
          />
        )}
      </div>
    </div>
  )
}

export default App
