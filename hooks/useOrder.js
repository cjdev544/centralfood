import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetOrders } from "../redux/actions/order";

export const useOrder = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth?.uid) getOrders(auth?.uid);
  }, [auth?.uid]);

  const getOrders = () => {
    if (orders?.length === 0 || !orders) dispatch(startGetOrders(auth?.uid));
  };

  return {
    orders,
    getOrders,
  };
};
