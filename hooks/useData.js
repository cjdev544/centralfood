import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startGetPopularPlates,
  startGetPriceDelivery6km,
  startGetPromotionPlates,
  startGetRestaurantPlate,
  startGetRestaurants,
} from "../redux/actions/data";

export const useData = () => {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data?.popularPlates) {
      dispatch(startGetRestaurants());
      dispatch(startGetPromotionPlates());
      dispatch(startGetPopularPlates());
      dispatch(startGetPriceDelivery6km());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRestaurantPlates = (restaurant) => {
    dispatch(startGetRestaurantPlate(restaurant));
  };

  return {
    data,
    getRestaurantPlates,
  };
};
