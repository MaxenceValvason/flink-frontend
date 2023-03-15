const ModalAlcohol = ({ setIsAdult, setVisibleAlcoholModal }) => {
  console.log("modal");

  return (
    <div className="modal-alcohol-root">
      <div className="modal-alcohol">
        <div>
          <p>Vérification de l'âge</p>
        </div>
        <p>Pour acheter de l'alcool, vous devez avoir 18 ans ou plus</p>
        <button
          onClick={() => {
            setIsAdult(false);
            setVisibleAlcoholModal(false);
          }}
        >
          J'ai moins de 18 ans.
        </button>
        <button
          onClick={() => {
            setIsAdult(true);
            setVisibleAlcoholModal(false);
          }}
        >
          J'ai plus de 18 ans.
        </button>
      </div>
    </div>
  );
};
export default ModalAlcohol;
