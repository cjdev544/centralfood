import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_TOKEN } from "../../../helpers/constants";
import FormPayment from "./FormPayment";
import style from './Payment.module.css'

const stripePromise = loadStripe(STRIPE_TOKEN);

const Payment = ({ products, address, values, totalPriceToPay }) => {
  return (
    <section className={style.payment}>
      <div className={style.title}>Pago</div>
      <div className={style.data}>
        <Elements stripe={stripePromise}>
          <FormPayment
            products={products}
            address={address}
            values={values}
            totalPriceToPay={totalPriceToPay}
          />
        </Elements>
      </div>
    </section>
  );
};

export default Payment;
