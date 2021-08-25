import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Icon, Table, TableRow } from "semantic-ui-react";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { useStorageImage } from "../../../../hooks/useStorageImage";
import NoImage from "../../../../public/no-image.png";
import {
  removePlateStorage,
  updatePlateStorage,
} from "../../../../redux/actions/cart";

const TableCellProduct = ({ product }) => {
  const dispatch = useDispatch();
  const { updateProductCart, deleteProductCart } = useLocalStorage();

  const { imgUrl } = useStorageImage(product);

  const [counter, setCounter] = useState(product.number);
  const [total, setTotal] = useState(product?.price);

  useEffect(() => {
    setTotal(product?.price * counter);
  }, [counter]);

  useEffect(() => {
    if (counter > 0) {
      handleClick();
    }
    if (counter === 0) {
      deleteProduct();
    }
  }, [counter]);

  const plusPlate = () => {
    setCounter(counter + 1);
  };

  const minusPlate = () => {
    setCounter(counter - 1);
  };

  const handleClick = () => {
    const cart = updateProductCart(product, counter);
    dispatch(updatePlateStorage(cart));
  };

  const deleteProduct = () => {
    const cart = deleteProductCart(product);
    dispatch(removePlateStorage(cart));
  };

  return (
    <Table.Row className="summary-cart__product">
      <Table.Cell>
        <Image
          src={imgUrl ? imgUrl : NoImage}
          alt={product?.title}
          width={50}
          height={50}
        />
        {product?.title}
      </Table.Cell>
      <Table.Cell>{`${product.price} €`}</Table.Cell>
      <Table.Cell className="summary-cart__plus-minus">
        <Icon name="minus circle" link onClick={minusPlate} />
        <span>{counter}</span>
        <Icon name="plus circle" link onClick={plusPlate} />
      </Table.Cell>
      <Table.Cell className="summary-cart__price">{`${total} €`}</Table.Cell>
    </Table.Row>
  );
};

export default TableCellProduct;
