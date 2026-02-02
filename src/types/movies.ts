import { Movie, MoviesResponse } from '../types';

const API_KEY = ''; // Optional: Add your TMDB API key here if needed
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (page: number = 1): Promise<MoviesResponse> => {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch movies');
  return response.json();
};
