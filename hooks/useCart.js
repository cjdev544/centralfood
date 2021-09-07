import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CART } from "../helpers/constants";
import {
  addPlateCart,
  getProductsCart,
  removeCart,
} from "../redux/actions/cart";

export const useCart = () => {
  const dispatch = useDispatch();
  const { productsCart, productsInCart, dataPayment } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem(CART));
    if (cart) dispatch(getProductsCart(cart));
  }, []);

  const addPlateInCart = (cart) => {
    dispatch(addPlateCart(cart));
  };

  const removeAllProductsCart = () => {
    localStorage.removeItem(CART);
    dispatch(removeCart());
  };

  return {
    productsCart,
    productsInCart,
    dataPayment,
    addPlateInCart,
    removeAllProductsCart,
  };
};
