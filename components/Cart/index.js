import { useEffect, useState } from "react";
import { useCart } from "../../hooks/useCart";
import { round } from "mathjs";
import Payment from "./Payment";
import ShippingAddress from "./ShippingAddress";
import SummaryCart from "./SummaryCart";
import { useAuth } from "../../hooks/useAuth";
import { useDataUser } from "../../hooks/useDataUser";
import ArrowBack from "../ArrowBack";
import RadioGroup from "../RadioGroup";
import { useMediaQueryJs } from "../../hooks/useMediaQueryJs";
import SummaryCartMobil from "./SummaryCartMobil";
import style from "./Cart.module.css";
import { toast } from "react-toastify";

const Cart = () => {
  const { productsCart } = useCart();
  const [address, setAddress] = useState(null);
  const [addressActive, setAddressActive] = useState(null);

  const { auth } = useAuth();
  const [totalPriceToPay, setTotalPriceToPay] = useState(0);
  const { getDataUser } = useDataUser();
  const [values, setValues] = useState({});
  const { isAMobil } = useMediaQueryJs();

  useEffect(() => {
    const totalForProductPay = productsCart.map((product) => {
      const subTotalForProduct = round(product.precio * product.number, 2);
      product.subTotal = subTotalForProduct;
      return subTotalForProduct;
    }, []);

    let totalForPay = 0;
    totalForProductPay.forEach((element) => {
      totalForPay += element;
    });
    totalForPay = round(totalForPay, 2);
    setTotalPriceToPay(totalForPay);
  }, [productsCart, auth]);

  useEffect(() => {
    if (!auth) getDataUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    if (values?.shipping === "Recogida el en local") {
      setAddress("Recogida el en local");
    }
  }, [values]);

  useEffect(() => {
    if (
      values?.shipping === "Entrega a domicilio" &&
      totalPriceToPay < 12 &&
      addressActive
    ) {
      toast.warning(
        "El pedido mínimo para entrega a domicilio debe ser de al menos 12€"
      );
    }
  }, [values?.shipping, totalPriceToPay, addressActive]);

  return (
    <>
      <div className="cart">
        {!productsCart?.length > 0 ? (
          <div className={style.emptyCart}>
            <h2>No se han agregado productos al carrito</h2>
          </div>
        ) : (
          <>
            <div className="full-cart">
              {!auth?.user ? (
                <h2>
                  Crea una cuenta o inicia sesión para poder hacer la compra.
                </h2>
              ) : (
                <>
                  {isAMobil ? (
                    <SummaryCartMobil
                      products={productsCart}
                      totalPriceToPay={totalPriceToPay}
                    />
                  ) : (
                    <SummaryCart
                      products={productsCart}
                      totalPriceToPay={totalPriceToPay}
                    />
                  )}
                  <RadioGroup setValues={setValues} />
                </>
              )}
              {values?.shipping === "Entrega a domicilio" && (
                <ShippingAddress
                  setAddress={setAddress}
                  values={values}
                  addressActive={addressActive}
                  setAddressActive={setAddressActive}
                />
              )}
            </div>
            {values?.shipping === "Entrega a domicilio" &&
              totalPriceToPay > 12 &&
              addressActive && (
                <Payment
                  products={productsCart}
                  address={address}
                  values={values}
                  totalPriceToPay={totalPriceToPay}
                />
              )}
            {values?.shipping === "Recogida el en local" && (
              <Payment
                products={productsCart}
                address={address}
                values={values}
                totalPriceToPay={totalPriceToPay}
              />
            )}
          </>
        )}
      </div>
      <ArrowBack />
    </>
  );
};

export default Cart;
