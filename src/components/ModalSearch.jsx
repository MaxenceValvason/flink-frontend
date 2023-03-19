import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ModalSearch = ({ search, setVisible, cart, setCart }) => {
  const [data, setData] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const navigate = useNavigate();
  const lim = 5;
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
      try {
        const response = await axios.get(
          ` https://site--maxencevalvasonflinkbackend--6dqyynyggn8p.code.run/products/search?q=${search}&page_limit=${lim}`
        );
        setData(response.data);
        setIsLoad(true);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [search]);
  return isLoad ? (
    <div className="modal-search-root">
      <div className="modal-search">
        {data.results.map((food) => {
          return (
            <div key={food._id} className="search-modal-container">
              <div
                className="search-modal"
                onClick={() => {
                  navigate(`/product/${food.slug}-${food.sku}`);
                }}
              >
                <div>
                  <img className="search-modal-img" src={food.thumbnail} />
                </div>
                <div>
                  <p className="search-modal-text">{food.name}</p>
                  <p className="search-modal-price">
                    {food.price.amount.toFixed(2)} €
                  </p>
                </div>
                <div className="search-modal-button-container">
                  <button
                    className="search-modal-button"
                    onClick={() => {
                      handleRemoveToCart(food);
                    }}
                  >
                    <span className="search-modal-operators">-</span>
                  </button>
                  <button
                    className="search-modal-button"
                    onClick={() => {
                      handleAddToCart(food);
                    }}
                  >
                    <span className="search-modal-operators">+</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <p
          className="modal-search-end-text"
          onClick={() => {
            navigate(`/search`, { q: search });
            setVisible(false);
          }}
        >
          Voir tous les résultats
        </p>
      </div>
    </div>
  ) : null;
};

export default ModalSearch;
