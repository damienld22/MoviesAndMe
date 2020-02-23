import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { useSelector } from "react-redux";
import { getFilmsFromApiWithSearchedText } from "../helpers/tmdbApi";
import FilmList from "./FilmList";

let searchedText = "";
let page = 0;
let totalPages = 0;

export default function Search({ navigation }) {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchFilms = () => {
    setFilms([]);
    page = 0;
    totalPages = 0;
    _loadFilms();
  };

  const _loadFilms = () => {
    if (searchedText.length > 0) {
      setIsLoading(true);
      getFilmsFromApiWithSearchedText(searchedText, page + 1).then(data => {
        page = data.page;
        totalPages = data.total_pages;
        setFilms(prev => {
          return [...prev, ...data.results];
        });
        setIsLoading(false);
      });
    }
  };

  const _displayLoading = () => {
    if (isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  };

  return (
    <View style={styles.main_container}>
      <TextInput
        style={styles.textinput}
        placeholder="Titre du film"
        onChangeText={text => {
          searchedText = text;
        }}
        onSubmitEditing={() => searchFilms()}
      />
      <Button title="Rechercher" onPress={() => searchFilms()} />
      <FilmList
        films={films}
        navigation={navigation}
        loadFilms={_loadFilms}
        page={page}
        totalPages={totalPages}
      />
      {_displayLoading()}
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5
  }
});
