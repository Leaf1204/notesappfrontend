import React from "react";
import { useAppState } from "../AppState.jsx";
import { Route, Link } from "react-router-dom";
import MilestoneForm from "../components/MilestoneForm.jsx";


const Notes = (props) => {
  const {state, dispatch} = useAppState()

  const {token, url, milestones} = state;


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

  React.useEffect(() => {
    getMilestones();
  }, []);


  const loaded = () => {
    return (
      <div className="noteDiv">
        <Link to="/notes/new">
          <button>Add Note/Milestone</button>
        </Link>
        <Route
          path="/notes/:action"
          render={(rp) => <MilestoneForm {...rp} getMilestones={getMilestones} />}
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
                  props.history.push("/notes/edit");
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

export default Notes;