import React, {useContext, useReducer} from "react"


/////////////Inital State/////////////

const initialState = {
    url: "http://lfgrowthappbackend.herokuapp.com",
    token: null,
    username: null,
    children: null,
    new: {
      name: "",
      dob: "",
      gender: "",
    },
    edit: {
      name: 0,
      dob: "",
      gender: "",
    },
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
    case "getChildren" : 
      newState = { ...state, children: action.payload}
      return newState
      break; 
    case "select":
      newState = { ...state, edit: action.payload };
      return newState;
      break;
      default:
      return state;
      break;
  }
};

const AppContext = React.createContext(null);

////////////////////
// AppState Component
////////////////////
export const AppState = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

////////////////////
//useAppState hook
////////////////////

export const useAppState = () => {
  return useContext(AppContext);
};
