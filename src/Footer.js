import * as React from "react";


function Footer({slowToken, updateHash, changeHash}) {
  return (<nav className="navbar fixed-bottom navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">Fauxdenza</a>
      <form className="d-flex" onSubmit={(e) => {
        e.preventDefault();
      }}>
        <input className="form-control me-2"
               value={slowToken}
               onChange={updateHash}
               type="search"
               placeholder="Search"
               aria-label="Search"/>
      </form>
    </div>
  </nav>)
}

export default Footer;

