import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isOpenOrClose,
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
    dispatch(startGetRestaurants());
    dispatch(startGetPriceDelivery6km());
    dispatch(isOpenOrClose());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!data?.popularPlates) {
      dispatch(startGetPopularPlates());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!data?.promotionPlates) {
      dispatch(startGetPromotionPlates());
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
