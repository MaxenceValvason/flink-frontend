import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import picture from "../assets/img/riders_portrait.jpg";

const ModalAddress = ({
  address,
  setAddress,
  setDistance,
  setvisibleModalAddress,
}) => {
  const [isLoadDataAddress, setIsLoadDataAddress] = useState(false);
  const [isLoadDataDelivery, setIsLoadDataDelivery] = useState(false);

  const [canDelivery, setCanDelivery] = useState(false);
  const [dataAddress, setDataAddress] = useState();
  const [dataDelivery, setDataDelivery] = useState();
  const [inputAddress, setInputAddress] = useState("");
  const [addresIsSet, setAddressIsSet] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (inputAddress) {
          const response = await axios.get(
            `https://site--maxencevalvasonflinkbackend--6dqyynyggn8p.code.run/locations?q=${inputAddress}`
          );
          setDataAddress(response.data);
          setIsLoadDataAddress(true);
          if (address.subtitle) {
            const responseDelivery = await axios.post(
              "http://localhost:4000/delivery",
              { coordinates: address.coordinates }
            );
            setDataDelivery(responseDelivery.data);
            setCanDelivery(dataDelivery.isDelivery);
            setDistance(dataDelivery.distance);
            setIsLoadDataDelivery(true);
          }
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [inputAddress, address, addresIsSet]);

  return (
    <div className="modal-address-root">
      <div className="modal-address">
        <div className="modal-address-left">
          <img className="modal-address-img" src={picture} />
          <div>
            <div className="modal-address-header">
              <p className="modal-address-title">
                Pour commencer, vérifions votre adresse
              </p>
              <span
                className="modal-address-cross"
                onClick={() => {
                  setvisibleModalAddress(false);
                }}
              >
                X
              </span>
            </div>
            <div>
              <p className="modal-address-text">
                Veuillez ajouter votre adresse exacte pour voir les produits qui
                peuvent vous êtres livrés en 10 minutes.
              </p>
              <input
                className="modal-address-input"
                type="text"
                placeholder="Rue et numéro de domicile"
                value={inputAddress}
                onChange={(event) => {
                  setInputAddress(event.target.value);
                }}
              />
            </div>
            {isLoadDataAddress
              ? dataAddress.map((address, index) => {
                  return (
                    <div key={index} className="modal-address-address">
                      <p
                        onClick={() => {
                          setAddressIsSet(true);
                          setAddress(address);
                          Cookies.set("address", address.subtitle, {
                            expires: 10,
                          });
                          setvisibleModalAddress(false);
                        }}
                      >
                        {address.subtitle}
                      </p>
                    </div>
                  );
                })
              : null}
            {isLoadDataDelivery && <p>{dataDelivery.message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalAddress;
