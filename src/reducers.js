import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
  LOCALSTORAGE_RESET,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: false,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      if (state.favs.includes(state.current)) {
        return state;
      } else {
        const newFavs = [...state.favs, state.current];
        const newState = { ...state, favs: [...newFavs] };
        writeFavsToLocalStorage(newState);
        return newState;
      }

    case FAV_REMOVE:
      const newFavsRemove = state.favs.filter((item) => item.id !== action.payload);
      const newStateRemove = { ...state, favs: newFavsRemove };
      writeFavsToLocalStorage(newStateRemove);
      return newStateRemove;

    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload,
      };

    case FETCH_LOADING:
      return {
        ...state,
        loading: true,
        current: null,
      };

    case FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_FAVS_FROM_LS:
      const storage = readFavsFromLocalStorage();
      return { ...state, favs: storage };
    case LOCALSTORAGE_RESET:
      localStorage.clear();
      return {
        ...state
      };
    default:
      return state;
  }
}
