import React, {useContext, useReducer} from "react"


/////////////Inital State/////////////

const initalState = {
    url: "http://lfgrowthappbackend.herokuapp.com",
    token: null,
    username: null
};


/////Reducer
// action = {type: "", payload:}
const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case "auth":
      newState = { ...state, ...action.payload };
      return newState;
      break;
    case "logout":
      newState = { ...state, token: null, username: null };
      window.localStorage.removeItem("auth");
      return newState;
      break;
  }
};

///App context
const AppContext = React.createContext(null)

/// AppState Component
export const AppState = (props) => {
    const [state, dispatch] = useReducer(reducer, initalState);

    return <AppContext.Provider value={{state, dispatch}}>{props.children}</AppContext.Provider>
};



/////useAppState hook
export const useAppState = () => {
  return React.useContext(AppContext)
}

