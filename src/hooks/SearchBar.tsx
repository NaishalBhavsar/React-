import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/slices/moviesSlice';
import { setSearchQuery as setAppSearchQuery } from '../redux/slices/appSlice';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchQuery(query));
      dispatch(setAppSearchQuery(query));
    }, 500); // Debounce
    return () => clearTimeout(timeoutId);
  }, [query, dispatch]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search movies..."
        value={query}
        onChangeText={setQuery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 },
});

export default SearchBar;
