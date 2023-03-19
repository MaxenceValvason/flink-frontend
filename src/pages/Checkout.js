import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useState } from "react";
import Cookies from "js-cookie";

const Checkout = ({ cart }) => {
  const navigate = useNavigate();
  let subTotal = 0;
  const deliveryCost = 1.8;
  let total = 0;
  const stripePromise = loadStripe(
    "pk_test_51MmbvXHbrhXUO4BNzgm2rbwhDpNHqTUJO6nTX1NArvSd7lGBmsQOi4A83LXecFc2Omd5p2TPk6hLUFmx6PnGhKSC00XsZEUM96"
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div>
      <div className="cart-header">
        <svg
          onClick={() => {
            navigate("/products");
          }}
          className="logo-header"
          xmlns="http://www.w3.org/2000/svg"
          width="111"
          height="29"
          fill="none"
          viewBox="0 0 111 29"
        >
          <path
            fill="#ed6ba7"
            d="M110.871 0h-7.525l-2.007 5.518h7.526L110.871 0zM10.535 0h21.573l-3.01 7.024H16.554l-2.006 4.515h11.037l-2.509 7.023H12.04L8.53 28.094H0L10.535 0zm23.58 0h8.026L31.606 28.094h-8.027L34.114 0zm8.026 7.525h8.027l-8.027 20.57h-7.525l7.525-20.57zm10.535 0h7.526l-1.004 3.01c1.81-1.837 4.56-3.511 7.024-3.511 3.558 0 6.22 1.53 5.518 5.518-.205 1.367-.54 2.71-1.003 4.013l-4.515 11.54h-8.027l4.013-9.533c.416-.974.751-1.981 1.004-3.01.227-1.29-.756-2.007-2.007-2.007-2.464 0-3.172 1.4-4.014 3.512l-4.515 11.037h-7.525l7.525-20.569zM79.767 0h8.027l-5.519 13.545 7.024-6.02h9.03l-10.535 8.529 3.01 12.04h-8.027l-1.505-7.525-2.007 1.505-2.508 6.02h-7.525L79.767 0z"
          />
        </svg>
        <button
          className="button-admin"
          onClick={() => {
            navigate("/backoffice");
          }}
        >
          Admin
        </button>
      </div>
      <div className="checkout-container">
        <div className="checkout-container-left">
          <p
            className="breadcrum-cart"
            onClick={() => {
              navigate("/cart");
            }}
          >
            Retour
          </p>
          <div>
            <h2>Caisse</h2>
            <p className="checkout-text">Informations personnelles</p>
            <div className="checkout-input-container">
              <p className="checkout-input-title">PRENOM</p>
              <input
                className="checkout-input"
                type="text"
                value={firstName}
                placeholder="Andreas"
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
            </div>
            <div className="checkout-input-container">
              <p className="checkout-input-title">NOM</p>
              <input
                className="checkout-input"
                type="text"
                value={lastName}
                placeholder="Schmidt"
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              />
            </div>
            <div className="checkout-input-container">
              <p className="checkout-input-title">EMAIL</p>
              <input
                className="checkout-input"
                type="email"
                value={email}
                placeholder="Andreas.Schmidt@gmail.com"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div className="checkout-input-container">
              <p className="checkout-input-title">NUMERO DE TELEPHONE</p>
              <input
                type="text"
                placeholder="1234567"
                className="checkout-input"
              />
            </div>

            <p className="checkout-text">Adresse de livraison</p>
            <div className="checkout-input-container">
              <p className="checkout-input-title">ADRESSE</p>
              <p className="checkout-address">{Cookies.get("address")}</p>
            </div>
            <p className="checkout-text">Vos articles ({cart.length})</p>
            {cart.map((product) => {
              subTotal += product.price.amount * product.cartQuantity;

              return (
                <div className="checkout-content">
                  <img className="checkout-img" src={product.thumbnail} />
                  <div className="checkout-name-price">
                    <p className="checkout-name">{product.name}</p>
                    <p className="checkout-price">
                      {product.price.amount.toFixed(2)} €
                    </p>
                    <div className="checkout-quantity">
                      <p className="checkout-quantity-text">
                        {product.cartQuantity}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div>
              <p className="checkout-text">Mode de Paiement</p>
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  className="checkoutForm"
                  lastName={lastName}
                  firstName={firstName}
                  email={email}
                  amount={subTotal + deliveryCost}
                  cart={cart}
                />
              </Elements>
            </div>
          </div>
        </div>
        <div className="checkout-recap">
          <p className="checkout-text">Récapitulatif de la commande</p>
          <div className="checkout-recap-container">
            <div>
              <div className="checkout-recap-text-container">
                <p className="checkout-recap-text">Sous-total :</p>
                <span className="checkout-recap-text">
                  {subTotal.toFixed(2)} €
                </span>
              </div>
              <div className="checkout-recap-text-container">
                <p className="checkout-recap-text">Caution :</p>
                <span className="checkout-recap-text">0,00 €</span>
              </div>
              <div className="checkout-recap-text-container">
                <p className="checkout-recap-text">Frais de livraison :</p>
                <span className="checkout-recap-text">
                  {deliveryCost.toFixed(2)} €
                </span>
              </div>
            </div>
            <div className="checkout-recap-text-container-total">
              <p className="checkout-recap-text-total">Total :</p>
              <span className="checkout-recap-text-total">
                {(total = subTotal + deliveryCost).toFixed(2)} €
              </span>
            </div>
            <p className="checkout-text-tva">TVA incluse</p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default Checkout;
