import { useState, useEffect } from "react";
import axios from "axios";
import Categorie from "../components/Categorie";
import Content from "../components/Content";
import Header from "../components/Header";

const Products = ({ setSearch, search, setCart, cart }) => {
  const [data, setData] = useState();
  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCategorie = await axios.get(
          "http://localhost:4000/categories"
        );
        setData(responseCategorie.data);
        setIsLoad(true);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoad ? (
    <main>
      <Header
        setSearch={setSearch}
        search={search}
        setCart={setCart}
        cart={cart}
      />
      <div className="main">
        <section>
          <div>
            <div>
              <p>T min</p>
            </div>
            <div>
              <span>Ouvert 8:00 - 23h59</span>
              <p>Addresse</p>
            </div>
          </div>
          <div>
            <p>Navigation</p>
            <span>Acceuil</span>
          </div>
          <div>
            <p>Catégories</p>
            {data.map((categorie, index) => {
              return <Categorie key={index} categorie={categorie} />;
            })}
            <p>FAQ</p>
            <p>Support</p>
          </div>
        </section>
        <section>
          <Content setCart={setCart} cart={cart} />
        </section>
      </div>
    </main>
  ) : (
    <p>Is Loading</p>
  );
};
export default Products;
