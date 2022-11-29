import axios from "axios";
import { loadingToggleAction } from "../loading/actions";

export const LOGIN_CAMPUS_SUCCESS_ACTION = "LOGIN_CAMPUS_SUCCESS_ACTION";
export const LOGIN_FAMILY_SUCCESS_ACTION = "LOGIN_FAMILY_SUCCESS_ACTION";
export const LOGIN_FAILURE_ACTION = "LOGIN_FAILURE_ACTION";
export const LOGOUT_NOW_ACTION = "LOGOUT_NOW_ACTION";

//Action creators
export const loginCampusSuccessAction = () => {
  return {
    type: LOGIN_CAMPUS_SUCCESS_ACTION,
  };
};

export const loginFamilySuccessAction = () => {
  return {
    type: LOGIN_FAMILY_SUCCESS_ACTION,
  };
};

export const loginFailureAction = (message) => {
  return {
    type: LOGIN_FAILURE_ACTION,
    message: message,
  };
};

export const logoutNowAction = () => {
  return {
    type: LOGOUT_NOW_ACTION,
  };
};
