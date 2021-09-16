import ProductCartMobile from "./ProductCartMobile";

const SummaryCartMobil = ({ products, totalPriceToPay }) => {
  return (
    <div className="cart-mobile">
      <div className="title cart-title">
        Productos
        <div className="plus">Vaciar carrito</div>
      </div>
      <div className="data">
        {products?.map((product) => (
          <ProductCartMobile key={product.id} plate={product} />
        ))}
      </div>
      <div className="cart-mobile__resume">
        Total productos: <span>{totalPriceToPay}€</span>
      </div>
    </div>
  );
};

export default SummaryCartMobil;
