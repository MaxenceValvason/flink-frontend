import { useState, useEffect } from "react";
import axios from "axios";
import SubCategories from "./SubCategories";

const Categorie = ({ categorie, setCategorieId }) => {
  const [data, setData] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [isDeploy, setIsDeploy] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--maxencevalvasonflinkbackend--6dqyynyggn8p.code.run/categories/sub/${categorie._id}`
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
          //au clic j'affiche mes sous catégories
          className="categorie-text"
          onClick={() => {
            setIsDeploy(!isDeploy);
            setCategorieId(categorie._id);
          }}
        >
          {categorie.name}
        </p>
      </div>
      <div>
        {isDeploy ? (
          <div>
            {data.map((subCategorie, index) => {
              //je parcours mes sous catégories
              return <SubCategories key={index} subCategorie={subCategorie} />;
            })}
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
};

export default Categorie;
