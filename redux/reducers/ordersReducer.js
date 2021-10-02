import { types } from "../types";

const initialState = {
  orders: null,
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getOrders:
      return {
        ...state,
        orders: action.payload,
      };

    case types.resetOrders:
      return initialState;

    case types.changeOrder:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
      };

    default:
      return state;
  }
};
