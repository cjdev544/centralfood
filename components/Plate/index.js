import { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Grid, Icon } from "semantic-ui-react";
import NoImage from "../../public/no-image.png";
import { useData } from "../../hooks/useData";
import { toast } from "react-toastify";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useCart } from "../../hooks/useCart";
import { round } from "mathjs";
import { useRouter } from "next/dist/client/router";
import ArrowBack from "../ArrowBack";
import { BASE_PATH } from "../../helpers/constants";
import style from './Plate.module.css'

const Plate = ({ plate }) => {
  const [rest, setRest] = useState(null);
  const [counter, setCounter] = useState(1);
  const [total, setTotal] = useState(plate?.precio);

  const router = useRouter();
  const { addProductCart } = useLocalStorage();
  const { addPlateInCart } = useCart();

  const { data } = useData();

  useEffect(() => {
    (async () => {
      const restaurantProduct = {
        sushiguay: "sushiguay-platoes",
        guaywok: "guaywok-platoes",
        "sabor-casita": "sabor-casita-platoes",
        tapas: "tapas-platoes",
        bebidas: "bebidas-platoes",
      };
      const productPath = restaurantProduct[plate?.restaurante];
      const url = `${BASE_PATH}/${productPath}/${plate.id}`;
      const response = await fetch(url);
      const result = await response.json();
      if (!result.disponible) {
        router.replace("/");
        toast.warning(
          `${plate?.nombre} no se encuentra disponible en estos momentos`
        );
      }
    })();
  }, []);

  useEffect(() => {
    if (data?.restaurants) {
      const plateRest = data.restaurants.filter(
        (rest) => rest.page === plate.restaurante
      );
      setRest(plateRest[0]);
    }
  }, [plate, data?.restaurants]);

  useEffect(() => {
    setTotal(round(plate?.precio * counter, 2));
  }, [counter]);

  const plusPlate = () => {
    setCounter(counter + 1);
  };

  const minusPlate = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const handleClick = () => {
    const cart = addProductCart(plate, counter);
    toast.success("Producto agregado al carrito");
    addPlateInCart(cart);
    router.back();
  };

  if (!rest) return null;

  return (
    <>
      <Grid className={`${style.plate} plate`}>
        <Grid.Column mobile={16} tablet={6} computer={6}>
          <Image
            src={plate.imagen.url ? plate.imagen.url : NoImage}
            alt={plate.nombre}
            width={340}
            height={260}
          />
          <div className={style.category}>
            <p>{rest.type}</p>
            <p>
              Categoria: <span>{plate.categoria.category}</span>
            </p>
          </div>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={10} computer={10}>
          <div className={style.title}>{plate.nombre.toUpperCase()}</div>
          <div className={style.rest}>
            Restaurante: <span>{rest.name}</span>
          </div>
          <div className={style.description}>{plate.descripcion}</div>
          <div className={style.minus}>
            <Icon name="minus circle" link onClick={minusPlate} />
            <span>{counter}</span>
            <Icon name="plus circle" link onClick={plusPlate} />
          </div>
          <div className={style.buy}>
            <div className={style.price}>
              <p>
                Precio: <span>{`${total} €`}</span>
              </p>
            </div>
            <Button className="plate__buy-btn" onClick={handleClick}>
              Añadir
            </Button>
          </div>
        </Grid.Column>
      </Grid>
      <ArrowBack />
    </>
  );
};

export default Plate;
