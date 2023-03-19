import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ModalAddress from "../components/ModalAddress";

const Product = ({
  cart,
  setCart,
  search,
  setSearch,
  address,
  setAddress,
  setDistance,
}) => {
  const { slug_sku } = useParams();
  const [data, setData] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [tabDesc, setTabDesc] = useState([]);
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

  //je fetch ma data avec le slug-sku pour avoir toutes les infos du produits et je l'affiche
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--maxencevalvasonflinkbackend--6dqyynyggn8p.code.run/product/${slug_sku}`
        );
        setData(response.data);
        if (data.description) {
          setTabDesc(data.description.split("\n"));
        }
        setIsLoad(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [data]);

  return isLoad ? (
    <div>
      <Header
        setSearch={setSearch}
        search={search}
        setCart={setCart}
        cart={cart}
      />
      <div className="product-container">
        <span
          className="breadcrum-product"
          onClick={() => {
            navigate("/products");
          }}
        >
          Home -
        </span>
        <span className="breadcrum-product"> {data.name}</span>
        <div className="product-img-name">
          <div>
            <img src={data.images[0]} />
          </div>
          <div className="product-price-name">
            <p className="product-text">{data.name}</p>
            <p className="product-price">{data.price.amount.toFixed(2)} €</p>
            <button
              className="product-button"
              onClick={() => {
                Cookies.set("cart", cart, { expires: 10 });
                handleAddToCart(data);
                if (!address) {
                  //vérification si j'ai entrer une addresse ou pas
                  <ModalAddress
                    address={address}
                    setAddress={setAddress}
                    setDistance={setDistance}
                  />;
                }
              }}
            >
              <span className="product-button-text">Ajouter un article</span>
            </button>
          </div>
        </div>
        <div>
          <p className="product-desc">Description</p>
          {!tabDesc[0]
            ? null
            : tabDesc.map((elem, index) => {
                return (
                  <p className="desc-text" key={index}>
                    {elem}
                  </p>
                );
              })}
        </div>
      </div>
    </div>
  ) : null;
};
export default Product;
