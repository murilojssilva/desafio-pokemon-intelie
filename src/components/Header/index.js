import React from "react";
import "./style.css";
import logo from "../../assets/img/pokeapi_256.png";

export default function Header() {
  return (
    <header>
      <div className="menu">
        <img src={logo} alt="" />
      </div>
    </header>
    
  );
}
