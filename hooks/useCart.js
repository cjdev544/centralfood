import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CART } from "../helpers/constants";
import {
  addPlateCart,
  getProductsCart,
  paymentOrder,
  removeCart,
} from "../redux/actions/cart";

export const useCart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { productsCart, productsInCart } = useSelector((state) => state.cart);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem(CART));
    if (cart) dispatch(getProductsCart(cart));
  }, []);

  const addPlateInCart = (cart) => {
    dispatch(addPlateCart(cart));
  };

  const paymentCartOrder = (token, products, idUser, address) => {
    dispatch(paymentOrder(token, products, idUser, address));
    removeAllProductsCart();
    router.push("/pedidos");
  };

  const removeAllProductsCart = () => {
    localStorage.removeItem(CART);
    dispatch(removeCart());
  };

  return {
    productsCart,
    productsInCart,
    addPlateInCart,
    paymentCartOrder,
    removeAllProductsCart,
  };
};
