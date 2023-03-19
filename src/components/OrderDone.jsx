import { useState, useEffect } from "react";
import axios from "axios";
import ModalOrder from "./ModalOrder";
const OrderDone = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false);
  //affichage de toutes mes commandes au clic une modal s'ouvre et on a accés a tous les articles de la commande
  return (
    <div className="orderdone-container">
      <div>
        <p className="orderdone-text">Vos {data.length} commandes</p>
        {data.map((order, index) => {
          return (
            <div
              className="orderdone-order"
              key={index}
              onClick={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <span className="orderdone-order-text">{order.date}</span>
              <span className="orderdone-order-text">{order.lastName}</span>
              <span className="orderdone-order-text">{order.firstName} </span>
              <span className="orderdone-order-text">{order.email}</span>
              <span className="orderdone-order-text">{order.amount}€</span>
              {modalVisible && <ModalOrder order={order} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default OrderDone;
