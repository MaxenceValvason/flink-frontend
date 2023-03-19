import { useState, useEffect } from "react";
import axios from "axios";
import Article from "./Article";
import ModalAlcohol from "./ModalAlcohol";

const Content = ({
  setCart,
  cart,
  categorieId,
  address,
  setAddress,
  setDistance,
  setvisibleModalAddress,
}) => {
  const [data, setData] = useState();

  const [isLoad, setIsLoad] = useState(false);
  const [visibleAlcoholModal, setVisibleAlcoholModal] = useState(false);
  const [isAdult, setIsAdult] = useState(false);

  //je recupère les datas en faisant des requêtes vers mon API pr savoir qu'est ce que j'affiche si c'est une categorie spécial ou non puis je set mes states
  useEffect(() => {
    const fetchData = async () => {
      if (categorieId) {
        const response = await axios.get(
          `https://site--maxencevalvasonflinkbackend--6dqyynyggn8p.code.run/categories/sub/${categorieId}`
        );
        setData(response.data);

        console.log(data);
        setIsLoad(true);
      } else {
        const response = await axios.get(
          "https://site--maxencevalvasonflinkbackend--6dqyynyggn8p.code.run/categories/special"
        );
        setData(response.data);
        setIsLoad(true);
      }
    };
    fetchData();
  }, [categorieId]);
  return isLoad ? (
    <div>
      {/* ma modal pour l'alcool qui s'affiche que si elle est visible et surtout si mon utilisateur n'est pas un adulte */}
      {visibleAlcoholModal && !isAdult && (
        <ModalAlcohol
          setIsAdult={setIsAdult}
          setVisibleAlcoholModal={setVisibleAlcoholModal}
        />
      )}
      {data.map((categorie, index) => {
        return (
          <div key={index} className="content-container">
            <h2>{categorie.name}</h2>
            <div className="product-line">
              {categorie.product_skus.map((product, index) => {
                return (
                  // je parcours tous mes articles et les affiches avec mon composants Article
                  <Article
                    key={index}
                    product={product}
                    setCart={setCart}
                    cart={cart}
                    setVisibleAlcoholModal={setVisibleAlcoholModal}
                    isAdult={isAdult}
                    address={address}
                    setAddress={setAddress}
                    setDistance={setDistance}
                    setvisibleModalAddress={setvisibleModalAddress}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  ) : null;
};
export default Content;
