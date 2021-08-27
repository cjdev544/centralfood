import { useEffect, useState } from "react";
import { useCart } from "../../hooks/useCart";
import { round } from "mathjs";
import Payment from "./Payment";
import ShippingAddress from "./ShippingAddress";
import SummaryCart from "./SummaryCart";

const Cart = () => {
  const { productsCart } = useCart();
  const [address, setAddress] = useState(null);
  const [totalPriceToPay, setTotalPriceToPay] = useState(0);

  useEffect(() => {
    const totalForProductPay = productsCart.map((product) => {
      const subTotalForProduct = round(product.precio * product.number, 2);
      product.subTotal = subTotalForProduct;
      return subTotalForProduct;
    });

    let totalForPay = 0;
    totalForProductPay.forEach((element) => {
      totalForPay += element;
    });
    setTotalPriceToPay(totalForPay);
  }, [productsCart]);

  return (
    <div className="cart">
      {!productsCart?.length > 0 ? (
        <div className="empty-cart">
          <h2>No se han agregado productos al carrito</h2>
        </div>
      ) : (
        <>
          <div className="full-cart">
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
  );
};

export default Cart;
