const initialState = { favoriteFilms: [] };

export default function toggleFavorite(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      const favoriteIndex = state.favoriteFilms.findIndex(
        item => item.id === action.value.id
      );
      if (favoriteIndex !== -1) {
        return Object.assign({}, state, {
          favoriteFilms: state.favoriteFilms.filter(
            (_, index) => index !== favoriteIndex
          )
        });
      } else {
        return Object.assign({}, state, {
          favoriteFilms: [...state.favoriteFilms, action.value]
        });
      }
    default:
      return state;
  }
}
