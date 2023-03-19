import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalCart = ({ setCart, cart, total, setVisibleCartModal }) => {
  const navigate = useNavigate();
  const handleAddToCart = (product) => {
    const cartCopy = [...cart];
    const productPresent = cartCopy.find((elem) => elem._id === product._id);
    if (productPresent) {
      productPresent.cartQuantity++;
    } else {
      cartCopy.push({ ...product, cartQuantity: 1 });
    }
    setCart(cartCopy);
  };

  const handleRemoveToCart = (product) => {
    const cartCopy = [...cart];
    const productInCart = cartCopy.find((elem) => elem._id === product._id);
    if (productInCart.cartQuantity === 1) {
      const index = cartCopy.indexOf(productInCart);
      cartCopy.splice(index, 1);
    } else {
      productInCart.cartQuantity--;
    }
    setCart(cartCopy);
  };

  return (
    <div className="modal-cart-root">
      <div className="modal-cart">
        <div className="modal-cart-header">
          <p className="modal-cart-text">Panier d'achat</p>
          <p
            onClick={() => {
              setVisibleCartModal(false);
            }}
          >
            X
          </p>
        </div>
        <section>
          {cart.map((product, index) => {
            return (
              <div key={index} className="modal-cart-container">
                <img className="cart-modal-img" src={product.thumbnail} />
                <div>
                  <p className="search-modal-text">{product.name}</p>
                  <span className="search-modal-price">
                    {product.price.amount} €
                  </span>
                </div>
                <div>
                  <button
                    className="search-modal-button"
                    onClick={() => {
                      Cookies.set("cart", cart, { expires: 10 });
                      handleRemoveToCart(product);
                    }}
                  >
                    <span className="search-modal-operators">-</span>
                  </button>
                  <span className="cart-quantity">{product.cartQuantity}</span>
                  <button
                    className="search-modal-button"
                    onClick={() => {
                      Cookies.set("cart", cart, { expires: 10 });
                      handleAddToCart(product);
                    }}
                  >
                    <span className="search-modal-operators">+</span>
                  </button>
                </div>
              </div>
            );
          })}
        </section>
        <div>
          <div
            className="modal-cart-pay"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <FontAwesomeIcon icon="credit-card" className="cart-icon" />

            <p className="modal-cart-pay-text-bold">Caisse</p>
            <div>
              <p className="modal-cart-pay-text-bold"> {total.toFixed(2)} €</p>
              <p className="modal-cart-pay-text">+1,80 € Frais de livraison</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCart;
