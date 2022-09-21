import axios from "axios";
import { useGlobalContext } from "../context";

const Modal = () => {
  const { clickedItemRemove, closeModalRemove } = useGlobalContext();
  const onSubmit = async () => {
    const id = clickedItemRemove.id;
    await axios.delete(`http://localhost:8080/employee/${id}`);
    closeModalRemove();
  };
  return (
    <aside className="modal-container">
      <form className="modal" onSubmit={() => onSubmit()}>
        <h4>remove this item from employee list?</h4>
        <div className="btn-container">
          <button type="submit" className="btn confirm-btn">
            confirm
          </button>
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => {
              closeModalRemove();
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
