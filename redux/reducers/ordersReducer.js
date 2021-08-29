import { types } from "../types";

const initialState = {
  orders: [],
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getOrders:
      return {
        ...state,
        orders: action.payload,
      };

    default:
      return state;
  }
};
