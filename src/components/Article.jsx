import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ModalAddress from "./ModalAddress";

const Article = ({
  product,
  setCart,
  cart,
  setVisibleAlcoholModal,
  isAdult,
  address,
  setAddress,
  setDistance,
  setvisibleModalAddress,
}) => {
  const [data, setData] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    const cartCopy = [...cart];
    const productPresent = cartCopy.find((elem) => elem._id === product._id);
    if (productPresent) {
      productPresent.cartQuantity++;
      setQuantity(productPresent.cartQuantity);
    } else {
      cartCopy.push({ ...product, cartQuantity: 1 });
      product.cartQuantity = 1;
      setQuantity(product.cartQuantity);
    }
    setCart(cartCopy);
  };

  const handleRemoveToCart = (product) => {
    const cartCopy = [...cart];
    const productInCart = cartCopy.find((elem) => elem._id === product._id);
    if (productInCart.cartQuantity === 1) {
      const index = cartCopy.indexOf(productInCart);
      cartCopy.splice(index, 1);
      product.cartQuantity = 0;
      setQuantity(product.cartQuantity);
    } else {
      productInCart.cartQuantity--;
      setQuantity(productInCart.cartQuantity);
    }
    setCart(cartCopy);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--maxencevalvasonflinkbackend--6dqyynyggn8p.code.run/products/${product}`
      );
      setData(response.data);
      setIsLoad(true);
    };
    fetchData();
  }, [product]);
  return isLoad && data ? (
    <article className="card-article">
      {/* au clic que mon titre je suis rediriger vers la page de mon produits */}
      <p
        className="card-name"
        onClick={() => {
          navigate(`/product/${data.slug}-${data.sku}`);
        }}
      >
        {data.name}
      </p>
      <p className="card-price">{data.price.amount.toFixed(2)} €</p>
      <img className="card-img" src={data.thumbnail} />
      <div className="button-quantity-container">
        {quantity !== 0 ? (
          <>
            <button
              className="button"
              onClick={() => {
                Cookies.set("cart", cart, { expires: 10 });
                handleRemoveToCart(data);
              }}
            >
              <span className="operator-size">-</span>
            </button>
            <div className="quantity">
              <p className="quantity-text">{quantity}</p>
            </div>
          </>
        ) : null}

        <button
          className="button"
          onClick={() => {
            //différentes conditions qui me servent a afficher mes modals d'adresse et d'alcool
            Cookies.set("cart", cart, { expires: 10 });
            if (data.alcohol) {
              setVisibleAlcoholModal(true);
            }

            if (isAdult || !data.alcohol) {
              handleAddToCart(data);
            }
            if (!address) {
              <ModalAddress
                address={address}
                setAddress={setAddress}
                setDistance={setDistance}
                setvisibleModalAddress={setvisibleModalAddress}
              />;
            }
          }}
        >
          <span className="operator-size">+</span>
        </button>
      </div>
    </article>
  ) : null;
};

export default Article;
