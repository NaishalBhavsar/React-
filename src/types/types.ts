export interface AppState {
  movies: {
    list: Movie[];
    loading: boolean;
    error: string | null;
    page: number;
    hasMore: boolean;
  };
  searchQuery: string;
  favorites: number[];
  lastViewedMovieId: number | null;
}
