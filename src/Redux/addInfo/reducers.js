import {
  LOGIN_CAMPUS_SUCCESS_ACTION,
  LOGIN_FAMILY_SUCCESS_ACTION,
  LOGIN_FAILURE_ACTION,
  LOGOUT_NOW_ACTION,
} from "./actions";

const initialState = {
  // default false, if there is a token => true
  authRole: localStorage.getItem("role"),
  message: "",
};

export const addInfoReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_CAMPUS_SUCCESS_ACTION:
      return { authRole: "campus", message: "" };
    case LOGIN_FAMILY_SUCCESS_ACTION:
      return { authRole: "family", message: "" };
    case LOGIN_FAILURE_ACTION:
      return { authRole: "", message: action.message };
    case LOGOUT_NOW_ACTION:
      return { authRole: "", message: "" };
    default:
      return state;
  }
};
