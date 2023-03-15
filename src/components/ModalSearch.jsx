import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalSearch = ({ search }) => {
  const [data, setData] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const navigate = useNavigate();
  const lim = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ` http://localhost:4000/products/search?q=${search}&page_limit=${lim}`
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
    <div>
      {data.results.map((food) => {
        return (
          <div key={food._id}>
            <div>
              <img src={food.thumbnail} />
            </div>
            <div>
              <p>{food.name}</p>
              <p>{food.price.amount}</p>
            </div>
            <div>
              <button>-</button>
              <button>+</button>
            </div>
          </div>
        );
      })}
      <p
        onClick={() => {
          navigate(`/search`, { q: search });
        }}
      >
        Voir tous les résultats
      </p>
    </div>
  ) : (
    <p>Is Loading</p>
  );
};

export default ModalSearch;
