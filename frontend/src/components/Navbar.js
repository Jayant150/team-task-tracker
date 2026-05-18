import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

  return (

    <div
      style={{
        background: "black",
        padding: "15px"
      }}
    >

      <Link
        to="/dashboard"
        style={{
          color: "white",
          marginRight: "20px",
          textDecoration: "none"
        }}
      >
        Dashboard
      </Link>

      <Link
        to="/tasks"
        style={{
          color: "white",
          marginRight: "20px",
          textDecoration: "none"
        }}
      >
        Tasks
      </Link>

      <Link
        to="/projects"
        style={{
          color: "white",
          marginRight: "20px",
          textDecoration: "none"
        }}
      >
        Projects
      </Link>

      <button
        onClick={() => {

          localStorage.removeItem(
            "token"
          );

          window.location.href =
            "/login";

        }}
      >
        Logout
      </button>

    </div>

  );

}

export default Navbar;