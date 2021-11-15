import * as React from "react";

function Desktop({moreLoading, myRef, sorted, slowToken, updateHash, changeHash}) {
  const actualCanvas = (
    <div style={{opacity: moreLoading ? 0 : 1}} id={"cheesy-taco"} ref={myRef}/>
  );

  return (
    <div className="container">
      <div className="row">
        {moreLoading ? <h1>Loading...</h1> : ''}
        {actualCanvas}
      </div>
      <div className="row">
        <div className="col">
          <div className="row row-cols-3 row-cols-sm-6 row-cols-md-9 g-3">
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
            <div className="card">
              <div className="card-body">
                <button onClick={(e) => {
                  e.preventDefault();
                  changeHash(makeId(24));
                }} className={'btn btn-block btn-outline-success'}>Randomize
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Desktop;

function makeId(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}