import { useState, useEffect } from "react";
import axios from "axios";
import SubCategories from "./SubCategories";

const Categorie = ({ categorie }) => {
  const [data, setData] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [isDeploy, setIsDeploy] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/categories/sub/${categorie._id}`
        );
        setData(response.data);
        setIsLoad(true);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoad ? (
    <div>
      <div>
        <p
          onClick={() => {
            setIsDeploy(!isDeploy);
          }}
        >
          {categorie.name}
        </p>
      </div>
      <div>
        {isDeploy ? (
          <div>
            {data.map((subCategorie, index) => {
              return <SubCategories key={index} subCategorie={subCategorie} />;
            })}
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    <p>Is Loading</p>
  );
};

export default Categorie;
