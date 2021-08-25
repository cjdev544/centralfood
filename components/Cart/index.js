import { useState } from "react";
import { useSelector } from "react-redux";
import Payment from "./Payment/Payment";
import ShippingAddress from "./ShippingAddress/ShippingAddress";
import SummaryCart from "./SummaryCart";

const Cart = () => {
  const { productsCart } = useCart();

  const [address, setAddress] = useState(null);

  return (
    <div className="cart">
      {!productsCart ? (
        <div className="empty-cart">
          <h2>No se han agregado productos al carrito</h2>
        </div>
      ) : (
        <>
          <div className="full-cart">
            <SummaryCart products={productsCart} />
          </div>
          <ShippingAddress setAddress={setAddress} />
          {address && <Payment products={productsCart} address={address} />}
        </>
      )}
    </div>
  );
};

export default Cart;
