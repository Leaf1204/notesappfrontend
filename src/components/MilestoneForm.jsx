import React from "react";
import { useAppState } from "../AppState.jsx";

const MilestoneForm = (props) => {
  const { state, dispatch } = useAppState();
  const { token } = state;
  const action = props.match.params.action;
  const child_id = props.match.params.child_id;
  const [formData, setFormData] = React.useState(state[action]) 


  const actions = {
    new: () => {
      console.log('new')
      return fetch(state.url + `/milestones?childid=${child_id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
        body: JSON.stringify(formData),
      }).then((response) => response.json());
    },
    edit: () => {
        return fetch(state.url + "/milestones/" + state.edit.id, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token,
          },
          body: JSON.stringify(formData),
        }).then((response) => response.json());
      },
}

  const handleChange = (event) => {

    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    actions[action]().then((data) => {
      props.getMilestones();
      props.history.push(`/notes/${child_id}`);
    });
  };

  return (
    <div className="form">
        <form onSubmit={handleSubmit}>
            <input type="date" name="dateOf" value={formData.dateOf} onChange={handleChange}/>
            <input type="decimal" name="weight" placeholder="weight" value={formData.weight} onChange={handleChange}/>
            <input type="text" name="note" placeholder="Write note here, eg: flu shot" value={formData.note} onChange={handleChange}/>
            <input type="submit" value={action}/>
        </form>
    </div>
  );
};
export default MilestoneForm;