import * as React from "react";

const makeid = (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

function Desktop({loading, moreLoading, myRef, sorted, slowToken, updateHash, changeHash}) {
  return (
    <div className="container">
      <div className={"row"}>
        <div className={`col-6`}>
          {moreLoading ? <h1>Loading...</h1> : ''}
          <div style={{opacity: moreLoading ? 0 : 1}} id={"cheesy-taco"} ref={myRef}/>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-6">
              <input className="form-control" value={slowToken} onChange={updateHash} type='text'/>
            </div>
            <div className="col-6">
              <button onClick={(e) => {
                changeHash(makeid(66));
              }} className={'btn btn-outline-success'}>Randomize
              </button>
            </div>
          </div>
          <div className="row">
            Loading: {loading.toString()} <br/>
            MoreLoading: {moreLoading.toString()}
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {sorted.map(({text, hashToken, dataURL}) => {
              return (<div className={"card"} key={hashToken}
                           onClick={(e) => {
                             e.preventDefault();
                             changeHash(text);
                           }}>
                <img alt={`algorithmically generated shapes of colors using seed data: ${text}`}
                     className="card-img-top" src={dataURL}/>
                <div className="card-body">
                  <p title={hashToken} className="card-text text-truncate">{text}</p>
                </div>
              </div>)
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Desktop;
