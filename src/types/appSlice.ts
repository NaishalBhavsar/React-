import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppStateSlice {
  searchQuery: string;
  favorites: number[];
  lastViewedMovieId: number | null;
}

const initialState: AppStateSlice = {
  searchQuery: '',
  favorites: [],
  lastViewedMovieId: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(fav => fav !== id);
      } else {
        state.favorites.push(id);
      }
    },
    setLastViewedMovie: (state, action: PayloadAction<number>) => {
      state.lastViewedMovieId = action.payload;
    },
    restoreState: (state, action: PayloadAction<Partial<AppStateSlice>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setSearchQuery, toggleFavorite, setLastViewedMovie, restoreState } = appSlice.actions;
export default appSlice.reducer;
