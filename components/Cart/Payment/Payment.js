import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_TOKEN } from "../../../utils/constants";
import FormPayment from "./FormPayment";

const stripePromise = loadStripe(STRIPE_TOKEN);

const Payment = ({ products, address }) => {
  return (
    <section className="payment">
      <div className="title">Pago</div>
      <div className="data">
        <Elements stripe={stripePromise}>
          <FormPayment products={products} address={address} />
        </Elements>
      </div>
    </section>
  );
};

export default Payment;
