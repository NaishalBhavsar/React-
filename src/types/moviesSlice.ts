import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchMovies } from '../../api/movies';
import { Movie } from '../../types';

interface MoviesState {
  list: Movie[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
}

const initialState: MoviesState = {
  list: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
};

export const loadMovies = createAsyncThunk(
  'movies/loadMovies',
  async (page: number, { rejectWithValue }) => {
    try {
      const data = await fetchMovies(page);
      return { movies: data.results, page: data.page, hasMore: data.page < data.total_pages };
    } catch (error) {
      return rejectWithValue('Failed to load movies');
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.list = []; // Reset list on new search
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = [...state.list, ...action.payload.movies];
        state.page = action.payload.page;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(loadMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery } = moviesSlice.actions;
export default moviesSlice.reducer;
