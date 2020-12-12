import React from "react";
import { useAppState } from "../AppState.jsx";
import { Route, Link } from "react-router-dom";
import MilestoneForm from "../components/MilestoneForm.jsx";


const Notes = (props) => {
  const {state, dispatch} = useAppState()
  const child_id = props.match.params.child_id;
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
        <Link to={`/notes/${child_id}/new`}>
          <button>Add Note</button>
        </Link>
     
        <ul>
          {state.milestones.map((milestone) => (
            <div className="note" key={milestone.id}>
              <h4>Date: {milestone.dateOf}</h4>
              <h4>Child's weight: {milestone.weight} kg</h4>
              <h4>Note: {milestone.note}</h4>
              <div className="buttons">
              <button 
                onClick={() => {
                  dispatch({ type: "select", payload: milestone });
                  props.history.push("/notes/edit");
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  fetch(url + `/milestones/${child_id}`, + milestone.id, {
                    method: "delete",
                    headers: {
                      Authorization: "bearer " + token,
                    },
                  }).then(() => getMilestones());
                }}
              >
                Delete Note
              </button>
              <Link to="/dashboard">
              <button>Back</button>
            </Link>
            </div>
            </div>
          ))}
        </ul>
      </div>
    );
  };
  return milestones ? loaded() : <h1>Loading...</h1>;
};

export default Notes;