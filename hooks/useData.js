import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startGetPopularPlates,
  startGetPromotionPlates,
  startGetRestaurants,
} from "../redux/actions/data";

export const useData = () => {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) {
      dispatch(startGetPromotionPlates());
      dispatch(startGetPopularPlates());
      dispatch(startGetRestaurants());
    }
  }, []);

  return {
    data,
  };
};
