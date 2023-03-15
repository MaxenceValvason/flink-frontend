import { useState, useEffect } from "react";
import axios from "axios";
import Article from "./Article";
import ModalAlcohol from "./ModalAlcohol";

const Content = ({ setCart, cart }) => {
  const [data, setData] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [visibleAlcoholModal, setVisibleAlcoholModal] = useState(false);
  const [isAdult, setIsAdult] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:4000/categories/special"
      );
      setData(response.data);
      setIsLoad(true);
    };
    fetchData();
  }, []);
  return isLoad ? (
    <div>
      {visibleAlcoholModal && !isAdult && (
        <ModalAlcohol
          setIsAdult={setIsAdult}
          setVisibleAlcoholModal={setVisibleAlcoholModal}
        />
      )}
      {data.map((categorie, index) => {
        return (
          <div key={index}>
            <h2>{categorie.name}</h2>
            <div className="product-line">
              {categorie.product_skus.map((product, index) => {
                return (
                  <Article
                    key={index}
                    product={product}
                    setCart={setCart}
                    cart={cart}
                    setVisibleAlcoholModal={setVisibleAlcoholModal}
                    isAdult={isAdult}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p>IS LOADING</p>
  );
};
export default Content;
