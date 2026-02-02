import React, { useEffect, useMemo } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadMovies } from '../redux/slices/moviesSlice';
import { RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import SearchBar from '../components/SearchBar';
import MovieItem from '../components/MovieItem';
import { Movie } from '../types';

type RootStackParamList = {
  MovieList: undefined;
  MovieDetails: { movie: Movie };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'MovieList'>;

const MovieListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const { list, loading, error, page, hasMore } = useSelector((state: RootState) => state.movies);
  const searchQuery = useSelector((state: RootState) => state.app.searchQuery);

  const filteredMovies = useMemo(() => {
    return list.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [list, searchQuery]);

  useEffect(() => {
    if (list.length === 0) dispatch(loadMovies(1));
  }, [dispatch, list.length]);

  const loadMore = () => {
    if (!loading && hasMore) dispatch(loadMovies(page + 1));
  };

  const renderItem = ({ item }: { item: Movie }) => (
    <MovieItem
      movie={item}
      onPress={() => navigation.navigate('MovieDetails', { movie: item })}
    />
  );

  return (
    <View style={styles.container}>
      <SearchBar />
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={filteredMovies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  error: { color: 'red', textAlign: 'center', padding: 10 },
});

export default MovieListScreen;
