import React from "react";
import { useAppState } from "../AppState.jsx";
import { Route, Link } from "react-router-dom";
import Form from "../components/Form.jsx";

const Dashboard = (props) => {
  const {state, dispatch} = useAppState()
  console.log(state)
  const {token, url, children, username} = state;
  console.log(state)

  const getChildren = async () => {
    const response = await fetch(url + "/children/", {
      method: "get",
      headers: {
        Authorization: "bearer " + token,
      },
    });
    const fetchedChildren = await response.json();
    console.log(fetchedChildren)
    dispatch({ type: "getChildren", payload: fetchedChildren });
  };

  React.useEffect(() => {
    getChildren();
  }, []);


  const loaded = () => {
    return (
      <div className="childDiv">
        <h1>{username}'s child(ren)</h1>
        <Link to="/dashboard/new">
          <button>Add Child</button>
        </Link>
        <Route
          path="/dashboard/:action"
          render={(rp) => <Form {...rp} getChildren={getChildren} />}
        />
        <ul>
          {state.children.map((child) => (
            <div className="child" key={child.id}>
              <h2>Child's Name: {child.name}</h2>
              <h3>Date of birth: {child.dob}</h3>
              <h4>Gender: {child.gender}</h4>
              <button
                onClick={() => {
                  dispatch({ type: "select", payload: child });
                  props.history.push("/dashboard/edit");
                }}
              >
                Edit Child
              </button>
              &nbsp;&nbsp;
              <button
                onClick={() => {
                  fetch(url + "/children/" + child.id, {
                    method: "delete",
                    headers: {
                      Authorization: "bearer " + token,
                    },
                  }).then(() => getChildren());
                }}
              >
                Delete Child
              </button>
              
            </div>
          ))}
        </ul>
      </div>
    );
  };
  return children ? loaded() : <h1>Loading...</h1>;
};

export default Dashboard;