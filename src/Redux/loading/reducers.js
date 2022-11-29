import { LOADING_TOGGLE_ACTION } from "./actions";

const initialState = {
  showLoading: false,
};

export function loadingReducers(state = initialState, action) {
  switch (action.type) {
    case LOADING_TOGGLE_ACTION:
      return { showLoading: action.payload };
    default:
      return state;
  }
}
