import { Table } from "semantic-ui-react";
import TableCellProduct from "./ProductCart/TableCellProduct";

const SummaryCart = ({ products, totalPriceToPay }) => {
  return (
    <div className="summary-cart">
      <div className="title">Resumen del carrito</div>
      <div className="data">
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Producto</Table.HeaderCell>
              <Table.HeaderCell>Precio unitario</Table.HeaderCell>
              <Table.HeaderCell>Cantidad</Table.HeaderCell>
              <Table.HeaderCell>Subtotal</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {products?.map((product) => (
              <TableCellProduct key={product.id} product={product} />
            ))}
            <Table.Row className="summary-cart__resume">
              <Table.Cell className="clear"></Table.Cell>
              <Table.Cell colSpan="2">TOTAL A PAGAR:</Table.Cell>
              <Table.Cell className="total-price">{`${totalPriceToPay} €`}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default SummaryCart;
