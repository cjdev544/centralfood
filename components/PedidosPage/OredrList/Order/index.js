import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import "moment/locale/es";
import NoImage from "../../../../public/no-image.png";
import { Icon } from "semantic-ui-react";
import BasicModal from "../../../modals/BasicModal";
import { useState } from "react";

const Order = ({ order }) => {
  const { createdAt, direccionEnvio, pedido, totalCompra, id } = order;

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="order">
        <div className="order__header">
          <p>Pedido: {id}</p>
          <div className="order__header-flex">
            <p>
              {moment(createdAt).format("L")} - {moment(createdAt).format("LT")}
            </p>
            <p
              className="order__header-icon"
              onClick={() => setShowModal(true)}
            >
              Ver más{" "}
              <Icon
                name="eye"
                circular
                onClick={() => console.log("mostrar modal")}
              />
            </p>
          </div>
        </div>
        {pedido?.map((product) => (
          <div className="order__box" key={product.id}>
            <div className="order__box-info">
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
              <div className="order__box-data">
                <h2>{product.producto}</h2>
                <p>Precio unitario: {product.precioUnitario}€</p>
                <p>Cantidad del producto: {product.cantidadDelProducto}</p>
                <p>Subtotal: {product.subTotal}</p>
              </div>
            </div>
          </div>
        ))}
        <p className="order__pay">Total pagado: {totalCompra}€</p>
      </div>
      <BasicModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={`Pedido: ${id}`}
      >
        <h4>Dirección del pedido: {direccionEnvio.title}</h4>
        <h4>
          Fecha de pedido: {moment(createdAt).format("L")} -{" "}
          {moment(createdAt).format("LT")}
        </h4>
        <h4>Total pagado: {totalCompra}€</h4>
      </BasicModal>
    </>
  );
};

export default Order;
