import imgPhone from "../assets/img/phone.webp";
import imgMap from "../assets/img/map.jpg";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <div className="container">
          <div className="header-container">
            <p>Roule avec nous ! Postuleici pour devenir couriser/coursière</p>
            <button>Postuler</button>
          </div>
        </div>
      </header>
      <div className="home-container">
        <div className="hero-container">
          <div className="hero-text">
            <svg
              className="logo"
              xmlns="http://www.w3.org/2000/svg"
              width="111"
              height="29"
              fill="none"
              viewBox="0 0 111 29"
            >
              <path
                fill="#fff"
                d="M110.871 0h-7.525l-2.007 5.518h7.526L110.871 0zM10.535 0h21.573l-3.01 7.024H16.554l-2.006 4.515h11.037l-2.509 7.023H12.04L8.53 28.094H0L10.535 0zm23.58 0h8.026L31.606 28.094h-8.027L34.114 0zm8.026 7.525h8.027l-8.027 20.57h-7.525l7.525-20.57zm10.535 0h7.526l-1.004 3.01c1.81-1.837 4.56-3.511 7.024-3.511 3.558 0 6.22 1.53 5.518 5.518-.205 1.367-.54 2.71-1.003 4.013l-4.515 11.54h-8.027l4.013-9.533c.416-.974.751-1.981 1.004-3.01.227-1.29-.756-2.007-2.007-2.007-2.464 0-3.172 1.4-4.014 3.512l-4.515 11.037h-7.525l7.525-20.569zM79.767 0h8.027l-5.519 13.545 7.024-6.02h9.03l-10.535 8.529 3.01 12.04h-8.027l-1.505-7.525-2.007 1.505-2.508 6.02h-7.525L79.767 0z"
              />
            </svg>
            <h1>+2.000 produits du quotidien livrés en 10 minutes</h1>
            <p>
              Vos marques préférées à prix supermarché. Livraison 7j/7 de 8h à
              minuit.
            </p>
            <button
              onClick={() => {
                navigate("/products");
              }}
            >
              Acheter maintenant
            </button>
          </div>
          <div className="hero-image">
            <img src={imgPhone} />
          </div>
        </div>
      </div>
      <div className="map">
        <div className="map-text-container">
          <h1>Nous sommes là</h1>
          <button>Paris</button>
          <p>
            Vous ne trouvez pas votre ville? Inscrivez-vous maintenant pour être
            prévenue quand Flink débarque chez vous
          </p>
        </div>
        <div className="map-container">
          <img className="img-map" src={imgMap} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
