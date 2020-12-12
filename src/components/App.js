import React from "react";
import {Switch, Route} from "react-router-dom";
import Nav from "./Nav.jsx"
import Home from "../pages/Home.jsx";
import Auth from "../pages/Auth.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import {useAppState} from "../AppState.jsx";
import Milestones from "../pages/Milestones.jsx";
import Test from "../pages/test.jsx"

export const App = (props) => {
  const { state, dispatch } = useAppState();
  React.useEffect(() => {
    const auth = JSON.parse(window.localStorage.getItem("auth"));
    console.log(auth)
    if (auth) {
      dispatch({ type: "auth", payload: auth });
    props.history.push("/dashboard");
    
    } else {
     props.history.push("/");
    }
  }, []);
  
  return (
  <>
  <Route path="/" component={Nav}/>
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/auth/:form" component={Auth}/>
    <Route path="/dashboard" component={Dashboard}/> 
    <Route exact path="/milestones" component={Milestones}/>
    <Route exact path="/test" component={Test}/>
    </Switch>
    </>
  )
};