const ModalAlcohol = ({ setIsAdult, setVisibleAlcoholModal }) => {
  console.log("modal");

  return (
    <div className="modal-alcohol-root">
      <div className="modal-alcohol">
        <div className="modal-alcool-header">
          <p className="modal-alcool-title">Vérification de l'âge</p>
          <p
            className="modal-alcool-title"
            onClick={() => {
              setVisibleAlcoholModal(false);
            }}
          >
            X
          </p>
        </div>
        <p className="modal-alcool-text">
          Pour acheter de l'alcool, vous devez avoir 18 ans ou plus
        </p>
        <button
          className="modal-alcool-button-less"
          onClick={() => {
            setIsAdult(false);
            setVisibleAlcoholModal(false);
          }}
        >
          <span className="modal-alcool-text-less">J'ai moins de 18 ans.</span>
        </button>
        <button
          className="modal-alcool-button-more"
          onClick={() => {
            setIsAdult(true);
            setVisibleAlcoholModal(false);
          }}
        >
          <span className="modal-alcool-text-more"> J'ai plus de 18 ans.</span>
        </button>
      </div>
    </div>
  );
};
export default ModalAlcohol;
