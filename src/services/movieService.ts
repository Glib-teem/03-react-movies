import axios from 'axios';
import type { MovieSearchResponse } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

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
}: {
  query: string;
  page?: number;
}): Promise<MovieSearchResponse> => {
  const response = await movieApi.get('/search/movie', {
    params: {
      query,
      page,
      include_adult: false,
      language: 'en-US',
    },
  });

  return response.data;
};
