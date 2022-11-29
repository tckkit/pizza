export const LOADING_TOGGLE_ACTION = "LOADING_TOGGLE_ACTION";

//Loading action thunk
export const loadingToggleAction = (status) => {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
};
