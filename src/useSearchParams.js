import React from 'react'
import queryString from "query-string";


function useSearchParams(key, type) {
  const parsed = queryString.parse(window.location.search);
  const [state, updateState] = React.useState(parsed)

  return [
    state[key],
    function (newState) {
      const assignable = {};
      assignable[key] = newState;
      updateState(Object.assign({}, state, assignable))
    }
  ]
}

function getNewUrl(props) {
  return (
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    `?${queryString.stringify(props)}`
  );
}

function pushStateNow(newUrl) {
  window.history.pushState({path: newUrl}, "", newUrl);
}

export default useSearchParams;
