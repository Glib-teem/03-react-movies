import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

// Move MovieSearchResponse interface here instead of types/movie
export interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

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
  try {
    if (!API_TOKEN) {
      throw new Error('TMDB API token is not configured');
    }

    const response = await movieApi.get<MovieSearchResponse>('/search/movie', {
      params: {
        query,
        page,
        include_adult: false,
        language: 'en-US',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('TMDB API Error:', error.response?.data || error.message);
      throw new Error(
        `API Error: ${error.response?.status} - ${
          error.response?.statusText || error.message
        }`
      );
    }
    throw error;
  }
};
