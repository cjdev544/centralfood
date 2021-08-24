import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startGetCategoriesRestaurant,
  startGetPopularPlates,
  startGetPromotionPlates,
  startGetRestaurantPlate,
  startGetRestaurants,
} from "../redux/actions/data";

export const useData = () => {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data?.promotionPlates) {
      dispatch(startGetPromotionPlates());
      dispatch(startGetPopularPlates());
      dispatch(startGetRestaurants());
    }
  }, []);

  const getRestaurantPlates = (restaurant) => {
    dispatch(startGetRestaurantPlate(restaurant));
  };

  return {
    data,
    getRestaurantPlates,
  };
};
