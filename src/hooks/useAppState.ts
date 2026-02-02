import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useDispatch } from 'react-redux';
import { restoreState } from '../redux/slices/appSlice';
import { loadFavorites, loadLastViewed } from '../utils/storage';

export const useAppState = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        // Save state on background/kill
        // (Redux persists automatically, but we ensure storage)
      } else if (nextAppState === 'active') {
        // Restore on open
        const favorites = await loadFavorites();
        const lastViewed = await loadLastViewed();
        dispatch(restoreState({ favorites, lastViewedMovieId: lastViewed }));
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [dispatch]);
};
