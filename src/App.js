import "./App.css";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Search from "./pages/Search";
import BackOffice from "./pages/BackOffice";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

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
              />
            }
          />
          <Route path="/product/:slug_sku" element={<Product />} />
          <Route path="/search" element={<Search search={search} />} />
          <Route path="/backoffice" element={<BackOffice />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
