import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import moment from "moment";
import numeral from "numeral";
import { useSelector, useDispatch } from "react-redux";
import { getFilmDetailFromApi, getImageFromApi } from "../helpers/tmdbApi";

export default function FilmDetail({ navigation }) {
  const [film, setFilm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const favoriteFilms = useSelector(state => state.favoriteFilms);
  const dispatch = useDispatch();

  useEffect(() => {
    getFilmDetailFromApi(navigation.state.params.idFilm).then(data => {
      setFilm(data);
      setIsLoading(false);
    });
  }, []);

  const _toggleFavorite = () => {
    dispatch({ type: "TOGGLE_FAVORITE", value: film });
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

  const _displayFavoriteImage = () => {
    let sourceImage = require("../assets/no_favorite.png");
    if (favoriteFilms.findIndex(item => item.id === film.id) !== -1) {
      // Film dans nos favoris
      sourceImage = require("../assets/favorite.png");
    }
    return <Image style={styles.favorite_image} source={sourceImage} />;
  };

  const _displayFilm = () => {
    if (film.title) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{ uri: getImageFromApi(film.backdrop_path) }}
          />
          <Text style={styles.title_text}>{film.title}</Text>
          <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => _toggleFavorite()}
          >
            {_displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>
            Sorti le {moment(new Date(film.release_date)).format("DD/MM/YYYY")}
          </Text>
          <Text style={styles.default_text}>
            Note : {film.vote_average} / 10
          </Text>
          <Text style={styles.default_text}>
            Nombre de votes : {film.vote_count}
          </Text>
          <Text style={styles.default_text}>
            Budget : {numeral(film.budget).format("0,0[.]00 $")}
          </Text>
          <Text style={styles.default_text}>
            Genre(s) :{" "}
            {film.genres
              .map(function(genre) {
                return genre.name;
              })
              .join(" / ")}
          </Text>
          <Text style={styles.default_text}>
            Companie(s) :{" "}
            {film.production_companies
              .map(function(company) {
                return company.name;
              })
              .join(" / ")}
          </Text>
        </ScrollView>
      );
    }
  };

  return (
    <View style={styles.main_container}>
      {_displayLoading()}
      {_displayFilm()}
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
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 35,
    flex: 1,
    flexWrap: "wrap",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: "#000000",
    textAlign: "center"
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666",
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5
  },
  favorite_container: {
    alignItems: "center" // Alignement des components enfants sur l'axe secondaire, X ici
  },
  favorite_image: {
    width: 40,
    height: 40
  }
});
