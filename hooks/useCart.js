import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_PATH, CART } from "../helpers/constants";
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
    if (cart) checkProductIsAvailable(cart);
  }, []);

  const checkProductIsAvailable = async (products) => {
    const restaurantProduct = {
      sushiguay: "sushiguay-platoes",
      guaywok: "guaywok-platoes",
      "sabor-casita": "sabor-casita-platoes",
      tapas: "tapas-platoes",
      bebidas: "bebidas-platoes",
    };
    const array = [];
    for await (const product of products) {
      const productPath = restaurantProduct[product?.restaurante];
      const url = `${BASE_PATH}/${productPath}/${product.id}`;
      const response = await fetch(url);
      const result = await response.json();
      if (result.disponible) array.push(product);
    }
    dispatch(getProductsCart(array));
  };

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
