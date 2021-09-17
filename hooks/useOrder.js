import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrderNoPay,
  resetOrders,
  startGetOrders,
} from "../redux/actions/order";

export const useOrder = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth?.uid !== undefined) {
      getOrders(auth?.uid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.uid]);

  const getOrders = () => {
    if (auth?.uid !== undefined) {
      if (orders?.length === 0 || !orders) dispatch(startGetOrders(auth?.uid));
    }
  };

  const reloadOrder = () => {
    dispatch(resetOrders(auth?.id));
  };

  const deleteOrder = (orderId) => {
    dispatch(deleteOrderNoPay(auth?.uid, orderId));
  };

  return {
    orders,
    getOrders,
    reloadOrder,
    deleteOrder,
  };
};
