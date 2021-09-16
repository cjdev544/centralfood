import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { round } from "mathjs";
import { Grid, Icon } from "semantic-ui-react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import NoImage from "../../../public/no-image.png";
import {
  removePlateStorage,
  updatePlateStorage,
} from "../../../redux/actions/cart";

const ProductCartMobile = ({ plate }) => {
  const dispatch = useDispatch();
  const { updateProductCart, deleteProductCart } = useLocalStorage();

  const [counter, setCounter] = useState(plate.number);
  const [total, setTotal] = useState(plate?.precio);

  useEffect(() => {
    setTotal(round(plate?.precio * counter, 2));
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
    const cart = updateProductCart(plate, counter);
    dispatch(updatePlateStorage(cart));
  };

  const deleteProduct = () => {
    const cart = deleteProductCart(plate);
    dispatch(removePlateStorage(cart));
  };

  return (
    <div className="cart-phone">
      <Grid className="cart-phone__grid">
        <Grid.Column width={3} className="phone-grid__image">
          <Image
            src={plate?.imagen ? plate.imagen?.url : NoImage}
            alt={plate.title}
            width={120}
            height={100}
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <div className="cart-phone__text-info">
            <h4>{plate?.nombre}</h4>
            <span>Precio unitario: {plate?.precio}€</span>
            <span className="text-info__subtotal">Subtotal: {total}€</span>
          </div>
        </Grid.Column>
        <Grid.Column width={5} className="phone-grid__price">
          <Icon name="minus circle" link onClick={minusPlate} />
          <span>{counter}</span>
          <Icon name="plus circle" link onClick={plusPlate} />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ProductCartMobile;
