import { useEffect, useState } from "react";
import style from "./OrderAlert.module.css";

const OrderAlert = ({ order }) => {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (order?.deliveryIn === undefined) {
      setAlert({
        msg: `Hola ${order?.usuario?.name}, en breve será notificado con la confirmación del pedido N°${order.id} y el tiempo estimado para su entrega`,
        color: "#ff5400",
      });
    } else {
      setAlert({
        msg: `El pedido N°${order.id} sera entregado en un tiempo aproximado de ${order.deliveryIn} minutos. Gracias por preferirnos y buen provecho`,
        color: "#69af00",
      });
    }
  }, [order]);

  return (
    <div className={style.alert} style={{ backgroundColor: `${alert?.color}` }}>
      <h3>{alert?.msg}</h3>
    </div>
  );
};

export default OrderAlert;
