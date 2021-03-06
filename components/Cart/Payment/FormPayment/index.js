import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useAuth } from "../../../../hooks/useAuth";
import { BASE_PATH } from "../../../../helpers/constants";
import { authFetch } from "../../../../helpers/fetch";
import { useOrder } from "../../../../hooks/useOrder";
import { useCart } from "../../../../hooks/useCart";
import { useData } from "../../../../hooks/useData";
import { round } from "mathjs";
import { calculateDeliveryCost } from "../../../../helpers/calculateDeliveryCost";

const FormPayment = ({ products, address, values, totalPriceToPay }) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [priceShipping, setPriceShipping] = useState(0);

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const { auth } = useAuth();
  const { data } = useData();
  const { reloadOrder, deleteOrder, addOrderInFirebase, getOrder } = useOrder();
  const { removeAllProductsCart } = useCart();

  const isOpen = data?.isOpen;

  useEffect(() => {
    if (values?.shipping === "Entrega a domicilio") {
      const cost = calculateDeliveryCost(data?.deliveryPrice, address);
      setPriceShipping(cost);
    } else {
      setPriceShipping(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.shipping, address]);

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

  if (values?.cutlery === "Si") {
    values.cubiertosParaPersonas = values?.numberCutlery;
  } else {
    values.cubiertosParaPersonas = 0;
  }

  if (values.isDeliveryNow !== "Programar") {
    values.fechaEntrega = "Hoy";
    values.horaEntrega = "Lo antes posible";
  } else {
    values.fechaEntrega = values?.dateDelivery;
    values.horaEntrega = values?.timeDelivery;
  }

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
          values,
          priceShipping,
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
        // Create order in firebase
        const orderStrapi = await getOrder(orderId);
        await addOrderInFirebase(orderId, {
          ...orderStrapi,
          userId: auth.uid,
        });
        toast.success("El pago fue realizado correctamente");
        setError(null);
        setProcessing(false);
        setSucceeded(true);
        reloadOrder();
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
      {!isOpen && isOpen !== null && (
        <div className="is-close">
          <p>
            En estos momentos nos encontramos cerrados para realizar nuevos
            pedidos
          </p>
        </div>
      )}
      <p>
        <span className="payment-span">
          Total productos: {totalPriceToPay}???
        </span>
        {values?.shipping === "Entrega a domicilio" && (
          <span className="payment-span">Costo de env??o: {priceShipping}???</span>
        )}
      </p>
      <h3>Total a pagar: {round(totalPriceToPay + priceShipping, 2)}???</h3>
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      {isOpen && (
        <button disabled={processing || disabled || succeeded} id="submit">
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pagar"
            )}
          </span>
        </button>
      )}
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
