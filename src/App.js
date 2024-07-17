import {useState, useEffect} from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

const APT_URL = 'http://www.omdbapi.com?apikey=246c0774';

// const movie1 = {
//     "Title": "Batman v Superman: Dawn of Justice (Ultimate Edition)",
//     "Year": "2016",
//     "imdbID": "tt18689424",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BOTRlNWQwM2ItNjkyZC00MGI3LThkYjktZmE5N2FlMzcyNTIyXkEyXkFqcGdeQXVyMTEyNzgwMDUw._V1_SX300.jpg"
// }

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchMovies = async(title) => {
        const response = await fetch(`${APT_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Iron Man');
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input 
                placeholder="Search for movies"
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                />
                <img 
                src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {
                movies.length ? 
                (
                    <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie}/>
                    ))}
                    </div>
                )
                :(
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    );
}

export default App;