import React, { useState, useEffect } from "react";
import List from "./List";
import Form from "./Form";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
function App() {
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [name, setName] = useState("");
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    setList([]);
    showAlert(true, "danger", "Empty list");
  };
  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showAlert(true, "danger", "item removed");
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <Form
        list={list}
        setList={setList}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setEditID={setEditID}
        editID={editID}
        name={name}
        setName={setName}
        setAlert={setAlert}
        showAlert={showAlert}
        alert={alert}
      />
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
