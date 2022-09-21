import { FaUser } from "react-icons/fa";

const Navbar = ({ count }) => {
  return (
    <>
      <nav>
        <div className="nav-center">
          <h3>Employee List</h3>
          <div className="nav-container">
            <button className="user-icon">
              <FaUser />
            </button>
            <div className="amount-container">
              <p className="total-amount">{count}</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
