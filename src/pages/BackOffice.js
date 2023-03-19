import { useState, useEffect } from "react";
import axios from "axios";
import OrderDone from "../components/OrderDone";
import { useNavigate } from "react-router-dom";

const BackOffice = () => {
  const [password, setPassword] = useState("");
  const [isGood, setIsGood] = useState(false);
  const goodPassword = "HelloWorld!";
  const [data, setData] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--maxencevalvasonflinkbackend--6dqyynyggn8p.code.run/backoffice"
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
      <div className="cart-header">
        <svg
          onClick={() => {
            navigate("/products");
          }}
          className="logo-header"
          xmlns="http://www.w3.org/2000/svg"
          width="111"
          height="29"
          fill="none"
          viewBox="0 0 111 29"
        >
          <path
            fill="#ed6ba7"
            d="M110.871 0h-7.525l-2.007 5.518h7.526L110.871 0zM10.535 0h21.573l-3.01 7.024H16.554l-2.006 4.515h11.037l-2.509 7.023H12.04L8.53 28.094H0L10.535 0zm23.58 0h8.026L31.606 28.094h-8.027L34.114 0zm8.026 7.525h8.027l-8.027 20.57h-7.525l7.525-20.57zm10.535 0h7.526l-1.004 3.01c1.81-1.837 4.56-3.511 7.024-3.511 3.558 0 6.22 1.53 5.518 5.518-.205 1.367-.54 2.71-1.003 4.013l-4.515 11.54h-8.027l4.013-9.533c.416-.974.751-1.981 1.004-3.01.227-1.29-.756-2.007-2.007-2.007-2.464 0-3.172 1.4-4.014 3.512l-4.515 11.037h-7.525l7.525-20.569zM79.767 0h8.027l-5.519 13.545 7.024-6.02h9.03l-10.535 8.529 3.01 12.04h-8.027l-1.505-7.525-2.007 1.505-2.508 6.02h-7.525L79.767 0z"
          />
        </svg>{" "}
        {!isGood ? (
          <button className="button-admin">Admin</button>
        ) : (
          <button
            className="button-admin"
            onClick={() => {
              navigate("/products");
            }}
          >
            Se déconnecter
          </button>
        )}
      </div>
      {!isGood ? (
        <div className="backoffice-container">
          <p className="backoffice-text">Connectez-vous</p>
          <input
            type="password"
            value={password}
            placeholder="Votre mot de passe"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button
            className="backoffice-button"
            onClick={() => {
              if (password === goodPassword) {
                setIsGood(true);
              } else {
                setIsGood(false);
              }
            }}
          >
            <span className="backoffice-button-text">Valider</span>
          </button>
        </div>
      ) : (
        <OrderDone data={data} />
      )}
    </div>
  ) : null;
};
export default BackOffice;
