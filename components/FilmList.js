import React from "react";
import { StyleSheet, FlatList } from "react-native";
import FilmItem from "./FilmItem";
import { useSelector } from "react-redux";

export default function FilmList({
  navigation,
  films,
  page,
  totalPages,
  loadFilms,
  isFavorite = false
}) {
  const favoriteFilms = useSelector(state => state.favoriteFilms);

  const _displayDetailForFilm = idFilm => {
    navigation.navigate("FilmDetail", { idFilm });
  };

  const _isFavoriteFilm = idFilm => {
    return favoriteFilms.findIndex(film => film.id === idFilm) !== -1;
  };

  return (
    <FlatList
      style={styles.list}
      data={films}
      extraData={favoriteFilms}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (!isFavorite) {
          if (page < totalPages) {
            loadFilms();
          }
        }
      }}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <FilmItem
          displayDetailForFilm={_displayDetailForFilm}
          film={item}
          isFilmFavorite={_isFavoriteFilm(item.id)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
});
