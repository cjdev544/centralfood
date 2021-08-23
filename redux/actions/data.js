import { concatArray } from "../../helpers/concatArray";
import { BASE_PATH } from "../../helpers/constats";
import { types } from "../types";

export const startGetPromotionPlates = () => {
  return async (dispatch) => {
    try {
      const url = `${BASE_PATH}/platos-promocion`;
      const response = await fetch(url);
      const result = await response.json();
      const promotionPlates = concatArray(result);
      const promoSection = {
        promoTitle: result?.titulo_promocion,
        description: result?.descripcion_promocion,
        plates: promotionPlates,
      };
      dispatch(getPromotionPlates(promoSection));
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

export const startGetPopularPlates = () => {
  return async (dispatch) => {
    try {
      const url = `${BASE_PATH}/platos-populares`;
      const response = await fetch(url);
      const result = await response.json();
      const popularPlates = concatArray(result);
      const promoSection = {
        popularTitle: result?.titulo_platos_populares,
        description: result?.descripcion_platos_populares,
        plates: popularPlates,
      };
      dispatch(getPopularPlates(promoSection));
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

export const startGetRestaurants = () => {
  return async (dispatch) => {
    try {
      const url = `${BASE_PATH}/restaurantes`;
      const response = await fetch(url);
      const result = await response.json();
      dispatch(getRestaurants(result));
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

const getPromotionPlates = (data) => ({
  type: types.getPromotionPlates,
  payload: data,
});

const getPopularPlates = (data) => ({
  type: types.getPopularPlates,
  payload: data,
});

const getRestaurants = (restaurants) => ({
  type: types.getRestaurants,
  payload: restaurants,
});
