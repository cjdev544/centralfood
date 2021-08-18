import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { uiReducer } from "./reducers/uiReducer";
import { adminReducer } from "./reducers/adminReducer";
import { dataReducer } from "./reducers/dataReducer";
import { cartReducer } from "./reducers/cartReducer";

const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  admin: adminReducer,
  data: dataReducer,
  cart: cartReducer,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
