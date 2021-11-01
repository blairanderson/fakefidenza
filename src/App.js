import React, {useRef} from "react";
import p5 from "p5";
import Fidenza from "./fidenza";
import useDebounce from './useDebounce';

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
  const [slowToken, changeHash] = React.useState("0xDONNY");
  const updateHash = (e) => changeHash(e.target.value);
  const hashToken = useDebounce(slowToken, 500);
  const [loading, setLoading] = React.useState(false);
  const [imgs, updateImg] = React.useState({});
  const myRef = useRef(null);

  const Sketch = React.useMemo(() => {
    return Fidenza(hashToken, () => {
      setLoading(false)
      if (!imgs.hasOwnProperty(hashToken) && myRef.current.children[0] && typeof myRef.current.children[0].toDataURL === 'function') {
        const dataURL = myRef.current.children[0].toDataURL("image/png");
        if (!Object.values(imgs).includes(dataURL)) {
          const newState = {};
          newState[hashToken] = dataURL;
          updateImg(Object.assign(newState, imgs))
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

  return (
    <div className="container">
      <div className={"row"}>
        <div className={`col-6 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <div id={"cheesy-taco"} ref={myRef}/>
        </div>

        <div className="col-6">
          <div className="row">
            <div className="col">
              <input className="form-control" value={slowToken} onChange={updateHash} type='text'/>
              Loading: {loading.toString()}
            </div>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {Object.entries(imgs).map((el) => {
              const token = el[0];
              const src = el[1];
              return (<div className={"card"} key={token}>
                <img className="card-img-top" src={src}/>
                <div className="card-body">
                  <p className="card-text">{token}</p>
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
