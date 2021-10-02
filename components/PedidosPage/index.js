import { useOrder } from "../../hooks/useOrder";
import DefaultLoader from "../DefaultLoader";
import OrderList from "./OredrList";
import style from "./PedidosPage.module.css";

const PedidosPage = () => {
  const { orders } = useOrder();

  if (!orders) return <DefaultLoader />;

  return (
    <div className={style.pedidos}>
      <div className="pedidos-page__block">
        <div className={style.title}>Mis pedidos</div>
        <div className={style.data}>
          {orders?.length === 0 ? (
            <h2 className="no-order">
              Todavía no has realizado ninguna compra
            </h2>
          ) : (
            <OrderList orders={orders} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PedidosPage;
