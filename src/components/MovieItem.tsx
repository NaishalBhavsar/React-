import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/slices/appSlice';
import { RootState } from '../redux/store';
import { Movie } from '../types';

interface MovieItemProps {
  movie: Movie;
  onPress: () => void;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie, onPress }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) =>
    state.app.favorites.includes(movie.id)
  );

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.details}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.overview} numberOfLines={2}>{movie.overview}</Text>
        <TouchableOpacity onPress={() => dispatch(toggleFavorite(movie.id))}>
          <Text style={styles.favorite}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#eee' },
  poster: { width: 80, height: 120 },
  details: { flex: 1, marginLeft: 10 },
  title: { fontSize: 16, fontWeight: 'bold' },
  overview: { fontSize: 14, color: '#666' },
  favorite: { fontSize: 20, marginTop: 10 },
});

export default React.memo(MovieItem);
