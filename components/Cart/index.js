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

const Cart = () => {
  const { productsCart } = useCart();
  const [address, setAddress] = useState(null);
  const { auth } = useAuth();
  const [totalPriceToPay, setTotalPriceToPay] = useState(0);
  const { getDataUser } = useDataUser();

  const [values, setValues] = useState({});
  console.log(values);
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
  }, [auth]);

  useEffect(() => {
    if (values?.shipping === "Recogida el en local") {
      setAddress("Recogida el en local");
    }
  }, [values]);

  return (
    <>
      <div className="cart">
        {!productsCart?.length > 0 ? (
          <div className="empty-cart">
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
                  <SummaryCart
                    products={productsCart}
                    totalPriceToPay={totalPriceToPay}
                  />
                  <RadioGroup setValues={setValues} />
                </>
              )}
              {values?.shipping === "Entrega a domicilio" && (
                <ShippingAddress setAddress={setAddress} values={values} />
              )}
            </div>
            {values?.shipping === "Entrega a domicilio" &&
              totalPriceToPay > 12 &&
              address && <Payment products={productsCart} address={address} />}
            {values?.shipping === "Recogida el en local" && (
              <Payment products={productsCart} address={address} />
            )}
          </>
        )}
      </div>
      <ArrowBack />
    </>
  );
};

export default Cart;
