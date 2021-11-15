import * as React from "react";


function Footer({slowToken, updateHash, changeHash}) {
  return (<nav className="navbar fixed-bottom navbar-light bg-light">


    <div className="modal fade in" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            modal-buttons
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid">
      <a className="navbar-brand" href="/">Fauxdenza</a>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
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

