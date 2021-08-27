import { toast } from "react-toastify";
import { BASE_PATH } from "../../helpers/constants";
import { authFetch } from "../../helpers/fetch";
import { types } from "../types";

export const getProductsCart = (cart) => ({
  type: types.addProductCart,
  payload: cart,
});

export const addPlateCart = (cart) => ({
  type: types.addProductCart,
  payload: cart,
});

export const updatePlateStorage = (cart) => ({
  type: types.addProductCart,
  payload: cart,
});

export const removePlateStorage = (cart) => ({
  type: types.addProductCart,
  payload: cart,
});

export const paymentOrder = (token, products, idUser, address) => {
  return async (dispatch) => {
    try {
      const addressShipping = address;

      const url = `${BASE_PATH}/orders`;
      const params = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          token,
          products,
          idUser,
          addressShipping,
        }),
      };
      const response = await authFetch(url, params, () => null);
      if (response?.id) {
        toast.success("Pedido realizado");
      } else {
        toast.error("Error en el pedido. Intente de nuevo");
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

export const removeCart = () => ({
  type: types.removeAllProductsCart,
});
