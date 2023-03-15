import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Article = ({
  product,
  setCart,
  cart,
  setVisibleAlcoholModal,
  isAdult,
}) => {
  const [data, setData] = useState();
  const [isLoad, setIsLoad] = useState(false);
  // const [quantity, setQuantity] = useState(0);
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:4000/products/${product}`
      );
      response.data.cartQuantity = 0;
      setData(response.data);
      setIsLoad(true);
    };
    fetchData();
  }, [product]);
  return isLoad ? (
    <article className="card-article">
      <p
        onClick={() => {
          navigate(`/product/${data.slug}-${data.sku}`);
        }}
      >
        {data.name}
      </p>
      <p>{data.price.amount.toFixed(2)} €</p>
      <img className="card-img" src={data.thumbnail} />

      <button
        className="button"
        onClick={() => {
          if (data.alcohol) {
            setVisibleAlcoholModal(true);
          }
          if (isAdult || !data.alcohol) {
          }
        }}
      >
        +
      </button>

      {/* {quantity !== 0 ? (
        <>
          <button
            onClick={() => {
              setQuantity(quantity - 1);
            }}
          >
            -
          </button>
          <span>{quantity}</span>
        </>
      ) : null}

      <button
        onClick={() => {
          if (quantity !== data.quantity) {
            setQuantity(quantity + 1);
            setCart();
          }
        }}
      >
        +
      </button> */}
    </article>
  ) : (
    <p>Is load</p>
  );
};

export default Article;
