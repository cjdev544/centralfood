import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "semantic-ui-react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useAuth } from "../../../../hooks/useAuth";
import { useCart } from "../../../../hooks/useCart";

const FormPayment = ({ products, address }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { auth } = useAuth();
  const { paymentCartOrder } = useCart();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);

    if (result.error) {
      toast.error(result.error.message);
    } else {
      paymentCartOrder(result.token, products, auth.uid, address);
    }
    setIsLoading(false);
  };

  return (
    <form className="form-payment" onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" loading={isLoading} disabled={!stripe}>
        Pagar
      </Button>
    </form>
  );
};

export default FormPayment;
