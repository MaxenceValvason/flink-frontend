import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = ({ search }) => {
  const [data, setData] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/products/search?q=${search}`
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

  return isLoad ? (
    <div>
      <p>il y a {data.count} résultats</p>
      {data.results.map((product, index) => {
        return (
          <article key={index} className="card-article">
            <p
              onClick={() => {
                navigate(`/product/${product.slug}-${product.sku}`);
              }}
            >
              {product.name}
            </p>
            <p>{product.price.amount.toFixed(2)} €</p>
            <img className="card-img" src={product.thumbnail} />
            <button>+</button>
            <button>-</button>
          </article>
        );
      })}
    </div>
  ) : (
    <p>Is Loading</p>
  );
};
export default Search;
