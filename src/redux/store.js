import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import { coins,search } from "./reducer";

const reducer = combineReducers({ coins,search });
const middleware = [thunk];

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);
export default store;
