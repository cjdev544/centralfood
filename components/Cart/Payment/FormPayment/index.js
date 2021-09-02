import { useState } from "react";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useAuth } from "../../../../hooks/useAuth";
import { BASE_PATH } from "../../../../helpers/constants";
import { authFetch } from "../../../../helpers/fetch";
import { useOrder } from "../../../../hooks/useOrder";
import { useCart } from "../../../../hooks/useCart";

const FormPayment = ({ products, address }) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const { auth } = useAuth();
  const { reloadOrder, deleteOrder } = useOrder();
  const { removeAllProductsCart } = useCart();

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (e) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const url = `${BASE_PATH}/orders`;
      const params = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          products,
          idUser: auth.uid,
          addressShipping: address,
        }),
      };
      const response = await authFetch(url, params, () => null);
      const { clientSecret, orderId } = response;

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (payload.error) {
        setError(`Error en el pago. ${payload.error.message}`);
        toast.error(payload.error.message);
        setProcessing(false);
        deleteOrder(orderId);
      } else {
        reloadOrder();
        toast.success("El pago fue realizado correctamente");
        setError(null);
        setProcessing(false);
        setSucceeded(true);
        router.push("/pedidos");
        removeAllProductsCart();
      }
    } catch (err) {
      console.log(err);
      setProcessing(false);
      toast.error("Error en el servidor, intente nuevamente");
      return null;
    }
  };

  return (
    <form className="form-payment" id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      <button disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">
          {processing ? <div className="spinner" id="spinner"></div> : "Pagar"}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}>
          {" "}
          Stripe dashboard.
        </a>{" "}
        Refresh the page to pay again.
      </p>
    </form>
  );
};

export default FormPayment;
