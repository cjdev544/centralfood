import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { uiReducer } from "./reducers/uiReducer";
import { dataReducer } from "./reducers/dataReducer";
import { cartReducer } from "./reducers/cartReducer";
import { ordersReducer } from "./reducers/ordersReducer";

const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  data: dataReducer,
  cart: cartReducer,
  order: ordersReducer,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
