import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Search = ({ search, setSearch, setCart, cart }) => {
  const [data, setData] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const navigate = useNavigate();

  //je fetch tous les produits qui contiennent le même nom que search et je les affiches (oublies d'affichage des catégories a gauche)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--maxencevalvasonflinkbackend--6dqyynyggn8p.code.run/products/search?q=${search}`
        );
        setData(response.data);
        console.log(response.data);
        setIsLoad(true);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [search]);

  const handleAddToCart = (product) => {
    const cartCopy = [...cart];
    const productPresent = cartCopy.find((elem) => elem._id === product._id);
    if (productPresent) {
      productPresent.cartQuantity++;
    } else {
      cartCopy.push({ ...product, cartQuantity: 1 });
      product.cartQuantity = 1;
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
    } else {
      productInCart.cartQuantity--;
    }
    setCart(cartCopy);
  };
  return isLoad ? (
    <div>
      <Header
        setSearch={setSearch}
        search={search}
        setCart={setCart}
        cart={cart}
      />
      <p className="search-text">il y a {data.count} résultats</p>
      <div className="search-container">
        {data.results.map((product, index) => {
          return (
            <article key={index} className="card-article">
              <p
                className="card-name"
                onClick={() => {
                  navigate(`/product/${product.slug}-${product.sku}`);
                }}
              >
                {product.name}
              </p>
              <p className="card-price">{product.price.amount.toFixed(2)} €</p>
              <img className="card-img" src={product.thumbnail} />
              <button
                className="button"
                onClick={() => {
                  handleAddToCart(product);
                }}
              >
                +
              </button>
              <button
                className="button"
                onClick={() => {
                  handleRemoveToCart(product);
                }}
              >
                -
              </button>
            </article>
          );
        })}
      </div>
    </div>
  ) : null;
};
export default Search;
