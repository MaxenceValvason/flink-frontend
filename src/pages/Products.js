import { useState, useEffect } from "react";
import axios from "axios";
import Categorie from "../components/Categorie";
import Content from "../components/Content";
import Header from "../components/Header";
import ModalAddress from "../components/ModalAddress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Products = ({
  setSearch,
  search,
  setCart,
  cart,
  deliveryTime,
  setDeliveryTime,
  address,
  setAddress,
  distance,
  setDistance,
}) => {
  const [data, setData] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [isLoadDeliveryTime, setIsLoadDeliveryTime] = useState(false);
  const [visibleModalAddress, setvisibleModalAddress] = useState(true);
  const [categorieId, setCategorieId] = useState("");

  useEffect(() => {
    //je recupère les datas en faisant des requêtes vers mon API puis je set mes states
    const fetchData = async () => {
      try {
        const responseCategorie = await axios.get(
          "https://site--maxencevalvasonflinkbackend--6dqyynyggn8p.code.run/categories"
        );
        setData(responseCategorie.data);
        setIsLoad(true);
        if (address) {
          const responseDeliveryTime = await axios.post(
            "https://site--maxencevalvasonflinkbackend--6dqyynyggn8p.code.run/delivery/time",
            { distance: distance, foods: cart.length }
          );
          console.log(distance);
          setDeliveryTime(responseDeliveryTime.data);
          setIsLoadDeliveryTime(true);
          if (address.subtitle) {
            const responseDelivery = await axios.post(
              "https://site--maxencevalvasonflinkbackend--6dqyynyggn8p.code.run/delivery",
              { coordinates: address.coordinates }
            );

            setDistance(responseDelivery.data.distance);
          }
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [distance, cart]);

  //une fois que j'ai mes datas j'affiche ma page
  return isLoad ? (
    <main>
      <Header
        setSearch={setSearch}
        search={search}
        setCart={setCart}
        cart={cart}
      />
      <div className="main">
        {/* je vérifie si ma modal est visible et si je n'est pas d'addresse */}
        {visibleModalAddress && !address && (
          <ModalAddress
            address={address}
            setAddress={setAddress}
            setDistance={setDistance}
            setDeliveryTime={setDeliveryTime}
            setvisibleModalAddress={setvisibleModalAddress}
          />
        )}

        <section>
          <div className="delivery-infos">
            <div className="delivery-time-container">
              <p className="delivery-time">
                {!isLoadDeliveryTime ? 0 : deliveryTime} min
              </p>
            </div>
            <div>
              <span className="delivery-open-text">Ouvert 8:00 - 23h59</span>
              <p className="delivery-address-text ">
                {!address ? <span> Pas d'adresse </span> : address.subtitle}
              </p>
            </div>
          </div>

          <div className="categories-container">
            <div>
              <p className="navigation-text">NAVIGATION</p>
              <div className="icon-text-categorie">
                <FontAwesomeIcon icon="house" />
                <span
                  className="categorie-text"
                  onClick={() => {
                    setCategorieId("");
                  }}
                >
                  Acceuil
                </span>
              </div>
            </div>
            <div>
              <p className="navigation-text">CATEGORIES</p>
              {data.map((categorie, index) => {
                return (
                  // j'affiche toutes les categories en parcourant ma data
                  <Categorie
                    key={index}
                    categorie={categorie}
                    setCategorieId={setCategorieId}
                  />
                );
              })}
              <p className="categorie-text">FAQ</p>
              <p className="categorie-text">Support</p>
            </div>
          </div>
        </section>
        <section>
          {/* content est le coeur de ma page il contient tout le contenue */}
          <Content
            setCart={setCart}
            cart={cart}
            categorieId={categorieId}
            address={address}
            setAddress={setAddress}
            setDistance={setDistance}
            setvisibleModalAddress={setvisibleModalAddress}
          />
        </section>
      </div>
    </main>
  ) : null;
};
export default Products;
