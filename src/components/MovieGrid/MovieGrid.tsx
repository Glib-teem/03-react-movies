import React from 'react';
import type { Movie } from '../../types/movie'; // Змінено на import type
import styles from './MovieGrid.module.css';
import reactLogo from '../../assets/stich-min.jpeg';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onSelect }) => {
  return (
    <ul className={styles.grid}>
      {movies.map((movie) => {
        const posterUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : reactLogo;

        return (
          <li
            key={movie.id}
            className={styles.item}
            onClick={() => onSelect(movie)}
          >
            <img
              src={posterUrl}
              alt={movie.title}
              className={styles.poster}
            />
            <h3 className={styles.title}>{movie.title}</h3>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieGrid;
