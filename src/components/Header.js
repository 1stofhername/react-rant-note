import React from "react";

function Header() {
  return (
    <div className="nav-bar" onMouseOver={()=>{document.getElementById("sub-title").innerHTML="Hello"}}>
      <ul>
        <li className="nav-item">
          <h1 className="title">Vault</h1>
          <h3 id="sub-title" className="sub-title">For all your bright ideas...</h3>
        </li>
      </ul>
    </div>
  );
}

export default Header;
