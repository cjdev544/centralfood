import { useState } from "react";
import { toast } from "react-toastify";

const {
  CardElement,
  useStripe,
  useElements,
} = require("@stripe/react-stripe-js");
const { Button } = require("semantic-ui-react");

const FormPayment = ({ products, address }) => {
  const [isLoading, setIsLoading] = useState(false);

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
      console.log(result);
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
