import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
// Fixed imports: Movie from types, fetchMovies and MovieSearchResponse from service
import {
  fetchMovies,
  type MovieSearchResponse,
} from '../../services/movieService';
import type { Movie } from '../../types/movie';
import styles from './App.module.css';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(false);
    setMovies([]);

    try {
      const data: MovieSearchResponse = await fetchMovies({ query });

      if (data.results.length === 0) {
        toast.error('No movies found for your request.');
      }

      setMovies(data.results);
    } catch (err) {
      setError(true);
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleModalClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />

      <main className={styles.main}>
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {!loading && !error && movies.length > 0 && (
          <MovieGrid
            movies={movies}
            onSelect={handleMovieSelect}
          />
        )}
      </main>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={handleModalClose}
        />
      )}

      <Toaster position="top-center" />
    </div>
  );
};

export default App;
