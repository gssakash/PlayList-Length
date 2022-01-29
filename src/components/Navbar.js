import React from "react";
import "./css/Navbar.css";

function Navbar() {
  return (
    <div>
      {/* <h2>Navbar</h2> */}
      <nav id="navbar" className="">
        <div className="nav-wrapper">
          <div className="logo">
            <a href="/">
              <h3 id="main-title">Youtube PlayList Length Calculator</h3>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
