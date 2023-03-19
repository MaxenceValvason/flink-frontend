import "./App.css";
import "./fonts-icons.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBasketShopping,
  faHouse,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Search from "./pages/Search";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import BackOffice from "./pages/BackOffice";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
library.add(faBasketShopping, faHouse, faCreditCard);

function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState();
  const [address, setAddress] = useState();
  const [distance, setDistance] = useState();
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/products"
            element={
              <Products
                setSearch={setSearch}
                search={search}
                setCart={setCart}
                cart={cart}
                deliveryTime={deliveryTime}
                setDeliveryTime={setDeliveryTime}
                address={address}
                setAddress={setAddress}
                distance={distance}
                setDistance={setDistance}
              />
            }
          />
          <Route
            path="/product/:slug_sku"
            element={
              <Product
                setSearch={setSearch}
                search={search}
                setCart={setCart}
                cart={cart}
                address={address}
                setAddress={setAddress}
                setDistance={setDistance}
              />
            }
          />
          <Route
            path="/search"
            element={
              <Search
                setSearch={setSearch}
                search={search}
                setCart={setCart}
                cart={cart}
              />
            }
          />
          <Route
            path="/cart"
            element={<CartPage setCart={setCart} cart={cart} />}
          />
          <Route path="/checkout" element={<Checkout cart={cart} />} />
          <Route path="/backoffice" element={<BackOffice />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
