import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CART } from "../helpers/constants";
import { addPlateCart, getProductsCart } from "../redux/actions/cart";

export const useCart = () => {
  const dispatch = useDispatch();
  const { productsCart, productsInCart } = useSelector((state) => state.cart);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem(CART));
    if (cart) dispatch(getProductsCart(cart));
  }, []);

  const addPlateInCart = (cart) => {
    dispatch(addPlateCart(cart));
  };

  return {
    productsCart,
    productsInCart,
    addPlateInCart,
  };
};
