import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CartPage = ({ setCart, cart }) => {
  let total = 0;
  const deliveryCost = 1.8;
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
    <div className="cart-page-container">
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
      <p
        className="breadcrum-cart"
        onClick={() => {
          navigate("/products", {
            state: {
              total: total,
            },
          });
        }}
      >
        Continuer les achats
      </p>
      {/* affichage de tous les articles du paniers */}
      <div className="cart-page-content-container">
        <div>
          <h2>Panier d'achats</h2>
          <div className="cart-page-basket">
            <div className="cart-page-article-container">
              <p className="cart-page-article">VOS ARTICLES ({cart.length}) </p>
            </div>
            <div className="cart-page-quantity-container">
              <p className="cart-page-quantity"> QUANTITE</p>
            </div>
            <div className="cart-page-price-container">
              <p className="cart-page-price"> PRIX DE L'ARTICLE</p>
            </div>
            <div className="cart-page-total-container">
              <p className="cart-page-total"> ARTICLES AU TOTAL</p>
            </div>
          </div>
          <div>
            {cart.map((product) => {
              total += product.price.amount * product.cartQuantity;

              return (
                <div key={product._id} className="cart-page-content">
                  <div className="cart-page-article-content">
                    <img
                      className="cart-page-article-img"
                      src={product.thumbnail}
                    />
                    <p className="cart-page-article-text">{product.name}</p>
                  </div>

                  <div className="cart-page-quantity-content">
                    <button
                      className="cart-button"
                      onClick={() => {
                        Cookies.set("cart", cart, { expires: 10 });
                        handleRemoveToCart(product);
                      }}
                    >
                      <span className="search-modal-operators">-</span>
                    </button>
                    <p className="cart-quantity">{product.cartQuantity}</p>
                    <button
                      className="cart-button"
                      onClick={() => {
                        Cookies.set("cart", cart, { expires: 10 });
                        handleAddToCart(product);
                      }}
                    >
                      <span className="search-modal-operators">+</span>
                    </button>
                  </div>
                  <p className="cart-page-price-content">
                    {product.price.amount.toFixed(2)} €
                  </p>
                  <p className="cart-page-total-content">
                    {(product.price.amount * product.cartQuantity).toFixed(2)} €
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="cart-page-recap-container">
            <div>
              <div className="cart-page-recap">
                <p className="cart-page-text">Sous-total</p>
                <span className="cart-page-price">{total.toFixed(2)} €</span>
              </div>
              <div className="cart-page-recap">
                <p className="cart-page-text">Caution</p>{" "}
                <span className="cart-page-price">0,00 €</span>
              </div>
              <div className="cart-page-recap">
                <p className="cart-page-text">Frais de livraison</p>
                <span className="cart-page-price">
                  {deliveryCost.toFixed(2)} €
                </span>
              </div>
            </div>
            <div className="cart-page-recap-tva">
              <p className="cart-page-text">TotalTVA incluse</p>
              <span className="cart-page-price">
                {(total + deliveryCost).toFixed(2)} €
              </span>
            </div>
          </div>
          <button
            className="cart-page-button-pay"
            onClick={() => {
              navigate("/checkout");
            }}
          >
            <span className="cart-page-text-pay">Caisse</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
