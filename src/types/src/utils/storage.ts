import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';
const LAST_VIEWED_KEY = 'lastViewedMovieId';

export const saveFavorites = async (favorites: number[]) => {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const loadFavorites = async (): Promise<number[]> => {
  const data = await AsyncStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveLastViewed = async (id: number) => {
  await AsyncStorage.setItem(LAST_VIEWED_KEY, JSON.stringify(id));
};

export const loadLastViewed = async (): Promise<number | null> => {
  const data = await AsyncStorage.getItem(LAST_VIEWED_KEY);
  return data ? JSON.parse(data) : null;
};
