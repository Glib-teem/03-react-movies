import axios from 'axios';
import type { MovieSearchResponse } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface SearchMoviesParams {
  query: string;
  page?: number;
}

const movieApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    accept: 'application/json',
  },
});

export const fetchMovies = async ({
  query,
  page = 1,
}: SearchMoviesParams): Promise<MovieSearchResponse> => {
  const response = await movieApi.get<MovieSearchResponse>('/search/movie', {
    params: {
      query,
      page,
      include_adult: false,
      language: 'en-US',
    },
  });

  return response.data;
};
