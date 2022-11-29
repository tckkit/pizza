import { LOADING2_TOGGLE_ACTION } from "./actions";

const initialState = {
  showLoading: false,
};

export function loading2Reducers(state = initialState, action) {
  switch (action.type) {
    case LOADING2_TOGGLE_ACTION:
      return { showLoading: action.payload };
    default:
      return state;
  }
}
