export const LOADING2_TOGGLE_ACTION = "LOADING2_TOGGLE_ACTION";

//Loading action thunk
export const loading2ToggleAction = (status) => {
  return {
    type: LOADING2_TOGGLE_ACTION,
    payload: status,
  };
};
