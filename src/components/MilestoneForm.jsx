import React from "react";
import { useAppState } from "../AppState.jsx";

const MilestoneForm = (props) => {
  const { state, dispatch } = useAppState();
  // const { token } = state;
  const action = props.match.params.action;
  const [formData, setFormData] = React.useState(state[action]) 


  const actions = {
    new: () => {
      return fetch(state.url + "/milestones", {
        method: "post",
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: "bearer " + token,
        // },
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
      props.getChildren();
      props.history.push("/Notes/");
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