import { BASE_PATH } from "../../helpers/constants";
import { authFetch } from "../../helpers/fetch";
import { types } from "../types";

export const startGetOrders = (userId) => {
  return async (dispatch) => {
    try {
      const url = `${BASE_PATH}/orders?_sort=createdAt:desc&usuario=${userId}`;
      const response = await authFetch(url, null, () => null);
      dispatch(getOrdersUser(response));
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

export const deleteOrderNoPay = (userId, orderId) => {
  return async (dispatch) => {
    try {
      const params = {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      };
      const url = `${BASE_PATH}/orders/${orderId}`;
      await authFetch(url, params, () => null);
      dispatch(startGetOrders(userId));
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

const getOrdersUser = (orders) => ({
  type: types.getOrders,
  payload: orders,
});

export const resetOrders = () => ({
  type: types.resetOrders,
});
