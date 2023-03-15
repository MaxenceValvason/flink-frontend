import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Product = () => {
  const { slug_sku } = useParams();
  const [data, setData] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [tabDesc, setTabDesc] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/product/${slug_sku}`
        );
        setData(response.data);
        // if (data.description) {
        //   setTabDesc(data.description.split("\n"));
        // }
        setIsLoad(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoad ? (
    <div>
      <div>
        <img src={data.images[0]} />
        <p>{data.name}</p>
        <p>{data.price.amount.toFixed(2)} €</p>
        <button>Ajouter un article</button>
      </div>
      <div>
        <p>Description</p>
        {!tabDesc[0]
          ? null
          : tabDesc.map((elem, index) => {
              return <p key={index}>{elem}</p>;
            })}
      </div>
    </div>
  ) : (
    <p>Is loading</p>
  );
};
export default Product;
