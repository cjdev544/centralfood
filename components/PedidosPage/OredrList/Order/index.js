import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import "moment/locale/es";
import { Icon } from "semantic-ui-react";
import NoImage from "../../../../public/no-image.png";
import BasicModal from "../../../modals/BasicModal";
import style from "./Order.module.css";

const Order = ({ order }) => {
  const {
    createdAt,
    direccionEnvio,
    pedido,
    totalCompra,
    totalProductos,
    costoEnvio,
    cubiertosParaPersonas,
    fechaEntrega,
    horaEntrega,
    id,
  } = order;

  const [showModal, setShowModal] = useState(false);
  console.log(order);
  return (
    <>
      <div className={style.order}>
        {!order?.deliveryIn && <div className={style.alert}>Por confirmar</div>}
        {order?.deliveryIn && !order?.orderSend && (
          <div className={style.sending}>
            Entrega aproximada: {order.deliveryIn} min
          </div>
        )}
        {order?.orderSend && <div className={style.send}>Enviado</div>}
        <div className={style.header}>
          <p>Pedido: {id}</p>
          <div className={style.flex}>
            <p>
              {moment(createdAt).format("L")} - {moment(createdAt).format("LT")}
            </p>
            <p className={style.icon} onClick={() => setShowModal(true)}>
              Ver más <Icon name="eye" circular />
            </p>
          </div>
        </div>
        {pedido?.map((product) => (
          <div className={style.box} key={product.id}>
            <div className={style.info}>
              <Link href={`/plato/${product?.path}`}>
                <a>
                  <Image
                    src={product?.url ? product.url : NoImage}
                    alt={product.producto}
                    width={100}
                    height={100}
                  />
                </a>
              </Link>
              <div className={style.data}>
                <h4>{product.producto}</h4>
                <p>Precio unitario: {product.precioUnitario}€</p>
                <p>Cantidad del producto: {product.cantidadDelProducto}</p>
                <p>Subtotal: {product.subTotal}€</p>
              </div>
            </div>
          </div>
        ))}
        <div className={style.span}>
          <span>Total por productos: {totalProductos}€</span>
          <span>Costo de envío: {costoEnvio}€</span>
        </div>
        <p className={style.pay}>Total pagado: {totalCompra}€</p>
      </div>
      <BasicModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={`Pedido: ${id}`}
      >
        <p>Dirección del pedido: {direccionEnvio.title}</p>
        <p>
          Fecha de pedido: {moment(createdAt).format("L")} -{" "}
          {moment(createdAt).format("LT")}
        </p>
        {cubiertosParaPersonas > 1 && (
          <p>Cubiertos para {cubiertosParaPersonas} personas.</p>
        )}
        {cubiertosParaPersonas === 1 && (
          <p>Cubiertos para {cubiertosParaPersonas} persona.</p>
        )}
        <p>Fecha de entrega: {fechaEntrega}</p>
        <p>Hora de entrega: {horaEntrega}</p>
        <p>Total por productos: {totalProductos}€</p>
        <p>Costo de envío: {costoEnvio}€</p>
        <p>Total pagado: {totalCompra}€</p>
      </BasicModal>
    </>
  );
};

export default Order;
