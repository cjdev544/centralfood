import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetOrders } from "../redux/actions/order";

export const useOrder = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    if (uid) getOrders(uid);
  }, [uid]);

  const getOrders = () => {
    if (orders?.length === 0 || !orders) dispatch(startGetOrders(uid));
  };

  return {
    orders,
    getOrders,
  };
};
