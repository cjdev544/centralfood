import { useDispatch, useSelector } from "react-redux";
import { startGetOrders } from "../redux/actions/order";

export const useOrder = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);

  const getOrders = (userId) => {
    if (orders?.length === 0) {
      dispatch(startGetOrders(userId));
    }
  };

  return {
    orders,
    getOrders,
  };
};
