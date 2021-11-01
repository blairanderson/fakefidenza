import React, {useRef} from "react";
import p5 from "p5";
import md5 from "crypto-js/md5";
import Fidenza from "./fidenza";
import useDebounce from './useDebounce';
import queryString from 'query-string';

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

function App() {
  const parsed = queryString.parse(window.location.search);

  const [slowToken, changeHash] = React.useState(
    parsed.token || "FAKE FIDENZA"
  );


  const updateHash = React.useMemo(() => {
    return (e) => changeHash(e.target.value);
  })
  const debouncedToken = useDebounce(slowToken, 500);
  const hashToken = md5(debouncedToken).toString().substring(0, 5) + debouncedToken;
  const [loading, setLoading] = React.useState(false);
  const [imgs, updateImg] = React.useState([]);
  const myRef = useRef(null);

  const Sketch = React.useMemo(() => {
    return Fidenza(hashToken, () => {
      setLoading(false)
      if (myRef.current.children[0] && typeof myRef.current.children[0].toDataURL === 'function') {
        const dataURL = myRef.current.children[0].toDataURL("image/png");
        // ODDLY ENOUGH, the fidenza algorithm, is not infinitely unique based on text input.
        // For Example "0" and "00" and "001 will produce the same results.
        //
        if (!Object.values(imgs).includes(dataURL)) {
          const newState = {};
          newState[hashToken] = dataURL;
          updateImg(Object.assign({}, imgs, newState))
        }
      }
    })
  }, [hashToken])

  React.useEffect(() => {
    if (myRef.current.dataset.hashToken !== hashToken) {
      setLoading(true)
      myRef.current.innerHTML = "";
      myRef.current.dataset.hashToken = hashToken; // use the DOM as the database YOLO
      new p5(Sketch, myRef.current);
    }
  }, [Sketch, hashToken, imgs]);

  const moreLoading = loading || (slowToken !== debouncedToken);

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
            {Object.entries(imgs).map((el) => {
              const token = el[0];
              const src = el[1];
              return (<div className={"card"} key={token}>
                <img className="card-img-top" src={src}/>
                <div className="card-body">
                  <p title={token} className="card-text text-truncate">{token}</p>
                </div>
              </div>)
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
