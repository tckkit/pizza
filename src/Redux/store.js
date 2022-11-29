import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { authReducers } from "./auth/reducers";
import { loadingReducers } from "./loading/reducers";
import { loading2Reducers } from "./loading2/reducers";
import { addInfoReducers } from "./addInfo/reducers";

import logger from "redux-logger";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  authStore: authReducers,
  loadingStore: loadingReducers,
  loading2Store: loading2Reducers,
  addInfoStore: addInfoReducers,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);
