import React from "react";
import {Switch, Route} from "react-router-dom";
import Nav from "./Nav.jsx"
import Home from "../pages/Home.jsx";
import Auth from "../pages/Auth.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import {useAppState} from "../AppState.jsx";
import Notes from "../pages/Notes.jsx";
import MilestoneForm from "./MilestoneForm.jsx";


export const App = (props) => {
  const { state, dispatch } = useAppState();
  const {token, url} = state;

  React.useEffect(() => {
    
    const auth = JSON.parse(window.localStorage.getItem("auth"));
    
    if (auth) {
      dispatch({ type: "auth", payload: auth });
    props.history.push("/dashboard");
    
    } else {
     props.history.push("/");
    }
  }, []);
  
  const getMilestones = async () => {
    const response = await fetch(url + "/milestones/", {
      method: "get",
      headers: {
        Authorization: "bearer " + token,
      },
    });
    const fetchedMilestones = await response.json();
 
    dispatch({ type: "getMilestones", payload: fetchedMilestones });
  };

  return (
  <>
  <Route path="/" component={Nav}/>
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/auth/:form" component={Auth}/>
    <Route path="/dashboard" component={Dashboard}/> 
    <Route exact path="/notes/:child_id" component={Notes}/>
    <Route
          path="/notes/:child_id/:action"
          render={(rp) => <MilestoneForm {...rp} getMilestones={getMilestones} />}
        />
    </Switch>
    </>
  )
};