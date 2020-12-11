import React from "react";
import { useAppState } from "../AppState.jsx";
import { Route, Link } from "react-router-dom";
import Form from "../components/Form.jsx";

const Dashboard = (props) => {
  const {state, dispatch} = useAppState()
  console.log(token)
  const {token, url, children, username} = state;
  console.log(token)

  const getChildren = async () => {
    const response = await fetch(url + "/children/", {
      method: "get",
      headers: {
        Authorization: "bearer" + token,
      },
    });
    const fetchedChildren = await response.json();
    dispatch({ type: "getChildren", payload: fetchedChildren });
  };

  React.useEffect(() => {
    getChildren();
  }, []);


  const loaded = () => {
    return (
      <div className="dashboard">
        <h1>{username}'s child</h1>
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
              <h2>{child.name}</h2>
              <h2>{child.dob}</h2>
              <h4>{child.gender}</h4>
              <button
                onClick={() => {
                  dispatch({ type: "select", payload: child });
                  props.history.push("/dashboard/edit");
                }}
              >
                Edit Child
              </button>
              <button
                onClick={() => {
                  fetch(url + "/children/" + child.id, {
                    method: "delete",
                    headers: {
                      Authorization: "bearer" + token,
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