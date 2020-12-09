import React, { useReducer } from "react"


/////////////Inital State/////////////

const initalState = {
    url: "http://lfreactrailsbackend.herokuapp.com"
}


/////Reducer
// action = {type: "", payload:}
const reducer = (state, action) => {
  switch(action.type){
      default:
          return state
  }
}

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

