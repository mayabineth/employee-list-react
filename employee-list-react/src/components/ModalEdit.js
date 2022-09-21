import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";

const Modal = () => {
  const { closeModalEdit, clickedItemEdit } = useGlobalContext();
  const [first, setFirst] = useState(clickedItemEdit.first);
  const [last, setLast] = useState(clickedItemEdit.last);
  const [email, setEmail] = useState(clickedItemEdit.email);
  const [alert, setAlert] = useState("none");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert("none");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [alert]);

  const onSubmit = async (e) => {
    const id = clickedItemEdit.id;
    const employee = {
      id,
      first,
      last,
      email,
    };
    if (checkIsValid()) {
      await axios.put(`http://localhost:8080/employee/${id}`, employee);
      closeModalEdit();
    } else {
      e.preventDefault();
    }
  };

  const checkIsValid = () => {
    const validMail = /\S+@\S+\.\S+/.test(email);
    if (first.length < 3) {
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
      <form className="modal big-modal" onSubmit={(e) => onSubmit(e)}>
        <h4>edit employee</h4>
        {alert !== "none" && <p className="alert alert-danger">{alert}</p>}
        <div className="edit-item">
          <div className="form-control">
            <input
              type="text"
              className="input-item"
              placeholder="Set First"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
            <input
              type="text"
              className="input-item"
              placeholder="Set Last"
              value={last}
              onChange={(e) => setLast(e.target.value)}
            />
            <input
              type="text"
              className="input-item"
              placeholder="Set Email"
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
              closeModalEdit();
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
