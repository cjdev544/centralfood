import { useEffect, useState } from "react";
import { useCart } from "../../hooks/useCart";
import { round } from "mathjs";
import Payment from "./Payment";
import ShippingAddress from "./ShippingAddress";
import SummaryCart from "./SummaryCart";
import { useAuth } from "../../hooks/useAuth";
import { useDataUser } from "../../hooks/useDataUser";
import ArrowBack from "../ArrowBack";

const Cart = () => {
  const { productsCart } = useCart();
  const [address, setAddress] = useState(null);
  const { auth } = useAuth();
  const [totalPriceToPay, setTotalPriceToPay] = useState(0);
  const { getDataUser } = useDataUser();

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
    setTotalPriceToPay(totalForPay);
  }, [productsCart, auth]);

  useEffect(() => {
    if (!auth) getDataUser();
  }, [auth]);

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
                <h4>
                  Créa ó elije una dirección abajo para habilitar el boton de
                  compra.
                </h4>
              )}
              <SummaryCart
                products={productsCart}
                totalPriceToPay={totalPriceToPay}
              />
            </div>
            <ShippingAddress setAddress={setAddress} />
            {address && <Payment products={productsCart} address={address} />}
          </>
        )}
      </div>
      <ArrowBack />
    </>
  );
};

export default Cart;
