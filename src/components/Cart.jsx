import { useState } from "react";
import ModalCart from "./ModalCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Cart = ({ setCart, cart }) => {
  let total = 0;
  const [visibleCartModal, setVisibleCartModal] = useState(false);
  return (
    <div
      className="cart-container"
      onClick={() => {
        setVisibleCartModal(!visibleCartModal);
      }}
    >
      <div className="cart-icon-price">
        <FontAwesomeIcon icon="basket-shopping" className="cart-icon" />
        {cart.map((product) => {
          total += product.price.amount * product.cartQuantity;
        })}
        <p className="cart-price">{total.toFixed(2)} €</p>
      </div>
      <div>
        <p className="cart-delieverycost"> +1,80€ Frais de livraison</p>
      </div>
      {visibleCartModal && (
        <ModalCart
          setCart={setCart}
          cart={cart}
          total={total}
          setVisibleCartModal={setVisibleCartModal}
        />
      )}
    </div>
  );
};

export default Cart;
