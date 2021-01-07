import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/parents" activeStyle={activeStyle}>
        Parents
      </NavLink>
      {" | "}
      <NavLink to="/students" activeStyle={activeStyle}>
        Students
      </NavLink>
      {" | "}
      <NavLink to="/reservations" activeStyle={activeStyle}>
        Reservations
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
    </nav>
  );
};

export default Header;
