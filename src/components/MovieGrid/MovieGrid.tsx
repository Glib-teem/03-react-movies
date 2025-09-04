import React from 'react';
import { Movie } from '../../types/movie';
import styles from './MovieGrid.module.css';

// імпортую іконку react.svg з папки assets
import reactLogo from '../../assets/stich.jpeg';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onSelect }) => {
  return (
    <ul className={styles.grid}>
      {movies.map((movie) => {
        // Перевіряю, чи існує poster_path
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
