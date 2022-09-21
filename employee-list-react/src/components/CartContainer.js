import CartItem from "./CartItem";
import { useGlobalContext } from "../context";
import React from "react";

const CartContainer = () => {
  const { openModalAdd, employees, loadEmployee, query, setQuery } =
    useGlobalContext();

  return (
    <section className="cart">
      <footer>
        <button className="btn add-btn" onClick={() => openModalAdd()}>
          add employee
        </button>
      </footer>
      <input
        type="text"
        className="search-input"
        placeholder="Search for Email..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={() => loadEmployee(query)}
        className="btn add-btn"
      >
        search
      </button>
      <div>
        {employees
          .sort(function (a, b) {
            return a.id - b.id;
          })
          .map((item) => {
            return <CartItem key={item.id} {...item} />;
          })}
      </div>
    </section>
  );
};
export default CartContainer;
