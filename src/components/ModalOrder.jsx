const ModalOrder = ({ order }) => {
  return (
    <div>
      <div>
        <p className="orderdone-order-text">Détails de la commande</p>
        <div>
          {order.products[0].map((products, index) => {
            return (
              <div key={index} className="checkout-content">
                <img className="checkout-img" src={products.thumbnail} />
                <div className="checkout-name-price">
                  <p className="checkout-name">{products.name}</p>
                  <p className="checkout-price">{products.price.amount} €</p>
                  <span className="modal-order-text">
                    {products.cartQuantity}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ModalOrder;
