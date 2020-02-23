import React from 'react';
import {StyleSheet, View} from 'react-native';
import FilmList from './FilmList';
import {useSelector} from 'react-redux';
import Avatar from './Avatar';

export default function Favorites({navigation}) {
  const favoriteFilms = useSelector(state => state.favoriteFilms);

  return (
    <View style={styles.main_container}>
      <View style={styles.avatar_container}>
        <Avatar />
      </View>
      <FilmList
        style={styles.list}
        films={favoriteFilms}
        navigation={navigation}
        isFavorite={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  avatar_container: {
    alignItems: 'center',
  },
});
