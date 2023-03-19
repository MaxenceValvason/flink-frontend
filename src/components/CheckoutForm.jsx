import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ lastName, firstName, email, amount, cart }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      name: lastName,
    });

    const stripeToken = stripeResponse.token.id;
    try {
      const response = await axios.post(
        "https://site--maxencevalvasonflinkbackend--6dqyynyggn8p.code.run/pay",
        {
          stripeToken,
          date: new Date(),
          firstName,
          lastName,
          email,
          amount,
          products: [cart],
        }
      );
      console.log(response.data);
      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          {!firstName || !lastName || !email ? (
            <p className="checkoutform-text-error">Informations manquantes</p>
          ) : (
            <button className="checkfrom-button" type="submit">
              <span className="checkfrom-button-text">Payer</span>
            </button>
          )}
        </form>
      ) : (
        <>
          <span className="checkfrom-text-validate">Paiement effectué ! </span>
          <Navigate to="/products" />
        </>
      )}
    </>
  );
};
export default CheckoutForm;
