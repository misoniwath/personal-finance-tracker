import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export function NavBar() {
  return (
    <nav className="navBar">
      <ul className="navLinks">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "tabLinkActive" : "tabLink"
            }>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              isActive ? "tabLinkActive" : "tabLink"
            }>
            Transaction
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/budget"
            className={({ isActive }) =>
              isActive ? "tabLinkActive" : "tabLink"
            }>
            Budget
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/savings"
            className={({ isActive }) =>
              isActive ? "tabLinkActive" : "tabLink"
            }>
            Saving
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/setting"
            className={({ isActive }) =>
              isActive ? "tabLinkActive" : "tabLink"
            }>
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
