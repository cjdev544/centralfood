import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { concatArray } from "../../helpers/concatArray";
import { BASE_PATH } from "../../helpers/constants";
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

const getPromotionPlates = (data) => ({
  type: types.getPromotionPlates,
  payload: data,
});

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

const getPopularPlates = (data) => ({
  type: types.getPopularPlates,
  payload: data,
});

export const startGetRestaurants = () => {
  return async (dispatch) => {
    try {
      const url = `${BASE_PATH}/restaurantes`;
      const response = await fetch(url);
      const result = await response.json();
      dispatch(getRestaurants(result));
      dispatch(startGetAllPlates(result));
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

const getRestaurants = (restaurants) => ({
  type: types.getRestaurants,
  payload: restaurants,
});

export const startGetRestaurantPlate = (restaurant) => {
  return async (dispatch) => {
    try {
      const url = `${BASE_PATH}/${restaurant}-platoes`;
      const response = await fetch(url);
      const result = await response.json();
      dispatch(startGetCategoriesRestaurant(restaurant, result));
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

export const startGetCategoriesRestaurant = (restaurant, plates) => {
  return async (dispatch) => {
    try {
      const url = `${BASE_PATH}/category-${restaurant}s`;
      const response = await fetch(url);
      const result = await response.json();
      const restaurants = result?.map((option) => {
        const platesForCategory = plates?.filter(
          (plate) => plate.categoria.category === option.category
        );
        return {
          category: option.category,
          plates: platesForCategory,
        };
      });
      dispatch(GetplatesForRestaurants({ restaurant, plates: restaurants }));
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

const GetplatesForRestaurants = (plates) => ({
  type: types.getPlates,
  payload: plates,
});

export const startGetAllPlates = (restaurants) => {
  return async (dispatch) => {
    try {
      const array = [];
      const allPlates = [];
      for await (const rest of restaurants) {
        const url = `${BASE_PATH}/${rest.page}-platoes`;
        const response = await fetch(url);
        const result = await response.json();
        array.push(result);
      }
      array?.forEach((plateRest) => {
        plateRest.forEach((plate) => {
          allPlates.push(plate);
        });
      });
      dispatch(getAllPlates(allPlates));
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

const getAllPlates = (plates) => ({
  type: types.getAllPlates,
  payload: plates,
});

export const startGetPriceDelivery6km = () => {
  return async (dispatch) => {
    try {
      const url = `${BASE_PATH}/costo-envios`;
      const response = await fetch(url);
      const result = await response.json();
      dispatch(getPriceDelivery(result));
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

const getPriceDelivery = (prices) => ({
  type: types.getPriceDelivery6km,
  payload: prices,
});

export const isOpenOrClose = () => {
  return (dispatch) => {
    try {
      onSnapshot(doc(db, "openClose", "O91HkLkdfZw0JfiDHteA"), (doc) => {
        dispatch(setIsOpenOrClose(doc.data().isOpen));
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

const setIsOpenOrClose = (isOpen) => ({
  type: types.isOpenLocal,
  payload: isOpen,
});
