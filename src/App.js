import React, {useRef} from "react";
import p5 from "p5";
import md5 from "crypto-js/md5";
import Fidenza from "./fidenza";
import useDebounce from './useDebounce';
import queryString from 'query-string';
import Desktop from "./Desktop";

function App() {
  const myRef = useRef(null);

  const [imgs, updateImg] = React.useState([]);
  const parsed = queryString.parse(window.location.search);

  const [slowToken, changeHash] = React.useState(
    parsed.token || "FAKE FIDENZA"
  );

  const updateHash = (e) => changeHash(e.target.value);

  const debouncedToken = useDebounce(slowToken, 500);
  // ODDLY ENOUGH, the fidenza algorithm, is not infinitely unique based on text input.
  // For Example "0" and "00" and "001 will produce the same results.
  const hashToken = `0x${md5(debouncedToken).toString().substring(0, 5)}${debouncedToken}`;
  const [loading, setLoading] = React.useState(false);
  const moreLoading = loading || (slowToken !== debouncedToken);

  const Sketch = React.useMemo(() => {
    return Fidenza(hashToken, () => {
      setLoading(false)
      if (myRef.current.children[0] && typeof myRef.current.children[0].toDataURL === 'function') {
        const exists = imgs.find((el) => {
          return el.hashToken === hashToken
        })

        if (!exists) {
          const dataURL = myRef.current.children[0].toDataURL("image/png");
          updateImg(imgs.concat({
            text: debouncedToken,
            created: new Date(),
            hashToken,
            dataURL
          }))
        }
      }
    })
  }, [imgs, hashToken, debouncedToken])

  React.useEffect(() => {
    if (myRef.current.dataset.hashToken !== hashToken) {
      setLoading(true)
      myRef.current.innerHTML = "";
      myRef.current.dataset.hashToken = hashToken; // use the DOM as the database YOLO
      new p5(Sketch, myRef.current);
    }
  }, [Sketch, hashToken, imgs]);

  const sorted = React.useMemo(() => {
    return imgs.sort((a,b) => {
      return b.created - a.created;
    });
  }, [imgs])

  const renderProps = {
    loading,
    moreLoading,
    myRef,
    sorted,
    slowToken,
    updateHash,
    changeHash
  }

  return (<Desktop {...renderProps} />);
}

export default App;
