import React from "react";
import { useAppState } from "../AppState.jsx";
import { Route, Link } from "react-router-dom";
import Form from "../components/Form.jsx";

const Milestones = (props) => {
  const {state, dispatch} = useAppState()
  console.log(state)
  const {token, url, children, username, milestones} = state;
  console.log(state)

  const getMilestones = async () => {
    const response = await fetch(url + "/milestones/", {
      method: "get",
      headers: {
        Authorization: "bearer " + token,
      },
    });
    const fetchedMilestones = await response.json();
    console.log(fetchedMilestones)
    dispatch({ type: "getMilestones", payload: fetchedMilestones });
  };

  React.useEffect(() => {
    getMilestones();
  }, []);


  const loaded = () => {
    return (
      <div className="noteDiv">
        <Link to="/milestones/new">
          <button>Add Note/Milestone</button>
        </Link>
        <Route
          path="/milestones/:action"
          render={(rp) => <Form {...rp} getMilestones={getMilestones} />}
        />
        <ul>
          {state.milestones.map((milestone) => (
            <div className="note" key={milestone.id}>
              <h3>Date: {milestone.dateOf}</h3>
              <h4>Child's weight: {milestone.weight}</h4>
              <h4>Note: {milestone.note}</h4>
              <button
                onClick={() => {
                  dispatch({ type: "select", payload: milestone });
                  props.history.push("/milestones/edit");
                }}
              >
                Edit
              </button>
              &nbsp;&nbsp;
              <button
                onClick={() => {
                  fetch(url + "/milestones/" + milestone.id, {
                    method: "delete",
                    headers: {
                      Authorization: "bearer " + token,
                    },
                  }).then(() => getMilestones());
                }}
              >
                Delete
              </button>
              
            </div>
          ))}
        </ul>
      </div>
    );
  };
  return milestones ? loaded() : <h1>Loading...</h1>;
};

export default Milestones;