import { useGlobalContext } from "../context";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Modal = () => {
  const { closeModalAdd, employees } = useGlobalContext();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [alert, setAlert] = useState("none");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert("none");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [alert]);

  const onSubmit = async (e) => {
    const employee = {
      id,
      first,
      last,
      email,
    };
    if (checkIsValid()) {
      await axios.post("http://localhost:8080/employees", employee);
      closeModalAdd();
    } else {
      e.preventDefault();
    }
  };

  const checkIsValid = () => {
    const validMail = /\S+@\S+\.\S+/.test(email);
    const idIsNum = /^\d+$/.test(id);
    const idExist = employees.find((item) => item.id === id);
    if (idExist) {
      setAlert("ID already exists");
    } else if (!id || !idIsNum) {
      setAlert("invalid ID");
    } else if (first.length < 3) {
      setAlert("invalid first length");
    } else if (!last) {
      setAlert("please enter last name");
    } else if (email.indexOf("@") === -1 || !validMail) {
      setAlert("invalid email format");
    } else {
      setAlert("none");
      return true;
    }
    return false;
  };

  return (
    <aside className="modal-container">
      <form className="modal" onSubmit={(e) => onSubmit(e)}>
        <h4>add new employee</h4>
        {alert !== "none" && <p className="alert alert-danger">{alert}</p>}
        <div className="edit-item">
          <div className="form-control">
            <input
              type="text"
              className="input-item"
              placeholder="Add Id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="text"
              className="input-item"
              placeholder="Add First"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
            <input
              type="text"
              className="input-item"
              placeholder="Add Last"
              value={last}
              onChange={(e) => setLast(e.target.value)}
            />
            <input
              type="text"
              className="input-item"
              placeholder="Add Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="btn-container">
          <button type="submit" className="btn confirm-btn">
            confirm
          </button>
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => {
              closeModalAdd();
            }}
          >
            cancel
          </button>
        </div>
      </form>
    </aside>
  );
};
export default Modal;
