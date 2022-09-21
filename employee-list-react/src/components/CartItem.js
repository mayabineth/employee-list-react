import { useGlobalContext } from "../context";

const CartItem = ({ id, first, last, email }) => {
  const { openModalRemove, openModalEdit } = useGlobalContext();

  return (
    <article className="cart-item">
      <div>
        <h4 className="item-name">
          {first} {last}
        </h4>
        <h4>id: {id}</h4>
        <h4 className="email">{email}</h4>
      </div>
      <div className="btns">
        <button
          className="remove-btn"
          onClick={() => {
            openModalRemove({ id });
          }}
        >
          remove
        </button>

        <button
          className="edit-btn"
          onClick={() => {
            openModalEdit({ id, first, last, email });
          }}
        >
          edit
        </button>
      </div>
    </article>
  );
};
export default CartItem;
