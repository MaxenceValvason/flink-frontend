import ModalSearch from "./ModalSearch";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";

const Header = ({ setSearch, search, setCart, cart }) => {
  const navigate = useNavigate();

  return (
    <div className="main-header">
      <p>Logo</p>
      <input
        type="text"
        placeholder="Recherche ..."
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <Cart setCart={setCart} cart={cart} />
      <button
        onClick={() => {
          navigate("/backoffice");
        }}
      >
        Admin
      </button>
      {search && <ModalSearch search={search} />}
    </div>
  );
};

export default Header;
