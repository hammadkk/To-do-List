import React from "react";
import { nanoid } from "nanoid";
import Alert from "./Alert";

const Form = ({
  list,
  setList,
  isEditing,
  setIsEditing,
  setEditID,
  editID,
  name,
  setName,
  showAlert,
  alert,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      const newItem = { id: nanoid(), title: name };
      setList([...list, newItem]);
      setName("");
      showAlert(true, "success", "Item added to the list");
    }
  };

  return (
    <form className="grocery-form" onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
      <h3>To Do List</h3>
      <div className="form-control">
        <input
          type="text"
          className="grocery"
          placeholder="Type something"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="submit-btn">
          {isEditing ? "edit" : "submit"}
        </button>
      </div>
    </form>
  );
};

export default Form;
