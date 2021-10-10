import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeInOrder,
  deleteOrderNoPay,
  resetOrders,
  startGetOrders,
} from "../redux/actions/order";
import { db, getAllOrdersFirebase, uploadOrder } from "../firebase/config";
import { BASE_PATH } from "../helpers/constants";
import { authFetch } from "../helpers/fetch";
import { onSnapshot, doc } from "firebase/firestore";

export const useOrder = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const auth = useSelector((state) => state.auth);

  const [ordersAlert, setOrdersAlert] = useState(null);

  useEffect(() => {
    if (auth?.uid !== undefined) {
      getOrders(auth?.uid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.uid]);

  useEffect(() => {
    (async () => {
      if (auth?.uid !== undefined) {
        const ordersFirebase = await getAllOrdersFirebase(auth?.uid);
        if (ordersFirebase?.length > 0) {
          const orderNotShipping = ordersFirebase.filter(
            (order) => order?.orderSend === undefined
          );
          if (orderNotShipping.length > 0) {
            const ordersInAlert = orderNotShipping.map((order) => {
              listendChange(order);
              return order;
            });
            setOrdersAlert(ordersInAlert);
          } else {
            setOrdersAlert(null);
          }
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.uid, orders]);

  const listendChange = (order) => {
    if (orders) {
      const unsusbcribe = onSnapshot(
        doc(db, "orders", `${order.id}`),
        (doc) => {
          compareOrder(doc.data());
        }
      );
      if (order?.orderSend) unsusbcribe();
    }
  };

  const compareOrder = (order) => {
    const orderCompare = orders?.filter(
      (myOrder) => myOrder.id === order?.id
    )[0];
    if (
      orderCompare?.deliveryIn !== order?.deliveryIn ||
      orderCompare?.orderSend !== order?.orderSend
    ) {
      dispatch(changeInOrder(order));
    }
  };

  const getOrders = () => {
    if (auth?.uid !== undefined) {
      // por que entra
      if (!orders) {
        dispatch(startGetOrders(auth?.uid));
      }
    }
  };

  const getOrder = async (orderId) => {
    try {
      const url = `${BASE_PATH}/orders/${orderId}`;
      const response = await authFetch(url, null, () => null);
      return response;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const reloadOrder = () => {
    dispatch(resetOrders(auth?.id));
  };

  const deleteOrder = (orderId) => {
    dispatch(deleteOrderNoPay(auth?.uid, orderId));
  };

  const addOrderInFirebase = async (orderId, order) => {
    await uploadOrder(orderId, order);
    listendChange(orderId);
  };

  return {
    orders,
    ordersAlert,
    getOrders,
    getOrder,
    reloadOrder,
    deleteOrder,
    addOrderInFirebase,
  };
};
