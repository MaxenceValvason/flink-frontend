import { useState, useEffect } from "react";
import axios from "axios";

const BackOffice = () => {
  const [password, setPassword] = useState("");
  const goodPassword = "HelloWorld!";
  return (
    <div>
      <div>
        <p>Logo</p>
        <button>Admin</button>
      </div>
      <div>
        <p>Connectez-vous</p>
        <input
          type="password"
          placeholder="Votre mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button
          onClick={() => {
            if (password === goodPassword) {
              console.log("ici");
            } else {
              console.log("la");
            }
          }}
        >
          Valider
        </button>
      </div>
    </div>
  );
};
export default BackOffice;
