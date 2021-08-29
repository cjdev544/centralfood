import { useAuth } from "../../hooks/useAuth";
import { useOrder } from "../../hooks/useOrder";
import OrderList from "./OredrList";

const PedidosPage = () => {
  const { orders, getOrders } = useOrder();
  const { auth } = useAuth();

  getOrders(auth?.uid);

  return (
    <div className="pedidos-page">
      <div className="pedidos-page__block">
        <div className="title">Mis pedidos</div>
        <div className="data">
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
